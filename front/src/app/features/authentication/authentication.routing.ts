import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyComponent } from './components/verify/verify.component';

@NgModule({
	imports: [
		RouterModule.forChild([
			{
				path: 'login',
				component: LoginComponent,
				title: 'routing.auth.login',
			},
			{
				path: 'register',
				component: RegisterComponent,
				title: 'routing.auth.register',
			},
			{
				path: 'forgot-password',
				component: ForgotPasswordComponent,
				title: 'routing.auth.forgot-password',
			},
			{
				path: 'reset-password/:token',
				component: ResetPasswordComponent,
				title: 'routing.auth.reset-password',
			},
			{
				path: 'verify/:id/:token',
				component: VerifyComponent,
				title: 'routing.auth.verify-account',
			},
		]),
	],
	exports: [RouterModule],
})
export class AuthenticationRouting {}
