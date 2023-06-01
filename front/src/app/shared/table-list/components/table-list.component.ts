import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TableListColumnConfig } from '../models/table-list-column-config.model';

@UntilDestroy()
@Component({
	selector: 'table-list',
	templateUrl: './table-list.component.html',
	styleUrls: ['table-list.component.css'],
})
export class TableListComponent {
	/**
	 * Title of table
	 */
	@Input()
	public title!: string;

	/**
	 * Array type of {headerName: "name"}
	 */
	@Input()
	public columnsConfig: Array<TableListColumnConfig> = [];

	/**
	 * Array of data
	 */
	@Input()
	public rows: Array<any> = [];

	/**
	 * Can create
	 */
	@Input()
	public haveNewButton: boolean = true;

	@Output()
	public delete = new EventEmitter<number | string>();

	//Lifecycle
	constructor() {}

	// Events
	public sortBy(prop: string): void {
		this.rows.sort((a, b) => {
			if (a[prop] < b[prop]) {
				return -1;
			} else if (a[prop] > b[prop]) {
				return 1;
			} else {
				return 0;
			}
		});
	}

	public onDelete(id: string | number) {
		const sure = window.confirm('Are you sure to delete this row ?');

		if (sure) {
			this.delete.emit(id);
		}
	}

	public getType(variable: any): string {
		if (variable == null) {
			variable = 'null';
		}
		const typeVariable = variable.toString();
		return typeVariable === 'true' || typeVariable === 'false'
			? 'boolean'
			: 'string';
	}
}
