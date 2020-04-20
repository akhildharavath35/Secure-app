import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService} from '../login.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loggedin:boolean = false;

  error:boolean = false;

  message1:any;

  disable:Boolean = false;

  constructor(private router:Router,private ls:LoginService) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  onLogin(userobj)
  {
    this.disable = true;
    this.loggedin = false;
    this.error = false;
    //console.log(userobj)
    /*this.ls.loginUser(userobj).subscribe(res=>{
      if(res['message']=="logged in successfully")
      {
        console.log("logged in successfully")
        alert("Logged in successfully")
        localStorage.setItem("securetoken",res["token"]);
        localStorage.setItem("secureusername",userobj.username)
        this.router.navigate(['/home'])
      }
      else if(res['message'] =="invalid password")
      {
        console.log("invalid password")
        alert("invalid password")
      }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
      else if(res['message'] == "invalid username") 
      {
        console.log("invalid username")
        alert("invalid username")
      }
    });
    //this.router.navigate(['/home']);
    
  }*/






  this.ls.loginAdmin(userobj).subscribe(res=>{
    if(res["message"] == "Welcome Admin")
    {
      //alert("Welcome Admin!");
      //console.log(res["admintoken"])
      localStorage.setItem("sadmintoken",res["admintoken"]);
      this.router.navigate(['/adminhome/minihome']);
      
      this.disable = false;
      
    }
    else if(res["message"] == "Not Admin")
    {
      this.ls.loginUser(userobj).subscribe(res=>{
        //console.log(res)
        if(res["message"]=="Invalid username")
         {
          this.error = true;
          //console.log(this.error)
         //console.log("Invalid user name");
          this.message1= res["message"];

          this.disable = false;
            
         }
         else if(res["message"]=="Invalid password")
         {
           
          this.error = true;
           //console.log("invalid password");
           this.message1= res["message"];

           this.disable = false;
           
         }
         else if(res["message"]=="logged in successfully")
         {
          this.error = true;
          
          //console.log(res["message"]);
          this.message1= res["message"];
          
           this.ls.isloggedIn=true;
           localStorage.setItem("securetoken",res["token"]);

           this.router.navigate(['/home/minihome']);
           //console.log("logged in",this.ls.isloggedIn);
           this.disable = false;
         }
       })
    }
    else
    {
        this.error = true;
        this.message1 = res["message"];
        
        this.disable = false;
    }
  })



}

}