import {
	AfterViewInit,
	Component,
	ElementRef,
	Input,
	OnInit,
	ViewChild,
} from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { DarkModeService } from '../../../dark-mode/services/dark-mode.service';
import { ChartPieValues } from '../../models/chart-pie-values.interface';

@Component({
	selector: 'chart-pie',
	template:
		'<div><p class="text-center p-4 text-lg">{{title}}</p><canvas #myChart class="w-full"></canvas><div>',
})
export class ChartPieComponent implements OnInit, AfterViewInit {
	// ViewChild
	@ViewChild('myChart', { static: true })
	pieChart!: ElementRef;

	// Inputs
	@Input()
	title!: string;

	@Input()
	values!: ChartPieValues;

	// Lifecycle
	constructor(private _darkModeService: DarkModeService) {}

	ngOnInit(): void {
		Chart.register(...registerables);
	}

	ngAfterViewInit(): void {
		const config: ChartConfiguration = {
			type: 'pie',
			data: {
				labels: this.values.labels,
				datasets: [
					{
						data: this.values.datas,
						borderWidth: 0,
					},
				],
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						labels: {
							color: this._darkModeService.isDarkMode ? 'white' : 'dark',
						},
						position: 'bottom',
					},
				},
			},
		};
		new Chart(this.pieChart.nativeElement, config);
	}
}
