import { comments } from "./../models/comments.model";
import { VideoService } from "./../video.service";
// import { Component, OnInit } from '@angular/core';
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { VideoUpload } from "../models/VideoUpload.model";

import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
// import { Input } from '@angular/core';
import { Location } from "@angular/common";
import { DomSanitizer } from "@angular/platform-browser";
import convert from "object-array-converter";
import { SocketService } from "../socket.service";
import videojs from "video.js";
import { DOCUMENT } from "@angular/common";
import { Inject } from "@angular/core";
@Component({
  selector: "app-view-video",
  templateUrl: "./view-video.component.html",
  styleUrls: ["./view-video.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class ViewVideoComponent implements OnInit {
  @ViewChild("myMedia", { static: true }) target: ElementRef;
  @Input() options: {
    fluid: boolean;
    aspectRatio: string;
    autoplay: boolean;
    sources: {
      src: string;
      type: string;
    }[];
  };
  player: videojs.Player;

  id: string;
  public temp!: any;
  pat_array: any;
  display: any;
  selectedListId!: string;
  private profileSubscription!: Subscription;
  videos!: VideoUpload[];
  flag: any = 1;
  toggle = true;
  userId = localStorage.getItem("user-id");

  constructor(
    private VideoService: VideoService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private domSanitizer: DomSanitizer,
    private socket: SocketService,
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  ngOnInit(): void {
    this.player = videojs(
      this.target.nativeElement,
      this.options,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );

    this.route.queryParams.subscribe((params) => {
      if (params.id) {
        console.log("________________in if________________");
        console.log("user-id", this.userId);
        console.log("params", params);
        this.selectedListId = params.id;
        this.VideoService.getVideo(params.id).subscribe(
          (data: VideoUpload[]) => {
            this.videos = data;

            this.id = this.videos["video"][0]._id;

            var myPlayer;
            const src = this.getSanitizeUrl(
              this.videos['video'][0].url
            );
            console.log(src);
            let temp = src["changingThisBreaksApplicationSecurity"];
            console.log("<>>>>>>>>>>>>>>>><", src);
            videojs.getPlayer("myMedia").ready(function () {
              myPlayer = this;
              myPlayer.src(
                temp
                //'http://localhost:3000/file_example_MP4_480_1_5MG/360p.m3u8'
              );
              console.log(myPlayer);

              //myPlayer.load();

              myPlayer.play();
            });
          }
        );
        console.log("___________________");
      } else {
        this.videos = undefined!;
      }
    });
  }

  getSanitizeUrl(url: string) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    // return console.log(typeof temp["changingThisBreaksApplicationSecurity"]);
  }

  onSubscribeButtonClicked() {
    console.log("you subcribed to this channel");
    var spam = 1;
    var map = "subscribe";
    console.log(this.selectedListId);

    this.VideoService.subscribeToUser(
      this.userId,
      map,
      this.selectedListId
    ).subscribe((data) => {
      console.log("data", data);
    });
  }

  onSpamButtonClicked() {
    console.log("on spam button clicked");
    var spam = 1;
    var map = "spam";
    console.log(this.selectedListId);
    this.VideoService.spam(this.selectedListId, map, spam).subscribe(
      (spam: VideoUpload) => {
        console.log("spam1232", spam);
        this.socket.socket.emit("spam", this.selectedListId);
        // this.router.navigate(['/lists',list._id]);
      }
    );
  }

  changeResolution(rs, url) {
    let new_url
    if (rs === '360'){
      let temp = url.split('playlist.m3u8')[0];
      new_url = temp + '360p.m3u8';
      console.log("360", new_url);
    }
    else if (rs === '480'){
      let temp = url.split('playlist.m3u8')[0];
       new_url = temp + '480p.m3u8';
       console.log("480", new_url);
    }
    else if (rs === '720'){
      let temp = url.split('playlist.m3u8')[0];
       new_url = temp + '720p.m3u8';
       console.log("720", new_url);
    }
    else if (rs === '1080'){
      let temp = url.split('playlist.m3u8')[0];
       new_url = temp + '1080p.m3u8';
       console.log("1080", new_url);
    }
    else{
       new_url = url ;
    }
    var myPlayer;
    const src = this.getSanitizeUrl(
      url
    );
    console.log(src);
    let temp = src["changingThisBreaksApplicationSecurity"];
    console.log("<>>>>>>>>>>>>>>>><", src);
    videojs.getPlayer("myMedia").ready(function () {
      myPlayer = this;
      myPlayer.src(
        new_url
        //'http://localhost:3000/file_example_MP4_480_1_5MG/360p.m3u8'
      );
      console.log(myPlayer);

      //myPlayer.load();

      myPlayer.play();
    });
  }

  onCommentButtonClicked(comment: string) {
    console.log("after click", this.id);
    var vid = this.id;
    var like = 0;
    var dislike = 0;
    var canLike = 0;
    var canDislike = 0;
    this.VideoService.createVideo(
      comment,
      this.id,
      like,
      dislike,
      canLike,
      canDislike,
      this.userId
    ).subscribe((comment: comments, vid: comments) => {
      console.log(comment);
      console.log(vid);
      // this.router.navigate(['/lists',list._id]);
    });
  }

  onLikeButtonClicked(
    cid: string,
    like: number,
    canLike: number,
    canDislike: number,
    userId: any
  ) {
    this.toggle = false;
    console.log("cid", cid);
    console.log("like", like);
    console.log("user id after clicking like", userId);
    var map = "like";
    this.VideoService.like(
      cid,
      like,
      map,
      canLike,
      canDislike,
      userId
    ).subscribe((like: comments) => {
      console.log(like);

      // this.router.navigate(['/lists',list._id]);
    });
  }

  onUnlikeLikeButtonClicked(
    cid: string,
    dislike: number,
    canLike: number,
    canDislike: number,
    userId: any
  ) {
    console.log("dislike");
    console.log("cid", cid);
    console.log("like", dislike);
    console.log("can dislike", canDislike);
    var map = "dislike";
    this.VideoService.like(
      cid,
      dislike,
      map,
      canLike,
      canDislike,
      userId
    ).subscribe((like: comments) => {
      console.log(like);

      // this.router.navigate(['/lists',list._id]);
    });
  }

  // onKeyDownEvent(event: any) {

  //   console.log('keyboard event done')
  //   console.log(event)

  // }

  onReply(cid: any, uid: any, reply: any) {
    console.log("reply called");
    console.log("cid", cid);
    console.log("uid", uid);
    console.log("reply", reply);
    console.log("videos", this.videos);

    var map = "reply";
    this.VideoService.reply(cid, uid, reply, map).subscribe(
      (reply: comments) => {
        console.log(reply);
      }
    );
  }
}
