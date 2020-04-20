import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router , private ls : LoginService) { }

  ngOnInit(): void {

  }


  //logout function
  logout()
  {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  //home function
  homefun()
  {
    this.router.navigate(['/home/minihome'])
  }

  //showprofile function
  showprofile()
  {
    this.router.navigate(['/home/profile']);
  }

  //viewoutpass function
  viewoutpassfun()
  {
    this.router.navigate(['/home/viewoutpass']);
  }

  //reqoutpass function
  reqoutpassfun()
  {
    this.router.navigate(['/home/requestoutpass']);
  } 

}
