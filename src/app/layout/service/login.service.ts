import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs'; // Importación para manejar el cifrado de contraseñas
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly USERS_URL: string = `${environment.URL_API}/users`;
  private readonly RECOVERY_URL: string = `${environment.URL_API}/recovery`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Método para enviar el email de recuperación de contraseña
  async sendRecoveryEmail(email: string): Promise<any> {
    try {
      const response = await this.http.post<any>(this.RECOVERY_URL, { email }).toPromise();
      return response; 
    } catch (error) {
      console.error('Error enviando el correo de recuperación', error);
      throw new Error('Ocurrió un error al intentar enviar el correo de recuperación');
    }
  }

  // Método de login
  async login(email: string, password: string): Promise<void> {
    try {
      // Obtener todos los usuarios
      const users: any[] = await this.http.get<any[]>(this.USERS_URL).toPromise();

      // Buscar al usuario por email
      const user = users.find(u => u.email === email);

      if (!user) {
        throw new Error('Correo o contraseña incorrectos');
      }

      // Verificar la contraseña cifrada
      const passwordMatch = await bcrypt.compare(password, user.password); // Comparación segura con bcrypt
      if (!passwordMatch) {
        throw new Error('Correo o contraseña incorrectos');
      }

      // Mostrar los detalles del usuario en consola
      console.log('Usuario logueado:');
      console.log('ID:', user.user_id);
      console.log('Correo:', user.email);

      // Guardar el user_id en localStorage
      localStorage.setItem('userId', user.user_id.toString());

      // Redirigir al dashboard
      this.router.navigate(['dashboard']);
    } catch (error: any) {
      console.error('Error en el login', error);

      // Manejar errores
      let errorMessage = 'Ocurrió un error inesperado';
      if (error.message === 'Correo o contraseña incorrectos') {
        errorMessage = error.message;
      }
      throw new Error(errorMessage);
    }
  }

  // Método de logout
  logout(): void {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  // Verificar si el usuario está logueado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('userId');
  }

  // Obtener el ID del usuario autenticado
  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }
}
