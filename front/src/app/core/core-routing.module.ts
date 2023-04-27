import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: '',
				canActivate: [AuthGuard],
				loadChildren: () =>
					import('../features/application/application.module').then(
						(m) => m.ApplicationModule
					),
			},
			{
				path: 'auth',
				loadChildren: () =>
					import('../features/authentication/authentication.module').then(
						(m) => m.AuthenticationModule
					),
			},
			{
				path: 'admin',
				canActivate: [AuthGuard, AdminGuard],
				loadChildren: () =>
					import('../features/dashboard/dashboard.module').then(
						(m) => m.DashboardModule
					),
			},
			{
				path: 'page-not-found',
				component: PageNotFoundComponent,
				title: 'Page Not Found',
			},
		]),
	],
	exports: [RouterModule],
})
export class CoreRoutingModule {}
