import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SERVER_URL } from '../../providers/constants/constants';
import { HelpersProvider } from '../../providers/helpers/helpers';

 
@IonicPage(
  {
    name: 'RepaymentPage',
  }
)
@Component({
  selector: 'page-repayment',
  templateUrl: 'repayment.html',
})
export class RepaymentPage {

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



  /**
   * 即将进入页面是执行
   */
  ionViewWillEnter() {
    this.borrow = '';
    let num = this.navParams.get('key1');//获取待还金额
    this.code = this.navParams.get('orderCode');//获取订单号

    if (num) {
      this.money = num;
      this.residue = num;

    }

    let user = localStorage.getItem("user");
    console.log(user);
    if (user != null) {
      var json = JSON.parse(user);//将其转换成json对象
      this.phoneName = json.mobile;
    }

    this.bankInfo();//查询银行卡接口


    // 待还金额明细
    this.httpservice.get(SERVER_URL + '/cf_main/cf/order/cfORepaymentDetail', { orderCode: this.code })
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        if (data.success) {
          this.prin = data.data.capital;//待还本金
          this.interest = data.data.interest;//待还利息
          this.lateCharge = data.data.lateCharge;//逾期利息
        }
      },
      erro => { console.log(erro) },
    )
  }



  /**
  * 查询银卡
  */
  bankInfo() {
    let getItem = localStorage.getItem("user");
    let json = JSON.parse(getItem);

    this.httpservice.get(SERVER_URL + '/cf_main/cf/userInfoBankCard', { loginName: json.mobile, params: 'RYDCF09072107' })
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        if (data.success) {
          let bankData = data.data[0];

          this.bankId = data.data.cardID;//银行卡id
          this.bankName = data.data.bankName;
          this.bankNum = data.data.bankNO;

          // console.log(this.bankCards)
          // console.log(this.isAgree)
        } else {

        }
      }
      )


    // let p = {
    //   loginName: this.phoneName,
    //   params: 'RYDCF09072107'
    // }

    // // 查询银行卡
    // this.httpservice.get(SERVER_URL + '/cf_main/cf/userInfoBankCard', p)
    //   .map(data => data.json())
    //   .subscribe(
    //   data => {
    //     console.log(data);
    //     if (data.success) {
    //       this.redata = data.data;
    //       this.bank = this.redata[0].BANK_CARD;//初始化银行卡
    //     }
    //   },
    //   erro => { console.log(erro) },
    // )
  }

  /**
   * 输入还款金额
   */
  getResidue() {

    if (this.borrow > this.money || this.borrow < 0) {
      this.showAlert("输入的还款金额有误");
    } else {
      this.residue = parseFloat((this.money - this.borrow).toFixed(2));
    }
  }

  /**
   * 一键还清
   */
  getAll() {
    this.borrow = this.money;

    if (this.borrow > this.money || this.borrow < 0) {
      this.showAlert("输入的还款金额有误");
    } else {
      this.residue = parseFloat((this.money - this.borrow).toFixed(2));
    }
  }


  /**
   * 改变银行卡选择项时自动调用此方法,根据value值来判断添加还款银行卡
   * 添加还款银行卡
   */
  getValue() {
    console.log(this.bankId);
    if (this.bank == 'add') {
      this.navCtrl.push('RepayBankPage', {}, { duration: 5 });
    }
  }


  /**
   * 确定还款
   */
  toRepay() {


    if (this.bankNum == "") {
      this.showAlert("请选择还款银行卡");
    } else 
    if (this.borrow == undefined) {
      this.showAlert("请输入还款金额");
    } else if (this.borrow > this.money || this.borrow <= 0) {
      this.showAlert("输入的还款金额有误");
    } else if (this.borrow < 200) {
      this.showAlert("单次还款金额不能低于200元");
    } else if (this.residue < 200 && this.residue > 0) {
      this.showAlert("剩余待还金额不能小于200元");
    }
    else {
      this.present_repay();
    }

  }

  /**
   * 点击确定还款提交数据连接后台接口的方法
   */
  present_repay() {
    let p = {
      page: 'repay',
      orderCode: this.code,
      bankNum: this.bankNum,
      repaymentAmount: this.borrow,
      residue: this.residue

    }
    console.log(p);
    this.navCtrl.push('VerificationPage', p, { duration: 300 });
  }


  /**
   * 延迟还款
   */
  todelay() {

    if (this.lateCharge) {
      this.showAlert('您已逾期,不能延迟还款')
    } else if (this.navParams.get('delayNum') >= 2) {
      this.showAlert('延迟还款不能超过两次');
    } else {
      this.navCtrl.push('DelayPaymentPage', { orderCode: this.code }, { duration: 300 });
    }
  }

  /**
   * 点击小问号显示待还金额详情
   */
  getDetails() {

    let alert = this.alertCtrl.create({
      title: '待还金额',
      // es6 模板字符串
      subTitle: `<div class="alert-left">待还本金</div><div class="alert-right">${this.prin}元</div>
               <div class="alert-left">待还利息</div><div class="alert-right">${this.interest}元</div>
               <div class="alert-left">逾期罚息</div><div class="alert-right">${this.lateCharge}元</div>
               `,
      buttons: ['确定']
    });
    alert.present();

  }

  /**
   * 跳转到帮助页面
   */
  getHelp(){
      this.navCtrl.push('HelpcenterPage', { orderCode: this.code }, { duration: 300 });
  }

  
  /**
   * 表单验证弹窗方法
   * @param text 
   */
  showAlert(text) {
    let alert = this.alertCtrl.create({
      title: text,
      buttons: ['确定']
    });
    alert.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.helpers.hideTabs1();

  }
  ionViewWillLeave() {
    this.helpers.hideTabs2();
  }

}
