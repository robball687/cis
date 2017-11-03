import { Component, OnInit } from '@angular/core';
import { SharedService } from "./../shared.service";
import { DeviceObject } from "./../objects/deviceobject";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styles: []
})
export class DeviceComponent implements OnInit {
    my_result: any;
    my_result2: any;
    my_result3: any;  
    addNewDevice = false;
    EditDevice = false;
    showDevices = false;
    ShowDeviceButton = false;
    ShowEditButton = false;
    selectedDevice = null;  
    newDevice = new DeviceObject();

    constructor(private _sharedService: SharedService) {
    }
 
    ngOnInit() {
        if(!this.showDevices)
        {
            this.callGetDevices();
        }    
    }

    selectDeviceUser(device)
    {
      this.selectedDevice = device;  
      this.ShowEditButton = true;  
    }

    callGetDevices()
    {
      this._sharedService.getDevices()
      .subscribe(
      lstresult => {               
                this.my_result2 = JSON.stringify(lstresult); 
                this.my_result3 = lstresult;   
                this.ShowDeviceButton = false;     
                this.EditDevice = false;     
                this.showDevices = true;
                this.selectedDevice = null;
      },
      error => {
        alert("error!" + error);      
        console.log(error);
      }
      );       
      if(this.my_result != undefined)
      {
        var jsonObject : any = JSON.parse(this.my_result2);
        //alert(this.my_result2);      
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
 
    
}