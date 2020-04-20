import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
//import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-requestform',
  templateUrl: './requestform.component.html',
  styleUrls: ['./requestform.component.css']
})
export class RequestformComponent implements OnInit {


  modal:Boolean = false;

  constructor(private hc : HttpClient , private router:Router) { }

  ngOnInit(): void {
    localStorage.setItem("requestsent","");
    localStorage.removeItem("requestsent")
  }

  reasons=["accident of relativs/family members","admission cancelled","Attending funerals of relatives","Attending the sports meet","Attending workshop/seminars etc","CASTING VOTE","COVID-19 Effect","Death of relatives","Festival","Family functions","General Shopping","PASSPORT verification","GATE Exam","NPTEL Exam","Sport meet work","Urgent visit to home","Web Casting","Internship certificate","Internship related","NSS related work","Paper presentation","semester break","Public service exam","Project work related","Placement drive","Cultural festwork","Others"];
  

  onRequest(reqobj)
  {
    
    //this.modal = false;
    reqobj["username"] = 'none';
    //console.log(reqobj)
    

    reqobj["status"] = "pending";

    
    //reversing outdate
    var dateout = reqobj.outdate;
    dateout = dateout.split("-").reverse().join("-");
    reqobj.outdate = dateout;

    //reversing re-in-date
    var datein = reqobj.reindate;
    datein = datein.split("-").reverse().join("-");
    reqobj.reindate = datein;
    
    
    /*document.getElementById("myModal").style.visibility = "visible";
        
    setTimeout(function(){
      document.getElementById("myModal").style.visibility = "hidden"; 
     }, 3000);*/

    this.hc.post("/pass",reqobj).subscribe(res=>{
      //console.log("storereq",res);


      reqobj["id"] = res["requestid"]

      

          this.hc.post("/requestoutpass",reqobj).subscribe(res=>{
            if(res['message'] == "successfully sent your request")
            {
              //console.log("sentreq",res);
              
            }
          })
          
    })

    localStorage.setItem("requestsent","successfully");

    //go to see notification
    this.router.navigate(['/home/requestoutpass/sent'])
    

       
      
      
  }


 





}
