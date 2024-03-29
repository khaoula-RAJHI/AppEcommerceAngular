import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {
  private roles!: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  username!: string;

  test: Date = new Date();
  public isCollapsed = true;

  constructor(private router: Router , private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  
      if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;
  
        this.showAdminBoard = this.roles.includes('ADMIN');
  
        this.username = user.username;
      }
      var html = document.getElementsByTagName("html")[0];
      html.classList.add("auth-layout");
      var body = document.getElementsByTagName("body")[0];
      body.classList.add("bg-default");
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
     });
  
    }
    ngOnDestroy() {
      var html = document.getElementsByTagName("html")[0];
      html.classList.remove("auth-layout");
      var body = document.getElementsByTagName("body")[0];
      body.classList.remove("bg-default");
   
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
    //window.location.reload();
  } 
}
