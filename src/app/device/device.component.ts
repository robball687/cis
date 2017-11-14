import { Component, OnInit } from '@angular/core';
import { SharedService } from "./../shared.service";
import { DeviceObject } from "./../objects/deviceobject";
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styles: []
})
export class DeviceComponent implements OnInit {
    my_result: any;
    my_result2: any;
    DeviceList: any;  
    UserList: any;
    addNewDevice = false;
    EditDevice = false;
    showDevices = false;
    ShowDeviceButton = false;
    ShowEditButton = false;
    selectedDevice = null;  
    selectedUserID: any;
    UserReady = false;
    newDevice = new DeviceObject();
    UserIDPassed = "";
    UseUserIDFilter = false;

    constructor(public _sharedService: SharedService, private route: ActivatedRoute, private router: Router) {
    }
 
    ngOnInit() {  
      if(this.route.snapshot.params['id'] != undefined)
      {
        this.UseUserIDFilter = true;
        this.UserIDPassed = this.route.snapshot.params['id'];
      }
      
      if(!this.showDevices)
      {
          this.callGetDevices();            
      }    
    }

    selectDevice(device)
    {      
      this.selectedDevice = device;  
      this.ShowEditButton = true;  
    }

    ClearFilter()
    {
      let link = ['/device'];      
      this.router.navigate(link);
    }
        
    callGetUsers()
    {
      this._sharedService.getUsers()
      .subscribe(
      lstresult => {    
                this.UserList = lstresult;  
                this.UserReady = true;
      },
      error => {
        alert("error!" + error);      
        console.log(error);
      }
      );  
    }

    callGetDevices()
    {
      this._sharedService.getDevices()
      .subscribe(
      lstresult => {               
                this.my_result2 = JSON.stringify(lstresult); 
                this.DeviceList = lstresult;   
                this.ShowDeviceButton = false;     
                this.EditDevice = false;     
                this.showDevices = true;
                this.selectedDevice = null;  
                this.UserReady = false;
                if(this.UseUserIDFilter)
                {
                  this.DeviceList.Items = lstresult.Items.filter(item => item.DeviceObject.UserID.toUpperCase() == this.UserIDPassed.toUpperCase());
                }
      },
      error => {
        alert("error!" + error);      
        console.log(error);
      } 
      );             
    }

    callEditDevice(d) 
    {          
        this._sharedService.UpdateDevice(d)
        .subscribe(
        lstresult => {     
                  alert("Device Updated!");                        
                  this.my_result = JSON.stringify(lstresult); 
                  this.toggleEditDevice(false);                   
        },
        error => {
          alert("error!" + error);
          console.log(error);
        }
        );       
        if(this.my_result != undefined)
        {
          var jsonObject : any = JSON.parse(this.my_result);                     
        }      
    }

    callCreateDevice(n) {                       
        this._sharedService.createNewDevice(n)
          .subscribe(
          lstresult => {     
                    alert("Device Created");                        
                    this.my_result = JSON.stringify(lstresult); 
                    this.toggleAddDevice(false); 
          },
          error => {
            alert("error!" + error);
            console.log(error);
          }
          );       
          if(this.my_result != undefined)
          {
            var jsonObject : any = JSON.parse(this.my_result);                     
          }      
      }

      toggleAddDevice(toggle){
        this.addNewDevice = toggle;
        if(toggle)
        {
          this.callGetUsers();
          this.ShowEditButton = false;
          this.showDevices = false;
          this.selectedDevice = null;      
          this.ShowDeviceButton = true;
          this.newDevice.UserID = "NewID";
          this.newDevice.DeviceProductID = "NewID";
          this.newDevice.Version = "1.0";
          this.newDevice.CostToBuy = 39.99;
          this.newDevice.PriceSold = 70;
          this.newDevice.DateBought = new Date();
          this.newDevice.DateSold = new Date();
          this.newDevice.DateLastServiced = new Date();
        }
        else
        {              
          this.callGetDevices();
        }    
      } 
      
      toggleEditDevice(toggle){
        this.EditDevice = toggle;
        if(toggle)
        {
          this.callGetUsers();
          this.ShowEditButton=false;
          this.showDevices = false;      
          this.ShowDeviceButton = true;
        }
        else
        {
          this.selectedDevice = null;            
          this.callGetDevices();
        }    
      } 
 
    
}