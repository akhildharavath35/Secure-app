import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private hc:HttpClient) { }

  isloggedIn:boolean=false;


  //get request
  viewrequestdata()
  {
    return this.hc.get('/viewrequestdata')
  }

  //login req sending
  loginUser(user)
  {
   return this.hc.post('/loginuser',user);
  }

  //admin 
  loginAdmin(user):Observable<any>
  {
    return this.hc.post('/adminlogin',user);
  }
  //logout method
  logout()
  {
    //write logout logic here
    localStorage.clear();
    this.isloggedIn=false;
  }
  //tells whether he is logged in or not
  isLoggedIn()
  {
  return !!localStorage.getItem("securetoken");
  }


  //tells whether admin is logged in or not
  isAdminLoggedIn()
  {
  return !!localStorage.getItem("sadmintoken");
  }

}






