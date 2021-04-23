import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  onLogin(){
    this.router.navigate(['/login-page'])
  }
  onSignUp(){
    this.router.navigate(['/sign-up'])
  }
}
