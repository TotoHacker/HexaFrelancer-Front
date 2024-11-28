import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { ToastService } from 'src/app/main/services/toast.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BlogEntry } from '../../../blog/models/blog-models.model';
import { PrimeNgModule } from 'src/app/primeng.module';
import { ChartModule } from 'primeng/chart';
import { CarouselModule } from 'primeng/carousel';
import { ProyectService } from '../../../proyects/services/proyects.service';

@Component({
    standalone: true,
    imports: [
        CardModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        BreadcrumbModule,
        TableModule,
        ButtonModule,
        PrimeNgModule,
        ChartModule,
        CarouselModule,
    ],
    selector: 'app-dashboard-main-page',
    templateUrl: './dashboard-main-page.component.html',
})
export class DashboardMainPageComponent implements OnInit {

    public currentUser: any | null = {
        displayName: 'Josué',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/cocity-loft.appspot.com/o/clients%2F98a6u3xynd7.jpeg?alt=media&token=73c217a9-6805-4465-bbae-121873353d60',
    };

    public loader: boolean = true;

    constructor(
        private toastService: ToastService,
        private router: Router,
        public proyectService: ProyectService,
    ) { }

    proyects: any[] = [];

    responsiveOptions: any[] = [
        {
            breakpoint: '1199px',
            numVisible: 1,
            numScroll: 1
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];;

    ngOnInit() {
        this.getProyects();
    }

    async getProyects(): Promise<void> {
        try {
            let response = await this.proyectService.getProyectEntries();
            console.log(response);
            this.proyects = response;
        } catch (error) {
            console.log(error);
            this.toastService.showError('Error', 'Ocurrio un problema al realizar la consulta')
        } finally {
            this.loader = false;
        }
    }

    openAdminDetails(admin?: any) {
        this.router.navigate(['/proyects/proyectDetail/' + admin.project_id]);
    }
}
