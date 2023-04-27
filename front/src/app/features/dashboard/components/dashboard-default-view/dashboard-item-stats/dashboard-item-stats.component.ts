import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
	selector: 'feature-dashboard-item-stats',
	templateUrl: './dashboard-item-stats.component.html',
})
export class DashboardItemStats {
	@ContentChild(TemplateRef)
	public myTemplate!: TemplateRef<any>;

	// Inputs
	@Input()
	public color!: string;

	@Input()
	public colorBorder!: string;

	@Input()
	public number: number = 0;

	@Input()
	public title!: string;
}
