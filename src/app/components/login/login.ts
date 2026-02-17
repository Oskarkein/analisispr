import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; 
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, 
    RouterLink, MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  hide = true; 

  loginForm = new FormGroup({
    usuarioOrCorreo: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(
    private router: Router, 
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  onLogin() {
    if (this.loginForm.valid) {
      // Enviamos el objeto { usuarioOrCorreo, password } al servicio
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          // El backend devuelve id, usuario, nombre, rol y token
          console.log('Login exitoso:', res);
          
          // Guardamos el token (aunque venga vacío por ahora)
          localStorage.setItem('token', res.token);
          
          this.snackBar.open(`¡Bienvenido ${res.nombre}!`, 'Cerrar', { duration: 3000 });
          
          // Redirigimos al inicio de la app
          this.router.navigate(['/home']); 
        },
        error: (err) => {
          console.error('Error en login:', err);
          // Capturamos el "Login fallido" o "Credenciales incorrectas" del Back
          const errorMsg = err.error?.message || 'Error al conectar con el servidor';
          this.snackBar.open(`${errorMsg}`, 'Reintentar', { duration: 5000 });
        }
      });
    }
  }
}