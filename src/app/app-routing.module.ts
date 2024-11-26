import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './main/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { DashboardMainPageComponent } from './main/modules/dashboard/pages/dashboard-main-page/dashboard-main-page.component';
import { LoginComponent } from './main/components/auth/login/login.component';
import { SingUpComponent } from './main/components/auth/sing-up/sing-up.component';
import { single } from 'rxjs';
import { ProyectsRoutingModule } from './main/modules/proyects/proyects-routing.module';
import { ProyectDetailsComponent } from './main/modules/proyects/pages/proyect-details/proyect-details.component';
import { ProyectFormComponent } from './main/modules/proyects/pages/proyect-form/proyect-form.component';
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
                            path: '', redirectTo: 'login', pathMatch: 'full',
                        },
                        {
                            path: 'dashboard', component: DashboardMainPageComponent,
                        },
                        {
                            path: 'admins',
                            loadChildren: () => import('./main/modules/administrators/admins-routing.module').then((m) => m.AdminsRoutingModule),
                        },
                        {
                            path: 'proyects',
                            loadChildren: () => import('./main/modules/proyects/proyects-routing.module').then((m) => m.ProyectsRoutingModule),
                        },

                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () => import('./main/components/auth/auth-routing.module').then((m) => m.AuthRoutingModule),
                },
                { path: 'notfound', component: NotfoundComponent },
                { path: 'login', component: LoginComponent },
                { path: 'sing-up', component: SingUpComponent },

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
