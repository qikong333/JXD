import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DelayPaymentPage } from './delay-payment';

@NgModule({
  declarations: [
    DelayPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(DelayPaymentPage),PipesModule
  ],
  exports: [
    DelayPaymentPage
  ]
})
export class DelayPaymentPageModule {}
