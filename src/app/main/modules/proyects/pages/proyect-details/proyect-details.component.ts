import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { RatingModule } from 'primeng/rating';

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

}
