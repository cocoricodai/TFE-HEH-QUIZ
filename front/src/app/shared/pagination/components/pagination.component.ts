import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
	selector: 'pagination',
	templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit {
	// Inputs
	@Input()
	public currentPage: number = 1;

	@Input()
	public totalPages: number = 1;

	// Public properties
	public pages: number[] = [];

	// Lifecycle
	constructor(private router: Router, private route: ActivatedRoute) {}

	ngOnInit(): void {
		for (let i = 1; i <= this.totalPages; i++) {
			this.pages.push(i);
		}

		this.route.queryParams.subscribe((params: Params) => {
			this.currentPage = +params['page'];

			if (+params['page'] > this.totalPages) {
				this.router.navigate([], { queryParams: { page: this.totalPages } });
			} else if (+params['page'] < 1) {
				this.router.navigate([]);
			}

			if (!params['page']) {
				this.currentPage = 1;
			}
		});
	}

	// Events
	public onPrevious(): void {
		if (this.currentPage - 1 === 1) {
			this.router.navigate([]);
		} else {
			this.router.navigate([], { queryParams: { page: this.currentPage - 1 } });
		}
	}

	public goOnPage(page: number): void {
		if (page == 1) {
			this.router.navigate([]);
		}
		this.router.navigate([], { queryParams: { page } });
	}

	public onNext(): void {
		this.router.navigate([], { queryParams: { page: this.currentPage + 1 } });
	}
}
