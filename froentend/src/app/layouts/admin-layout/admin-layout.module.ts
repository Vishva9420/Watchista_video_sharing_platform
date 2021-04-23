import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
// import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { YourVideosComponent } from '../../your-videos/your-videos.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ViewHistoryComponent } from '../../view-history/view-history.component';
import {MatButtonModule} from '@angular/material/button';
import { SearchbarComponent } from '../../components/searchbar/searchbar.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { CallDashComponent } from '../../call-dash/call-dash.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    CarouselModule.forRoot(),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule









  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    // TableListComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    YourVideosComponent,
    ViewHistoryComponent,
    SearchbarComponent,
    CallDashComponent
  ]
})

export class AdminLayoutModule {}
