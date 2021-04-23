//import { Component, OnInit } from '@angular/core';
//import { VideoService } from './../video.service';




import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as Chartist from 'chartist';
import {  } from '../models/VideoUpload.model';
import { VideoService } from './../video.service';
import { BehaviorSubject, combineLatest, Observable, Subject, Subscription } from 'rxjs';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent  implements OnInit {
  public temp!:any;
  userId = localStorage.getItem('user-id');
  public uname!:any;
  public email!:any;
  public password!:any;
  public aboutme!:any;
 
  imageData!: string;
  constructor(private VideoService:VideoService, private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private router: Router) { }

  ngOnInit(): void {

    

    this.VideoService.getProfile(this.userId).subscribe((profile: any[]) => {
      
      this.temp = profile;
      this.uname = profile['uname'];
      var userName = this.uname;

      console.log('user name',typeof(userName))

      // this.id= videos[0]['_id'];
      console.log('this user profile-->',this.temp)
     
    })
    
  }

  onClick(uname:string,email:string,aboutme:string){
    console.log('button clicked');


    this.VideoService.editProfile(uname,email,aboutme,this.userId)
  .subscribe((data) => {
    console.log('logggg...',data)

   
   
  
   // this.router.navigate(['/lists',list._id]);
  });

    
  }

  

  

}

