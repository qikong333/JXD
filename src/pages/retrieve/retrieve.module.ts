import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RetrievePage } from './retrieve';
import { VerificationCodePageModule } from '../verification-code/verification-code.module';

@NgModule({
  declarations: [
    RetrievePage,
  ],
  imports: [
    IonicPageModule.forChild(RetrievePage),
    VerificationCodePageModule
  ],
  exports: [
    RetrievePage
  ]
})
export class RetrievePageModule {}
