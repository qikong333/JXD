import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BannkcardPage } from './bannkcard';

@NgModule({
  declarations: [
    BannkcardPage,
  ],
  imports: [
    IonicPageModule.forChild(BannkcardPage),
  ],
  exports: [
    BannkcardPage
  ]
})
export class BannkcardPageModule {}
