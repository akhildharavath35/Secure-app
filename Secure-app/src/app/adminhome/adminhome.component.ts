import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../login.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  constructor(private router:Router , private ls : LoginService) { }

  ngOnInit(): void {

  }


  //logout function
  logout()
  {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  //students outpass function
  studentsoutpassfun()
  {
    this.router.navigate(['/adminhome/studentsoutpass']);
  }

  //home function
  adminhome()
  {
    this.router.navigate(['/adminhome/minihome']);
  }


 
}
