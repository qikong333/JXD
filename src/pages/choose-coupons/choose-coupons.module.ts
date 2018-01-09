import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseCouponsPage } from './choose-coupons';

@NgModule({
  declarations: [
    ChooseCouponsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseCouponsPage),PipesModule
  ],
  exports: [
    ChooseCouponsPage
  ]
})
export class ChooseCouponsPageModule {}
