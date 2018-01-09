import { UtilsProvider } from './../../providers/utils/utils';
import { Component, Output, OnChanges, EventEmitter, OnInit, NgModule } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { SERVER_URL } from '../../providers/constants/constants';
import { HelpersProvider } from '../../providers/helpers/helpers';
/**
 * Generated class for the NeedmoenyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: "NeedmoenyPage"
})
@Component({
  selector: 'page-needmoeny',
  templateUrl: 'needmoeny.html',
})
export class NeedmoenyPage {

  prin: number;//本金
  interest: number;//利息
  overdue: number;//逾期利息
  coupon: any;//优惠卷
  all: number;//总计需还款
  isCoupon:boolean;//是否使用优惠卷

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private httpservice: HttpServiceProvider,
    public helpers:HelpersProvider,
    public utils:UtilsProvider
  ) {
  }


  ngOnInit() {
    //初始化
    this.prin = 0;
    this.interest = 0;
    this.overdue = 0;
    this.coupon = "";
    this.all = 0;
    this.isCoupon = false;
  }

  ionViewWillEnter() {

    let code = this.navParams.get('key1');

    let params = {
      orderCode: code
    }
    console.log(params);

    this.httpservice.get(SERVER_URL + '/cf_main/cf/order/cfORepaymentDetail', params)
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);

        if (data.success) {
          this.prin = data.data.capital;
          this.interest = data.data.interest;
          this.overdue = data.data.lateCharge;
          this.coupon = data.data.coupon;
          this.all = data.data.sum;

          if(this.coupon != 0.0){
            this.isCoupon = true;
          }
        }
      },
      erro => { this.utils.showBlock('服务器连接错误,请稍候重试'); },

    )
  }



  //弹窗
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: '逾期罚息',
      subTitle: `每日罚息为待还本金*0.3% `,
      buttons: ['确定']
    });
    alert.present();
  }

  //进入逾期罚息详情页
  go_penalty() {
    this.navCtrl.push("PenaltyPage", {code:this.navParams.get('key1')}, { duration: 300 });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.helpers.hideTabs1();

  }
  

  ionViewWillLeave(){
  this.helpers.hideTabs2();
  }


}
