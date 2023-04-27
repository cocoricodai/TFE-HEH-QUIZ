import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingComponent } from './components/loading.component';
import { TargetLoadingDirective } from './directives/target-loading.directive';

@NgModule({
	imports: [CommonModule],
	declarations: [LoadingComponent, TargetLoadingDirective],
	exports: [LoadingComponent, TargetLoadingDirective],
})
export class LoadingModule {}
