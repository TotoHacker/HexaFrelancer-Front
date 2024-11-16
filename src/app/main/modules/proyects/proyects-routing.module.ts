import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProyectsMainPageComponent } from './pages/proyects-main-page/proyects-main-page.component';
import { ProyectFormComponent } from './pages/proyect-form/proyect-form.component';
import { ProyectDetailsComponent } from './pages/proyect-details/proyect-details.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'list', component: ProyectsMainPageComponent },
            { path: 'new', component: ProyectFormComponent },
            { path: 'proyectDetail', component: ProyectDetailsComponent },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class ProyectsRoutingModule { }
