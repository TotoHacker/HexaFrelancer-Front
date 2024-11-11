import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { CKEditorComponent, CKEditorModule } from '@ckeditor/ckeditor5-angular';
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

import { CardModule } from 'primeng/card';
import { ToastService } from 'src/app/main/services/toast.service';
import { PrimeNgModule } from 'src/app/primeng.module';

import { BlogEntry, BlogTag } from '../../models/blog-models.model';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { BlogService } from '../../services/blog.service';
import { firstValueFrom } from 'rxjs';
import { MediaService } from 'src/app/layout/service/media/media.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    standalone: true,
    imports: [
        CardModule,
        FormsModule,
        PrimeNgModule,
        CommonModule,
        CKEditorModule,
        ReactiveFormsModule,
    ],
    selector: 'app-blog-new',
    templateUrl: './blog-new.component.html',
    styles: [
        `
            .custom-chip {
                border: 1px solid #ccc;
                border-radius: 22px;
                padding: 0.5em 1.2em;
                font-size: 0.9rem;
                color: #333;
                background-color: #f4f4f4;
                transition: background-color 0.3s, color 0.3s, border-color 0.3s;
                cursor: pointer;

                &.custom-chip:hover {
                    background-color: #004cac;
                    color: #fff;
                }

                &.custom-chip-selected {
                    background-color: #004cac;
                    color: #fff;
                    border-color: #004cac;
                    .remove-tag-button {
                     background-color: white;
                     color:red;
                    }
                }

                .remove-tag-button {
                 font-size: 1rem;
                 width: 1.6rem;
                 height: 1.6rem;
                 padding: 0;

                 display: flex;
                 align-items: center;
                 justify-content: center;
                 border-radius: 30px;
                 background-color: #e83e3e;
                 color:white;
                }


            }

            .is-invalid {
                border-color: red;
            }

            .text-red-500 {
                color: red;
            }

            .animated-button {
                transition: background-color 0.3s, transform 0.3s,
                    box-shadow 0.3s;
            }

            .animated-button:hover {
                background-color: #d4d4d4;
                transform: scale(1.1);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }

            .image-preview {
                margin-top: 10px;
                text-align: center;
            }

            .preview-img {
                max-width: 50%;
                height: auto;
                border: 1px solid #ddd;
                border-radius: 4px;
                padding: 5px;
                background-color: #f9f9f9;
            }

            .plain-input {
                /* Estilos para el input sin PrimeNG */
                border: 1px solid #ccc;
                padding: 10px;
                border-radius: 10px;
                font-size: 16px;
                width: 300px;
            }

            .plain-button {

                background-color: #004cac;
                color: #fff;
                border: 1px solid #ccc;
                border-radius: 10px;
                padding: 10px 20px;
                font-size: 15px;
                cursor: pointer;
            }



        `,
    ],
    providers: [MessageService],
})
export class BlogNewComponent implements OnInit {
    deleteBlogEntry() {
        throw new Error('Method not implemented.');
    }
    @ViewChild('fileUpload') fileUpload: FileUpload;
    estado: string = '';
    visibilidad: string = 'Público';
    // selectedTag: string = 'CardioTrack';
    public tags: Array<BlogTag> = [];
    selectedTag: string = 'CardioTrack';
    newTag: string = '';
    metaTitle: string = '';
    metaDescription: string = '';
    blogTitle: string = '';
    blogAutor: string = '';
    portada: File | null = null;
    public content: any;
    public products: any;

    public Editor = ClassicEditor;

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

    public entryForm: FormGroup;

    blogContent: '';

    /////
    public isLoading: boolean = true;
    public isSending: boolean = false;
    private entryId: string = '';
    public entry: any;
    public isEditing: boolean = false;

    public images_files: File[] = [];
    public actualImages: any[] = [];
    selectedImage: File[] = [];
    uploadedImagePath: any;
    blogId: string;
    public images: File[] = [];
    imageUrl: string | ArrayBuffer | null = null;
    tagForm: FormGroup;

