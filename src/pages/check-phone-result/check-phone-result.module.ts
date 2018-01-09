import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckPhoneResultPage } from './check-phone-result';

@NgModule({
  declarations: [
    CheckPhoneResultPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckPhoneResultPage),
  ],
  exports: [
    CheckPhoneResultPage
  ]
})
export class CheckPhoneResultPageModule {}
