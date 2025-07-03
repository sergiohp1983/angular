import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { SecurityModule } from './features/security/security.module';
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule  } from 'mdb-angular-ui-kit/validation';

@NgModule({
    declarations: [         
        AppComponent
    ],
    imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
        
    //Layout components
    LayoutModule,

    //Feature modules
    //security
    SecurityModule,

    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MdbFormsModule,
    MdbValidationModule
    ],
    providers: [
        provideHttpClient()
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }