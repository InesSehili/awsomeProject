import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable, startWith, tap} from "rxjs";
import {ComplexFormService} from "../../services/complex-form.service";
import {validValidator} from "../../validators/valid.validator";
import {confirmEqualValidator} from "../../validators/confirm-equal.validator";

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponent implements OnInit {
  loading = false;
  mainForm! : FormGroup;
  personalInfoForm! : FormGroup;
  contactPreferenceCntrl! : FormControl;
  phoneCntrl! : FormControl;
  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  emailForm!: FormGroup;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  loginInfoForm!: FormGroup;
  showEmailCntrl$! : Observable<boolean>;
  showPhoneCntrl$! : Observable<boolean>;
  showEmailErro$ ! :Observable<boolean>;
  showPasswordError$ ! : Observable<boolean>;
  //urlRegex!: RegExp;

  constructor(private formBuilder : FormBuilder,
              private complexFormService : ComplexFormService) { }

  ngOnInit(): void {
    //this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    this.initFormControl();
    this.initMainForm();
    this.initFormObservable();
  }
  initMainForm () : void {
    this.mainForm = this.formBuilder.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCntrl,
      email: this.emailForm,
      phone: this.phoneCntrl,
      loginInfo: this.loginInfoForm
    });
  }

   onSubmitForm() {
    this.loading= true;
    this.complexFormService.saveUserInfo(this.mainForm.value).pipe(
      tap(saved => {
        this.loading = false;
        if (saved) {
          this.mainForm.reset();
          this.contactPreferenceCntrl.patchValue('email');

        } else {
          console.error('Echec de l\'enregistrement');

        }
      })

    ).subscribe();
  }

  initFormControl() : void {
    this.personalInfoForm = this.formBuilder.group(
      {
        firstName : ['', Validators.required],
        lastName : ['', Validators.required]
      }
    );
    this.contactPreferenceCntrl = this.formBuilder.control('email');
    this.emailCtrl = this.formBuilder.control('');
    this.confirmEmailCtrl = this.formBuilder.control('');
    this.emailForm = this.formBuilder.group({
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl
    }, {
      validators: [confirmEqualValidator('email', 'confirm')],
      updateOn: 'blur'
    });
    this.phoneCntrl = this.formBuilder.control('');
    this.passwordCtrl = this.formBuilder.control('', Validators.required);
    this.confirmPasswordCtrl = this.formBuilder.control('', Validators.required);
    this.loginInfoForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    }, {
      //LE MESSAGE NE S'AFIICHE PAS PSK MAT ERREUR QUE LE SERREUR DES FORM CONTROL
      validators: [confirmEqualValidator('password', 'confirmPassword')],
      updateOn: "blur"
    });

  }

   initFormObservable() {
    this.showEmailCntrl$ = this.contactPreferenceCntrl.valueChanges.pipe(
      startWith(this.contactPreferenceCntrl.value),
      map(preference => preference === 'email'),
      tap( showEmailCtrl => {
        if(showEmailCtrl)
        {
          this.emailCtrl.addValidators([Validators.required, Validators.email]);
          this.confirmEmailCtrl.addValidators([Validators.required, Validators.email]);
        }
        else {
          this.emailCtrl.clearValidators();
          this.confirmEmailCtrl.clearValidators();
        }
        this.emailCtrl.updateValueAndValidity();
        this.confirmEmailCtrl.updateValueAndValidity();
      })
    );
    this.showPhoneCntrl$ = this.contactPreferenceCntrl.valueChanges.pipe(
      startWith(this.contactPreferenceCntrl.value),
      map(preference =>preference ==='phone'),
      tap(showPhoneCntrl =>{
        if(showPhoneCntrl){
          this.phoneCntrl.addValidators([Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10), Validators.pattern("^[0-9]*$")]);

        }
        else{
          this.phoneCntrl.clearValidators();
        }
        this.phoneCntrl.updateValueAndValidity();
      })


    );
     this.showEmailErro$ = this.emailForm.statusChanges.pipe(
       map(statuts => statuts==='INVALID' && this.emailCtrl.value && this.confirmEmailCtrl.value)
     );
     this.showPasswordError$ = this.loginInfoForm.statusChanges.pipe(
       map(status => status === 'INVALID' && this.passwordCtrl.value && this.confirmPasswordCtrl.value && this.loginInfoForm.hasError('confirmEqual'))
     );

  }
  getFormCtrlErrorText(ctrl : AbstractControl)
  {
    if(ctrl.hasError('required'))
      return 'Ce champs est requis';
    else if(ctrl.hasError('email'))
      return 'Merci d\'entrer une adresse email Valide';
    else if(ctrl.hasError('minlength'))
      return 'min 10';
    else if(ctrl.hasError('maxlength'))
      return 'Max 10';
    else
      return 'Ce champs contient une erreur';
  }
}
