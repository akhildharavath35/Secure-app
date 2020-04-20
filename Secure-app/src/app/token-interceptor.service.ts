import { Injectable , Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector : Injector) { }

  intercept(req , next){
    let authService = this.injector.get(AuthService)
    if(authService.GetToken())
    {
      //console.log("Its user Time")
      let tokenizedReq = req.clone({
        setHeaders : {
          Authorization: `Bearer ${authService.GetToken()} `
        }
      })
      return next.handle(tokenizedReq)
    }
    else if(authService.GetAdminToken())
    {
      //console.log("Its Admin Time")
      let tokenizedReq = req.clone({
        setHeaders : {
          Authorization: `Bearer ${authService.GetAdminToken()} `
        }
      })
      return next.handle(tokenizedReq)
    }

    let tokenizedReq = req.clone({
        setHeaders : {
          Authorization: `Bearer ${authService.GetToken()} `
        }
      })
      return next.handle(tokenizedReq)



    
  }

}
