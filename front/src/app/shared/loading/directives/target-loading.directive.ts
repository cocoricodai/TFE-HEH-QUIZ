import {
	ComponentRef,
	Directive,
	ElementRef,
	HostBinding,
	Input,
	OnChanges,
	OnDestroy,
	OnInit,
	Renderer2,
	SimpleChanges,
	ViewContainerRef,
} from '@angular/core';
import { LoadingComponent } from '../components/loading.component';

@Directive({
	selector: '[targetLoading]',
	exportAs: 'target-loading',
})
export class TargetLoadingDirective {
	@HostBinding('style.position')
	public hostPosition = 'relative';

	@HostBinding('style.min-height')
	public hostMinHeight = '200px';

	private _componentRef!: ComponentRef<LoadingComponent>;

	constructor(
		private _viewContainerRef: ViewContainerRef,
		private _elRef: ElementRef,
		private _renderer: Renderer2
	) {}

	// Public
	public startLoading() {
		this.createLoadingComponent();
	}

	public stopLoading() {
		this.destroyLoadingComponent();
	}

	// Inner woks
	private createLoadingComponent() {
		this._componentRef =
			this._viewContainerRef.createComponent(LoadingComponent);
		this._renderer.appendChild(
			this._elRef.nativeElement,
			this._componentRef.location.nativeElement
		);
	}

	private destroyLoadingComponent() {
		if (this._componentRef) {
			this._componentRef.destroy();
		}
	}
}
