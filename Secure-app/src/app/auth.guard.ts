import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor (private _authService: AuthService , private _router:Router) {}
  

  canActivate(): boolean{
    if(this._authService.loggedIn())
    {
      //console.log("working as user logged in")
      return true;
    }
    else if(this._authService.AdminloggedIn())
    { 
      //console.log("Working as Admin logged in ")
      return true;
    }
    else
    {
      this._router.navigate(['/login'])
      //console.log("Working as not logged in")
      return false;
    }
  }


}
