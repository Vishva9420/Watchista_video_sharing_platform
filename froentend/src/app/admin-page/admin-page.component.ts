import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import Chart from "chart.js";
import { VideoUpload } from "../models/VideoUpload.model";
import { SocketService } from "../socket.service";
import { VideoService } from "../video.service";
@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.css"],
})
export class AdminPageComponent implements OnInit {
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
  public totalSpamDetail: any;
  public genre: any;
  public now: Date = new Date();
  chart;
  public liveData: Number = 0;
  how: string;
  chart_1;
  public temp = [
    [
      {
        description: "",
        genere: "",
        spamCount: 0,
        title: "",
        uid: "",
        url: "",
        views: 0,
        __v: 0,
        _id: "",
      },
    ],
  ];
  topViews: any;
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public hexToRGB(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
  constructor(
    private socket: SocketService,
    private VideoService: VideoService,
    private router: Router
  ) {
    setInterval(() => {
      this.now = new Date();
      this.how =
        this.now.getHours() +
        ":" +
        this.now.getMinutes() +
        ":" +
        this.now.getSeconds();
    }, 1);
  }

  ngOnInit() {
    this.VideoService.adminGetAllVideo().subscribe((data: any) => {
      {
        this.totalSpamDetail = data.span;
        this.genre = data.genre;
        this.topViews = data.Topviews;
        console.log("TopViews",this.topViews);
        console.log(this.genre);

        this.chart_1 = new Chart("bar1", {
          type: "bar",
          options: {
            responsive: true,
            legend: {
              display: false,
            },
          },
          data: {
            labels: [
              this.genre[0][0]._id,
              this.genre[0][1]._id,
              this.genre[0][2]._id,
              this.genre[0][3]._id,
              this.genre[0][4]._id,
              this.genre[0][5]._id,
            ],
            datasets: [
              {
                type: "bar",
                //label: "My Second dataset",
                
                data: [this.genre[0][0].count,this.genre[0][1].count, this.genre[0][2].count, this.genre[0][3].count, this.genre[0][4].count, this.genre[0][5].count],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  
                ],
                borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                ],
                fill: false,
                borderWidth: 1
              },
              
            ],
            
          },
        });
      }
    });
    this.socket.socket.on("spam", (res) => {
      console.log("res", res);

      this.VideoService.adminGetVideo(res).subscribe((spam: any) => {
        console.log("spam in admin Page", spam);
        this.temp.unshift(spam);
        this.temp.forEach((element) => {
          console.log("ForEach", element);
        });
        // console.log('Unshift>>>>>>>',this.temp[0]._id);
        //console.log(this.temp[0]._id);
      });
    });

    this.chartColor = "#FFFFFF";
    this.canvas = document.getElementById("bigDashboardChart");
    this.ctx = this.canvas.getContext("2d");

    this.gradientStroke = this.ctx.createLinearGradient(500, 0, 100, 0);
    this.gradientStroke.addColorStop(0, "#80b6f4");
    this.gradientStroke.addColorStop(1, this.chartColor);

    this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
    this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    this.gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

