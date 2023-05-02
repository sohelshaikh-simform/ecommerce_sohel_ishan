import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  username = '';
  age = 14;
  role = null;
  loading = false;
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.errorMessage = '';
    if (this.fullName && this.password && this.username && this.email && this.confirmPassword) {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords need to match';
      } else {
        this.loading = true;
        this._auth
          .register({
            fullName: this.fullName,
            username: this.username,
            email: this.email,
            password: this.password,
            age: this.age,
            role: this.role
          })
          .subscribe(
            (res) => {
              console.log(res);
              this.loading = false;
              this._router.navigate(['/login']);
            },
            (err) => {
              this.errorMessage = err.error.message;
              this.loading = false;
            }
          );
      }
    } else {
      this.errorMessage = 'Make sure to fill everything ;)';
    }
  }

  canSubmit(): boolean {
    console.log(this.role)
    return this.fullName && this.password && this.username && this.email && this.confirmPassword
      ? true
      : false;
  }
}
