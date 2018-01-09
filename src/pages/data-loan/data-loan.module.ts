import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataLoanPage } from './data-loan';

@NgModule({
  declarations: [
    DataLoanPage,
  ],
  imports: [
    IonicPageModule.forChild(DataLoanPage),
  ],
})
export class DataLoanPageModule {}
