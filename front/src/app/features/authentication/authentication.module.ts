import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthenticationRouting } from './authentication.routing';
import { ForgotPasswordFormComponent } from './components/forgot-password/forgot-password-form/forgot-password-form.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterFormComponent } from './components/register/register-form/register-form.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordForm } from './components/reset-password/reset-password-form/reset-password-form.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyComponent } from './components/verify/verify.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		AuthenticationRouting,
		SharedModule,
		TranslateModule.forChild(),
	],
	declarations: [
		LoginComponent,
		LoginFormComponent,
		RegisterComponent,
		RegisterFormComponent,
		ForgotPasswordComponent,
		ForgotPasswordFormComponent,
		ResetPasswordComponent,
		ResetPasswordForm,
		VerifyComponent,
	],
})
export class AuthenticationModule {}
