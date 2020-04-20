import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'
import { NgxSpinnerService } from "ngx-spinner";
import {LoginService } from '../login.service';

@Component({
  selector: 'app-studentsoutpass',
  templateUrl: './studentsoutpass.component.html',
  styleUrls: ['./studentsoutpass.component.css']
})
export class StudentsoutpassComponent implements OnInit {


  //profile variables
  userarray = [];
  //userprofileobj = {}

  studentname:any;
  guard:any;
  email:any;
  studentmobileno:any;
  parentmobileno:any;
  year:any;
  branch:any;

  temp = {id:"akki"}


  reqdataarray = [];
  studentreq = {id:'',name:''}
  
  

  constructor(private ls : LoginService,private hc:HttpClient ,  private router:Router , private spinner: NgxSpinnerService) {
    
   }


  message1:any;
  error:Boolean = false;

  ngOnInit(): void {
     this.viewrequesteddatafunction()
  }

  viewrequesteddatafunction()
  {
    this.error = false;
    this.hc.post('/viewrequestpass',this.temp).subscribe(res=>{

      //console.log(res)
      this.reqdataarray = res["result"]
      if(this.reqdataarray.length == 0)
      {
        this.error = true;
        this.message1 = "No Records"
        //console.log("working")
      }

    })
  }


  //accept function
  accept(obj)
  {
    //console.log(obj.index)
    if (confirm('Are you sure you want to accept?')) {
      
      //var str=obj.id;
      //var array = str.split(",",2);
      this.studentreq.id = obj.id;
      this.studentreq.name = obj.name;
      //console.log(this.studentreq.name,array[1])
      this.hc.put("/acceptstatus",this.studentreq).subscribe(res=>{
        //console.log(res)
      })
      //this.viewrequesteddatafunction();
      //this.router.navigateByUrl('/adminhome/studentsoutpass');
      this.reqdataarray.splice(obj.index, 1);
      //console.log("deleted ",obj.index)
      
    } else {
      return;
    }
    
  }

  //reject function
  reject(obj)
  {
    if (confirm('Are you sure you want to reject?')) {
      
      //var str=event.target.id;
      //var array = str.split(",",2);
      this.studentreq.id = obj.id;
      this.studentreq.name = obj.name;
      //console.log(this.studentreq.name,array[1])
      this.hc.put("/rejectstatus",this.studentreq).subscribe(res=>{
        //console.log(res)
      })

      this.reqdataarray.splice(obj.index, 1);
     // console.log("deleted ",obj.index)
      
    } else {
      return;
    }
  }

  

  //profile function
  profile(obj)
  {
            /** spinner starts on init */
            this.spinner.show();
 
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
            }, 2000);
          this.hc.post("/profilereqbyadmin",obj).subscribe(res=>{
          //console.log(res["result"])
          this.userarray = res["result"];
          this.studentname = this.userarray[0].studentname;
          this.guard = this.userarray[0].username;
          this.email = this.userarray[0].email;
          this.studentmobileno = this.userarray[0].studentmobileno;
          this.parentmobileno = this.userarray[0].parentmobileno;
          this.year = this.userarray[0].year;
          this.branch = this.userarray[0].branch;
    })
  }

  
}