    constructor(
        private toastService: ToastService,
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        public blogService: BlogService,
        private fb: FormBuilder,
        private mediaService: MediaService,
        private messageService: MessageService,
        private cdRef: ChangeDetectorRef,
        private confirmationService: ConfirmationService
    ) {
        this.entryForm = this.fb.group({
            blogTitle: ['', Validators.required],
            blogContent: ['', Validators.required],
            blogAutor: [''],
            state: ['Publicado'],
            visibility: ['Público'],
            tags: [''],
            image: [''],
            metaTitle: ['', [Validators.maxLength(60)]],
            metaDescription: ['', [Validators.maxLength(160)]],
        });

        this.tagForm = this.formBuilder.group({
            tag: new FormControl('', Validators.required),
        });
    }
    async ngOnInit(): Promise<void> {
        await this.checkIfIsUpdate();
        this.getTags();
    }

    /*  selectTag(tag: string) {
        this.selectedTag = tag;
        this.entryForm.get('tags')?.setValue(this.selectedTag);
    }*/

        selectTag(tag: string): void {
            const selectedTags = this.entryForm.get('tags')?.value || [];

            if (selectedTags.includes(tag)) {
                this.entryForm.get('tags')?.setValue(selectedTags.filter((t: string) => t !== tag));
            } else {
                this.entryForm.get('tags')?.setValue([...selectedTags, tag]);
            }
            // console.log('Las etiquetas seleccionadas son: ', this.entryForm.get('tags')?.value);
        }

    toggleEstado() {
        this.estado = this.estado === 'Borrador' ? 'Publicado' : 'Borrador';
        this.entryForm.get('state')?.setValue(this.estado);
    }

    toggleVisibilidad() {
        this.visibilidad =
            this.visibilidad === 'Privado' ? 'Público' : 'Privado';
        this.entryForm.get('visibility')?.setValue(this.visibilidad);
    }

    async checkIfIsUpdate() {
        this.route.url.subscribe(async (urlSegments) => {
            const urlPath = urlSegments
                .map((segment) => segment.path)
                .join('/');
            if (urlPath.includes('update')) {
                this.entryId =
                    this.route.snapshot.paramMap.get('entryId') ?? '';
                this.isEditing = true;
                await this.getBlogEntryById(this.entryId);
            } else {
            }
        });
    }

    async getBlogEntryById(entryId: string) {
        try {
            let response = await this.blogService.getBlogEntryById(entryId);
            this.entry = response.data;
            this.imageUrl = response.data.image;

            this.selectedTag = response.data.tags;


            this.entryForm.patchValue(response.data);
        } catch (error) {
            console.log(error);
            this.toastService.showError(
                'error',
                'Se produjo un error al buscar la publicación.'
            );
        }
    }

    async updateBlogEntry(): Promise<void> {
        try {
            this.isSending = true;

            let formEstate = { ...this.entryForm.value };

            if (this.images_files && this.images_files.length > 0) {
                formEstate.image = await this.mediaService.createList(
                    this.images_files,
                    '',
                    'blogs'
                );
            } else {
                delete formEstate.image;
            }

            let response = await this.blogService.updateBlogEntry(
                formEstate,
                this.entryId
            );

            if (response?.status == 200) {
                this.isSending = false;
                this.toastService.showSuccess(
                    'Actualizado Éxitosamente',
                    'Publicación actualizada correctamente!'
                );
                this.router.navigate(['/blog/list']);
            }
        } catch (error) {
            console.log(error);
            this.isSending = false;
            this.toastService.showError(
                'error',
                'Se produjo un error al actualizar la publicación.'
            );
        } finally {
            this.isSending = false;
        }
    }

