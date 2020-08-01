import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { LoginComponent } from './components/login/login.component';

import { StudentsModule } from './components/students/students.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListboxModule } from 'primeng/listbox';
import { InputMaskModule } from 'primeng/inputmask';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
    AppComponent,
    StudentDetailComponent,
    StudentFormComponent,
    LoginComponent
  ],
  imports: [
    StudentsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    MultiSelectModule,
    TableModule,
    InputTextModule,
    InputNumberModule,
    ListboxModule,
    InputMaskModule,
    PasswordModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
