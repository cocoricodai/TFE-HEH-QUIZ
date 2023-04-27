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
		const dates = [
			new Date('2023-04-7'),
			new Date('2023-04-8'),
			new Date('2023-04-9'),
			new Date('2023-04-10'),
			new Date('2023-04-11'),
			new Date('2023-04-12'),
			new Date('2023-04-13'),
		];

		const config: ChartConfiguration = {
			type: 'line',
			data: {
				labels: dates.map((date) => {
					const day = date.getDate();
					const month = date.getMonth() + 1; // ajouter 1 car les mois commencent à 0
					return `${day}/${month}`;
				}),
				datasets: [
					{
						data: [300, 114, 106, 306, 107, 111, 433],
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
