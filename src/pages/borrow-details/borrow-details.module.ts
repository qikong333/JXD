import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BorrowDetailsPage } from './borrow-details';

@NgModule({
  declarations: [
    BorrowDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(BorrowDetailsPage),
    PipesModule
  ],
  exports: [
    BorrowDetailsPage
  ]
})
export class BorrowDetailsPageModule {}
