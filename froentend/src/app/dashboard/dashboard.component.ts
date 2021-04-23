import { SocketService } from "../socket.service";
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
import { CarouselConfig } from "ngx-bootstrap/carousel";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  providers: [
    {
      provide: CarouselConfig,
      useValue: { interval: 1500, noPause: false, showIndicators: true },
    },
  ],
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  slides = [
    { image: "assets/img/header.jpg", text: "First" },
    { image: "assets/img/header.jpg", text: "Second" },
    { image: "assets/img/header.jpg", text: "Third" },
  ];
  noWrapSlides = false;
  showIndicator = true;

  userId = localStorage.getItem("user-id");

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
  convertedArray: any[];
  searchedArray: any[];
  topViewsVideos: any[];
  videos$ = new BehaviorSubject<any[]>([]);
  isAlive = true;
  public tempId;
  public car;

  public temp2!: any;
  public disTitle = ['subscribed videos', 'Most Popular', 'Hsitory', 'Genere'];
  constructor(
    private VideoService: VideoService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private socket: SocketService,
    private router: Router
  ) {
    // this.socket.socket.on('test',(data:any)=>{
    //   console.log('socket works', data)
    // })
  }

  ngOnInit() {
    this.VideoService.fetchVideo().subscribe((videos: VideoUpload[]) => {
      this.temp = videos;
      this.car = this.temp[1];
       console.log("temp[1]",this.temp);

      // console.log('videos.length', videos.length)

      // this.id= videos[0]['_id'];
      // console.log('videos')
      // console.log('tempppppp', this.temp)
      this.topViewsVideos = this.temp[1];

      this.convertedArray = Array.prototype.concat.apply([], this.temp); //flatten array of arrays
      // console.log('converted',this.finalVideos);
      // console.log('top views videos ')

      this.videos$.next(this.convertedArray);
    });

    combineLatest([this.search$, this.videos$])
      .pipe(takeWhile(() => (this.isAlive = true)))
      .subscribe((data) => {
        const search = data[0];
        console.log("search", data[0]);
        console.log(typeof search);
        const test = data[1];
        console.log("test", test);
        console.log(">>>>>>", data);
        if (!search) {
          console.log("In IF");
          this.finalVideos = test;
          console.log("************", this.finalVideos);
        } else {
          console.log("In Else");
          this.searchedArray = test.filter(
            (video) => video.title.indexOf(search) !== -1
          );
        }

        console.log("data in final videos", this.finalVideos);
      });

    console.log("videoservice");
    //fire.subscribe(()=>{

    //})
  }

  onClick(uid, title, id, genere) {
    // console.log(this.id)
    this.router.navigate(["/view-video"], { queryParams: { id: id } });
    console.log("idddddddddddddddd", id);
    console.log("temp", this.temp);

    console.log("creating history");

    this.VideoService.history(this.userId, title, id, genere).subscribe(
      (data) => {
        console.log(data);
      }
    );

    console.log("after navigation creating views");

    this.VideoService.views(uid, id, genere).subscribe((data) => {
      console.log("data", data);
    });
  }

  getSanitizeUrl(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnDestroy() {
    this.isAlive = false;
  }
}
