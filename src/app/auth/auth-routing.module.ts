import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from '@app/shared/components';
import { RegistrationFormComponent } from '@app/shared/components';
import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginFormComponent,
    canActivate: [NotAuthorizedGuard]
  },
  {
    path: 'registration',
    component: RegistrationFormComponent,
    canActivate: [NotAuthorizedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
