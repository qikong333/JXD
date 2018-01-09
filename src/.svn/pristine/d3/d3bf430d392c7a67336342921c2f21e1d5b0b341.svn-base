import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SERVER_URL } from '../../providers/constants/constants';
import { HelpersProvider } from '../../providers/helpers/helpers';

@IonicPage({
  name: 'Repayment2Page',
})
@Component({
  selector: 'page-repayment2',
  templateUrl: 'repayment2.html',
})
export class Repayment2Page {
  code: any; //订单号
  bank: any = '';//还款银行卡
  bankNum: any = '';//还款银行卡号
  bankId: any;//银行卡id
  bankName: string;//银卡名

  money: number = 0;//还需总还款
  residue: number = 0;//剩余还款
  borrow: any;//还款金额
  phoneName: number;//用户账号
  redata: any = '';//返回数据

  prin: number = 0;//待还本金
  interest: number = 0;//待还利息
  lateCharge: number = 0;//逾期罚息

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpservice: HttpServiceProvider,
    public alertCtrl: AlertController,
    public helpers: HelpersProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Repayment2Page');
  }

    /**
   * 即将进入页面是执行
   */
  ionViewWillEnter(){
    this.borrow = this.navParams.get('key1');//获取待还金额;
  }
}
