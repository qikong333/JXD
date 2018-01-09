import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProgressPage } from './progress';
import { InformationsPageModule } from '../informations/informations.module';
import { HomeFootPageModule } from '../home-foot/home-foot.module';
import { PapersPageModule } from '../papers/papers.module';
import { BankPageModule } from '../bank/bank.module';
import { IdentityPageModule } from '../identity/identity.module';

@NgModule({
  declarations: [
    ProgressPage,
  ],
  imports: [
    IonicPageModule.forChild(ProgressPage),
    InformationsPageModule,
    PapersPageModule,
    BankPageModule,
    IdentityPageModule,
    
  ],
  exports: [
    ProgressPage
  ]
})
export class ProgressPageModule {}
