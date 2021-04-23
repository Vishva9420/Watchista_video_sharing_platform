import { FormControl } from "@angular/forms";
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Params, Router } from "@angular/router";
import * as Chartist from "chartist";
import { VideoUpload } from "../models/VideoUpload.model";
import { VideoService } from "./../video.service";
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  Subject,
  Subscription,
} from "rxjs";

import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  takeWhile,
} from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-your-videos",
  templateUrl: "./your-videos.component.html",
  styleUrls: ["./your-videos.component.css"],
})
export class YourVideosComponent implements OnInit, OnDestroy {
  public lineBigDashboardChartType;
  public gradientStroke;
  public chartColor;
  public canvas: any;
  public ctx;
  public gradientFill;
  public lineBigDashboardChartData: Array<any>;
  public lineBigDashboardChartOptions: any;
  public lineBigDashboardChartLabels: Array<any>;
  public lineBigDashboardChartColors: Array<any>;

  public gradientChartOptionsConfiguration: any;
  public gradientChartOptionsConfigurationWithNumbersAndGrid: any;

  public lineChartType;
  public lineChartData: Array<any>;
  public lineChartOptions: any;
  public lineChartLabels: Array<any>;
  public lineChartColors: Array<any>;

  public lineChartWithNumbersAndGridType;
  public lineChartWithNumbersAndGridData: Array<any>;
  public lineChartWithNumbersAndGridOptions: any;
  public lineChartWithNumbersAndGridLabels: Array<any>;
  public lineChartWithNumbersAndGridColors: Array<any>;

  public lineChartGradientsNumbersType;
  public lineChartGradientsNumbersData: Array<any>;
  public lineChartGradientsNumbersOptions: any;
  public lineChartGradientsNumbersLabels: Array<any>;
  public lineChartGradientsNumbersColors: Array<any>;
  // events
  public temp!: any;
  // public id :any;
  search$ = new Subject<string>();

  finalVideos: any[];
  videos$ = new BehaviorSubject<any[]>([]);
  isAlive = true;
  selectedListId!: string;
  videos!: VideoUpload[];
  userId = localStorage.getItem("user-id");

  constructor(
    private VideoService: VideoService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.VideoService.getuserVideos(this.userId).subscribe(
      (videos: VideoUpload[]) => {
        this.temp = videos;
        // this.id= videos[0]['_id'];
        console.log("this user videos-->", this.temp);
        this.videos$.next(this.temp);
      }
    );

    combineLatest([this.search$, this.videos$])
      .pipe(takeWhile(() => (this.isAlive = true)))
      .subscribe((data) => {
        const search = data[0];
        console.log(typeof search);
        const test = data[1];
        console.log(">>>>>>", data);
        if (!search) {
          console.log("In IF");
          this.finalVideos = test;
          console.log("************", this.finalVideos);
        } else {
          console.log("In Else");
          this.finalVideos = test.filter(
            (video) => video.title.indexOf(search) !== -1
          );
          console.log("finalVideos in else", this.finalVideos);
        }
      });

    console.log("videoservice");
    //fire.subscribe(()=>{

    //})
  }

  onClick(id) {
    // console.log(this.id)
    this.router.navigate(["/view-video"], { queryParams: { id: id } });
  }

  onDelete(id) {
    console.log("id", id);
    this.VideoService.deleteUserVideo(id).subscribe();
    this._snackBar.open("Your video Deleted Successfully !", " 🍕", {
      duration: 2000,
    });
  }

  getSanitizeUrl(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnDestroy() {
    this.isAlive = false;
  }
}
