import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  ok = false;

  constructor(
    public router: Router
  ) {}

  canActivate() {
    if (this.ok) {
      return true;
    } else {
      this.router.navigate(['/inicio']);
      return false;
    }
  }
}
