import {NgModule, Optional, SkipSelf} from '@angular/core';
import {RouterModule} from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [HeaderComponent, HomeComponent],
    exports: [HeaderComponent, HomeComponent],
    imports: [RouterModule],
    providers: [],
})

export class LayoutModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: LayoutModule
    ) {
        if (parentModule) {
            throw new Error(
                'LayoutModule is already loaded. Import it in the AppModule only.'
            );
        }
    }
}