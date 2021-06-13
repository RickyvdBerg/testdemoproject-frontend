import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  authenticated$: Observable<boolean>;

  constructor(private authService: AuthenticationService) {
    this.authenticated$ = authService.isAuthenticated();
  }

  ngOnInit(): void {
  }
  logout() {
    this.authService.logout()
  }
}
