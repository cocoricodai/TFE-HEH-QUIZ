import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { DarkModeService } from 'src/app/shared/dark-mode/services/dark-mode.service';
import { ChartLineValues } from '../../models/chart-line-values.interface';

@Component({
	selector: 'chart-line',
	template:
		'<div><p class="text-center p-4 text-lg">{{title}}</p><canvas #myChart class="w-full"></canvas><div>',
})
export class ChartLineComponent {
	// ViewChild
	@ViewChild('myChart', { static: true })
	pieChart!: ElementRef;

	// Inputs
	@Input()
	title!: string;

	@Input()
	values!: ChartLineValues;

	// Lifecycle
	constructor(private _darkModeService: DarkModeService) {}

	ngOnInit(): void {
		Chart.register(...registerables);
	}

	ngAfterViewInit(): void {
		const config: ChartConfiguration = {
			type: 'line',
			data: {
				labels: this.values.labels,
				datasets: [
					{
						data: this.values.datas,
					},
				],
			},
			options: {
				responsive: true,
				scales: {
					y: {
						ticks: {
							color: this._darkModeService.isDarkMode ? 'white' : 'dark',
						},
					},
					x: {
						ticks: {
							color: this._darkModeService.isDarkMode ? 'white' : 'dark',
						},
					},
				},
				plugins: {
					legend: {
						display: false,
					},
				},
			},
		};
		new Chart(this.pieChart.nativeElement, config);
	}
}
