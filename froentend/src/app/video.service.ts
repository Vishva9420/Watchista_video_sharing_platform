import { VideoUpload } from "./models/VideoUpload.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, Subject } from "rxjs";
import { WebrequestService } from "./webrequest.service";
import { map } from "rxjs/operators";
import { signUp } from "./models/signUp.model";
import { comments } from "./models/comments.model";

@Injectable({
  providedIn: "root",
})
export class VideoService {
  userlist: any = [];
  public video$ = new Subject<VideoUpload[]>();

  public videol: VideoUpload[];

  public profilel: any[];
  public profile$ = new Subject<any[]>();

  private url = "http://localhost:3000";

  public userl: signUp[] = [];
  public user$ = new Subject<signUp[]>();
  userId = localStorage.getItem("user-id");

  constructor(
    private webReqService: WebrequestService,
    private http: HttpClient
  ) {}

  uploadVideo(
    title: string,
    genere: string,
    description: string,
    url: File,
    uid: any
  ): any {
    //return this.webReqService.post(`lists/${listId}/tasks`, {title});;
    const videos = new FormData();
    videos.append("title", title);
    videos.append("genere", genere);
    videos.append("description", description);
    videos.append("image", url);
    videos.append("uid", uid);

    const promise = this.http
      .post<{ video: VideoUpload }>(`${this.url}/user-profile`, videos)
      .toPromise();

    promise.then((videos: any) => {
      console.log(videos);
      this.videol.push(videos);
      this.video$.next(this.videol);
    }).catch;
  }
  editProfile(
    uname: string,
    email: string,
    aboutme: string,
    userId: string
  ): any {
    console.log(uname, email, aboutme);
    return this.webReqService.patch("view-profile/:uid", {
      uname,
      email,
      aboutme,
      userId,
    });
  }

  getVideos(): any {
    return this.webReqService.get("view-video");
  }

  fetchVideo() {
    return this.http.get(`${this.url}/dashboard/${this.userId}`);
  }

  getuserVideos(uid: string) {
    console.log("in get user videos");

    return this.http.get(`${this.url}/your-videos/${uid}`);
  }

  createVideo(
    comment: string,
    id: string,
    like: number,
    dislike: number,
    canLike: number,
    canDislike: number,
    userId: any
  ): any {
    return this.webReqService.post("view-video/:videoId", {
      comment,
      id,
      like,
      dislike,
      canLike,
      canDislike,
      userId,
    });
  }
  forgot(email: string): any {
    return this.webReqService.post("forgot-password/", { email });
  }

  pswd(pswd: string): any {
    return this.webReqService.patch("change-password/", { pswd });
  }

  otpGenerate(otp: number): any {
    return this.webReqService.post("verify-otp/", { otp });
  }

  history(uid: any,title:any, vid: any, genere: any): any {
    return this.webReqService.post("dashboard/:uid", { uid, title, vid, genere });
  }
  getHistory(uid:any): any {
    return this.webReqService.get(`view-history/${uid}`);
  }

  getProfile(uid: any): any {
    return this.webReqService.get(`view-profile/${uid}`);
  }

  like(
    id: any,
    like: number,
    map: string,
    canLike: number,
    canDislike: number,
    userId: any
  ): any {
    return this.webReqService.patch("view-video/:videoId", {
      id,
      like,
      map,
      canLike,
      canDislike,
      userId,
    });
  }

  views(uid: any, id: any, genere: any): any {
    return this.webReqService.patch("dashboard/:uid", { uid, id, genere });
  }

  subscribeToUser(userId: any, map: string, videoId: any): any {
    return this.webReqService.patch("view-video/:videoId", {
      userId,
      map,
      videoId,
    });
  }

  spam(id: any, map: string, spam: number): any {
    return this.webReqService.patch("view-video/:videoId", { id, map, spam });
  }
  adminGetVideo(id: any): any {
    console.log("get video in admin", id);
    return this.http.get(`${this.url}/admin/dashboard/${id}`);
  }

  adminGetAllVideo(): any {
    return this.http.get(`${this.url}/admin/dashboard`);
  }

  reply(cid, uid, reply, map): any {
    return this.webReqService.patch("view-video/:videoId", {
      cid,
      uid,
      reply,
      map,
    });
  }
  deleteVideo(id: any) {
    console.log("from video service ", id);
    return this.webReqService.delete(`admin/dashboard/${id}`);
  }
  deleteUserVideo(id: any) {
    console.log("from video service ", id);
    return this.webReqService.delete(`your-videos/${id}`);
  }

  getVideo(videoId: string): any {
    console.log("in get task");

    return this.http.get<{ videos: VideoUpload[]; comments: comments }>(
      `${this.url}/view-video/${videoId}`
    );
  }

  getComment(videoId: string): any {
    console.log("in get task");

    return this.http.get<{ videos: VideoUpload[] }>(
      `${this.url}/view-video/${videoId}`
    );
  }

  getProfilesStream() {
    return this.video$.asObservable();
  }
}