    this.lineBigDashboardChartData = [
      {
        label: "Data",

        pointBorderWidth: 1,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        fill: true,

        borderWidth: 2,
        data: [50, 150, 100, 190, 130, 90, 150, 160, 120, 140, 190, 95],
      },
    ];
    this.lineBigDashboardChartColors = [
      {
        backgroundColor: this.gradientFill,
        borderColor: this.chartColor,
        pointBorderColor: this.chartColor,
        pointBackgroundColor: "#2c2c2c",
        pointHoverBackgroundColor: "#2c2c2c",
        pointHoverBorderColor: this.chartColor,
      },
    ];
    this.lineBigDashboardChartLabels = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    this.lineBigDashboardChartOptions = {
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 0,
          bottom: 0,
        },
      },
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "#fff",
        titleFontColor: "#333",
        bodyFontColor: "#666",
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
      },
      legend: {
        position: "bottom",
        fillStyle: "#FFF",
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: "rgba(255,255,255,0.4)",
              fontStyle: "bold",
              beginAtZero: true,
              maxTicksLimit: 5,
              padding: 10,
            },
            gridLines: {
              drawTicks: true,
              drawBorder: false,
              display: true,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent",
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 10,
              fontColor: "rgba(255,255,255,0.4)",
              fontStyle: "bold",
            },
          },
        ],
      },
    };

    this.lineBigDashboardChartType = "line";

    this.gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10,
      },
      responsive: 1,
      scales: {
        yAxes: [
          {
            display: 0,
            ticks: {
              display: false,
            },
            gridLines: {
              zeroLineColor: "transparent",
              drawTicks: false,
              display: false,
              drawBorder: false,
            },
          },
        ],
        xAxes: [
          {
            display: 0,
            ticks: {
              display: false,
            },
            gridLines: {
              zeroLineColor: "transparent",
              drawTicks: false,
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15,
        },
      },
    };

    this.gradientChartOptionsConfigurationWithNumbersAndGrid = {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10,
      },
      responsive: true,
      scales: {
        yAxes: [
          {
            gridLines: {
              zeroLineColor: "transparent",
              drawBorder: false,
            },
            ticks: {
              stepSize: 500,
            },
          },
        ],
        xAxes: [
          {
            display: 0,
            ticks: {
              display: false,
            },
            gridLines: {
              zeroLineColor: "transparent",
              drawTicks: false,
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15,
        },
      },
    };

    // this.canvas = document.getElementById("barChartSimpleGradientsNumbers");
    // this.ctx = this.canvas.getContext("2d");

    // this.gradientFill = this.ctx.createLinearGradient(0, 170, 0, 50);
    // this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    // this.gradientFill.addColorStop(1, this.hexToRGB("#2CA8FF", 0.6));

    // this.lineChartGradientsNumbersData = [
    //   {
    //     label: "Videos Count",
    //     pointBorderWidth: 2,
    //     pointHoverRadius: 4,
    //     pointHoverBorderWidth: 1,
    //     pointRadius: 4,
    //     fill: true,
    //     borderWidth: 1,
    //     data: [80, 99, 86, 96, 123, 85, 100, 75, 88, 90, 123, 155],
    //   },
    // ];
    // this.lineChartGradientsNumbersColors = [
    //   {
    //     backgroundColor: this.gradientFill,
    //     borderColor: "#2CA8FF",
    //     pointBorderColor: "#FFF",
    //     pointBackgroundColor: "#2CA8FF",
    //   },
    // ];
    // this.lineChartGradientsNumbersLabels = [
    //   "January",
    //   "February",
    //   "March",
    //   "April",
    //   "May",
    //   "June",
    //   "July",
    //   "August",
    //   "September",
    //   "October",
    //   "November",
    //   "December",
    // ];
    // this.lineChartGradientsNumbersOptions = {
    //   maintainAspectRatio: false,
    //   legend: {
    //     display: false,
    //   },
    //   tooltips: {
    //     bodySpacing: 4,
    //     mode: "nearest",
    //     intersect: 0,
    //     position: "nearest",
    //     xPadding: 10,
    //     yPadding: 10,
    //     caretPadding: 10,
    //   },
    //   responsive: 1,
    //   scales: {
    //     yAxes: [
    //       {
    //         gridLines: {
    //           zeroLineColor: "transparent",
    //           drawBorder: false,
    //         },
    //         ticks: {
    //           stepSize: 20,
    //         },
    //       },
    //     ],
    //     xAxes: [
    //       {
    //         display: 0,
    //         ticks: {
    //           display: false,
    //         },
    //         gridLines: {
    //           zeroLineColor: "transparent",
    //           drawTicks: false,
    //           display: false,
    //           drawBorder: false,
    //         },
    //       },
    //     ],
    //   },
    //   layout: {
    //     padding: {
    //       left: 0,
    //       right: 0,
    //       top: 15,
    //       bottom: 15,
    //     },
    //   },
    // };

    this.lineChartGradientsNumbersType = "bar";
    let time = new Date();

    this.socket.socket.on("data1", (data) => {
      this.addData(this.chart, this.how, data);

      this.removeData(this.chart);

      // this.addData(this.chart_1, this.how, data);

      // this.removeData(this.chart_1);
      //this.updateChartData(this.doughnut, res.slice(0, 5), 0);
    });

    // this.chart_1 = new Chart("bigDashboardChart", {
    //   type: "line",
    //   options: {
    //     layout: {
    //       padding: {
    //         left: 20,
    //         right: 20,
    //         top: 0,
    //         bottom: 0,
    //       },
    //     },
    //     maintainAspectRatio: false,
    //     tooltips: {
    //       backgroundColor: "#fff",
    //       titleFontColor: "#333",
    //       bodyFontColor: "#666",
    //       bodySpacing: 4,
    //       xPadding: 12,
    //       mode: "nearest",
    //       intersect: false,
    //       position: "nearest",
    //     },
    //     legend: {
    //       position: "bottom",
    //       fillStyle: "#FFF",
    //       display: false,
    //     },
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             fontColor: "rgba(255,255,255,0.4)",
    //             fontStyle: "bold",
    //             beginAtZero: true,
    //             maxTicksLimit: 5,
    //             padding: 10,
    //           },
    //           gridLines: {
    //             drawTicks: true,
    //             drawBorder: false,
    //             display: true,
    //             color: "rgba(255,255,255,0.1)",
    //             zeroLineColor: "transparent",
    //           },
    //         },
    //       ],
    //       xAxes: [
    //         {
    //           gridLines: {
    //             zeroLineColor: "transparent",
    //             display: false,
    //           },
    //           ticks: {
    //             padding: 10,
    //             fontColor: "rgba(255,255,255,0.4)",
    //             fontStyle: "bold",
    //           },
    //         },
    //       ],
    //     },
    //   },
    //   data: {
    //     labels: [],
    //     datasets: [
    //       {
    //         label: "Data",

    //         pointBorderWidth: 1,
    //         pointHoverRadius: 7,
    //         pointHoverBorderWidth: 2,
    //         pointRadius: 5,
    //         fill: true,
    //         backgroundColor: "rgba(255,255,255,0.2)",
    //         borderColor: "rgba(255,255,255,0.5)",

    //         borderWidth: 2,
    //         data: [],
    //       },
    //     ],
    //   },
    //   // colors: {},

    // });

    this.chart = new Chart("bar", {
      type: "bar",
      options: {
        responsive: true,
        legend: {
          display: false,
        },
        // title: {
        //   display: false,
        //   //text: "Combo Bar and line Chart",
        // },
      },
      data: {
        labels: [],
        datasets: [
          // {
          //   type: 'bar',
          //   label: 'My First dataset',
          //   data: [243, 156, 365, 30, 156, 265, 356, 543],
          //   backgroundColor: 'rgba(255,0,255,0.4)',
          //   borderColor: 'rgba(255,0,255,0.4)',
          //   fill: false,
          // },
          {
            type: "line",
            //label: "Dataset 2",
            backgroundColor: "rgba(0,0,255,0.4)",
            borderColor: "rgba(0,0,255,0.4)",
            data: [],
            //fill: true,
          },
          // {
          //   type: 'bar',
          //   label: 'My Second dataset',
          //   data: [243, 156, 365, 30, 156, 265, 356, 543].reverse(),
          //   backgroundColor: 'rgba(0,0,255,0.4)',
          //   borderColor: 'rgba(0,0,255,0.4)',
          //   fill: false,
          // }
        ],
      },
    });
  }

  addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
    //console.log(chart.data.datasets[0].data.length);
  }

  removeData(chart) {
    // console.log(chart.data.datasets[0].data[0])
    if (chart.data.datasets[0].data.length > 13) {
      chart.data.labels.splice(0, 1); // remove first label
      chart.data.datasets[0].data.splice(0, 1); // remove first data point

      chart.update();
    }
  }

  updateChartData(chart, data, dataSetIndex) {
    chart.data.datasets[dataSetIndex].data = data;
    chart.update();
  }

  onViewVideoClick(id: any) {
    console.log("view video clicked!");
    console.log("view video id", id);
    this.router.navigate(["/view-video"], { queryParams: { id: id } });
  }
  onDelete(id: any) {
    console.log("on delete called", id);
    this.VideoService.deleteVideo(id).subscribe((data: any) => {
      console.log("dataaaaaaaa", data);

      // this.router.navigate(['/lists',list._id]);
    });
  }
}
