import { VideoService } from './../video.service';
import { VideoUpload } from './../models/VideoUpload.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router , ParamMap } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  form!: FormGroup;
  
  profile: any;
  imageData!: string;
  userId = localStorage.getItem('user-id');
  constructor(private VideoService:VideoService,
              private route: ActivatedRoute,
              private router: Router) { }
  
  
  ngOnInit(): void {
    this.form = new FormGroup({
      //image: new FormControl(null),
      
      title: new FormControl(null),
      url:new FormControl(null),
      genere: new FormControl(null),
      description: new FormControl(null)
    });
    
   

  }

  onFileSelect(event: any){
    const file =event.target.files[0];
    console.log(file);
    this.form.patchValue({ url: file });
    
  }

  onSubmit(){
    console.log(this.form.value.url);
    console.log(this.userId)
    this.VideoService.uploadVideo(this.form.value.title, this.form.value.genere,this.form.value.description,this.form.value.url,this.userId)
    // .subscribe((newTask: VideoUpload)=>{
    //   console.log(newTask)
    //   this.router.navigate(['../'], {relativeTo: this.route});

    // });
    this.router.navigate(['../'], {relativeTo: this.route});
    this.form.reset();
    this.imageData = null!;
  }

}
