import { SERVER_URL } from './../../providers/constants/constants';
import { LoanPage } from './../loan/loan';
import { UtilsProvider } from './../../providers/utils/utils';
import { Component, OnInit, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Platform } from 'ionic-angular';
import { Response, Http } from "@angular/http";
import { NativeServiceProvider } from '../../providers/native-service/native-service';
import { ActionSheetController } from 'ionic-angular';
import { ServiceInterfaceProvider } from "../../providers/service-interface/service-interface";

import 'rxjs/add/operator/map';
// import $ from 'jquery';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
// import { Network } from '@ionic-native/network';
import { Network } from "@ionic-native/network";
import { HelpersProvider } from '../../providers/helpers/helpers';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name: 'HomePage'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  // providers: [LoanPage]
})
export class HomePage {
  public boxState; //box状态
  public active: number = 0;//申请借款状态--未登录（0），登录未验证（1），登录已认证（2）

  saturation: number = 20000;//借款金额
  max_money: number = 20000; //最大金额
  min_money: number = 500;//最小金额
  realMoney: number;//到帐金额
  serviceMoney: number;//综合费用
  time_limit: any = 18;//期限
  pass = 0;//借款状态--未借款（1），有借款（0）
  rate: number = 0.36;// 费率(初始化以14天)

  userData: any = '';//获取用户信息数组
  service: boolean;//判断服务器连接情况

  constructor(
    public navCtrl: NavController,
    public navparams: NavParams,
    private http: Http,
    public actionSheetCtrl: ActionSheetController,
    public httpservice: HttpServiceProvider,
    public alertCtrl: AlertController,
    public utils: UtilsProvider,
    private network: Network,
    public serviceinter: ServiceInterfaceProvider,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public native: NativeServiceProvider,
    public helpers:HelpersProvider,
  ) {
    
  }

  ionViewWillEnter() {
    this.state();
    this.changeMoney();

    this.helpers.getbqsToken();
  }


  //重新加载
  willEnt() {
    this.state();
    alert('父组件')
  }

  /**
 * 下拉刷新
 * @param obj
 */
  doRefresh(obj) {
    this.ionViewWillEnter();
    setTimeout(function() {
      obj.complete();
    }, 400);
  }


  /**
   * 初始状态判断状态
   */
  state() {
    if (this.network.type == 'none') {                                        //判断网络连接
      this.boxState = 10;
    } else if (localStorage.getItem('loginState') == "true") {               //登录
      this.dataSerch();
    } else {                                                                  //未登录
      this.active = 0;
      this.max_money = 20000;
      this.saturation = 20000;
      this.min_money = 500;
    }
  }

  /**
   * 改变金额获取个数据
   */
  changeMoney() {
    // console.log(this.saturation);
    this.serviceMoney = parseFloat((this.saturation * this.rate).toFixed(2));//综合费用(14天)
    // this.realMoney = parseFloat((this.saturation - this.serviceMoney).toFixed(2));//实际到帐金额
    this.realMoney = parseFloat((this.saturation).toFixed(2));//实际到帐金额
  }


