import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebrequestService {
  readonly ROOT_URL;
  constructor(private http: HttpClient) { 
    this.ROOT_URL = 'http://localhost:3000';
  }
  

  post(uri: string, payload: Object){
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload)
  }

  get(uri : string){
    return this.http.get(`${this.ROOT_URL}/${uri}`)
  }

  patch(uri: string, payload: Object){
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload)
  }
  delete(uri: string){
    console.log('uri in web',uri)
    // console.log('payload',payload);
    return this.http.delete(`${this.ROOT_URL}/${uri}`)
  }

  login(email: string, password: string): any{
    return this.http.post(`${this.ROOT_URL}/users/login`, {
      email, password
    },{
      observe: 'response'
    })
  }

  signup(uname:string, email: string ,  password: string  , aboutme:string): any{
   
    return this.http.post(`${this.ROOT_URL}/table-list`, {
      uname,email,password,aboutme
    },{
      observe: 'response'
    })
  }
  

  gpush(g_id:any , g_name:any , g_email:any,g_authToken:any ): any{
   
    return this.http.post(`${this.ROOT_URL}/login-page`, {
      g_id , g_name , g_email, g_authToken
    },{
      observe: 'response'
    })
  }

  // gpush(g_id:any , g_name:any , g_email:any,g_authToken:any ): any{
  //   console.log('in video service',g_id , g_name , g_email)
  //   return this.webReqService.post('login-page',{g_id , g_name , g_email, g_authToken});
  // }





  
}
