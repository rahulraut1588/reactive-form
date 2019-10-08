import { Component } from '@angular/core';
import { AuthService } from '../common/auth.service';
import { Router } from  "@angular/router";

@Component ({
    selector: 'my-home',
    templateUrl: './home.component.html'
})

export class HomeComponent {

    constructor( public auth: AuthService, public router: Router) {
        this.auth.checkLoggedIn();
    }
    
    logout() {
        this.auth.doNormalLogout().then( res => {
            this.router.navigate(['/login']);
            localStorage.setItem('firebaseEmail', '');
            localStorage.setItem('firebaseUserId', '');
        })
        .catch ( err => {

        });
    }
}