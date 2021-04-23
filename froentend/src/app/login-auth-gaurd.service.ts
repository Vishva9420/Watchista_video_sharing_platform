import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class LoginAuthGaurdService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (!this.auth.islogedIn()) {
      this.router.navigate(["/main-page"]);
      return false;
    }
    
    else if(this.auth.islogedIn()){
      console.log('>>>>>>', this.router.url)
      // this.router.navigate(["/dashboard"]);
      return true;
    }
    // console.log('>>>>>>', this.router.url)
    // return true;
    
  }
}
