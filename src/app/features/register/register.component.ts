import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  ngOnInit(): void {}

  submit(): void {
    const email = this.registerForm.controls.username.value;
    const password = this.registerForm.controls.password.value;
    this.authService.register({ email, password }).subscribe(() => {
      this.authService.login({ email, password }).subscribe(() => {
        this.router.navigateByUrl('/home');
      });
    });
    console.log(email, password);
  }
}
