import { Pipe, PipeTransform } from '@angular/core';
import { TableListColumnConfig } from 'src/app/shared/table-list/models/table-list-column-config.model';

@Pipe({ name: 'columnHeader' })
export class ColumnHeader implements PipeTransform {
	transform(object: Object): TableListColumnConfig[] {
		if (!object) {
			return [];
		}
		let properties = Object.keys(object);

		let columnHeader: TableListColumnConfig[] = properties.map((el) => {
			return { headerName: el };
		});

		return columnHeader;
	}
}
