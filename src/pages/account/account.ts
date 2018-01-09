import { NativeServiceProvider } from './../../providers/native-service/native-service';
import { UtilsProvider } from './../../providers/utils/utils';
import { LoanPageModule } from './../loan/loan.module';
import { LoanPage } from './../loan/loan';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { SERVER_URL } from './../../providers/constants/constants';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Events, ModalController, AlertController } from 'ionic-angular';
import { ServiceInterfaceProvider } from '../../providers/service-interface/service-interface';



@IonicPage({
  name: "AccountPage",
})
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',

})
export class AccountPage implements OnInit, OnDestroy {

  userId: any; //用户id
  isLogin: boolean; //是否已登录
  phone: number;  //手机号码
  bankDetail: any;  //银行卡详情
  username: string;    //用户名

  myLimit: number = 0; //我的借款额度
  myRepay: number = 0; //我的待还金额
  repayDate: any = '';//还款时间
  limit: any = '';//提升额度
  myBorrow: any = '';//我的借款
  bank: any = '';//银行卡
  coupon: any = '';//优惠卷
  overdue: boolean = false;//判断是否显示逾期提示框

  network: boolean; //获取网络连接结果

  demo: any;

  ME_QUOTA: boolean
  ME_MYIOAN: boolean
  ME_BANKCAR: boolean
  ME_COUPON: boolean
  ME_INVITE: boolean
  ME_HELP: boolean
  ME_SETTING: boolean

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public serviceinterface: ServiceInterfaceProvider,
    public httpservice: HttpServiceProvider,
    public nav: Nav,
    public events: Events,
    public modal: ModalController,
    public alertCtrl: AlertController,
    public utils: UtilsProvider,
    public native: NativeServiceProvider

  ) {
    this.isLogin = false;
  }

  ngOnInit() {


  }

  funOpen() {
    this.serviceinterface.Funct()
      .map(data => data.json())
      .subscribe(
      data => {
        if (data.success) {
          this.ME_QUOTA = data.data.ME_QUOTA;
          this.ME_MYIOAN = data.data.ME_MYIOAN;
          this.ME_BANKCAR = data.data.ME_BANKCAR;
          this.ME_COUPON = data.data.ME_COUPON;
          this.ME_INVITE = data.data.ME_INVITE;
          this.ME_HELP = data.data.ME_HELP;
          this.ME_SETTING = data.data.ME_SETTING;
        }
      }
      )
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }


  /**
   * 进入此页面时自动加载
   */
  ionViewWillEnter() {

    this.network = this.native.getNetwork();

    this.funOpen();

    console.log(this.navCtrl.getViews())

    let login = localStorage.getItem("loginState");

    let getItem = localStorage.getItem("user");
    let json = JSON.parse(getItem);


    if (login) {//判断是否已登录
      this.phone = json.mobile;
      this.isLogin = true;
      console.log(json.mobile);
      this.getUserdata(json.mobile);
    } else {
      this.isLogin = false;

      this.myLimit = 0; //我的借款额度
      this.myRepay = 0; //我的待还金额
      this.repayDate = '';//还款时间
      this.limit = '';//提升额度
      this.myBorrow = '';//我的借款
      this.bank = '';//银行卡
      this.coupon = '';//优惠卷
      this.overdue = false;//判断是否显示逾期提示框
    }

    // 重新新获取gps
    let gps = localStorage.getItem('gps');
    if (!gps) {
      this.reGetGps();
    }

  }


  /**
   * 连接失败时重新加载
   */
  willEnt() {
    alert('拿到啦')
    this.ionViewWillEnter();
  }

  /**
 * 获取gps
 */
  reGetGps() {
    this.serviceinterface.GBS()//gps
      .map(data => data.json())
      .subscribe(
      data => {
        let address = data.content.address_detail.province + ',' + data.content.address_detail.city;
        localStorage.setItem('gps', address);

      }, err => {
      });
  }


  /**
   * 下拉刷新
   */
  doRefresh(refresh) {
    this.ionViewWillEnter();
    this.funOpen();
    setTimeout(function () {
      refresh.complete();
    }, 500);
  }


  /**
   * 查询个人账户
   */
  getUserdata(mobile) {

    this.httpservice.get(SERVER_URL + '/cf_main/cf/wap/myInfo', { loginName: mobile })
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        if (data.success) {

          this.demo = data.data;

          this.myLimit = data.data.quotaMoney;
          this.myRepay = data.data.endRepayment;
          this.repayDate = data.data.endDate;
          this.myBorrow = data.data.myExcuses;
          this.bank = data.data.borrowBankCardName;
          this.coupon = data.data.couponNumber;

          if (data.data.auditStatus == '不通过') {
            this.limit = "提升额度";
          }
          if (data.data.orderStatus == '逾期中') {
            this.overdue = true;
          }


        }
      },
      erro => { this.utils.showBlock('服务器连接错误,请稍候重试'); },
    )

  }



  /**
   * 点击借款跳到首页
   */
  goBorrow() {
    // this.navCtrl.push('HomePage', {}, { duration: 300 });

    this.events.publish('changeTab', 0);

  }

  /**
   * 点击还款调到我的借款
   */
  goRepay() {
    this.navCtrl.push('MyBorrowPage', {}, { duration: 300 });

  }

  //  ionViewCanLeave(): boolean{
  //    // here we can either return true or false
  //    // depending on if we want to leave this view
  //    if(!localStorage.getItem('loginState')){
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }

  /**
   * 点击还款跳到额度认证
   */
  goLimit() {
    this.navCtrl.push('InformationsPage', {}, { duration: 300 });

  }

  //跳登录页面
  toLogin() {
    this.navCtrl.push('LoginPage', {}, { duration: 300 });
  }

  //跳注册页面
  toRegister() {
    this.navCtrl.push('RegisterPage', {}, { duration: 300 });
  }


  //跳额度认证
  toProgress() {
    if (!localStorage.getItem('loginState')) {
      // let profileModal = this.modal.create('LoginPage');
      // profileModal.present();
      this.navCtrl.push('LoginPage');
      return;
    }
    if (!localStorage.getItem('loginState')) {
      this.navCtrl.push('QuotaPage')
      return;
    }
    this.navCtrl.push('QuotaPage', {}, { duration: 300 })


  }

  //跳我的借款
  toMyBorrow() {
    if (!localStorage.getItem('loginState')) {
      this.navCtrl.push('LoginPage');
      return;
    }
    this.navCtrl.push('MyBorrowPage', {}, { duration: 300 })
  }

  //跳收款银行卡
  toReceeptBank() {
    if (!localStorage.getItem('loginState')) {
      this.navCtrl.push('LoginPage');

    } else if (!this.bank) {

      let alert = this.alertCtrl.create({
        title: '您还没有绑定银行卡,现在进行身份认证?',
        buttons: [
          {
            text: '取消',
          },
          {
            text: '确定',
            handler: () => {
              this.navCtrl.push('InformationsPage', {}, { duration: 300 })

            }
          }
        ]
      });
      alert.present();

    } else {
      this.navCtrl.push('ReceeptBankPage', {}, { duration: 300 })
    }
  }

  //跳优惠券
  toCoupons() {
    if (!localStorage.getItem('loginState')) {
      this.navCtrl.push('LoginPage');
      return;
    }
    this.navCtrl.push('CouponsPage', {}, { duration: 300 })
  }



  //跳邀请好友
  // toCoupons(){
  //   this.navCtrl.push('CouponsPage')
  // }

  //跳帮助中心
  toHelpcenter() {
    // if (!localStorage.getItem('loginState')) {
    //   this.navCtrl.push('LoginPage')
    //   return;
    // }
    this.navCtrl.push('HelpcenterPage', {}, { duration: 300 });
  }

  //跳设置
  toSetup() {
    // if (!localStorage.getItem('loginState')) {
    //   this.navCtrl.push('LoginPage')
    //   return;
    // }
    this.navCtrl.push('SetupPage', {}, { duration: 300 });
  }



}
