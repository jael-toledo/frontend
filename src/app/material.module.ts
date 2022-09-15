import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule} from '@angular/material/sidenav'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';


const myModules = [
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatPaginatorModule,
]

@NgModule({
    imports:[ ...myModules],
    exports:[ ...myModules],
})

export class MaterialModule{}