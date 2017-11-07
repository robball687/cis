import { Component, OnInit } from '@angular/core';
import { SharedService } from "./../shared.service";
import { UserObject } from "./../objects/userobject";
 
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
  EditUser = false;
  showUsers = false;
  ShowUserButton = false;
  ShowEditButton = false;
  selectedUser = null;  
  newUser = new UserObject();

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
      this.ShowEditButton = false;
      this.showUsers = false;
      this.selectedUser = null;      
      this.ShowUserButton = true;
    }
    else
    {              
      this.callGetUsers();
    }    
  }  

  toggleEditUser(toggle){
    this.EditUser = toggle;
    if(toggle)
    {
      this.ShowEditButton=false;
      this.showUsers = false;      
      this.ShowUserButton = true;
    }
    else
    {
      this.selectedUser = null;            
      this.callGetUsers();
    }    
  }    

  selectUser(user)
  {
    this.selectedUser = user;  
    this.ShowEditButton = true;  
  }

  callGetUsers()
  {
    this._sharedService.getUsers()
    .subscribe(
    lstresult => {               
              this.my_result2 = JSON.stringify(lstresult); 
              this.my_result3 = lstresult;   
              this.ShowUserButton = false;     
              this.EditUser = false;     
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
   
  callCreateUser(name1: string, name2: string, name3: string, name4: string, name5: string, name6: string, name7: string) {    
    this.newUser.UserName = name1;
    this.newUser.FirstName = name2;   
    this.newUser.LastName = name3;  
    this.newUser.UserCity = name4;  
    this.newUser.UserState = name5;  
    this.newUser.PhoneNumber = name6; 
    this.newUser.UserEmail = name7;     

    this._sharedService.postCreateNewUser(this.newUser)
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

  callEditUser(u) 
  {              
      this._sharedService.postUpdateUser(u)
      .subscribe(
      lstresult => {     
                alert("User Updated!");                        
                this.my_result = JSON.stringify(lstresult); 
                this.toggleEditUser(false); 
                //this.toggleAddUser(false); 
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