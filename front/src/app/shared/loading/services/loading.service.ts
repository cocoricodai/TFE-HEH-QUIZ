import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService implements OnInit, OnDestroy {
	// inner properties
	private _isLoading = new BehaviorSubject<boolean>(false);

	// Observable
	public get isLoading$(): Observable<boolean> {
		return this._isLoading.asObservable();
	}

	// Lifecycle
	constructor(private _router: Router) {}

	ngOnInit(): void {
		this.setupLoader();
	}

	ngOnDestroy(): void {
		this._isLoading.complete();
	}

	// Public method
	public startLoading() {
		this._isLoading.next(true);
	}

	public stopLoading() {
		this._isLoading.next(false);
	}

	// Inner work
	private setupLoader() {
		this._router.events
			.pipe(filter((event) => event instanceof NavigationEnd))
			.subscribe(() => this.stopLoading());
	}
}
