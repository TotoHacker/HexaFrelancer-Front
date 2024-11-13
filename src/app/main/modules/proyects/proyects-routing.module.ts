import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProyectsMainPageComponent } from './pages/proyects-main-page/proyects-main-page.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'list', component: ProyectsMainPageComponent },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class ProyectsRoutingModule { }
