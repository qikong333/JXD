import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the PaymentResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name:'PaymentResultPage'
})
@Component({
  selector: 'page-payment-result',
  templateUrl: 'payment-result.html',
})
export class PaymentResultPage {

  result:any = this.navParams.get('result');//判断显示
  repayment:number = this.navParams.get('repayment');//还款金额
  residue:number = this.navParams.get('residue');//剩余还款

  constructor(public navCtrl: NavController, public navParams: NavParams,public helpers:HelpersProvider) {
  }

  /**
   * 回到我的借款
   */
  goMyBorrow(){
    this.navCtrl.push('MyBorrowPage');
  }

    ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.helpers.hideTabs1();

  }
  

  ionViewWillLeave(){
  this.helpers.hideTabs2();
  }


}
