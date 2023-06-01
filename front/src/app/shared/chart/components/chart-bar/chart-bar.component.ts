import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { DarkModeService } from 'src/app/shared/dark-mode/services/dark-mode.service';
import { ChartBarValues } from '../../models/chart-bar-values.interface';
import { TranslateManagerService } from 'src/app/core/services/translate/translate-manager.service';

@Component({
	selector: 'chart-bar',
	template:
		'<div><p class="text-center p-4 text-lg">{{title}}</p><canvas #myChart class="w-full"></canvas><div>',
})
export class ChartBarComponent {
	// ViewChild
	@ViewChild('myChart', { static: true })
	pieChart!: ElementRef;

	// Inputs
	@Input()
	title!: string;

	@Input()
	values!: ChartBarValues;

	@Input()
	totalCount = 0;

	// Lifecycle
	constructor(
		private _darkModeService: DarkModeService,
		private _translateManagerService: TranslateManagerService
	) {}

	ngOnInit(): void {
		this.title = `${this.title} (${this.totalCount})`;
		Chart.register(...registerables);
	}

	ngAfterViewInit(): void {
		const config: ChartConfiguration = {
			type: 'bar',
			data: {
				labels: this.values.labels,
				datasets: [
					{
						label: this._translateManagerService.getTranslation('chart.true'),
						data: this.values.datas,
					},
					{
						label: this._translateManagerService.getTranslation('chart.false'),
						data: this.values.datas.map((value) => 100 - value),
					},
				],
			},
			options: {
				responsive: true,
				scales: {
					y: {
						stacked: true,
						beginAtZero: true,
						max: 100,
						ticks: {
							color: this._darkModeService.isDarkMode ? 'white' : 'dark',
						},
					},
					x: {
						stacked: true,
						ticks: {
							color: this._darkModeService.isDarkMode ? 'white' : 'dark',
						},
					},
				},
				plugins: {},
			},
		};
		new Chart(this.pieChart.nativeElement, config);
	}
}
