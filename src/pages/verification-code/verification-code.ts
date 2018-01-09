import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, ToastController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { SERVER_URL } from '../../providers/constants/constants';
import { UtilsProvider } from '../../providers/utils/utils';

/**
 * Generated class for the VerificationCodePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-verification-code',
  templateUrl: 'verification-code.html',
})
export class VerificationCodePage {
  amount: number;    //次数
  codeText: any;     //内容
  core: number;      //时间倒时
  coreTitle: string; //拼接数字倒时的字符串
  isGetCode: boolean;//禁止按钮的boolean值



  @Input()
  user_phone: any;    //从父亲获取用户的手机号码

  @Input()
  user_password: any; //从父亲获取用户的手机密码

  @Output()
  state = new EventEmitter()

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public httpservice: HttpServiceProvider, public toastCtrl: ToastController, public utils: UtilsProvider, ) {
    this.codeText = "获取验证码";
    this.isGetCode = false;
    this.amount = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationCodePage');
  }

  /**
  * 测试手机是否已经注册
  */
  isRegister() {
    let params = {
      loginName: this.user_phone,
      params: "RYDCF09072107",
    }
    this.httpservice.get(SERVER_URL + '/cf_main/cf/checkMobile', params)
      .map(res => res.json())
      .subscribe(
      data => {
        console.log(data);
        if (!data.success) {
          this.utils.showAlert("该手机已注册，请直接登录");
        } else {
          this.getPicCode();
        }
      },
      erro => {
        console.log(erro.json())
      },
    )
  }


  //点击验证码--//判断父亲需不需要传递下来密码
  showTuCode() {
    this.isGetCode = true;
    if (this.user_password || this.user_password == "") {
      console.log(this.user_phone);
      console.log(this.user_password);
      if (!this.utils.isPhoneMunber(this.user_phone)) {
        this.showAlert('请输入正确手机号码');
        this.isGetCode = false;
      }
      else if (!this.utils.isPassword(this.user_password)) {
        this.showAlert('密码6-20位(字母+数字)，区分大小写');
        this.isGetCode = false;
      }
      else {
        this.isRegister();
        this.isGetCode = false;
      }
    } else {
      console.log(this.user_phone);
      if (!this.utils.isPhoneMunber(this.user_phone)) {
        this.showAlert('请输入正确手机号码');
        this.isGetCode = false;
      }
      else {
        this.getPicCode();
      }
    }
  }

  //图片验证码
  getPicCode() {

    this.httpservice.get(SERVER_URL + '/cf_main/cf/VerifyCode', { uid: this.user_phone })
      .subscribe(
      data => {

        let alert = this.alertCtrl.create({
          title: '请按照图形输入字母数字',
          enableBackdropDismiss: false,
          message: "<img src='" + data.url + "'>",
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
                if (data.tucode == "") {

                  this.utils.showBlock('图片验证码不能为空');
                }
                else {
                  //提交验证码图片和手机号码
                  let pamers = {
                    loginName: this.user_phone,        //获取手机号码
                    verCode: data.tucode          //图片验证码
                  }

                  console.log(pamers)
                  this.httpservice.postFormData(SERVER_URL + '/cf_main/cf/VerifyCodeAndSendMobileCode', pamers)
                    .map(res => res.json())
                    .subscribe(
                    data => {
                      console.log(data);
                      if (data.success) {
                        this.SMS_validation();//倒计时
                        this.utils.showBlock('短信验证码发送成功');
                        console.log(pamers.verCode);
                        // this.getPhoneSMS(pamers.verCode)
                      } else {
                        this.utils.showBlock('图片验证码输入有误');
                      }

                    }
                    )
                }


              }
            }
          ]
        });
        alert.present();

      },
      erro => { console.log(erro.json()) },
    )
  }


  //短信倒计时
  SMS_validation() {
    this.amount++;    //每点击获取验证码的按钮次数加一
    if (this.amount >= 5) {
      let alert = this.alertCtrl.create({
        title: '获取验证码太频繁请稍后再试',
        enableBackdropDismiss: false,
        buttons: ['确定']
      });
      alert.present();
      return;
    }
    this.isGetCode = true;                   //获取验证码的按钮显示不可以点击
    this.state.emit(this.isGetCode);      //向父组件传递按钮的禁止
    this.codeText = 60 + '秒后重发';
    this.core = 60;                          //倒计时始头60秒
    this.coreTitle = '秒后重发';              //拼接秒数的字符串
    let timer = setInterval(() => {
      if (this.core <= 1) {
        clearInterval(timer);                 //秒数等于1秒时清楚定时器
        this.codeText = "重新获取";      //重新获取验证码的字符串
        this.isGetCode = false;               //获取验证码的按钮显示可以点击
        this.state.emit(this.isGetCode);      //向父组件传递按钮的禁止
      } else {
        this.core--;
        this.codeText = this.core + this.coreTitle;
      }
    }, 1000)
  }


  // 表单验证弹窗
  showAlert(text) {
    let alert = this.alertCtrl.create({
      title: text,
      enableBackdropDismiss: false,
      buttons: ['确定']
    });
    alert.present();
  }







}
