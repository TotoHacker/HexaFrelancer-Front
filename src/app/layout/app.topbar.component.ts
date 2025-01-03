import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { LoginService } from './service/login.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { NewProfileModalComponent } from '../main/components/auth/login/new-profile-modal/new-profile-modal.component';
import { Router } from '@angular/router';
import { ProyectService } from '../main/modules/proyects/services/proyects.service';
// import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styles: [
        `
        .layout-topbar-logo{
            display: flex;
            @media (min-width: 991px){
                display: none;
            }
        }
        `
    ]
})
export class AppTopBarComponent {

    members = [
        { name: 'Amy Elsner', image: 'amyelsner.png', email: 'amy@email.com', role: 'Owner' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png', email: 'bernardo@email.com', role: 'Editor' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png', email: 'ioni@email.com', role: 'Viewer' }
    ];

    public notificacion: any[];

    items!: MenuItem[];

    public currentUser: any | null = {
        displayName: 'Josué',
        photoURL: 'https://firebasestorage.googleapis.com/v0/b/cocity-loft.appspot.com/o/clients%2F98a6u3xynd7.jpeg?alt=media&token=73c217a9-6805-4465-bbae-121873353d60',
    };

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private loginService: LoginService,
        private confirmationService: ConfirmationService,
        public dialogService: DialogService,
        private router: Router,
        private serviceNotificacion: ProyectService,
        // private auth: AngularFireAuth,
    ) {
        // this.auth.authState.subscribe(async (auth) => {
        //     this.currentUser = auth;
        //     if (auth != null) {
        //         const token = await auth.getIdTokenResult()
        //     }
        // });
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    ngOnInit() {
        this.getNotificacion();
        this.items = [
            {
                label: 'Editar perfil',
                icon: 'pi pi-user-edit',
                command: () => {
                    this.openProfileModal();
                }
            },
            {
                label: 'Cerrar sesión',
                icon: 'pi pi-sign-out',
                command: () => {
                    this.logout();
                }
            },
        ];
    }

    async getNotificacion() {
        try {
            let response = await this.serviceNotificacion.getNotificacion();
            console.log(response);

            this.notificacion = response;
        } catch (error) {
            console.log(error);
        }
    }

    async logout() {
        this.confirmationService.confirm({
            key: "header-dialog",
            header: "Confirmación",
            message: '¿Estás seguro de que deseas cerrar la sesión?',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: "p-button-danger p-button-text",
            rejectButtonStyleClass: "p-button-text p-button-text",
            acceptIcon: "none",
            rejectIcon: "none",
            acceptLabel: "Sí",
            rejectLabel: "No",
            accept: async () => {
                // Redirigir a la ruta de login
                await this.router.navigate(['/login']);
            }
        });
    }

    openProfileModal() {
        const dialogRef = this.dialogService.open(NewProfileModalComponent, {
            header: "Editar información",
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
        });
        dialogRef.onClose.subscribe(async (reload: boolean) => {
            if (reload) {
                this.currentUser?.reload();
            }
        });
    }

}
