import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-viewdata',
  templateUrl: './viewdata.component.html',
  styleUrls: ['./viewdata.component.css']
})
export class ViewdataComponent implements OnInit {

  viewobj = {username:''};
  viewarray = [];

  message1:any;
  error:Boolean = false;
 

  constructor(private hc:HttpClient , private router: Router ) {
 
      
   }

  ngOnInit(): void {
    
    this.viewdatafunction()
  }

  viewdatafunction()
  {
    this.error = false;
    this.viewobj.username = 'none' ;
    this.hc.post("/viewdata",this.viewobj).subscribe(res=>{
      if(res["message"] == "no data found")
      {
        this.error = true;
        this.message1 = "No Records"
      }
      else
      {
        this.viewarray = res["result"]
        this.viewarray = this.viewarray.reverse();
        //console.log(this.viewarray)
      }
     
    },
     err=>{
       if(err instanceof HttpErrorResponse){
         if(err.status == 401 || err.status == 500 ){
           this.router.navigate['/login']
         }
       }
     } )
  }

}
