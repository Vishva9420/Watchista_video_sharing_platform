import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { empty, Observable, Subject, throwError } from 'rxjs';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebRequestInterceptorService  implements HttpInterceptor{
  constructor(private authService: AuthService) { }
  refreshingAccessToken! : boolean;
  accessTokenRefreshed: Subject<any> = new Subject();
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any>{
    request = this.addAuthHeader(request)!;
    
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse)=>{
        console.log(error)
        if(error.status === 401 ){
          
          return this.refreshAccessToken()
          .pipe(
            switchMap(()=>{
              request = this.addAuthHeader(request);
              return next.handle(request)
            }),
            catchError((err:any)=>{
              console.log(err);
              this.authService.logout()
              return empty()
            })
          )    
          

        }
        return throwError(error)
      })
    )
  }

refreshAccessToken(){
  if(this.refreshingAccessToken){
    return new Observable(observer =>{
      this.accessTokenRefreshed.subscribe(
        ()=>{
          observer.next()
          observer.complete()
        })
    })
  }else{
    return this.authService.getNewAccessToken()
  .pipe(
    tap(()=>{
      this.refreshingAccessToken = false;
      this.accessTokenRefreshed.next();
      
    })
  )
  }
  //call auth servise which refreshes access token
  
}



refreshAccessToken2(){
  if(this.refreshingAccessToken){
    return new Observable(observer =>{
      this.accessTokenRefreshed.subscribe(
        ()=>{
          observer.next()
          observer.complete()
        })
    })
  }else{
    return this.authService.getNewAccessToken()
  .pipe(
    tap(()=>{
      this.refreshingAccessToken = false;
      this.accessTokenRefreshed.next();
      
    })
  )
  }
  //call auth servise which refreshes access token
  
}


  addAuthHeader(request: HttpRequest<any>){
    const token = this.authService.getAccessToken();
    if(token){
      return request.clone({
        setHeaders:
        {
          'x-access-token': token
        }
      })
    }
    return request
  }
}