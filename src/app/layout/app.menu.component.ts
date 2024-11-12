import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/dashboard'],
                    },
                ],
            },
            {
                label: 'Proyecto',
                items: [
                    {
                        label: 'Administradores',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/admins/list'],
                    },

                ],
            },
            {
                label: 'Terapeutas',
                items: [
                    {
                        label: 'Terapeutas',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/therapist/list'],
                    },

                ],
            },
            {
                label: 'Horario del terapeuta',
                items: [
                    {
                        label: 'Lista de horarios',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/appointments/list'],

                    },
                    // {
                    //     label: 'Agregar horario',
                    //     icon: 'pi pi-fw pi-plus',
                    //     routerLink: ['/appointments/new'],
                    // },

                ],
            },
            {
                label: 'Usuarios',
                items: [
                    {
                        label: 'Usuarios',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/users/list'],
                    },

                ],
            },
            {
                label: 'BLOG',
                items: [
                    {
                        label: 'Blogs',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/blog/list'],

                    },
                    {
                        label: 'Nuevo blog',
                        icon: 'pi pi-fw pi-plus',
                        routerLink: ['/blog/new'],
                    },

                ],
            },
        ];
    }
}
