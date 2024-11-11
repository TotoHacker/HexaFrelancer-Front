import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ToastService } from 'src/app/main/services/toast.service';
import { PrimeNgModule } from 'src/app/primeng.module';
import { BlogService } from '../../services/blog.service';
import { BlogEntry } from '../../models/blog-models.model';
import { Table } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    standalone: true,
    imports: [CommonModule, CardModule, PrimeNgModule, ConfirmDialogModule],
    providers: [DialogService, ConfirmationService],
    selector: 'app-blog-list',
    templateUrl: './blog-list.component.html',
    styles: [
        `
            .box {
                padding: 10px;
                border-radius: 8px;
                height: fit-content;
                width: fit-content;
                color: white;
                display: flex;
                align-items: center;
                gap: 8px;

                &.Borrador {
                    background-color: var(--gray-500);
                }

                &.Publicado {
                    background-color: var(--green-600);
                }

                &.Público {
                    background-color: var(--green-600);
                }

                &.Privado {
                    background-color: var(--gray-500);
                }
            }
        `,
    ],
})
export class BlogListComponent implements OnInit {
    productDialog: any;
    selectedProducts: any;
    products: any;
    confirmDialog: any;
    searchTerm: string = '';
    // blogEntries: BlogEntry[] = [];
    public blogEntries: Array<BlogEntry> = [];
    public recentBlogs: Array<BlogEntry> = [];
    public loader: boolean = true;

    statuses = [
        { label: 'Publicado', value: 'Publicado' },
        { label: 'Borrador', value: 'Borrador' }
      ];
      visibilityOptions = [
        { label: 'Público', value: 'public' },
        { label: 'Privado', value: 'private' }
      ];

      statusOptions: any[] = [
        { label: 'Borrador', value: 'Borrador' },
        { label: 'Publicado', value: 'Publicado' },
      
    ];

    selectedStatus: string;


    constructor(
        private toastService: ToastService,
        private router: Router,
        public blogService: BlogService,
        private confirmationService: ConfirmationService,
        public dialogService: DialogService,
        private primengConfig: PrimeNGConfig
    ) {}

    ngOnInit(): void {
        this.getBlogEntries();

        this.primengConfig.setTranslation({
            startsWith: "Empieza con",
            contains: "Contiene",
            notContains: "No contiene",
            endsWith: "Termina con",
            equals: "Igual a",
            notEquals: "No igual a",
            lt: "Menor que",
            lte: "Menor o igual que",
            gt: "Mayor que",
            gte: "Mayor o igual que",
            is: "Es",
            isNot: "No es",
            before: "Antes",
            after: "Después",
            dateIs: "La fecha es",
            dateIsNot: "La fecha no es",
            dateBefore: "Fecha anterior",
            dateAfter: "Fecha posterior",
            clear: "Limpiar",
            apply: "Aplicar",
            matchAll: "Coincidir con todo",
            matchAny: "Coincidir con alguno",
            addRule: "Añadir regla",
            removeRule: "Eliminar regla",
            accept: "Aceptar",
            reject: "Rechazar",
            choose: "Elegir",
            upload: "Subir",
            cancel: "Cancelar",
            dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
            dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
            monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
            today: "Hoy",
            weekHeader: "Sm",
            firstDayOfWeek: 1,
            dateFormat: "dd/mm/yy",
            weak: "Débil",
            medium: "Medio",
            strong: "Fuerte",
            passwordPrompt: "Ingrese una contraseña",
            emptyFilterMessage: "No se encontraron resultados", 
            emptyMessage: "No hay opciones disponibles", 
          });
    }

  

    filterByStatus(filterCallback: Function): void {
        filterCallback(this.selectedStatus, 'equals'); 
      }

    getIconClass(state: string): string {
        switch (state) {
            case 'Publicado':
                return 'pi-check';
            case 'Público':
                return 'pi-eye';
            case 'Borrador':
                return 'pi-pencil';
            case 'Revisar':
                return 'pi-exclamation-triangle';
            case 'Privado':
                return 'pi-eye-slash';
            default:
                return 'pi-times-circle';
        }
    }

 

    async getBlogEntries(): Promise<void> {
        try {
            const response = await this.blogService.getBlogEntries();
            this.blogEntries = response;

            // Filtrar y obtener los tres blogs más recientes
            this.recentBlogs = this.blogEntries
                .sort(
                    (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                ) // Ordenar por fecha descendente
                .slice(0, 3); 

            console.info('recentBlogs ', this.recentBlogs);
        } catch (error) {
            console.log(error);
            this.toastService.showError(
                'Error',
                'Ocurrió un problema al realizar la consulta'
            );
        } finally {
            this.loader = false;
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

   


    getSeverity(status: string): string {
        //
        return status === 'active' ? 'success' : 'danger';
      }

    openArticleForm(entryId: string) {
        this.router.navigate(['blog/update/' + entryId]);
    }

    async confirmDelete(id: string) {
        this.confirmationService.confirm({
            key: 'blog-confirm-dialog',
            header: 'Confirmación',
            message: '¿Está seguro que desea eliminar este blog?',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            rejectButtonStyleClass: 'p-button-text p-button-text',
            acceptIcon: 'none',
            rejectIcon: 'none',
            acceptLabel: 'Sí',
            rejectLabel: 'No',

            accept: async () => {
                try {
                    this.loader = true;
                    await this.blogService.deleteBlogEntry(id);
                    await this.getBlogEntries();
                    this.toastService.showSuccess(
                        'Blog eliminado correctamente'
                    );
                } catch (error) {
                    console.log(error);
                    this.toastService.showError(
                        'Ocurrió un error',
                        'Favor de intentarlo nuevamente'
                    );
                } finally {
                    this.loader = false;
                }
            },
        });
    }
}
