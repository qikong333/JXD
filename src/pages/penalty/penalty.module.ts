import { PipesModule } from './../../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PenaltyPage } from './penalty';

@NgModule({
  declarations: [
    PenaltyPage,
  ],
  imports: [
    IonicPageModule.forChild(PenaltyPage),PipesModule
  ],
  exports: [
    PenaltyPage
  ]
})
export class PenaltyPageModule {}
