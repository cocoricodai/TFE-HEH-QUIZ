import { NgModule } from '@angular/core';
import { ChartLineComponent } from './components/chart-line/chart-line.component';
import { ChartPieComponent } from './components/chart-pie/chart-pie.component';

@NgModule({
	declarations: [ChartPieComponent, ChartLineComponent],
	exports: [ChartPieComponent, ChartLineComponent],
})
export class ChartModule {}
