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
  my_result3: any;
  gotUser = false;
  constructor(private _sharedService: SharedService) {
  }
 
  ngOnInit() {
  }

  callGetUsers()
  {
    this._sharedService.getUsers()
    .subscribe(
    lstresult => { 
              //alert("success!");
              this.my_result2 = JSON.stringify(lstresult); 
              this.my_result3 = lstresult;
              //alert(lstresult.Items[0].User.FirstName);
              this.gotUser = true;
    },
    error => {
      alert("error!" + error);
      console.log("Error. The callCurrencyService result JSON value is as follows:");
      console.log(error);
    }
    );       
    if(this.my_result != undefined)
    {
      var jsonObject : any = JSON.parse(this.my_result2);
      alert(this.my_result2);
      //var jsonObject2 : any = JSON.parse(jsonObject.body); 
      //this.my_result2=jsonObject2.message;
    }  

  }
 
  callCurrencyService() {  
    this._sharedService.postNewUser(this.id_currency.toUpperCase())
      .subscribe(
      lstresult => { 
                alert("success!");
                this.my_result = JSON.stringify(lstresult); 
      },
      error => {
        alert("error!" + error);
        console.log("Error. The callCurrencyService result JSON value is as follows:");
        console.log(error);
      }
      );       
      if(this.my_result != undefined)
      {
        var jsonObject : any = JSON.parse(this.my_result);
        alert(this.my_result);
        //var jsonObject2 : any = JSON.parse(jsonObject.body); 
        //this.my_result2=jsonObject2.message;
      }
      
  }
}