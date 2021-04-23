import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from "angularx-social-login";
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angularx-social-login";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";

import { AppComponent } from "./app.component";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { MainPageComponent } from "./main-page/main-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { WebRequestInterceptorService } from "./web-request-interceptor.service";
import { BrowserModule } from "@angular/platform-browser";
import { ViewVideoComponent } from "./view-video/view-video.component";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { Admin2LayoutComponent } from "./layouts/admin2-layout/admin2-layout.component";
import { MatTooltip, MatTooltipModule } from "@angular/material/tooltip";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { VerifyOtpComponent } from "./verify-otp/verify-otp.component";
import { ViewHistoryComponent } from "./view-history/view-history.component";
import { ViewProfileComponent } from "./view-profile/view-profile.component";
import { YourVideosComponent } from "./your-videos/your-videos.component";
//import { ViewVideoComponent } from './view-video/view-video.component';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FilterPipeModule } from "ngx-filter-pipe";
import { VgCoreModule, } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import {MatMenuModule} from '@angular/material/menu';
import { TableListComponent } from "./table-list/table-list.component";
// import { CallDashComponent } from './call-dash/call-dash.component';
// const config = new AuthServiceConfig([
//   {
//     id: FacebookLoginProvider.PROVIDER_ID,
//     provider: new FacebookLoginProvider('2203659926599837')
//   }
// ]);

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),
    BrowserModule,
    SocialLoginModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    FilterPipeModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    MainPageComponent,
    LoginPageComponent,
    ViewVideoComponent,
    Admin2LayoutComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    VerifyOtpComponent,
    // ViewHistoryComponent,
    ViewProfileComponent,
    TableListComponent,
    // CallDashComponent

    //ViewVideoComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WebRequestInterceptorService,
      multi: true,
    },
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "848877689758-djqrha3n7hvurt51tfv2hhc2mgpinbu6.apps.googleusercontent.com"
            ),
          }
          
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
