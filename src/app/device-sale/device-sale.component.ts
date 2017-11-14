import { Component, OnInit } from '@angular/core';
import { SharedService } from "./../shared.service";
import { DeviceSaleObject } from "./../objects/device-saleobject";

@Component({
  selector: 'app-device-sale',
  templateUrl: './device-sale.component.html',
  styles: []
})
export class DeviceSaleComponent implements OnInit {
  DeviceList: any;  
  UserList: any;
  addNewDevice = false;
  EditSale = false;
  showSales = false;
  ShowDeviceButton = false;
  ShowEditButton = false;
  selectedSale = null;  
  selectedUserID: any;
  newSale = new DeviceSaleObject();
  UserReady = false; 

  constructor(public _sharedService: SharedService) { }
  
  ngOnInit() {  
    if(!this.showSales)
    {
        this.callGetSales();            
    }    
  }

  selectSale(sale)
  {      
    this.selectedSale = sale;  
    this.ShowEditButton = true;  
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

  callGetSales()
  {
    this._sharedService.getDevices()
    .subscribe(
    lstresult => {          
              this.DeviceList = lstresult;   
              this.ShowDeviceButton = false;     
              this.EditSale = false;     
              this.showSales = true;
              this.selectedSale = null;  
              this.UserReady = false;              
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
              this.toggleEditSale(false);                   
    },
    error => {
      alert("error!" + error);
      console.log(error);
    }
    );     
  }

  callCreateSale(n) {                       
    /*
    this._sharedService.createNewDevice(n)
      .subscribe(
      lstresult => {     
                alert("Device Created"); 
                this.toggleAddSale(false); 
      },
      error => {
        alert("error!" + error);
        console.log(error);
      }
      );   
      */
  }

  toggleAddSale(toggle){
    this.addNewDevice = toggle;
    if(toggle)
    {
      this.callGetUsers();
      this.ShowEditButton = false;
      this.showSales = false;
      this.selectedSale = null;      
      this.ShowDeviceButton = true;
      this.newSale.BuyerID = "NewID";
      this.newSale.SellerID = "NewID";
      this.newSale.DeviceID = "NewID";
      this.newSale.PriceSold = 1;
      this.newSale.PriceBought = 0;
      this.newSale.Profit = 0;
      this.newSale.DateSold = new Date();      
    }
    else
    {              
      this.callGetSales();
    }    
  } 
    
  toggleEditSale(toggle){
    this.EditSale = toggle;
    if(toggle)
    {
      this.callGetUsers();
      this.ShowEditButton=false;
      this.showSales = false;      
      this.ShowDeviceButton = true;
    }
    else
    {
      this.selectedSale = null;            
      this.callGetSales();
    }    
  } 

}
