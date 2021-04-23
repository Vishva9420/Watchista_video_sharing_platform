import { MainPageComponent } from './../../main-page/main-page.component';
import { Routes } from '@angular/router';

import { AdminPageComponent } from './../../admin-page/admin-page.component';

export const Admin2LayoutRoutes: Routes = [
    { path: 'dashboard',      component: AdminPageComponent },
    { path: 'dashboard/:id',      component: AdminPageComponent }
];
