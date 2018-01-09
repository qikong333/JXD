import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Events, Tabs, Platform, ToastController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { BackbuttonProvider } from '../../providers/backbutton/backbutton';


@IonicPage({
  name: 'TabsPage'
})
@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  tabRoots: Object[];
  @ViewChild('appMainTabs') tabRef: Tabs;
  tab1Root = 'HomePage'; 
  tab2Root = 'RepayscendPage';
  tab3Root = 'AccountPage';
  tab4Root = 'RealnamePage';
  tab5Root = 'ReloadBankPage';
  tab6Root = 'Repayment2ManualPage';
  // tab4Root = 'ChooseCouponsPage';
  // tab5Root = 'InformationsPage';

  constructor(
    public events: Events,
    public platform: Platform,
    public statusBar:StatusBar,
    public toastCtrl:ToastController,
    public alertCtrl:AlertController,
    public backbutton:BackbuttonProvider,
   ) {
  //   this.events.subscribe('changeTab', this.changeTabIndex.bind(this));
  //   platform.ready().then(() => {
  //     this.backbutton.registerBackButtonAction(this.tabRef);
  // });

  }

  // changeTabIndex(data: any) {
  //   console.log(data);
  //   this.tabRef.select(0);
  // }



}
