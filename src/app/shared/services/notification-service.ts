import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class NotificationService {
    config: MatSnackBarConfig = {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
    };

    constructor(public snackBar: MatSnackBar) {}

    ShowSuccess(successMessage : string, action : any) {
        this.config.panelClass = ['snackbar-success'];
        this.snackBar.open(successMessage, action, this.config);
    }

    ShowError(errorMessage : string, action: any) {
        this.config.panelClass = ['snackbar-error'];
        this.snackBar.open(errorMessage, action, this.config);
    }
}