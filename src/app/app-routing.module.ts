import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDetailComponent }  from './student-detail/student-detail.component';

const routes: Routes = [
  { 
    path: 'overview',
    loadChildren: () => import('./students/students.module').then(m => m.StudentsModule)
  },
  { path: 'student/:studentId', component: StudentDetailComponent },
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }