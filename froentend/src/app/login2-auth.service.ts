import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class Login2AuthService {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (this.auth.islogedIn()) {
      this.router.navigate(["/dashboard"]);
      return false;
    }
  
    return true;
  
    
  }
}
