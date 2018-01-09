import { UtilsProvider } from './../../providers/utils/utils';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { SERVER_URL } from '../../providers/constants/constants';
import { ServiceInterfaceProvider } from '../../providers/service-interface/service-interface';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the ReloadBankPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'ReloadBankPage'
})
@Component({
  selector: 'page-reload-bank',
  templateUrl: 'reload-bank.html',
})
export class ReloadBankPage {

  banknumber: any;  //银行卡号
  bankname: string;  //银行名
  phonenumber: any;  //手机号码
  phonecount: any;   //手机验证码
  core: any;         //验证码button
  tuSrc: any;        //弹窗图片
  amount: number;    //判断验证码次数
  SMS: boolean;      //禁止验证码
  title: string;     //验证码
  core1: number;     //验证码
  username: string   //用户名
  phoneName: string; //登录账号(电话号码)
  userId: any;       //用户登录id

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public httpservice: HttpServiceProvider,
    public toastCtrl: ToastController,
    public serviceinterface: ServiceInterfaceProvider,
    public utils: UtilsProvider,
    public helpers: HelpersProvider
  ) {

    let user = localStorage.getItem("user");
    console.log(user);
    if (user) {
      let json = JSON.parse(user);//将其转换成json对象
      this.phoneName = json.mobile;
      this.userId = json.userid;
      this.username = json.name;

    }
    console.log(this.phoneName)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.helpers.hideTabs1();

  }
  ionViewWillLeave() {
    this.helpers.hideTabs2();
  }

  //即将要进入页面
  ionViewWillEnter() {
    this.banknumber = '';
    this.bankname = '';
    this.phonenumber = '';
    this.phonecount = '';
    this.core = '获取验证码';
    // this.SMS=false;
  }

  //获取图片验证码
  // getPicCode() {
  //   this.serviceinterface.VerifyCode()
  //     .subscribe(
  //     data => {
  //       console.log(data);
  //       this.tuSrc = data.url;
  //       console.log(this.tuSrc);
  //       this.showTuCode();
  //     }
  //     )
  // }


	/**
	 * 点击获取图片验证码
	 */
  getPicCode() {

    this.httpservice.get(SERVER_URL + '/cf_main/cf/VerifyCode', { uid: this.phonenumber })
      // .map(res=>res.json())
      .subscribe(
      data => {

        this.tuSrc = data.url;
        console.log(this.tuSrc);
        this.showTuCode();
      },
      erro => {
        this.utils.showBlock('服务器连接错误,请稍候重试');
        console.log(erro)
      },
    )
  }


  /**
   * 倒计时方法
   */
  SMS_validation() {
    this.amount++;
    this.core = 60 + '秒后重发';
    if (this.amount >= 5) {

      this.utils.showAlert('获取验证码太频繁请稍后再试');

    }

    this.utils.showBlock('短信已发送，请注意查收');

    this.core1 = 60;
    this.SMS = true;
    this.title = '秒后重发';
    let timer = setInterval(() => {
      if (this.core1 == 1) {
        clearInterval(timer);
        this.core = "重新获取";
        this.SMS = false;
        return;
      }
      this.core1--;
      this.core = this.core1 + this.title;
    }, 1000)

  }

  //图片识别点击确定时间
  showTuCode() {

    let alert = this.alertCtrl.create({
      title: '请输入图形验证码',
      message: "<img src='" + this.tuSrc + "'>",
      cssClass: 'registerWin',
      inputs: [
        {
          name: 'tucode',
          placeholder: '请输入图片验证码',
          type: 'text',
        }
      ],
      buttons: [
        {
          text: '确定',
          handler: data => {
            console.log(data);
            if (true) {

              // 提交验证码
              this.serviceinterface.VerifyCodeAndSendMobileCode(this.phonenumber, data.tucode)
                .subscribe(
                data => {
                  console.log(data)
                  if (data.success) {
                    this.SMS_validation(); //倒计时方法
                  } else {

                    this.utils.showAlert(data.msg);
                  }
                }, err => {
                  this.utils.showBlock('服务器连接错误,请稍候重试');
                }
                )
              // this.SMS_validation(); //倒计时方法
              // logged in!
              //提交验证码

            } else {

            }

          }
        }
      ]
    });
    alert.present();
  }



  /**
   * 点击获取验证码执行方法
   */
  go_core() {
    if (!(/^[1-9]{1}(\d{14,18})$/.test(this.banknumber))) {
      this.utils.showAlert('请输入正确卡号');
      return;
    } else if (this.bankname == '请选择银行') {
      this.utils.showAlert('请选择银行');
      return;
    } else if (!(/^1[34578]\d{9}$/.test(this.phonenumber))) {
      this.utils.showAlert('请输入正确手机号');
      return;
    } else {

      this.serviceinterface.checkBankCard(this.banknumber)//判断此银行卡是否已经绑定
        .map(data => data.json())
        .subscribe(
        data => {
          console.log(data);
          if (data.success) {//可以绑定

            this.phonecount = "";//将验证码设为空
            this.getPicCode();//调用获取图片验证码方法

          } else {
            this.utils.showAlert(data.msg);
          }
        }, err => {
          this.utils.showBlock('服务器连接错误,请稍候重试');
        }
        )
    }

  }



  butActive: boolean = true;//按钮是否可用
  /**
   * 点击确定绑卡执行的方法
   */
  submit() {
    this.butActive = false;//按钮不可用

    if (this.phonecount == '') {
      this.utils.showAlert("请输入正确验证码");

    } else {

      // this.serviceinterface.addBankCard(this.banknumber, this.bankname, this.phonenumber, this.username, this.phonecount, 1, this.phoneName, this.navParams.get('bankID'))
      let params = {
        bankCard: this.banknumber,
        bankName: this.bankname,
        mobile: this.phonenumber,//银行预留手机号码
        name: this.navParams.get('username'),
        mobileCode: this.phonecount,
        operateType: 3,//修改操作对应3
        cardType: 1,//1为收款,2为还款
        loginName: this.phoneName,//用户账户手机号码
        id: this.navParams.get('bankId'),//此处id只适用于修改(重绑银行卡)
        userid: this.userId,//登录用户对应的id
        params: "RYDCF09072107",
        certNo: this.navParams.get('idCard'),
      }
      console.log(params);

      this.httpservice.post(SERVER_URL + '/cf_main/cf/BankCard', params)
        .map(data => data.json())
        .subscribe(
        data => {
          console.log(data);
          this.butActive = true;//按钮可用

          if (data.success) {
            let alert = this.alertCtrl.create({
              title: '绑卡成功',
              // subTitle: '绑卡成功',
              buttons: [{
                text: '确定',
                handler: () => {
                  this.navCtrl.popToRoot();
                }
              }]
            });
            alert.present();

          } else {
            this.utils.showAlert(data.msg);
          }

        }, err => {
          this.utils.showBlock('服务器连接错误,请稍候重试');
        }
        )
    }
  }


  /**
   * 输入银行卡后自动调用查询所属银行
   */
  getBank() {

    let testBank = /^([1-9]{1})(\d{14,18})$/;
    if (!testBank.test(this.banknumber)) {
      this.utils.showAlert("请输入正确的银行卡号");
    } else {

      this.httpservice.get(SERVER_URL + '/cf_main/cf/getBankName', { BankNO: this.banknumber })
        .map(data => data.json())
        .subscribe(
        data => {

          console.log(data);
          if (data.success) {
            this.bankname = data.data.BankName;
          }
        },
        erro => {
          this.utils.showBlock('服务器连接错误,请稍候重试');
        },
      )
    }
  }

}
