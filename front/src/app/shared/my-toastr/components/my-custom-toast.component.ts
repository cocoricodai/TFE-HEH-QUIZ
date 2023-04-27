import {
	animate,
	keyframes,
	state,
	style,
	transition,
	trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
	selector: 'my-custom-toast',
	templateUrl: './my-custom-toast.component.html',
	styleUrls: ['./my-custom-toast.component.css'],
	animations: [
		trigger('flyInOut', [
			state(
				'inactive',
				style({
					opacity: 0,
					transform: 'translate3d(0,200%,0)',
				})
			),
			transition(
				'inactive => active',
				animate(
					'1s ease-out',
					keyframes([
						style({
							opacity: 1,
							transform: 'translate3d(0,0,0)',
						}),
					])
				)
			),
			transition(
				'active => removed',
				animate(
					'1s ease-out',
					keyframes([
						style({
							opacity: 0,
							transform: 'translate3d(200%,0,0)',
						}),
					])
				)
			),
		]),
	],
})
export class MyCustomToastComponent extends Toast implements OnInit {
	// Public properties
	public type!: 'success' | 'error' | 'warning' | 'info';
	public description!: string | null | undefined;

	// Lifecycle
	constructor(
		readonly _toastrService: ToastrService,
		readonly _toastPackage: ToastPackage
	) {
		super(_toastrService, _toastPackage);
	}

	ngOnInit(): void {
		this.description = this._toastPackage.message;
		switch (this._toastPackage.toastType) {
			case 'toast-success':
				this.type = 'success';
				break;
			case 'toast-error':
				this.type = 'error';
				break;
			case 'toast-warning':
				this.type = 'warning';
				break;
			case 'info':
				this.type = 'info';
				break;
			case 'default':
				this.type = 'info';
				break;
		}
	}
}
