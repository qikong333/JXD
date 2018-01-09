import { UtilsProvider } from './../../providers/utils/utils';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { SERVER_URL } from './../../providers/constants/constants';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RepayscendPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-repayscend',
  templateUrl: 'repayscend.html',
})
export class RepayscendPage {

  private state: string    //登录状态
  public money: number = 0;  //待还金额
  public date: any;      //还款日期
  public order: any;     //订单号
  public flag: any = 0;    //判断显示(是否还款状态)

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: HttpServiceProvider,
    public utils:UtilsProvider,
  ) {

  }

  ionViewWillEnter() {
    console.log(localStorage.getItem('loginState'))
    this.state = localStorage.getItem('loginState');
    if (this.state) {
      this.getRepay();
    }
  }

  toLogin() {
    this.navCtrl.push('LoginPage');
  }

  /**
   * 查询还款情况
   */
  getRepay() {

    this.http.get(SERVER_URL + '/cf_main/order/repayMoneyAndDate', { loginName: localStorage.getItem('userPhone') })
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);

        if (data.success) {
          this.money = data.data.endRepayment;
          this.date = data.data.endDate;
          this.order = data.data.orderCode;
          this.flag = data.data.repaymentFlag;
          console.log(this.flag);
        }
      },err => {
        this.utils.showBlock('服务器连接错误,请稍候重试');
      }
      )

  }


  /**
   * 点击还款
   */
  toRepay() {
    if (this.money) {
    this.navCtrl.push('RepaymentPage', { key1: this.money, orderCode: this.order }, { duration: 300 });
    }
  }

}
