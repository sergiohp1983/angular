import { Injectable, NgModule, Optional, SkipSelf } from '@angular/core';
import { PreloadingStrategy, Route, RouterModule, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserLoginComponent } from './features/security/components/user-login/user-login.component';
import { RegisterUserComponent } from './features/security/components/register-user/register-user.component';

// @Injectable()
export class PreloadModulesStrategy implements PreloadingStrategy {
     preload(route: Route, load: () => Observable<any>) {
         if(route.data && route.data['preload']) {
             return load();
         }
         return of(null);
     }
} 

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full', data: { preload: true } },    
    { path: 'login', component: UserLoginComponent, pathMatch: 'full', data: { preload: false }  },
    { path: 'register', component: RegisterUserComponent, pathMatch: 'full', data: { preload: false } }
    //{ path: 'home', data: { preload: true }, loadChildren: () => import('./layout/home/home.component').then(m => m.HomeComponent) },
    //{ path: 'login', data: { preload: false }, loadChildren: () => import('./features/security/components/user-login/user-login.component').then(m => m.UserLoginComponent) },
    //{ path: 'register', data: { preload: false }, loadChildren: () => import('./features/security/components/register-user/register-user.component').then(m => m.RegisterUserComponent) }

];

@NgModule(
    {
        imports: [ RouterModule.forRoot(routes, { preloadingStrategy: PreloadModulesStrategy })],
        exports: [ RouterModule ],
    }
)
export class AppRoutingModule { 
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: AppRoutingModule
    ) {
        if (parentModule) {
            throw new Error(
                'AppRoutingModule is already loaded. Import it in the AppModule only.'
            );
        }
    }    
}



