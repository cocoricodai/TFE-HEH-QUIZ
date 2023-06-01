import { NgModule } from '@angular/core';
import { ChartLineComponent } from './components/chart-line/chart-line.component';
import { ChartPieComponent } from './components/chart-pie/chart-pie.component';
import { ChartBarComponent } from './components/chart-bar/chart-bar.component';

@NgModule({
	declarations: [ChartPieComponent, ChartLineComponent, ChartBarComponent],
	exports: [ChartPieComponent, ChartLineComponent, ChartBarComponent],
})
export class ChartModule {}
