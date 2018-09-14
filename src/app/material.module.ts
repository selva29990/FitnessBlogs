import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

        
@NgModule({
    imports: [MatButtonModule, MatProgressBarModule, MatCardModule, MatTabsModule, MatDialogModule,
        MatSnackBarModule, MatSelectModule, MatExpansionModule, MatInputModule, MatSidenavModule, MatToolbarModule, MatIconModule
    , MatFormFieldModule],
    exports: [MatButtonModule, MatProgressBarModule, MatCardModule, MatTabsModule, MatDialogModule,
        MatSnackBarModule, MatSelectModule, MatExpansionModule, MatInputModule, MatSidenavModule, MatToolbarModule, MatIconModule
    , MatFormFieldModule],
})
export class MaterialModule { }