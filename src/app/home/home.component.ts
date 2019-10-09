import { Component } from '@angular/core';
import { AuthService } from '../common/auth.service';
import { Router } from  "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';

@Component ({
    selector: 'my-home',
    templateUrl: './home.component.html'
})

export class HomeComponent {

    userData=[];
    users: any;

    constructor( 
        public auth: AuthService, 
        public router: Router, 
        public toaster: ToastrService,
        public afs: AngularFirestore) {

        (!this.auth.checkLoggedIn()) ? this.toaster.error('Please Login Again', 'Session Timed Out') : '';

        this.users = afs.collection('users').snapshotChanges();
        var i = 0;
        this.userData=[];
        afs.collection('users').snapshotChanges().subscribe( res => {
            res.map ( changes => {
                this.userData[i] = changes.payload.doc.data();
                this.userData[i].id = changes.payload.doc.id;
                i++;
            });
        });
    }
    
    logout() {
        this.auth.doNormalLogout().then( res => {
            this.toaster.success('Logout Successfull', 'Success!!!');
            localStorage.setItem('firebaseEmail', '');
            localStorage.setItem('firebaseUserId', '');
            this.router.navigate(['/login']);
        })
        .catch ( err => {
            this.toaster.error('Unable To Logout', 'Error!!!');
        });
    }

    deleteUser (user) {
        this.afs.collection("users").doc(user.id).delete().then(res => {
            this.auth.deleteUser().then( res => {
                console.log(res);
                this.toaster.success('User successfully deleted', 'Success!!!');
            }).catch(err =>{
                console.log(err);
                this.toaster.error('Unable to delete user', 'Error!!!');
            });
        }).catch(err => {
            this.toaster.error('Unable to clear user from database', 'Error!!!');
        });
    }
}