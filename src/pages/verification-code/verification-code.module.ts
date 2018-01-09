import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerificationCodePage } from './verification-code';

@NgModule({
  declarations: [
    VerificationCodePage,
  ],
  imports: [
    IonicPageModule.forChild(VerificationCodePage),
  ],
  exports: [
    VerificationCodePage
  ]
})
export class VerificationCodePageModule {}
