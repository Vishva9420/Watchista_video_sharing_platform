//import { Component, OnInit } from '@angular/core';
//import { VideoService } from './../video.service';


import { FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as Chartist from 'chartist';
import {  } from '../models/VideoUpload.model';
import { VideoService } from './../video.service';
import { BehaviorSubject, combineLatest, Observable, Subject, Subscription } from 'rxjs';
@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.css']
})

export class ViewHistoryComponent implements OnInit {
  public temp!:any;
  public now: Date = new Date();
  public dateToday: number = Date.now();
  public userId = localStorage.getItem('user-id');
  constructor(private VideoService:VideoService, private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private router: Router) { }

  ngOnInit(): void {

    this.VideoService.getHistory(this.userId).subscribe((history: any[]) => {
      
      this.temp = history;
      // this.id= videos[0]['_id'];
      console.log('this user history-->',this.temp)
     
    })
    
  }

}
