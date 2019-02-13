import { Component } from '@angular/core';

import { DashboardFacadeService } from '../../services/dashboard.facade';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  statistics$ = this.dashboardFacade.statistics$;

  constructor(private dashboardFacade: DashboardFacadeService) {}
}
