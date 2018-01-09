import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IdentityInformationPage } from './identity-information';

@NgModule({
  declarations: [
    IdentityInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(IdentityInformationPage),
  ],
  exports: [
    IdentityInformationPage
  ]
})
export class IdentityInformationPageModule {}
