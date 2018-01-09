import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RealnamePage } from './realname';

@NgModule({
  declarations: [
    RealnamePage,
  ],
  imports: [
    IonicPageModule.forChild(RealnamePage),
  ],
  exports: [
    RealnamePage
  ]
})
export class RealnamePageModule {}
