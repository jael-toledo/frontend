import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';
import { UserResponse } from '@app/shared/models/user.interface';
import { Subject, Subscription, takeUntil } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isLogged = false
  private destroy$ = new Subject<any>()

  user = null

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    this.authSvc.isLogged$
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      this.isLogged = this.authSvc.Logged
      console.log(this.isLogged)
    })
  }

  ngOnDestroy(): void {
      this.destroy$.next({})
      this.destroy$.complete()
  }

  onLogout():void{
    this.authSvc.logout()
  }
}
