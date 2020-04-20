import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }




  loggedIn()
  {
    return !!localStorage.getItem("securetoken")
  }

  AdminloggedIn()
  {
    return !!localStorage.getItem("sadmintoken")
  }

  GetToken()
  {
    return localStorage.getItem("securetoken")
  }
  GetAdminToken()
  {
    return localStorage.getItem("sadmintoken")
  }

}
