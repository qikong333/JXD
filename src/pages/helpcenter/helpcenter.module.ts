import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpcenterPage } from './helpcenter';

@NgModule({
  declarations: [
    HelpcenterPage,
  ],
  imports: [
    IonicPageModule.forChild(HelpcenterPage),
  ],
  exports: [
    HelpcenterPage
  ]
})
export class HelpcenterPageModule {}
