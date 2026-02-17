import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth'; 

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './reset-password.html',
  styleUrls: ['./reset-password.css']
})
export class ResetPassword {

  resetPasswordForm = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    nuevaPassword: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmarPassword: new FormControl('', [Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  // Validar que las contraseñas coincidan
  get passwordsMatch() {
    return this.resetPasswordForm.get('nuevaPassword')?.value === this.resetPasswordForm.get('confirmarPassword')?.value;
  }

  // Llamar al servicio para hacer el cambio de contraseña
  onSubmit() {
    if (this.resetPasswordForm.valid && this.passwordsMatch) {
      const { correo, nuevaPassword } = this.resetPasswordForm.value;

      this.authService.resetPassword(correo!, nuevaPassword!).subscribe({
        next: () => {
          this.snackBar.open('Contraseña cambiada correctamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.snackBar.open(err.error?.message || 'Error', 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Las contraseñas no coinciden', 'Cerrar', { duration: 3000 });
    }
  }
}