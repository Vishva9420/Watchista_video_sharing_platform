import { WebrequestService } from './../webrequest.service';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { gsignUp } from '../../app/models/gpush.model';
import { VideoService } from './../video.service';
import  convert from 'object-array-converter';
import {io} from 'socket.io-client';

import { SocialLoginModule, SocialAuthServiceConfig, SocialUser, SocialAuthService, VKLoginProvider } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { SocketService } from '../socket.service';



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
 
  
})
export class LoginPageComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  pat_array: any;
  array: any;


  constructor(
    private authService: AuthService, 
    private router: Router ,
    private sauthService: SocialAuthService , 
    private VideoService: VideoService , 
    private WebrequestService:WebrequestService,
    private socket: SocketService
    ) { 
    }

  ngOnInit() {
    // this.socket.socket.on('counter', (data:any) => {
    //   console.log("Received message from Websocket Server",data);
    // })
    this.sauthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.loggedIn);
      this.router.navigate(['/dashboard']);
    });


    // const fbLoginOptions = {
    //   scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
    //   return_scopes: true,
    //   enable_profile_selector: true
    // }; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11
    
    const googleLoginOptions = {
      scope: 'profile email'
    }; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig
    
    // const vkLoginOptions = {
    //   fields: 'photo_max,contacts', // Profile fields to return, see: https://vk.com/dev/objects/user
    //   version: '5.124', // https://vk.com/dev/versions
    // }; // https://vk.com/dev/users.get
    
    // let config = [
    //   {
    //     id: GoogleLoginProvider.PROVIDER_ID,
    //     provider: new GoogleLoginProvider("Google-OAuth-Client-Id", googleLoginOptions)
    //   },
    //   {
    //     id: FacebookLoginProvider.PROVIDER_ID,
    //     provider: new FacebookLoginProvider("Facebook-App-Id", fbLoginOptions)
    //   },
    //   {
    //     id: VKLoginProvider.PROVIDER_ID,
    //     provider: new VKLoginProvider("VK-App-Id", vkLoginOptions)
    //   },
    // ];
  }

  refreshToken(): void {
    this.sauthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
  forgot(){
    console.log('forgot clicked')
    this.router.navigate(['/forgot-password'])
    
  }
  // signInWithGoogle(): void {
  //   this.sauthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  signInWithGoogle(): void {
    this.sauthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data=> {
      this.pat_array = convert.toArray(data);
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',this.pat_array)
      var g_id = this.pat_array[0]['value'];
      var g_name = this.pat_array[1]['value'];
      var g_email = this.pat_array[2]['value'];
      var g_authToken = this.pat_array[6]['value'];
      console.log(g_id)
      console.log(g_name)
      console.log(g_email)
      this.demo(g_id, g_name , g_email,g_authToken);
      console.log('Sign in Success ' ,data);
      
      // for(var val of this.pat_array['value']){

      
    }).catch(error => {
      console.log('sign in error ',error);
    });

    // saving the data in databse provided by google 

    console.log('+++++++++++++++++++++')
    
    


  }

  signInWithFB(): void {
    this.sauthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data=> {

      this.pat_array = convert.toArray(data);
      console.log('>>>>>>>>>>>>>>>>>>>>>>', this.pat_array)
      var g_id = this.pat_array[0]['value'];
      var g_name = this.pat_array[1]['value'];
      var g_email = this.pat_array[2]['value'];
      var g_authToken = this.pat_array[6]['value'];
      console.log(g_id)
      console.log(g_name)
      console.log(g_email)
      this.demo(g_id, g_name , g_email, g_authToken); 
      // this.demo2(g_id , g_name);


      console.log('Sign in Success ' ,data);
    }).catch(error => {
      console.log('sign in error ',error);
    });
  }

  signOut(): void {
    this.sauthService.signOut().then(data=> {
      console.log('Sign out Success ' ,data);
    }).catch(error => {
      console.log('sign out error ',error);
    });;
  }

  onLoginButtonClicked(email: string, password: string):any{
    this.authService.login(email, password).subscribe(
      (res:HttpResponse<any>)=>{
        if(res.status === 200){
          console.log(res)
          console.log('Logged In')
          this.socket.socket.on("counter", (data: any) => {
            console.log("xxxxxxxyyyyyyy", data);
          });
          
         this.router.navigate(['/dashboard']);

        }
      })
  }

  demo(g_id: String , g_name:String , g_email:String, g_authToken: string){

    this.authService.gpush(g_id, g_name , g_email, g_authToken).subscribe(
      (res:HttpResponse<any>)=>{
        if(res.status === 200){
          console.log(res)
          console.log('Logged In')
          //this.router.navigate(['/lists']);
        }
      })
  }




//     this.VideoService.gpush(g_id, g_name , g_email, g_authToken)
// .subscribe((list: gsignUp) => {
//   console.log('list', list)
//   console.log(g_id)
// });
//   }

//   demo2(g_id: String , g_name:String , g_email:String){
//     this.VideoService.gpush(g_id, g_name , g_email)
// .subscribe((list: gsignUp) => {
//   console.log('list', list)
//   console.log(g_id)
// });
//   }

}
