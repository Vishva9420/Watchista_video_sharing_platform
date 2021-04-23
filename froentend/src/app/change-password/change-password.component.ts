import { VideoService } from './../video.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor( private router: Router , private VideoService : VideoService) { }

  ngOnInit(): void {
  }

  pswdSubmit(pswd:string){
    console.log('enter pswd',pswd)
    this.VideoService.pswd(pswd)
  .subscribe((pswd) => {
    this.router.navigate(['/login-page']);

   
  
   // this.router.navigate(['/lists',list._id]);
  });
  }

}