    async createBlogEntry() {
        console.log('Creando Blog');
        try {
            this.isSending = true;

            //
            if (this.selectedImage) {
                //

                let formEstate = this.entryForm.value;
                formEstate.image = await this.mediaService.createList(
                    this.images_files,
                    '',
                    'blogs'
                );
            }

            //
            const response = await this.blogService.createBlogEntry(
                this.entryForm.value
            );

            if (response?.status === 200) {
                this.toastService.showSuccess(
                    'Blog Publicado',
                    '¡Publicación creada exitosamente!'
                );
                this.router.navigate(['/blog/list']);
                setTimeout(() => {
                    this.resetForm();
                }, 1000);
            }
        } catch (error) {
            console.error('Error al crear la publicación:', error);
            this.toastService.showError(
                'Error',
                'Se produjo un error al crear la publicación.'
            );
        } finally {
            this.isSending = false;
        }
    }

    //
    saveBlogEntry(): void {
        if (this.isEditing) {
            this.updateBlogEntry();
        } else {
            this.createBlogEntry();
        }
    }

    uploadImages(file: File): Promise<string> {
        return this.blogService.uploadImage(file);
    }

    async handleImageUpload(file: File): Promise<string> {
        try {
            //
            const uploadedImageUrl = await this.uploadImages(file);
            return uploadedImageUrl;
        } catch (error) {
            console.error('Error al manejar la selección de imagen:', error);
            throw error;
        }
    }

    resetForm(): void {
        this.entryForm.reset({
            state: 'Borrador',
            visibility: 'Público',
        });
        this.selectedTag = 'CardioTrack';
        this.portada = null;
        this.images_files = [];
        this.imageUrl = '';
        this.fileUpload.clear();
        this.router.navigate(['/blog/list']);
    }

    onSelectImages(event: any) {
        console.log('Event:', event);

        if (event.currentFiles && event.currentFiles.length > 0) {
            if (event.currentFiles.length > 1) {
                this.toastService.showWarn(
                    'warning',
                    'El número máximo de imágenes es 1.'
                );
                return;
            }

            //
            this.images_files = [...event.currentFiles];
            console.log('Selected Files:', this.images_files);

            //
            const file = this.images_files[0];
            console.log('File Details:', file);

            if (file) {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.imageUrl = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        } else {
            //
            this.toastService.showWarn(
                'warning',
                'No se seleccionó ninguna imagen.'
            );
        }
    }

    //TAGS

    async getTags() {
        try {
            let response = await this.blogService.getAllTags();
            this.tags = response;
        } catch (error: any) {
            this.tags = [];
            console.log(error);
        }
    }

    confirmRemoveTag(tag: string, tagname: string): void {
        this.confirmationService.confirm({
            message: `¿Estás seguro de que quieres eliminar la etiqueta "${tagname}"?`,
            header: 'Confirmar eliminación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Si',
            rejectLabel: 'No',
            accept: () => {
                this.removeTag(tag);
            },
            reject: () => {
                this.messageService.add({
                    severity: 'info',
                    summary: 'Cancelado',
                    detail: 'La etiqueta no se eliminó.',
                });
            },
        });
    }

    async removeTag(tag: string): Promise<void> {
        try {
            //
            await this.blogService.deleteBlogTag(tag);
            await this.getTags();
            this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Etiqueta eliminada correctamente.',
            });
        } catch (error) {
            console.error('Error al eliminar la categoría:', error);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Se produjo un error al eliminar la categoría.',
            });
        }
    }

    async createTag(): Promise<void> {
        if (this.tagForm.invalid) {
            this.toastService.showError(
                'Error',
                'La etiqueta no puede estar vacía.'
            );
            return;
        }

        const tagValue = this.tagForm.value.tag.trim();

        this.isLoading = true;

        try {
            await this.blogService.createBlogTag({ tag: tagValue });
            console.info('Tag Value', tagValue);
            this.selectedTag = tagValue;
            this.toastService.showSuccess('Etiqueta creada correctamente');

            this.tagForm.reset();
        } catch (error) {
            console.error('Error al crear la etiqueta:', error);
            this.toastService.showError(
                'Ocurrió un error',
                'Favor de intentarlo nuevamente'
            );
        } finally {
            this.isLoading = false;
            this.getTags();
        }
    }
}
