import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewpasswordPage } from './newpassword';

@NgModule({
  declarations: [
    NewpasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(NewpasswordPage),
  ],
  exports: [
    NewpasswordPage
  ]
})
export class NewpasswordPageModule {}
