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
import { Usuario } from '../../Interfaces/userDTO';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, 
    RouterLink, MatCardModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule
  ],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroComponent {
  hide = true; 

  registroForm = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    telefono: new FormControl('', [Validators.required]),

    idRol: new FormControl(2, [Validators.required]) 
  });


  constructor(
    private router: Router, 
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  onRegistrar() {
    if (this.registroForm.valid) {

      const nuevoUsuario = this.registroForm.value as Usuario;

      // Llamada real al backend a través del servicio
      this.authService.registrar(nuevoUsuario).subscribe({
        next: (res) => {
          console.log('Respuesta backend:', res);
          this.snackBar.open(res.message, 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });

          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          console.error('Error al registrar:', err);

          const errorMsg = err.error?.message || 'Error en el servidor';
          this.snackBar.open(errorMsg, 'Entendido', { duration: 5000 });
        }
      });
      
    } else {
      this.snackBar.open('Por favor, llena todos los campos correctamente', 'Entendido');
    }
  }

  getErrorMessage(controlName: string) {
    const control = this.registroForm.get(controlName);
    if (control?.hasError('required')) return 'Este campo es obligatorio';
    if (control?.hasError('email')) return 'Correo no válido';
    if (control?.hasError('minlength')) return 'Mínimo 4 caracteres';
    return '';
  }
}