import { SERVER_URL } from './../../providers/constants/constants';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
/**
 * Generated class for the DelayPaymentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'DelayPaymentPage'
})
@Component({
  selector: 'page-delay-payment',
  templateUrl: 'delay-payment.html',
})
export class DelayPaymentPage implements OnInit {

  code:any; //订单号
  prin: number = 5000;//待还本金
  interest: number = 52.9;//待还利息
  time: number = 7;//延迟时间
  repayDate: any = '';//应该还款日期
  delayDate: any = '';//延迟还款日期

  overdue: number = 0;//延迟手续费
  overInterest: number = 0;//延迟利息
  all: number = 0;//延迟结束需还款
  needpay: number = 0;//本次延迟需支付

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public httpservice: HttpServiceProvider,
    public alertCtrl: AlertController,
    public helpers:HelpersProvider
  ) {
  }

 ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.helpers.hideTabs1();

  }
  

  ionViewWillLeave(){
  this.helpers.hideTabs2();
  }
  ngOnInit() {
    //初始化
    // this.time = "7天";
  }

  ionViewWillEnter() {

    this.code = this.navParams.get('orderCode');


    this.repayDate = 1500622546000;
    // this.delayDate = this.repayDate + 24*60*60*1000*7;
    this.getRepayNum(7);
  }

  /**
   * 选择延迟时长
   */
  getTime() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '延迟时长',
      buttons: [
        {
          text: '30天',
          handler: () => {
            this.time = 30;
            this.getRepayNum(this.time);
          }
        },
        {
          text: '15天',
          handler: () => {
            this.time = 15;
            this.getRepayNum(this.time);

          }
        },
        {
          text: '7天',
          handler: () => {
            this.time = 7;
            this.getRepayNum(this.time);

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

  /**
   * 根据延迟时长计算延迟还款时间,延迟利息,手续费等金额的方法
   * @param time 
   */
  getRepayNum(time: number) {
    this.delayDate = this.repayDate + 24 * 60 * 60 * 1000 * time;

    this.overdue = this.prin * 0.01;
    this.overInterest = this.prin * 0.0005 * time;
    this.all = this.prin + this.overInterest;
    this.needpay = this.interest + this.overdue;

  }

  /**
   * 点击确定延迟并还款提交的方法
   */
  // private String orderCode;    // 订单号(引用订单表)
  // private Integer delayNumber;    // 延期次数(限2次)
  // private Double stayPrincipal;    // 待还本金
  // private Double stayInterest;    // 待还利息
  // private Integer delayDays;    // 延期天数
  // private Date repaymentDate;    // 延期后还款时间
  // private Double delayPoundage;    // 延期手续费
  // private Double delayInterest;    // 延期利息
  // private Double sumRepayment;    // 延期结束需还款
  // private Double prePayment;    // 本次延期需先还款
  goDelay() {

    let params = {
      orderCode: '2017071400015',
      delayNumber: 1,
      stayPrincipal: this.prin,
      stayInterest: this.interest,
      delayDays: this.time,
      repaymentDate: this.delayDate,
      delayPoundage: this.overdue,
      delayInterest: this.overInterest,
      sumRepayment: this.all,
      prePayment: this.needpay
    }

    this.httpservice.post(SERVER_URL + '/cf_main/cf/wap/saveOrderExtension', params)
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);

        if (data.success) {
          this.success(data);
        } else {
          let alert = this.alertCtrl.create({
            title: data.msg,
            buttons: ['确定']
          });
          alert.present();
        }


      },
      erro => {
        console.log(erro);
      })


  }

  /**
	 * 成功时弹窗函数
	 */
  success(data) {

    let alert = this.alertCtrl.create({
      title: data.msg,
      buttons: [
        {
          text: '确定',
          handler: () => {
            // 跳转下一页
            this.navCtrl.push('BorrowDetailsPage', {orderCode:this.code}, { duration: 300 })
          }
        }
      ]
    });
    alert.present();
  }

}
