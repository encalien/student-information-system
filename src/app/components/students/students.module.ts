import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';


@NgModule({
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ButtonModule,
    TableModule
  ],
  declarations: [StudentsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StudentsModule { }