import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'numberCountFormat' })
export class NumberCountFormat implements PipeTransform {
	transform(number: number): string | number {
		if (number > 500) {
			return '500+';
		}

		return number;
	}
}
