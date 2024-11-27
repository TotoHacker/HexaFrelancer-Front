import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/layout/service/login.service'; 

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
  ],
  providers: [DialogService],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `,
  ],
})
export class LoginComponent {
  valCheck: string[] = ['remember'];
  password!: string;

  public loginForm: FormGroup;
  public loader = false;
  public msgs: any[] = [];
  public showMessages = true;

  private readonly LOGIN_API = `${environment.URL_API}/users/login`;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public dialogService: DialogService,
    private loginService: LoginService // Inyectamos el servicio de login
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,6}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public async submitForm(event: Event) {
    event.preventDefault(); // Evitar que se recargue la página

    try {
      this.loader = true;
      this.msgs = [];

      if (this.loginForm.invalid) {
        this.loginForm.markAllAsTouched();
        this.showErrorViaMessages('Por favor, verifica tus datos.');
        return;
      }

      const { email, password } = this.loginForm.value;

      // Usar el servicio para realizar el login
      await this.loginService.login(email, password);

      // Si el login es exitoso, redirigir a dashboard
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      this.showErrorViaMessages(error.message || 'Ocurrió un error inesperado. Intenta nuevamente.');
    } finally {
      this.loader = false;
    }
  }

  showErrorViaMessages(message: string) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error', detail: message });
  }

  recoverPassword() {
    this.showMessages = false;
    const dialogRef = this.dialogService.open(null, {
      header: 'Recuperar contraseña',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });

    dialogRef.onClose.subscribe(() => {
      this.msgs = [];
      this.showMessages = true;
    });
  }
}
