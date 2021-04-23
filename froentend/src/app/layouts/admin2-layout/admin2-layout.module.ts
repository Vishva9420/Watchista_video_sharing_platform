import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { Admin2LayoutRoutes } from './admin2-layout.routing';
import { AdminPageComponent } from './../../admin-page/admin-page.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(Admin2LayoutRoutes),
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule.forRoot(),
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    ScrollingModule
  ],
  declarations: [
    AdminPageComponent
  ]
})

export class Admin2LayoutModule {}
