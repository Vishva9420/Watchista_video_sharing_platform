import { VideoService } from './../video.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent  implements OnInit {

  constructor(private VideoService : VideoService,private router:Router) { }

  ngOnInit(): void {
  }

  otpSubmit(otp:number){
    console.log('enter otp no',otp)
    this.VideoService.otpGenerate(otp)
  .subscribe((email) => {
    console.log('logggg...',email.message)

   
  
    this.router.navigate(['/change-password']);
  });
  }

}
