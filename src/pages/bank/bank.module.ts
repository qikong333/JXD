import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankPage } from './bank';

@NgModule({
  declarations: [
    BankPage,
  ],
  imports: [
    IonicPageModule.forChild(BankPage),
  ],
  exports: [
    BankPage
  ]
})
export class BankPageModule {}
