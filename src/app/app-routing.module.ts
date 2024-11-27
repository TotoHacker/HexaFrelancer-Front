import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NotfoundComponent } from './main/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { DashboardMainPageComponent } from './main/modules/dashboard/pages/dashboard-main-page/dashboard-main-page.component';
import { LoginComponent } from './main/components/auth/login/login.component';
import { SingUpComponent } from './main/components/auth/sing-up/sing-up.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                // Ruta principal redirige al LoginComponent
                {
                    path: '',
                    component: LoginComponent,
                },
                // Rutas protegidas detrás del layout principal
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: 'dashboard',
                            component: DashboardMainPageComponent,
                        },
                        {
                            path: 'admins',
                            loadChildren: () =>
                                import('./main/modules/administrators/admins-routing.module').then((m) => m.AdminsRoutingModule),
                        },
                        {
                            path: 'proyects',
                            loadChildren: () =>
                                import('./main/modules/proyects/proyects-routing.module').then((m) => m.ProyectsRoutingModule),
                        },
                    ],
                },
                // Módulo de autenticación con carga diferida
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./main/components/auth/auth-routing.module').then((m) => m.AuthRoutingModule),
                },
                // Ruta adicional para registro de usuarios
                { path: 'sing-up', component: SingUpComponent },
                // Página de "No encontrado"
                { path: 'notfound', component: NotfoundComponent },
                // Redirección para rutas no válidas
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
export class AppRoutingModule {}
