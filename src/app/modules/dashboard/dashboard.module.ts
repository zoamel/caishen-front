import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { SharedModule } from '@app/shared';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransactionsStatsComponent } from './components/transactions-stats/transactions-stats.component';

@NgModule({
  imports: [NgxChartsModule, SharedModule, DashboardRoutingModule],
  declarations: [DashboardComponent, TransactionsStatsComponent],
})
export class DashboardModule {}
