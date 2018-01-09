import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { UtilsProvider } from '../../providers/utils/utils';



/**
 * Generated class for the AuditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name:"AuditPage",
})
@Component({
  selector: 'page-audit',
  templateUrl: 'audit.html',
})
export class AuditPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public helpers:HelpersProvider,public utils:UtilsProvider) {
  }

    ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.helpers.hideTabs1();

  }
  

  ionViewWillLeave(){
  this.helpers.hideTabs2();
  }


  goMyBorrow(){
  	this.navCtrl.push('MyBorrowPage',{},{duration:100})
  }
  
  go_forget(){
  	this.navCtrl.push('ForgetPasswordPage',{},{duration:100})
  }

  goBack(){
    this.navCtrl.popToRoot();
  }

  home(){
    this.navCtrl.popToRoot();
  }

  tel(){
    this.utils.showAlert('400-898-8121')
  }
 
}
