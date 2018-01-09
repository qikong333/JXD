import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SERVER_URL } from '../../providers/constants/constants';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the DelaymoneyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: "DelaymoneyPage"
})
@Component({
  selector: 'page-delaymoney',
  templateUrl: 'delaymoney.html',
})
export class DelaymoneyPage {

  id:number = 0;//次数
  prin: number = 0;//本金
  interest: number = 0;//利息
  time: any = "";//延期时间
  date: any = "";//还款日期
  delayPoundage: number = 0;//延迟手续费
  delayInterest: number = 0;//延期利息
  all: number = 0;//需要总还款

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpservice: HttpServiceProvider,
    public helpers:HelpersProvider
  ) {


  }

  ionViewWillEnter() {
    let delay = this.navParams.get('key1');
    let num = this.navParams.get('key2');
    this.id = num;

    let params = {
      extensionId: delay
    }

    // http://192.168.4.40:8080/cf_main/cf/order/cfOrderExtension?extensionId=15
    this.httpservice.get(SERVER_URL + '/cf_main/cf/order/cfOrderExtension', params)
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        if (data.success) {
          this.prin = data.data.stayPrincipal;
          this.interest = data.data.overduePenalty;
          this.time = data.data.delayDays;
          this.date = data.data.repaymentDate;
          this.delayPoundage = data.data.delayPoundage;
          this.delayInterest = data.data.delayInterest;
          this.all = data.data.sumRepayment;
        }
      },
      erro => { console.log(erro) },

    )
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.helpers.hideTabs1();

  }
  

  ionViewWillLeave(){
  this.helpers.hideTabs2();
  }

}
