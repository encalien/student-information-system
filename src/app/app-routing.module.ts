import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentFormComponent }  from './components/student-form/student-form.component';
import { StudentDetailComponent }  from './components/student-detail/student-detail.component';
import { LoginComponent }  from './components/login/login.component';

const routes: Routes = [
  { 
    path: 'overview',
    loadChildren: () => import('./components/students/students.module').then(m => m.StudentsModule)
  },
  { path: 'students/new', component: StudentFormComponent },
  { path: 'students/:id', component: StudentDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/overview', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }