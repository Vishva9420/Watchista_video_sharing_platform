import { WebrequestService } from "./webrequest.service";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { shareReplay, tap } from "rxjs/operators";
// import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public id:any;
  constructor(
    private http: HttpClient,
    private webService: WebrequestService,
    private router: Router,
    //public jwtHelper: JwtHelperService
  ) {}

  public isAuthenticated(): boolean {
    this.id =  "605c33a8285f0914898612b2"
    const token = localStorage.getItem("user-id");
    console.log("toekn",token)
    // Check whether the token is expired and return
    // true or false
    return token ===this.id;
  }
  public islogedIn(): boolean {
    const token = localStorage.getItem("user-id");
    console.log("toekn",token)
    // Check whether the token is expired and return
    // true or false
    if (token){
      return true
    }
    return false
  }

  login(email: string, password: string): any {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        console.log(res.body);
        localStorage.setItem("user-name", res.body.uname);
        localStorage.setItem("user-profile-pic", res.body.photoUrl);

        this.setSession(
          res.body._id,

          res.headers.get("x-access-token"),
          res.headers.get("x-refresh-token")
        );
      })
    );
  }

  signup(uname: string, email: string, password: string, aboutme: string): any {
    console.log(">>>>>>>>>>>>>>>>>>>>signup called");
    console.log(aboutme);
    return this.webService.signup(uname, email, password, aboutme).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(
          res.body._id,
          res.headers.get("x-access-token"),
          res.headers.get("x-refresh-token")
        );
        console.log("sign up success");
      })
    );
  }

  gpush(
    g_id: String,
    g_name: String,
    g_email: String,
    g_authToken: string
  ): any {
    console.log(">>>>>>>>>>>>>>>>>>>>signup called");
    return this.webService.gpush(g_id, g_name, g_email, g_authToken).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        this.setSession(
          res.body._id,
          res.headers.get("x-access-token"),
          res.headers.get("x-refresh-token")
        );
        console.log("sign up success");
      })
    );
  }

  getUserId() {
    return localStorage.getItem("user-id");
  }
  getAccessToken() {
    console.log("><><><><><><><");
    return localStorage.getItem("x-access-token");
  }

  getRefreshToken() {
    console.log("><><><><><><><");
    return localStorage.getItem("x-refresh-token");
  }
  setAccessToken(accessToken: string) {
    localStorage.setItem("x-access-token", accessToken);
  }

  private setSession(
    userId: string,
    accessToken: string | any,
    refreshToken: string | any
  ) {
    localStorage.setItem("user-id", userId);
    localStorage.setItem("x-access-token", accessToken);
    localStorage.setItem("x-refresh-token", refreshToken);
  }

  private removeSession() {
    localStorage.removeItem("user-id");
    localStorage.removeItem("x-access-token");
    localStorage.removeItem("x-refresh-token");
  }

  logout() {
    this.removeSession();
    this.router.navigate(["/login"]);
  }

  getNewAccessToken(): any {
    console.log("><><><><><><><><><><><>");
    return this.http
      .get(`${this.webService.ROOT_URL}/users/me/access-token`, {
        headers: {
          "x-refresh-token": this.getRefreshToken()!,
          _id: this.getUserId()!,
        },
        observe: "response",
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          this.setAccessToken(res.headers.get("x-access-token")!);
        })
      );
  }
}
