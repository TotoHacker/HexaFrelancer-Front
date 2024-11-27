import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastService } from 'src/app/main/services/toast.service';

interface CustomImage {
    file: File;
    image: string;
}

@Component({
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        InputMaskModule,
        ButtonModule,
        ProgressSpinnerModule,
        FileUploadModule,
        AvatarModule,
    ],
    selector: 'app-new-profile-modal',
    templateUrl: './new-profile-modal.component.html',
    styles: [
        ` 
        ::ng-deep .p-progress-spinner {
            width: 40px !important;
            height: 40px !important;
        }

        ::ng-deep #uploadBtn .p-button .p-button-icon-left {
            display: none;
        }

        ::ng-deep #uploadBtn .p-button {
            padding: 0;
            font-size: 12px;
            color: var(--primary);
            background-color: white;
            border: none;
        }

        ::ng-deep #uploadBtn .p-button :hover {
            padding: 0;
            font-size: 12px;
            color: var(--primary);
            background-color: white;
            border: none;
        }
        `
    ]
})
export class NewProfileModalComponent implements OnInit {

    public isLoading = false;
    public loadingInfo: boolean = false; // Definido para gestionar el estado de carga
    public user: any; // Propiedad para almacenar la información del usuario
    public form: FormGroup;
    public tmpImage?: CustomImage;
    public oldImage?: string;

    constructor(
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        public ref: DynamicDialogRef
    ) {
        this.form = this.formBuilder.group({
            name: new FormControl('', Validators.required),
            email: [
                '',
                [
                    Validators.required,
                    Validators.pattern(
                        '^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,6}$'
                    ),
                ],
            ],
            phone: new FormControl(''),
        });
    }

    ngOnInit(): void {
        this.loadUserProfile();
    }

    loadUserProfile(): void {
        this.loadingInfo = true; // Empieza la simulación de carga

        // Simula datos de usuario cargados
        const mockUser = {
            name: 'John Doe',
            email: 'johndoe@example.com',
            phone: '1234567890',
            photoURL: 'https://via.placeholder.com/150',
        };

        this.user = mockUser; // Asigna los datos del usuario
        this.oldImage = mockUser.photoURL;
        this.form.patchValue(mockUser);

        this.loadingInfo = false; // Finaliza la simulación de carga
    }

    validateForm(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.updateProfile();
    }

    updateProfile(): void {
        try {
            this.isLoading = true;
            const formValues = this.form.value;

            // Simula el guardado del perfil
            console.log('Perfil actualizado:', formValues);

            // Simula una notificación de éxito
            this.toastService.showSuccess('Información actualizada correctamente');
            this.isLoading = false;
            this.ref.close(true);
        } catch (error) {
            this.isLoading = false;
            this.toastService.showError('Ocurrió un error', 'Favor de intentarlo nuevamente');
            console.log(error);
        }
    }

    onUpload($event: any): void {
        const file: File = $event.files[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
            // Set image src
            this.tmpImage = { file, image: e.target.result };
        };
        reader.readAsDataURL(file);
    }
}
