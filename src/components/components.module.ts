import { NetworkFailComponent } from './network-fail/network-fail';
import { NgModule } from '@angular/core';
import { NetworkShowComponent } from './network-show/network-show';
@NgModule({
	declarations: [NetworkFailComponent,
    NetworkShowComponent],
	imports: [],
	exports: [NetworkFailComponent,
    NetworkShowComponent]
})
export class ComponentsModule {}
