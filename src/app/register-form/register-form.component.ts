import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../common/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component ({
    selector: 'my-form',
    templateUrl: './register-form.component.html'
})

export class RegisterformComponent {

    title = 'Registeration Form';
    userData: any;
    public usersCollection: AngularFirestoreCollection<User>;
    selectedId: any;
    
    profileForm: FormGroup;
    hidePassword = false;
    nameFields: any;
    contactFields: any;
    addressFields: any;
    passwordFields: any;

    constructor(
        public afs: AngularFirestore, 
        public currRoute:ActivatedRoute, 
        public router: Router,
        public auth: AuthService,
        public toaster: ToastrService) {

        this.profileForm = new FormGroup ({
            name: new FormGroup({
                firstName: new FormControl('', Validators.required),
                middleName: new FormControl('', Validators.required),
                lastName: new FormControl('', Validators.required)
            }),
            contact: new FormGroup({
                email: new FormControl('', {
                    validators: [
                        Validators.required,
                        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
                    ]
                 }),
                phone: new FormControl('', {
                    validators: [
                        Validators.required,
                        Validators.pattern('^[0-9]{10,14}$')
                    ]
                }),
                whatsAppPhone: new FormControl('', {
                    validators: [
                        Validators.required,
                        Validators.pattern('^[0-9]{10,14}$')
                    ]
                })
            }),
            location: new FormGroup({
                address: new FormControl('', Validators.required),
                country: new FormControl('', Validators.required),
                state: new FormControl('', Validators.required),
                city: new FormControl('', Validators.required),
                zip: new FormControl('', {
                    validators: [
                        Validators.required,
                        Validators.pattern('^[0-9]{6}$')
                    ]
                })
            }),
            key: new FormGroup({
                password: new FormControl('', Validators.required),
                cPassword: new FormControl('', Validators.required)
            }, { updateOn: 'change' })
        });
        this.nameFields = this.profileForm.controls.name;
        this.contactFields = this.profileForm.controls.contact;
        this.addressFields = this.profileForm.controls.location;
        this.passwordFields = this.profileForm.controls.key;

    }

    ngOnInit() {
        this.currRoute.data.subscribe( res => {
            if ( res.data != undefined ) {
                this.passwordFields.get('password').clearValidators();
                this.passwordFields.get('cPassword').clearValidators();
                this.hidePassword = true;
                this.userData = res.data.data();
                this.selectedId = res.data.id;
                this.profileForm.patchValue ({
                    name: {
                        firstName: this.userData.firstName,
                        middleName: this.userData.middleName,
                        lastName: this.userData.lastName
                    },
                    contact: {
                        email: this.userData.email,
                        phone: this.userData.phone,
                        whatsAppPhone: this.userData.whatsAppPhone
                    },
                    location: {
                        address: this.userData.address,
                        country: this.userData.country,
                        state: this.userData.state,
                        city: this.userData.city,
                        zip: this.userData.zip
                    },
                    key: {
                        password: this.userData.password,
                        cPassword: this.userData.password
                    }
                });
            }
        })
    }

    onSubmit() {
        if (this.selectedId) {
            this.afs.collection("users").doc(this.selectedId).set({
                firstName: this.profileForm.value.name.firstName,
                middleName: this.profileForm.value.name.middleName,
                lastName: this.profileForm.value.name.lastName,
                email: this.profileForm.value.contact.email,
                phone: this.profileForm.value.contact.phone,
                whatsAppPhone: this.profileForm.value.contact.whatsAppPhone,
                address: this.profileForm.value.location.address,
                country: this.profileForm.value.location.country,
                state: this.profileForm.value.location.state,
                city: this.profileForm.value.location.city,
                zip: this.profileForm.value.location.zip
            })
            .then( res => {
                console.log(res);
                this.toaster.success('User Succesfully Updated', 'Update Successfull');
                this.router.navigate(['/usersList']);
            })
            .catch(err => {
                console.log(err);
                this.toaster.error('', 'Update Unsuccessfull');
            });
        } else {
            this.auth.registerUser(this.profileForm.value.contact.email, this.profileForm.value.key.password).then( res => {
                this.afs.collection("users").doc(res.user.uid).set({
                    firstName: this.profileForm.value.name.firstName,
                    middleName: this.profileForm.value.name.middleName,
                    lastName: this.profileForm.value.name.lastName,
                    email: this.profileForm.value.contact.email,
                    phone: this.profileForm.value.contact.phone,
                    whatsAppPhone: this.profileForm.value.contact.whatsAppPhone,
                    address: this.profileForm.value.location.address,
                    country: this.profileForm.value.location.country,
                    state: this.profileForm.value.location.state,
                    city: this.profileForm.value.location.city,
                    zip: this.profileForm.value.location.zip
                });
                this.toaster.success('Please login to view website', 'Registration Successfull');
                this.router.navigate(['/login']);
            }).catch( err=> {
                console.log(err)
                this.toaster.error(err.message, 'Weak Password');
            });
            
        }
        
    }

    resetForm() {
        this.profileForm.reset(); 
    }

    cancelForm() {
        this.router.navigate(['']);
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