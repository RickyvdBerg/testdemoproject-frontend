import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  authenticated$: Observable<boolean>;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.authenticated$ = authService.isAuthenticated();
  }
  ngOnInit(): void {}

  submit(): void {
    const email = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;
    this.authService.login({ email, password }, true).subscribe(() => {
      this.router.navigateByUrl('/home');
    });
  }
}
