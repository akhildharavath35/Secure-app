import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['./sent.component.css']
})
export class SentComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    var p=localStorage.getItem("requestsent")
    //console.log(p)
    if(p != "successfully")
    {
      this.router.navigate(['/home/requestoutpass'])
    }
  }

}