  /**
 * 点击问号显示综合手续费详情
 */
  showDetail() {
    let charges = this.native.getCharge(this.saturation, this.time_limit);

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
   * 查询认证信息
   */
  dataSerch() {

    this.httpservice.get(SERVER_URL + '/cf_main/cf/user/personalInformation', { loginName: localStorage.getItem('userPhone') })
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        this.userData = data.data.personalInformation;  //用户信息数组

        if (data.success) {

          if (data.data.personalInformation.auditStatus == '1') {//登录已认证
            this.boxState = 1;
            this.active = 2;                                                                 //申请借款登录认证
            this.saturation = data.data.personalInformation.quotaMoney;//显示的金额
            this.max_money = data.data.personalInformation.quotaMoney;//拉动条最大金额
            this.min_money = data.data.personalInformation.quotaMoney < 500 ? 0 : 500;//拉动条最小金额
            this.pass = data.data.personalInformation.allowApplyMoney;                    //0允许借款,1提示进行还款,2待审核中,3不符合借款条件

          } else {//登录未认证
            this.boxState = 1;
            this.active = 1;                                                                       //申请借款登录未认证
          }

        }
        else {
          this.utils.showBlock(data.msg);
        }

      },
      error => {
        this.utils.showBlock('服务器连接错误,请稍候重试');
        this.boxState = 0;  //没有服务器
      }
      )
  }


  /**
   * 选择天数
   */
  dataSelect() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '借款期限',
      buttons: [
        // {
        //   text: '21天',
        //   handler: () => {
        //   }
        // },
        {
          text: '1个月',
          handler: () => {
            this.time_limit = 1;//时间
            this.rate = 0.36;//费率
            this.changeMoney();//重新计算金额

          }
        },
        {
          text: '2个月',
          handler: () => {
            this.time_limit = 2;
            this.rate = 0.36;
            this.changeMoney();
          }
        },
        {
          text: '3个月',
          handler: () => {
            this.time_limit = 3;
            this.rate = 0.36;
            this.changeMoney();
          }
        },
        {
          text: '6个月',
          handler: () => {
            this.time_limit = 6;
            this.rate = 0.36;
            this.changeMoney();
          }
        },
        {
          text: '12个月',
          handler: () => {
            this.time_limit = 12;
            this.rate = 0.36;
            this.changeMoney();
          }
        },
        {
          text: '18个月',
          handler: () => {
            this.time_limit = 18;
            this.rate = 0.36;
            this.changeMoney();
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
   * 点击申请借款跳转
   */
  toLoan() {
    
    if (this.boxState == 0) {
      this.utils.showAlert('服务器连接失败,请稍候重试');
      return;
    }

    if (this.active == 0) {                                                      //未登录
      this.showAlert('请您先登录帐号', 'LoginPage')
    } else if (this.active == 1) {                                                 //登录未验证
      this.showAlert('请您先完成额度信息完整性验证', 'QuotaPage')
    } else if (this.active == 2) {                                                 //登录已验证

      if (this.saturation == 0) {
        this.utils.showAlert('抱歉,你不符合平台借款人规则')
        return;
      }

      if (this.pass == 0) {                                               //登录认证-可以借款（0）

        this.toNextPage();//可以借款

      } else if (this.pass == 1) {
        this.showAlert('请先还清本次还款', 'MyBorrowPage');

      } else if (this.pass == 2) {
        this.utils.showAlert('您有待审核订单，不能再次申请');

      } else if (this.pass == 3) {
        this.utils.showAlert('抱歉,您不符合借款条件');
      }

    }
  }

  /**
   * 可以借款,跳转到下一页
   */
  toNextPage() {
    // let p = {
    //   cardNo: this.userData.idcard,
    //   name: this.userData.name,
    //   mobile: this.userData.mobile,
    //   userid: this.userData.userId,
    //   bankCard: this.userData.bankCards[0].bankCard
    // }
    // console.log(p);
    // //百融接口
    // this.http.post(SERVER_URL + `/cf_main/user/brTx`, p)
    //   .map(data => data.json())
    //   .subscribe(
    //   data => {
    //     console.log(data);

    //     if (data.success) {
    let charges = this.native.getCharge(this.saturation, this.time_limit);

    let params = {
      money: this.saturation,                         //借款金额
      day: this.time_limit,                           //天数
      actual: this.realMoney,                       //实际到账金额
      allCharge: this.serviceMoney,                     //总计手续费
      platform_cost: parseFloat(charges[0]),                 //平台费用
      information_cost: parseFloat(charges[1]),               //信息费用
      risk_cost: parseFloat(charges[2]),                     //风控费用
      account_cost: parseFloat(charges[3]),                  //账户费用

      userId: this.userData.userId,
      phone: this.userData.mobile,
    }
    console.log(params);
    this.navCtrl.push('LoanPage', params);

    //   } else {
    //     this.utils.showAlert(data.msg);
    //   }

    // }, err => {
    //   this.utils.showBlock('服务器连接错误,请稍候重试');
    // }
    // )
  }

  // 确定和未确定窗口
  showAlert(title, url) {
    let alert = this.alertCtrl.create({
      title: title,
      buttons: [
        { text: '取消' }
        , {
          text: '确定',
          handler: () => {
            this.navCtrl.push(url, {}, { duration: 300 })
          }
        }
      ]
    });
    alert.present();
  }

  //跳转登录
  toLogin() {
    this.navCtrl.push('LoginPage', {}, { duration: 300 });
  }

  //跳额度认证
  toProgress() {
    this.navCtrl.push('InformationsPage', {}, { duration: 300 });
  }
  //跳关于我们
  go_one() {
    this.navCtrl.push('AboutmePage', {}, { duration: 300 });
  }
  //跳帮助中心
  go_two() {
    this.navCtrl.push('HelpcenterPage', {}, { duration: 300 });
  }
  //跳新手必读
  go_three() {
    this.navCtrl.push('NovicePage', {}, { duration: 300 });
  }


  to_small(){
    if(localStorage.getItem('loginState') == "true"){
       this.navCtrl.push('DataLoanPage',{ type : "XED"})
    }else{
       this.navCtrl.push('LoginPage');
    }
  }

  to_blue(){
    if(localStorage.getItem('loginState') == "true"){
       this.navCtrl.push('DataLoanPage',{ type : "LBD"})
    }else{
       this.navCtrl.push('LoginPage');
    }
  }


}
