import { Component, OnInit } from '@angular/core';
import { SharedService } from "./../shared.service";
 
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [] 
})
export class UserComponent implements OnInit {
  
  id_currency: string = "";
  my_result: any;
  my_result2: any;
  constructor(private _sharedService: SharedService) {
  }
 
  ngOnInit() {
  }
 
  callCurrencyService() {  
    this._sharedService.getCurrencyExchRate(this.id_currency.toUpperCase())
      .subscribe(
      lstresult => { 
                this.my_result = JSON.stringify(lstresult); 
      },
      error => {
        console.log("Error. The callCurrencyService result JSON value is as follows:");
        console.log(error);
      }
      );       
      if(this.my_result != undefined)
      {
        var jsonObject : any = JSON.parse(this.my_result);
        var jsonObject2 : any = JSON.parse(jsonObject.body); 
        this.my_result2=jsonObject2.message;
      }
      
  }
}