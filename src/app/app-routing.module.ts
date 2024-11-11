import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './main/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { DashboardMainPageComponent } from './main/modules/dashboard/pages/dashboard-main-page/dashboard-main-page.component';
// import { AuthGuard } from './guards/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    // canActivate: [AuthGuard],
                    path: '', component: AppLayoutComponent,
                    children: [
                        {
                            path: '', redirectTo: 'dashboard', pathMatch: 'full',
                        },
                        {
                            path: 'dashboard', component: DashboardMainPageComponent,
                        },
                        {
                            path: 'admins',
                            loadChildren: () => import('./main/modules/administrators/admins-routing.module').then((m) => m.AdminsRoutingModule),
                        },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () => import('./main/components/auth/auth-routing.module').then((m) => m.AuthRoutingModule),
                },
                { path: 'notfound', component: NotfoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }
