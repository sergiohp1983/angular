import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule  } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    declarations: [RegisterUserComponent, UserLoginComponent],
    exports: [RegisterUserComponent, UserLoginComponent],
    imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule, MdbFormsModule, MdbValidationModule, BrowserAnimationsModule],
    providers: [],
})

export class SecurityModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule : SecurityModule
    ) {
        if (parentModule) {
            throw new Error(
                'SecurityModule is already loaded. Import it in the AppModule only.'
            );
        }
    }
}