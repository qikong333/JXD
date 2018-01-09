import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdentityPhonePage } from './identity-phone';

@NgModule({
  declarations: [
    IdentityPhonePage,
  ],
  imports: [
    IonicPageModule.forChild(IdentityPhonePage),
  ],
  exports: [
    IdentityPhonePage
  ]
})
export class IdentityPhonePageModule {}
