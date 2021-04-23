import { VideoService } from './../video.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private VideoService : VideoService,
  private router : Router) { }

  ngOnInit(): void {
  }

  mobileNoSubmit(email:string){
    console.log('enter mobile no',email)
    this.VideoService.forgot(email)
  .subscribe((email) => {
    console.log(email)

   
  
    this.router.navigate(['/verify-otp']);
  });
  }

}
