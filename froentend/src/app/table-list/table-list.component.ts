import { VideoService } from './../video.service';
import { VideoUpload } from './../models/VideoUpload.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router , ParamMap } from '@angular/router';
import { AuthService } from './../auth.service';

import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  

  //  form!: FormGroup;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSignUpButtonClicked(uname:string , email:string , password:string ,aboutme:string ):any{
    console.log(aboutme);

  
    this.authService.signup(uname,email,password,aboutme).subscribe(
      (res:HttpResponse<any>)=>{
        localStorage.setItem('user-name',res.body.uname);
        localStorage.setItem('user-profile-pic',res.body.photoUrl);
      console.log(res)
      console.log('Logged In')
    })
  }





//   onFileSelect(event: any){
//     const file =event.target.files[0];
//     console.log(file);
//     this.form.patchValue({ url: file });
    
//   }

//   onSubmit(){
//     console.log(this.form.value.url);
//     this.VideoService.signUp(this.form.value.uname, this.form.value.email,this.form.value.fname,this.form.value.lname,this.form.value.address,this.form.value.city,this.form.value.country,this.form.value.pcode,this.form.value.url)
//     // .subscribe((newTask: VideoUpload)=>{
//     //   console.log(newTask)
//     //   this.router.navigate(['../'], {relativeTo: this.route});

//     // });
//     this.router.navigate(['../'], {relativeTo: this.route});
//     this.form.reset();
//     this.imageData = null!;
//   }


}