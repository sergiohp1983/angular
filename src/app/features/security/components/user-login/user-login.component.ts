import { Component, OnInit, NgModule } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
}
)
export class UserLoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});

  signedUsers: any [] = [];

  loginObject: any = {
    userName: '',    
    password: ''
  }

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    
  }

    get userName(): AbstractControl {
      return this.loginForm.get('userName')!;
    }
  
    get password() : AbstractControl {
      return this.loginForm.get('password')!;
    }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', Validators.required]
    });    
  }


  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Simulate login request
      if (email === 'test@example.com' && password === 'password123') {
        this.snackBar.open('Login successful!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
      } else {
        this.snackBar.open('Invalid credentials.', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    }
  }
}
