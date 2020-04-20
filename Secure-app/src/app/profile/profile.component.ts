import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userobj = {username:''};
  userarray = [];
  userprofileobj = {}

  studentname:any;
  guard:any;
  studentmobileno:any;
  parentmobileno:any;
  year:any;
  branch:any;


  //variables for update password
  loggedin:boolean = false;

  error:boolean = false;

  message1:any;

  constructor(private hc : HttpClient , private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
        /** spinner starts on init */
        this.spinner.show();
 
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 2200);
          
        this.profilefun()
  }

  //profile function
  profilefun()
  {
    this.userobj.username = 'none';
    this.hc.post("/profile",this.userobj).subscribe(res=>{
      this.userarray = res["result"];
      //console.log(res["result"])
      this.studentname = this.userarray[0].studentname;
      this.guard = this.userarray[0].username;
      this.studentmobileno = this.userarray[0].studentmobileno;
      this.parentmobileno = this.userarray[0].parentmobileno;
      this.year = this.userarray[0].year;
      this.branch = this.userarray[0].branch;
    })
  }


  //Update password function
  updatePassword(obj)
  {
    this.loggedin = false;
    this.error = false;
    //console.log(obj);


    //pattern check

    let password = obj.newpassword;

    //  Check every single condition separately
    let lowercase = password.match((/[a-z]+/g));
    let uppercase = password.match((/[A-Z]+/g));
    let digits = password.match((/[\d]+/g));
    let special = password.match((/[!@#$%^&*_]+/g));
    let lenght = password.match((/[A-Za-z\d!@#$%^&*_]{8,}/g));
    
    //  Array to store information about any mismatches in the string
    //let errors = [];
    
    if (password === '' ) {
        //errors.push('Password is required');
        this.error = true;
        this.message1 = "Password is required";
        return;
    }
    if (lowercase === null) {
        //errors.push('Password must include at least one lowercase letter');
        this.error = true;
        this.message1 = "Password must include at least one lowercase letter";
        return;
    }
    if (uppercase === null) {
        //errors.push('Password must include at least one uppercase letter');
        this.error = true;
        this.message1 = "Password must include at least one uppercase letter";
        return;
    }
    if (digits === null) {
        //errors.push('Password must include at least one digit from 0 to 9');
        this.error = true;
        this.message1 = "Password must include at least one digit from 0 to 9";
        return;
    }
    if (special  === null) {
        //errors.push('Password must include at least one special character');
        this.error = true;
        this.message1 = "Password must include at least one special character";
        return;
    }
    if (lenght === null) {
        //errors.push('Password must include at least 8 characters');
        this.error = true;
        this.message1 = "Password must include at least 8 characters";
        return;
    }
   else {
        // Process your password

        obj["username"] = 'none';

        if(obj.newpassword == obj.currentpassword)
        {
            this.error = true;
            this.message1 = "Your new password is same as old password";
            return;
        }
    
        if(obj.newpassword == obj.conformnewpassword)
        {
          this.hc.post("/updatepassword",obj).subscribe(res=>{
            //console.log(res);
            this.error = true;
            this.message1 = res["message"];
            if(res["message"] == "Your Password has been changed successfully!")
            {
              this.clearForm()
            }
          })
          
          
        }
        else
        {
          this.error = true;
          //console.log(this.error)
          this.message1= "new password's doesn't match";
    
        }
    }




  }





 



  //clear form
  clearForm(){
    (<HTMLFormElement>document.getElementById("update")).reset();
   }

}
