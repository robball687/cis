import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { SharedService } from "./../shared.service";
import { UserObject } from "./../objects/userobject";
import { Router }            from '@angular/router';
import { slideInOutAnimation } from "./../animations/movestuff";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  animations: [ slideInOutAnimation ],
  styles: [] 
})
export class UserComponent implements OnInit {
  @Input() isVisible : boolean = true;

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
  visibility = 'shown';
  addNewVisible = 'leave';
  editVisible = 'leave';

  constructor(public _sharedService: SharedService, private router: Router) {
  }
 
  ngOnInit() {
    if(!this.showUsers)
    {
      this.callGetUsers();
    }        
  }

  ViewDevices(id)
  {        
    let link = ['/device', id];
    this.router.navigate(link);
  }

  ViewAddSale(id)
  {        
    let link = ['/devicesale', id];
    this.router.navigate(link);
  }

  toggleAddUser(toggle){
    this.addNewUser = toggle;
    if(toggle)
    {
      this.ShowEditButton = false;
      this.showUsers = false;
      this.selectedUser = null;      
      this.ShowUserButton = true;
      this.addNewVisible = 'enter';
      this.newUser.FirstName = "First Name";
      this.newUser.LastName = "Last Name";
      this.newUser.PhoneNumber = "111-222-3333";
      this.newUser.UserCity = "City";
      this.newUser.UserEmail = "dontknow@noidea.com";
      this.newUser.UserState = "State";
      this.newUser.UserName = "leave blank";
    }
    else
    {       
      this.addNewVisible = 'leave';       
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
      this.editVisible = 'enter';
    }
    else
    {
      this.selectedUser = null;   
      this.editVisible = 'leave';         
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
   
  callCreateUser(u) {   
    this._sharedService.postCreateNewUser(u)
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