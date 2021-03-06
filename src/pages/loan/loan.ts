import { SERVER_URL, MFQB_URL } from './../../providers/constants/constants';
import { NativeServiceProvider } from './../../providers/native-service/native-service';
import { UtilsProvider } from './../../providers/utils/utils';
import { Component, Input, Output, ViewChild } from '@angular/core';
import { IonicPage, NavController, Toggle, Slides, NavParams, ActionSheetController, AlertController, ModalController } from 'ionic-angular';
import { Response, Http } from "@angular/http";
import 'rxjs/add/operator/map';
import $ from 'jquery';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ServiceInterfaceProvider } from '../../providers/service-interface/service-interface';

/**
 * Generated class for the LoanPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage(
  {
    name: 'LoanPage',
  }
)
@Component({
  selector: 'page-loan',
  templateUrl: 'loan.html',
})
export class LoanPage {
  private active: boolean;
  private money: number;
  private day: number;
  private fee: number;
  private actual: number;
  private interest: number;
  private RepayMoney: number;
  private repayment: string;
  private coupon: string;        //优惠券数据
  // private phone = localStorage.getItem('userPhone');
  private phone = this.navParams.get('phone');//用户电话号码
  public userId = this.navParams.get('userId');//用户id
  private bankCards: string;     //银行卡option
  private bank;                  //银行卡selected(银行卡id)
  bankName: string;//银行卡名
  bankNum: any;//银行卡号
  isAgree: boolean;        //此银行卡是否已签协议(已签则有值,没签则为空)

  private couponID: any = "";     //优惠券id
  private isCoupon: number = 2;   //是否使用优惠卷,1为使用,2为不使用
  private couponMoney: number = 0;//优惠卷抵用金额
  private isshow;



  //服务费用
  public allCharge;                 //综合费用
  public platform_cost;             //平台费用
  public information_cost           //信息费用
  public risk_cost                  //风控费用
  public account_cost               //账户费用

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public http: HttpServiceProvider,
    public alertCtrl: AlertController,
    public helpers: HelpersProvider,
    public modalCtrl: ModalController,
    public utils: UtilsProvider,
    public native: NativeServiceProvider,
    public serviceinterface: ServiceInterfaceProvider,

  ) {
    this.active = true;
    this.isshow = false;

    // .toFixed(2) 保留两位小数;parseFloat()将字符串转换成浮点型
    this.money = parseFloat(this.navParams.get('money').toFixed(2));                       //借款金额 
    this.day = this.navParams.get('day');                                                  //借款期限  

    this.interest = parseFloat((this.money * this.day * 0.36 / 12).toFixed(2));                  //利息

    this.actual = parseFloat(this.navParams.get('actual').toFixed(2));                      //到账金额
    this.RepayMoney = parseFloat((this.money + this.interest).toFixed(2));                   //还款金额
    // // this.repayment = '到期一次付清';                                                          //还款方式
    // this.allCharge = parseFloat(this.navParams.get('allCharge').toFixed(2));                  //总服务费用
    // this.platform_cost = parseFloat(this.navParams.get('platform_cost').toFixed(2));            //平台费用
    // this.information_cost = parseFloat(this.navParams.get('information_cost').toFixed(2));      //信息费用
    // this.risk_cost = parseFloat(this.navParams.get('risk_cost').toFixed(2));                     //风控费用
    // this.account_cost = parseFloat(this.navParams.get('account_cost').toFixed(2));                //账户费用

    this.allCharge = 0;                  //总服务费用
    this.platform_cost = 0;            //平台费用
    this.information_cost = 0;      //信息费用
    this.risk_cost = 0;                     //风控费用
    this.account_cost = 0;                //账户费用

    console.log(this.money);
  }

  agree() {
    this.active = !this.active;
  }

  //选择还款方式
  repaymentSelect() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '还款方式',
      buttons: [
        {
          text: '到期一次付清',
          handler: () => {
            this.repayment = '到期一次付清';
          }
        },
        {
          text: '15天',
          handler: () => {
            this.repayment = '';
          }
        },
        {
          text: '7天',
          handler: () => {
            this.repayment = '';
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  ionViewDidLoad() {
    this.helpers.hideTabs1();
  }

  ionViewWillLeave() {
    this.helpers.hideTabs2();
  }


  ionViewWillEnter() {
    console.log(this.interest)
    this.userInfo();
    this.couponInfo();
  }


  //去选择优惠卷
  toChooseCoupons() {
    console.log(JSON.parse(localStorage.getItem('ChooseCoupons')));     //返回的数据
    if (localStorage.getItem('ChooseCoupons')) {
      let profileModal = this.modalCtrl.create('ChooseCouponsPage', { id: JSON.parse(localStorage.getItem('ChooseCoupons')).back_index });
      profileModal.onDidDismiss(data => {
        console.log(data);
        if (data) {
          console.log(JSON.parse(data))
          this.coupon = `已选${JSON.parse(data).back_value}元${JSON.parse(data).back_mold}`;
          this.isCoupon = 1;                                    //以选择优惠卷
          this.couponID = JSON.parse(data).back_id;            //优惠卷的id
          this.couponMoney = JSON.parse(data).back_value;
          this.RepayMoney = parseFloat((this.money + this.interest - this.couponMoney).toFixed(2));  //还款金额
          console.log(this.RepayMoney)
        } else {

        }
      });
      profileModal.present();
    } else {
      let profileModal = this.modalCtrl.create('ChooseCouponsPage', {});
      profileModal.onDidDismiss(data => {
        if (data) {
          console.log(JSON.parse(data))
          this.coupon = `已选${JSON.parse(data).back_value}元${JSON.parse(data).back_mold}`;
          this.isCoupon = 1;                                    //以选择优惠卷
          this.couponID = JSON.parse(data).back_id;            //优惠卷的id
          this.couponMoney = JSON.parse(data).back_value;
          this.RepayMoney = parseFloat((this.money + this.interest - this.couponMoney).toFixed(2));  //还款金额
          console.log(this.RepayMoney)

        } else {

        }
      });
      profileModal.present();
    }
  }


  /**
   * 查询优惠卷
   */
  couponInfo() {
    // let getItem = localStorage.getItem("user");
    // let json = JSON.parse(getItem);
    let params = {
      loginName: this.phone,
      type: 1
    }
    this.http.get(SERVER_URL + '/cf_main/cf/user/myCoupon', params)
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        let couponData = data.data.cfMyCoupons;

        if (data.success) {
          if (couponData.length == 0) {
            this.coupon = "无可用券";
          } else {
            this.coupon = "有可用券";
          }
        }

      }, err => { this.utils.showBlock('服务器连接错误,请稍候重试'); }
      )
  }


  /**
   * 调用反欺诈
   */
  checkUser() {

    // 白骑士反欺诈接入
    let bqsParam = {
      tokenKey: localStorage.getItem('bqiToken'),
      mobile: localStorage.getItem('userPhone')
    }
    let id = localStorage.getItem('bqiToken');
    let phone = localStorage.getItem('userPhone');
    this.http.get(SERVER_URL + `/cf_main/BqsAntiFraud/accessLoanAPI`, bqsParam)
      .subscribe(
      data => console.log(JSON.stringify(data)),
      e => console.log(JSON.stringify(e))
      )

    //同盾反欺诈接入
    // let token = localStorage.getItem('tongdun');
    // // let token = localStorage.getItem('uuid');
    // let p = { mobile: phone, token: token, mobileType: 'H5' }
    // console.log(p);

    // this.http.postFormData(SERVER_URL + `/cf_main/tongDunAPI/getEquiInfo`, p)
    //   .subscribe(
    //   data => console.log(data)
    //   )
  }

  /**
   * 点击确认提交
   */
  toVerification(obj) {


    // 银行卡未验证跳到第三方认证
    if (!this.isAgree) {
      let alert = this.alertCtrl.create({
        title: '您的银行卡还没有签约,现在进行签约?',
        buttons: [
          {
            text: '取消',
          },
          {
            text: '确定',
            handler: () => {
              this.toGetAgree();//签约方法
            }
          }
        ]
      });
      alert.present();
      return;
    }


    if (obj == '有可用券') {
      let alert = this.alertCtrl.create({
        title: '您有可用券未使用',
        buttons: [
          {
            text: '不了，提交',
            handler: () => {
              this.submintInterface();
            }
          },
          {
            text: '去使用',
            handler: () => {
              this.toChooseCoupons();
            }
          }
        ]
      });
      alert.present();
    } else {
      this.submintInterface();
    }
  }


  /**
   * 通过验证提交表单数据
   * 
   */
  submintInterface() {

    this.checkUser();

    let p = {
      page: 'loan',                      //申请借款页面
      // isAgree:this.isAgree,           //银行卡是否已认证
      bankId: this.bank,                 //收款账号(银行卡id)
      loanAmounts: this.money,           //借款金额
      loanDays: this.day,                //借款期限
      intoAmounts: this.actual,          //实际到账金额
      allCharge: this.allCharge,         //综合总费用综合总费用
      loanPenalty: this.interest,        //利息
      repaymentAmount: this.RepayMoney,  //还款金额
      isCoupon: this.isCoupon,           //是否使用优惠卷
      couponid: this.couponID,           //优惠券
      repaymentMode: 1,                  //还款方式(1到期一次清2分期还款)
    }
    console.log(p)
    this.navCtrl.push('VerificationPage', p, { duration: 300 });
  }


  /**
   * 平台服务协议
   */
  showAgreement(type) {
    let date = new Date();
    let t = date.getTime();
    // let repayDay = t + (this.day - 1) * 24 * 60 * 60 * 1000;
    let repayDay = t + (this.day * 30 - 1) * 24 * 60 * 60 * 1000;
    let url = SERVER_URL + `/cf_main/cf/agreement?loginName=${this.phone}&type=${type}&periods=1&beginDay=${t}&repaymentDay=${repayDay}&repaymentMoney=${this.RepayMoney}&principal=${this.money}&interests=${this.interest}&platformMoney=${this.platform_cost}&accountMoney=${this.account_cost}&riskMoney=${this.risk_cost}&informationMoney=${this.information_cost}`
    this.native.themeable(url);
  }

  /**
   * 展示协议
   */
  showAgreement2(type) {
    this.native.themeable(SERVER_URL + `/cf_main/cf/agreement?loginName=${this.phone}&type=${type}`);
  }

  /**
   * 跳到第三方签银行卡协议
   */
  toGetAgree() {

    let param = {
      userId: this.userId,
      bankId: this.bank,
    }
    console.log(param);
    this.http.post(SERVER_URL + '/cf_main/user/confirmSignContract', param)
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);

        // alert(SERVER_URL + data.data.actionUrl);
        this.native.themeable(SERVER_URL + data.data.actionUrl)//打开第三方签约页面
          .on('closeevent')
          .subscribe(
          data => {
            this.userInfo();//从浏览器回到页面重新查询银行卡状态
          }
          );
      }, err => {
        this.utils.showBlock('服务器连接错误,请稍候重试');
      }
      )
  }



  /**
   * 查询银卡
   */
  userInfo() {
    let getItem = localStorage.getItem("user");
    let json = JSON.parse(getItem);
    this.couponID = json.back_id;


    this.http.get(SERVER_URL + '/cf_main/cf/userInfoBankCard', { loginName: this.phone, params: 'RYDCF09072107' })
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        if (data.success) {
          let bankData = data.data[0];

          this.bankCards = data.data;//银行卡数组
          this.isAgree = data.data.noAgree;//银行卡认证
          this.bank = data.data.cardID;//银行卡id
          this.bankName = data.data.bankName;
          this.bankNum = data.data.bankNO;
        } else {

        }

      }, err => {
        this.utils.showBlock('服务器连接错误,请稍候重试');
      }
      )

  }

  /**
  * 点击问号显示综合手续费详情
  */
  showDetail() {

    let charges = this.native.getCharge(this.money, this.day);

    let alert = this.alertCtrl.create({
      title: '综合费用',
      subTitle: `<div class="alert-left">平台服务费</div><div class="alert-right">${charges[0]}元</div>
               <div class="alert-left">信息认证费</div><div class="alert-right">${charges[1]}元</div>
               <div class="alert-left">风控服务费</div><div class="alert-right">${charges[2]}元</div>
               <div class="alert-left">账户管理费</div><div class="alert-right">${charges[3]}元</div>
               <div class="alert-count">总计</div><div class="alert-money">${charges[4]}元</div> `,
      buttons: ['确定']
    });
    alert.present();
  }
  /**
   *   一进入页面就查询优惠券
   */
  // couponInfo() {
  //   let getItem = localStorage.getItem("user");
  //   let json = JSON.parse(getItem);
  //   let params = {
  //     loginName: json.mobile,
  //     type: 1
  //   }
  //   this.http.get(SERVER_URL + '/cf_main/cf/user/myCoupon', params)
  //     .map(data => data.json())
  //     .subscribe(
  //     data => {
  //       console.log(data);
  //       if (data.success) {

  //         if (localStorage.getItem('ChooseCoupons')) {
  //           let json = JSON.parse(localStorage.getItem('ChooseCoupons'));
  //           let value = json.back_value;
  //           let type = json.back_mold;

  //           this.coupon = "已选" + value + '元' + type;

  //           // 判断是否使用了优惠卷
  //           this.couponID = json.back_id;
  //           if (this.couponID != "") {
  //             this.isCoupon = 1;
  //           }

  //           // 还款金额减去优惠卷金额
  //           this.couponMoney = value;
  //           console.log(this.couponMoney);
  //           this.RepayMoney = parseFloat((this.money + this.interest - this.couponMoney).toFixed(2));  //还款金额

  //         } else {
  //           this.coupon = "有可用券";
  //         }

  //       } else {
  //         this.coupon = "无可用券";
  //       }
  //     }
  //     )
  // }


  ionViewDidLeave() {
    localStorage.removeItem('ChooseCoupons');//清除优惠卷缓存
  }


}
