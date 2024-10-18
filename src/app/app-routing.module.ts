import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AgentComponent } from './agent/agent.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'agent', component: AgentComponent },
  { path: 'user', component: UserComponent },
  { path: '',  component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
