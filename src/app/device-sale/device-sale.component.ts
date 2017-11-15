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

  callGetDevices()
  {
    this._sharedService.getDevices()
    .subscribe(
    lstresult => {  
              this.DeviceList = lstresult;  
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
      this.callGetDevices();
      this.ShowEditButton=false;
      this.showSales = false;      
      this.ShowSaleButton = true;
    }
    else
    {
      this.selectedSale = null;            
      this.callGetSales();
    }    
  } 

}
