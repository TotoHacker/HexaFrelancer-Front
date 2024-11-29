import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ToastService } from 'src/app/main/services/toast.service';
import { MediaService } from 'src/app/layout/service/media/media.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { trigger, transition, style, animate } from '@angular/animations';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { MultiSelectModule } from 'primeng/multiselect';
import { AvatarModule } from 'primeng/avatar';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
    ClassicEditor,
    Bold,
    Essentials,
    Italic,
    Mention,
    Paragraph,
    Undo,
    BlockQuote,
    Strikethrough,
    Underline,
    List,
    Base64UploadAdapter,
    TableToolbar,
    MediaEmbed,
    ImageUpload,
    PasteFromOffice,
    Heading,
    Link,
    Table,
    SimpleUploadAdapter,
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    LinkImage,
    Alignment,
} from 'ckeditor5';
import { ProyectService } from '../../services/proyects.service';

interface CustomImage {
    file: File;
    image: string;
}

@Component({
    selector: 'app-proyect-form',
    standalone: true,
    imports: [
        CardModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
        InputTextModule,
        SelectButtonModule,
        ToggleButtonModule,
        DropdownModule,
        CalendarModule,
        IconFieldModule,
        InputIconModule,
        BreadcrumbModule,
        FileUploadModule,
        InputTextareaModule,
        ConfirmDialogModule,
        MultiSelectModule,
        AvatarModule,
        InputNumberModule,
        FloatLabelModule,
        CKEditorModule,
    ],
    providers: [ConfirmationService],
    templateUrl: './proyect-form.component.html',
    styleUrl: './proyect-form.component.scss',
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
export class ProyectFormComponent {
    public items: MenuItem[] | undefined;
    estado: string = '';
    public isSending: boolean = false;
    public isEditing: boolean = false;
    public animation: boolean = false;
    public Editor = ClassicEditor;

    public clientForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private service: ProyectService,
    ) {
        this.clientForm = this.fb.group({

            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,6}$'),],],
            mobilePhone: ['', Validators.required],
            academic: ['',],
            titleProyect: ['', Validators.required],
            price: ['', Validators.required],
            description: ['', Validators.required],
            front: ['', Validators.required],
            back: ['', Validators.required],
            db: ['', Validators.required],
            facebook: [[]],
            instagram: [[]],
            link: [[]],
            contentProyect: ['', Validators.required],
            state: ['Publicado'],
            visibility: ['Público'],
        });
    }

    getErrorMessage(controlName: string): string {
        const control = this.clientForm.get(controlName);
        if (control?.hasError('required')) {
            return 'Este campo es requerido';
        } else if (control?.hasError('minlength')) {
            return 'Ingresar al menos 10 dígitos';
        } else {
            return 'Invalido';
        }
    }

    validateNumber(event: KeyboardEvent) {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
        }
    }

    public editorConfig = {
        toolbar: [
            'undo',
            'redo',
            '|',
            'heading',
            '|',
            'importWord',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            '|',
            'link',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'alignment',
            '|',
            'outdent',
            'indent',
            '|',
            'insertImage',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            '|',
            'sourceEditing',
            '|',
            'removeFormat',
        ],
        plugins: [
            Essentials,
            Paragraph,
            Bold,
            Italic,
            Underline,
            Strikethrough,
            BlockQuote,
            Heading,
            Link,
            List,
            Image,
            ImageToolbar,
            ImageStyle,
            ImageUpload,
            ImageResize,
            Table,
            TableToolbar,
            MediaEmbed,
            PasteFromOffice,
            Alignment,
            SimpleUploadAdapter,
            Image,
            ImageToolbar,
            ImageCaption,
            ImageStyle,
            ImageResize,
            LinkImage,
            SimpleUploadAdapter,
            Base64UploadAdapter,
        ],
        alignment: {
            options: ['left', 'right', 'center', 'justify'],
        },

        //*
        image: {
            toolbar: [
                'imageTextAlternative',
                '|',
                'imageStyle:full',
                'imageStyle:block',
                'imageStyle:side',
                'imageStyle:wrapText',
                'imageStyle:breakText',
                '|',
                'imageResize',
                '|',
                'toggleImageCaption',
                'imageTextAlternative',
                '|',
                'linkImage',
                '|',
                'pageBreak',
            ],
            upload: {
                types: ['jpeg', 'png', 'jpg', 'gif'],
            },
        },

        language: 'es',
    };

    toggleEstado() {
        this.estado = this.estado === 'Borrador' ? 'Publicado' : 'Borrador';
        this.clientForm.get('state')?.setValue(this.estado);
    }

    async create() {
        try {

            let userId = localStorage.getItem('userId'); // Asume que 'userId' es la clave donde se guarda el ID del usuario
            console.log(userId);

            let form = this.clientForm.value;
            // const userId = localStorage.getItem('userId');
            const value = {
                user_id: null,
                title: form.titleProyect,
                description: form.description,
                budget: form.budget,
                status: 'Open',
                deadline: form.deadline,
            };

            let response = await this.service.createProyectEntry(value)

        } catch (error) {
            console.log(error);


        }
    }


}
