import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../common/auth.service';
import { Router } from  "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component ({
    selector: 'my-login',
    templateUrl: './login-form.component.html'
})

export class LoginformComponent {
    
    public usersCollection: AngularFirestoreCollection<User>;
    users: Observable<User[]>;
    authFields :any;
    loginForm: FormGroup;

    constructor(public afs: AngularFirestore, public auth:AuthService, public router: Router, public toastr: ToastrService) {
        this.loginForm = new FormGroup ({
            auth: new FormGroup ({
                email: new FormControl('', {
                    validators: [
                        Validators.required,
                        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
                    ]
                 }),
                password: new FormControl('', Validators.required)
            })
        });
    
        this.authFields = this.loginForm.controls.auth;
    }

    onSubmit() {
        var userdata = {
            email: this.authFields.controls.email.value,
            password: this.authFields.controls.password.value
        }
        this.auth.doNormalLogin(userdata).then( res => {
            localStorage.setItem('firebaseEmail', res.user.email);
            localStorage.setItem('firebaseUserId', res.user.uid);
            this.toastr.success('', 'Login Successfull' );
            this.router.navigate(['']);
        })
        .catch ( err => {
            this.toastr.error(err.message, 'Login Unsuccessfull' );
        });
    }
}

interface User { 
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    phone: string,
    whatsAppPhone: string,
    address: string,
    country: string,
    state: string,
    city: string,
    zip: string
}