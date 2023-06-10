import { RechargeBillBroadbandComponent } from './recharge-bill-broadband.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '**',
    component: RechargeBillBroadbandComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RechargeBillBroadbandRoutingModule {}
