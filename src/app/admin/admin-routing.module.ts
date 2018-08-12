import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AuthAdminGuardService } from '../services/auth-admin-guard.service';

const routes: Routes = [
    { path: '', component: AdminComponent, canActivate:[AuthAdminGuardService],
      children: [
         { path: '', component: AdminHomeComponent},
         { path: 'index', component: AdminHomeComponent},
         { path: 'users', component: ManageUsersComponent},
      ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
