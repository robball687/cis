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
  addNewUser = false;
  showUsers = false;
  selectedUser = null;  
  constructor(private _sharedService: SharedService) {
  }
 
  ngOnInit() {
    if(!this.showUsers)
    {
      this.callGetUsers();
    }    
  }

  toggleAddUser(toggle){
    this.addNewUser = toggle;
    if(toggle)
    {
      this.showUsers = false;
    }
    else
    {
      this.showUsers = true;
      this.callGetUsers();
    }
    
  }  

  selectUser(user)
  {
    this.selectedUser = user;    
  }

  callGetUsers()
  {
    this._sharedService.getUsers()
    .subscribe(
    lstresult => {               
              this.my_result2 = JSON.stringify(lstresult); 
              this.my_result3 = lstresult;              
              this.showUsers = true;
              this.selectedUser = null;
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
   
  callCreateUser(name1: string, name2: string, name3: string) {      
    this._sharedService.postCreateNewUser(name1,name2,name3)
      .subscribe(
      lstresult => {     
                alert("User Created");                        
                this.my_result = JSON.stringify(lstresult); 
                this.toggleAddUser(false); 
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

  
}