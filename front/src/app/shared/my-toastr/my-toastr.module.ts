import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { MyCustomToastComponent } from './components/my-custom-toast.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
		ToastrModule.forRoot({
			toastComponent: MyCustomToastComponent,
		}),
	],
	declarations: [MyCustomToastComponent],
})
export class MyToastrModule {}
