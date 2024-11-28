import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { RatingModule } from 'primeng/rating';
import { ToastService } from 'src/app/main/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectService } from '../../services/proyects.service';

@Component({
    selector: 'app-proyect-details',
    standalone: true,
    imports: [
        CardModule,
        ButtonModule,
        ScrollPanelModule,
        RatingModule
    ],
    templateUrl: './proyect-details.component.html',
    styleUrl: './proyect-details.component.scss',
    animations: [
        trigger('enterAnimation', [
            transition(':enter', [
                style({ transform: 'translateY(-50%)', opacity: 0 }),
                animate(
                    '150ms',
                    style({ transform: 'translateY(0)', opacity: 1 })
                ),
            ]),
            transition(':leave', [
                style({ transform: 'translateY(0)', opacity: 1 }),
                animate(
                    '150ms',
                    style({ transform: 'translateY(-50%)', opacity: 0 })
                ),
            ]),
        ]),
    ],
})

export class ProyectDetailsComponent {
    value!: number;
    public animation: boolean = false;

    public projectId: any = '';
    public project: any;

    constructor(
        private toastService: ToastService,
        private projectService: ProyectService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.checkIfIsUpdate();

    }

    async checkIfIsUpdate() {
        this.route.url.subscribe(async (urlSegments) => {
            const urlPath = urlSegments
                .map((segment) => segment.path).join('/');
            this.projectId = this.route.snapshot.paramMap.get('id') ?? '';
            console.log(this.projectId);
            await this.getProjectById(this.projectId);
        });
    }

    async getProjectById(projectId: string) {
        try {
            let response = await this.projectService.getProyectEntryById(projectId);
            console.log(response);

            this.project = response;
        } catch (error) {
            console.log(error);
            this.toastService.showError('error', 'Se produjo un error al buscar el projecte.');
        }
    }

}
