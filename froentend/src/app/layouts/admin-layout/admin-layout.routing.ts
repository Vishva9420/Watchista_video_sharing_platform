import { MainPageComponent } from './../../main-page/main-page.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
// import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { LoginPageComponent } from '../../../app/login-page/login-page.component';
import { ViewVideoComponent } from '../../../app/view-video/view-video.component';
import { ForgotPasswordComponent } from '../../../app/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from '../../../app/change-password/change-password.component';
import { VerifyOtpComponent } from '../../../app/verify-otp/verify-otp.component';
import { YourVideosComponent } from '../../../app/your-videos/your-videos.component';
import { ViewHistoryComponent } from '../../../app/view-history/view-history.component';
import { ViewProfileComponent } from '../../../app/view-profile/view-profile.component';
import { CallDashComponent } from '../../call-dash/call-dash.component';

export const AdminLayoutRoutes: Routes = [
    // { path: 'home',      component: DashboardComponent },
    // //{ path: 'subscription',   component: UserProfileComponent },
    // { path: 'upload',     component: UserProfileComponent },
    // { path: 'notifications',     component: TypographyComponent },
    // { path: 'user-profile',          component: IconsComponent },
    // { path: 'your-vidoes',           component: MapsComponent },
    // { path: 'sign-up',  component: TableListComponent },
    // { path: 'sign-up',        component: TableListComponent },
    // { path: 'view-video' , component:ViewVideoComponent},
   
    // { path: 'view-video/:videoId' , component:ViewVideoComponent},

    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    // { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
    { path: 'login-page' , component:LoginPageComponent},
    { path: 'view-video' , component:ViewVideoComponent},
    {path:'your-videos' , component:YourVideosComponent},
    { path: 'view-video/:videoId' , component:ViewVideoComponent},
    { path: 'your-videos/:uid' , component:YourVideosComponent},
    { path: 'dashboard/:uid',      component: DashboardComponent },
    { path: 'view-history',      component: ViewHistoryComponent },
    { path: 'view-profile',      component: ViewProfileComponent },
    { path: 'view-profile/:uid',      component: ViewProfileComponent },

    { path: 'view-history/:uid',      component: ViewHistoryComponent },
    //{ path: 'resolution-switcher',      component: ResolutionSwitcherComponent },
    // { path: 'forgot-password',      component: ForgotPasswordComponent },
    { path: 'verify-otp',      component: VerifyOtpComponent },
    { path: 'change-password',      component: ChangePasswordComponent },
    { path: 'call-dash', component: CallDashComponent},

];
