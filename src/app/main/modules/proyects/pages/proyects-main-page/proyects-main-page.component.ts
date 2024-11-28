import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { Admin } from '../../../administrators/models/admin.model';
import { ToastService } from 'src/app/main/services/toast.service';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { AdminFormComponent } from '../../../administrators/pages/admin-form/admin-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProyectService } from '../../services/proyects.service';

@Component({
  selector: 'app-proyects-main-page',
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
    DynamicDialogModule,
    InputTextModule,
    ConfirmDialogModule,
],
providers: [DialogService, ConfirmationService],
  templateUrl: './proyects-main-page.component.html',
  styleUrl: './proyects-main-page.component.scss'
})
export class ProyectsMainPageComponent {

    public items: MenuItem[] | undefined;
    public loader: boolean = true;
    public proyects: Array<Admin> = [];

    constructor(
        private toastService: ToastService,
        public proyectService: ProyectService,
        public dialogService: DialogService,
        private confirmationService: ConfirmationService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.items = [{ icon: 'pi pi-home', route: '/' }, { label: 'Administradores', route: '/proyects/list' }];
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

    async confirmDelete(admin: Admin) {
        console.log('xd');
        this.confirmationService.confirm({
            key: "admin-confirm-dialog",
            header: "Confirmación",
            message: '¿Está seguro que desea eliminar este administrador?',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: "p-button-danger p-button-text",
            rejectButtonStyleClass: "p-button-text p-button-text",
            acceptIcon: "none",
            rejectIcon: "none",
            acceptLabel: "Sí",
            rejectLabel: "No",

            accept: async () => {
                try {
                    this.loader = true;
                    // await this.logDeleteAdmin(admin._id!, this.currentUser);
                    await this.proyectService.deleteProyectEntry(admin.uid!);
                    await this.getProyects();
                    this.toastService.showSuccess('Administrador eliminado correctamente');
                } catch (error) {
                    console.log(error);
                    this.toastService.showError('Ocurrió un error', "Favor de intentarlo nuevamente");
                } finally {
                    this.loader = false;
                }
            },
        });

    }

    openAdminForm(admin?: any) {
        this.router.navigate(['/proyects/list']);

    }

    openAdminDetails(admin?: any) {
        this.router.navigate(['/proyects/proyectDetail/' + admin.project_id]);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

}
