import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepaymentPage } from './repayment';

@NgModule({
  declarations: [
    RepaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(RepaymentPage),PipesModule
  ],
  exports: [
    RepaymentPage
  ]
})
export class RepaymentPageModule {}
