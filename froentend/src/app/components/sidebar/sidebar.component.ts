import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  // { path: '/dashboard', title: 'Home',  icon: 'shopping_shop', class: '' },
  // { path: '/icons', title: 'Subscription',  icon:'ui-2_time-alarm', class: '' },
  // { path: '/maps', title: 'Upload Video',  icon:'arrows-1_cloud-upload-94', class: '' },
  // { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },
  // { path: '/main-page', title: 'Main-page',  icon:'ui-1_bell-53', class: '' },
  // { path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
  // { path: '/table-list', title: 'Your Videos',  icon:'design_bullet-list-67', class: '' },
  // { path: '/typography', title: 'Logout',  icon:'ui-1_simple-remove', class: '' },
  // { path: '/upgrade', title: 'Signin',  icon:'objects_spaceship', class: 'active active-pro' }
  { path: '/dashboard', title: 'Home',  icon: 'shopping_shop', class: '' },
  //{ path: '/subscription', title: 'Subscription',  icon:'ui-2_time-alarm', class: '' },
  { path: '/user-profile', title: 'Upload Video',  icon:'arrows-1_cloud-upload-94', class: '' },
  { path: '/call-dash', title: 'Live Stream',  icon:'objects_spaceship', class: '' },

  //{ path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
  { path: '/your-videos', title: 'Your Videos',  icon:'design_bullet-list-67', class: '' },
  { path: '/view-profile', title: 'User Profile ',  icon:'ui-1_simple-remove', class: '' },
  // { path: '/table-list', title: 'SignUp',  icon:'objects_spaceship', class: 'active active-pro' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  userId = localStorage.getItem('user-id');
  menuItems: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  onClick(id){
    // console.log(this.id)
     this.router.navigate(['/your-videos'], { queryParams: { id: this.userId } });
   }

   onHistoryClick(){
    // console.log(this.id)
     this.router.navigate(['/view-history'], { queryParams: { id: this.userId } });
   }


 
   onLogOutClick(){
    localStorage.clear();
    this.router.navigate(['/main-page']);
   }

  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
}
