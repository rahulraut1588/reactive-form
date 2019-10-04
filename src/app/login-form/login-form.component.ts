import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component ({
    selector: 'my-login',
    templateUrl: './login-form.component.html'
})

export class LoginformComponent {
    
    loginForm = new FormGroup ({
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
    authFields = this.loginForm.controls.auth;

    constructor(public afs: AngularFirestore ) {
    }
    onSubmit() {
        var docRef = this.afs.collection("users").doc(this.loginForm.value.auth.email);
        docRef.get().subscribe(function(doc) {
            console.log(doc);
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        })
    }
}