import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovicePage } from './novice';

@NgModule({
  declarations: [
    NovicePage,
  ],
  imports: [
    IonicPageModule.forChild(NovicePage),
  ],
  exports: [
    NovicePage
  ]
})
export class NovicePageModule {}
