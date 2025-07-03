import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegisterUserService } from '../../services/register-user/register-user-service';
import { userRole } from '../../models/user-role';
import { user } from '../../models/user';
import { MustMatch } from '../../helpers/must-match-validator';
import { NotificationService } from '../../../../shared/services/notification-service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements OnInit {
  
  validationForm: FormGroup = new FormGroup({});
  userRoles : userRole[] = [];  
  selectedRole? : userRole;
  user: user = new user(0, "", "", 0, "");
  

  constructor(private registerUserService : RegisterUserService, private notificationService: NotificationService, private formBuilder : FormBuilder) {       
  }

  loadUserRoles() {
    this.registerUserService.getUserRoles().subscribe(userRolesObject => {
      this.userRoles = userRolesObject.value;
    })
  }

  get userName(): AbstractControl {
    return this.validationForm.get('userName')!;
  }

  get password1() : AbstractControl {
    return this.validationForm.get('password1')!;
  }

  get password2() : AbstractControl {
    return this.validationForm.get('password2')!;
  }  

  get selectRole() : AbstractControl {
    return this.validationForm.get('selectRole')!;
  }

  
  
  ngOnInit(): void {

    this.validationForm = this.formBuilder.group(
      {
        userName: ['', Validators.required],
        password1: ['', Validators.required],
        password2: ['', Validators.required],
        selectRole: ['', Validators.required]
      }, {
        validator: MustMatch('password1', 'password2')
      });

    this.loadUserRoles();
  }

  onSelect(e : any) {
    console.log(e.value)
    this.selectRole.setValue(e.target.value, {
      onlySelf: true
    })    
    this.selectedRole = this.validationForm.value?.selectRole;
  }

  onSubmitUser() {
        
    if (!this.validationForm.valid){
      for (const control of Object.keys(this.validationForm.controls)) {
        this.validationForm.controls[control].markAsTouched();
      }
      return false;
    }

    if(this.selectedRole?.id != undefined)
      this.user.role_id = this.selectedRole?.id;

    
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    
    this.user.username = this.userName.value;
    this.user.password = this.password1.value;
    this.user.created_at = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    
    this.registerUserService.addUser(this.user).subscribe({
      next: () => {
        this.notificationService.ShowSuccess('User created successfully!', 'Close');
        console.log('Successfully created user');
      },
      error: (error) => {        
        this.notificationService.ShowError('Failed to create user. Error: ' + error.message, 'Close');
        console.log('Error while creating user. Error: ' + error.message);
      }
    });        

    return true;
  }
  
}
