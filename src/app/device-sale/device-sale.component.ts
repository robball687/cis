import { Component, OnInit } from '@angular/core';
import { SharedService } from "./../shared.service";
import { DeviceSaleObject } from "./../objects/device-saleobject";
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { slideInOutAnimation } from "./../animations/movestuff";

@Component({
  selector: 'app-device-sale',
  templateUrl: './device-sale.component.html',
  animations: [ slideInOutAnimation ],
  styles: []
})
export class DeviceSaleComponent implements OnInit {
  DeviceList: any;  
  DeviceToUpdate: any;
  SalesList: any;  
  UserListBuy: any;
  UserListSell: any;
  addNewSale = false;
  EditSale = false;
  showSales = false;
  ShowSaleButton = false;
  ShowEditButton = false;
  selectedSale = null;  
  selectedUserID: any;
  newSale = new DeviceSaleObject();
  UserReady = false; 
  DeviceReady = false; 
  UserIDPassed = "";
  UseUserIDFilter = false;
  addNewVisible = 'leave';
  editVisible = 'leave';

  constructor(public _sharedService: SharedService, private route: ActivatedRoute) { }
  
  ngOnInit() {  

    if(this.route.snapshot.params['id'] != undefined)
    {
      this.UseUserIDFilter = true;
      this.UserIDPassed = this.route.snapshot.params['id'];
      this.toggleAddSale(true);
    }

    if(!this.showSales && this.UseUserIDFilter == false)
    {
        this.callGetSales();            
    }    
  }

  selectSale(sale)
  {      
    this.selectedSale = sale;  
    this.ShowEditButton = true;  
  }

  UpdateProfit(a)
  {
    switch(a)
    {
      case 0:
        var tmpPriceBought = this.selectedSale.DeviceSaleObject.PriceBought;
        var tmpPriceSold = this.selectedSale.DeviceSaleObject.PriceSold;
        var tmpProfit = Number(tmpPriceSold) - Number(tmpPriceBought);
        this.selectedSale.DeviceSaleObject.Profit = tmpProfit.toFixed(2);
        break;
      case 1:
        var tmpPriceBought2 = this.newSale.PriceBought;
        var tmpPriceSold2 = this.newSale.PriceSold;
        var tmpProfit2 = Number(tmpPriceSold2) - Number(tmpPriceBought2);
        this.newSale.Profit = Number(tmpProfit2.toFixed(2));
        break;
      default:
        break;
    }
     
  }
        
  callGetUsers()
  {
    this._sharedService.getUsers()
    .subscribe(
    lstresult => {    
              this.UserListBuy = lstresult;
              this.UserListSell = lstresult;   
              this.UserReady = true;
    },
    error => {
      alert("error!" + error);      
      console.log(error);
    }
    );  
  }

  UpdateDevicesForSale()
  {
    this.callGetDevices();
  }

  callGetDevices()
  {
    this._sharedService.getDevices()
    .subscribe(
    lstresult => {  
              this.DeviceList = lstresult; 
              if(this.newSale.SellerID != "")
              {
                this.DeviceList.Items = this.DeviceList.Items.filter(item => item.DeviceObject.UserID.toUpperCase() == this.newSale.SellerID.toUpperCase());
              }
              this.DeviceReady = true;              
    },
    error => {
      alert("error!" + error);      
      console.log(error);
    } 
    );             
  }

  callGetSales()
  {
    this._sharedService.getDeviceSales()
    .subscribe(
    lstresult => {          
              this.SalesList = lstresult;   
              this.ShowSaleButton = false;     
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

  callEditSale(d) 
  {          
    this._sharedService.UpdateSale(d)
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
    this.callGetDeviceSold(n);
  }

  callEditDevice(d) 
  {          
      this._sharedService.UpdateDevice(d)
      .subscribe(
      lstresult => {     
                alert("Device Updated! Moved to Buyer!"); 
      },
      error => {
        alert("error!" + error);
        console.log(error);
      }
      );            
  }

  callGetDeviceSold(n)
  {
    this._sharedService.getDevices()
    .subscribe(
    lstresult => {  
              this.DeviceToUpdate = lstresult;
               
              if(n.DeviceID != "")
              {
                this.DeviceToUpdate.Items = this.DeviceToUpdate.Items.filter(item => item.DeviceID.toUpperCase() == this.newSale.DeviceID.toUpperCase());
              }     

              var GetDeviceToUpdate;
              for (let t of this.DeviceToUpdate.Items)
              {
                t.DeviceObject.UserID = n.BuyerID;  
                GetDeviceToUpdate = t;
              }

              this.callEditDevice(GetDeviceToUpdate);

              this.UpdateProfit(1);

              this._sharedService.createNewSale(n)
              .subscribe(
              lstresult => {     
                        alert("Sale Created"); 
                        this.toggleAddSale(false); 
              },
              error => {
                alert("error!" + error);
                console.log(error);
              }
              );  
    },
    error => {
      alert("error!" + error);      
      console.log(error);
    } 
    );        
  }

  

  toggleAddSale(toggle){
    this.addNewSale = toggle;
    if(toggle)
    {
      this.callGetUsers();
      this.callGetDevices();
      this.ShowEditButton = false;
      this.showSales = false;
      this.selectedSale = null;      
      this.ShowSaleButton = true;
      this.addNewVisible = 'enter';
      this.newSale.BuyerID = "NewID";
      this.newSale.SellerID = "hnzXb64jSAb9-EHKa_k08Q";
      this.newSale.DeviceID = "NewID";
      this.newSale.PriceSold = 70;
      this.newSale.PriceBought = 40;
      this.newSale.Profit = 30;
      this.newSale.DateSold = new Date();    

      if(this.UseUserIDFilter)
      {
        this.newSale.BuyerID = this.UserIDPassed;
      }
    }
    else
    {          
      this.addNewVisible = 'leave';    
      this.callGetSales();
    }    
  } 
      
  toggleEditSale(toggle){
    this.EditSale = toggle;
    if(toggle)
    {
      this.callGetUsers();
      this.callGetDevices();
      this.editVisible = 'enter';
      this.ShowEditButton=false;
      this.showSales = false;      
      this.ShowSaleButton = true;
    }
    else
    {
      this.editVisible = 'leave';
      this.selectedSale = null;            
      this.callGetSales();
    }    
  } 

}
