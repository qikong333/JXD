import { ServiceInterfaceProvider } from './../../providers/service-interface/service-interface';
import { NativeServiceProvider } from './../../providers/native-service/native-service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Events } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { SERVER_URL } from '../../providers/constants/constants';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { Http } from '@angular/http';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { VerificationCodePage } from '../verification-code/verification-code';
import { Device } from '@ionic-native/device';
import { Observable } from 'rxjs';
/**
 * 
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'RegisterPage',
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',

})
export class RegisterPage implements OnInit {

  public name;
  public userId;//用户id
  public username;         //用户手机
  public password;         //密码
  public yzcode;           //验证码
  public isCleanName;      //是否清空用户手机
  public isCleanPassword;  //是否清空密码
  public active;           //显示隐藏密码
  public tuSrc;            //图片地址
  public tuWinTitle;       //弹窗标题

  public isGetCode;        //是否允许获取验证码
  public codeText: string;      //短信提示
  public amount: number;        //次数
  public core: number;          //60秒定时器
  public coreTitle: string;     //按钮显示文字
  public btn_state: boolean;    //按钮禁止
  finish:boolean = false;

  constructor(
    public http: Http,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public utils: UtilsProvider,
    public events: Events,
    public httpservice: HttpServiceProvider,
    public helpers: HelpersProvider,
    public native: NativeServiceProvider,
    public service: ServiceInterfaceProvider,
    private device: Device,



  ) {
    this.isCleanName = false;
    this.isCleanPassword = false;
    this.active = true;
    this.tuWinTitle = '请按照图形输入字母数字';
    this.isGetCode = true;
    this.codeText = '获取验证码';
    this.amount = 0;
    this.btn_state = true;





    events.subscribe('user:created', (user, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome', user, 'at', time);
    });


  }

  ngOnInit() {

  }

  ionViewDidLoad() {
    this.helpers.hideTabs1();
    this.isGetcode(this.username)
    // alert(this.device.uuid);
  }
  ionViewWillLeave() {
    this.helpers.hideTabs2();
  }

  //   ionViewWillLeave(){
  //  console.log('取消订阅1');

  //   this.events.unsubscribe('user:created',()=>{
  //     console.log('取消订阅')
  //   })
  //   }

  /**
   * 展示注册协议
   */
  showAgreement(type) {
    this.native.themeable(SERVER_URL + `/cf_main/cf/agreement?type=${type}`);
  }

  //判断是否允许获取验证码
  isGetcode(num) {
    if (!this.utils.isPhoneMunber(num)) {
      //false
      this.isGetCode = true;
    } else {
      //true
      this.isGetCode = false;
    }
  }


  toLoginPage() {
    this.navCtrl.push('LoginPage', {}, { duration: 100 });
  }

  toRegisterSuccessPage() {
    this.navCtrl.push('RegisterSuccessPage', {}, { duration: 100 });
  }


  /**
   * 清空手机号码
   */
  usernameCtrl() {
    this.isGetCode = true;
    this.username = "";
    this.isCleanName = false;
  }

  /**
   * 清空密码
   */
  passwordCtrl() {
    this.password = "";
    this.isCleanPassword = false
  }

  /**
   * 显示手机清空按钮
   */
  showPhoneCleanButton(obj) {

    this.isGetcode(obj);

    if (!obj) {
      this.isCleanName = false;
    } else {
      this.isCleanName = true;
    }

  }

  /**
  * 显示手机清空按钮
  */
  showPasswordCleanButton(obj) {

    if (!obj) {
      this.isCleanPassword = false;
    } else {
      this.isCleanPassword = true;
    }

  }

  /**
   * 查看密码
   */
  seaPassword() {
    this.active = !this.active;
    let passwordType = document.querySelector('#passwordcode');
    console.log(passwordType.getAttribute('type'))

    if (passwordType.getAttribute('type') == 'password') {
      passwordType.setAttribute('type', 'text');
    } else {
      passwordType.setAttribute('type', 'password');
    }

  }

  /**
   * 显示图片验证码弹框
   */
  showTuCode() {
    // alert(num);
    if (!this.utils.isPhoneMunber(this.username)) {
      this.utils.showAlert('请输入正确手机号码');
      return;

    } else if (!this.utils.isPassword(this.password)) {
      this.utils.showAlert('密码6-20位(字母+数字)，区分大小写');
      return;
    } else {
      this.isRegister();
    }
  }

  /**
   * 测试手机是否已经注册
   */
  isRegister() {
    let params = {
      loginName: this.username,
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
        this.utils.showBlock('服务器连接错误,请稍候重试');
        console.log(erro.json())
      },
    )
  }

  //获取图片验证码
  getPicCode() {

    this.httpservice.get(SERVER_URL + '/cf_main/cf/VerifyCode', { uid: this.username })
      // .map(res=>res.json())
      .subscribe(
      data => {

        let alert = this.alertCtrl.create({
          title: this.tuWinTitle,
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

                //提交验证码
                let pamers = {
                  loginName: this.username,
                  verCode: data.tucode
                }
                console.log(pamers);
                this.httpservice.postFormData(SERVER_URL + '/cf_main/cf/VerifyCodeAndSendMobileCode', pamers)
                  .map(res => res.json())
                  .subscribe(
                  data => {
                    console.log(data);
                    if (data.success) {
                      this.utils.showBlock('短信验证码发送成功');
                      this.yzcode = '';//清空手机验证码输入框
                      this.SMS_validation();//调用倒计时

                    } else {

                      this.utils.showBlock('图形验证码输入有误');
                    }

                  },
                  erro => {
                    console.log(erro.statusText);
                  },
                )
              }
            }
          ]
        });
        alert.present();

      },
      erro => {
        this.utils.showBlock('服务器连接错误,请稍候重试');
        console.log(erro.json())
      },
    )
  }


  /**
   * //提交表单
   */
  goRegister() {
  
    if (!this.utils.isPhoneMunber(this.username)) {
      this.utils.showAlert('请输入正确手机号码');
      return;

    } else if (!this.utils.isPassword(this.password)) {
      this.utils.showAlert('密码6-20位(字母+数字)，区分大小写');
      return;
    } else if (this.yzcode == " ") {
      this.utils.showAlert('请输入验证码');
      return;
    } else {
      
      this.submitMethod();
    }
  }


  /**
 *提交数据到后台
 */
  submitMethod() {

    let params = {
      // loginName: this.username,
      loginName: this.utils.encryption(this.username),
      password: this.utils.encryption(this.password),
      mobileCode: this.utils.encryption(this.yzcode),
      deviceNumber:this.device.uuid
    }

    // console.log(params);

    this.httpservice.post(SERVER_URL + '/cf_main/cf/register', params)
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);

        if (data.success) {
          this.utils.showBlock('注册成功!');
          this.finish = true;//显示注册成功页面

          // 通过用户账户查询用户信息,并缓存到浏览器
          this.service.personalInformation(this.username)
            .subscribe(
            data => {
              console.log(data);
              if (data.success) {
                this.userId = data.data.personalInformation.userId;//获取userid
                this.name = data.data.personalInformation.name;//获取姓名

                let string_all = { mobile: this.username, userid: this.userId};
                console.log(string_all);

                localStorage.setItem('user', JSON.stringify(string_all));//添加缓存
                localStorage.setItem('userPhone', this.username);//添加缓存
                localStorage.setItem('loginState', 'true');

               
                // this.navCtrl.popToRoot();//回到根页面

                // //百融设备反欺诈
                // let brParam = {
                //   loginName:this.username
                // }
                // this.helpers.bairong('register',brParam);

                

              } else {
                this.navCtrl.push('LoginPage', {}, { duration: 100 });
              }
            }, err => {
              this.navCtrl.push('LoginPage', {}, { duration: 100 });
            })


        } else {
          this.utils.showAlert(data.msg);
        }

      },
      erro => {
        this.utils.showBlock('服务器连接错误,请稍候重试');
      }
      )
  }


  /**
   * 获取验证码倒计时
   */
  SMS_validation() {
    this.amount++;
    this.codeText = 60 + '秒后重发';
    if (this.amount >= 10) {

      this.utils.showAlert('获取验证码太频繁请稍后再试')
      return;
    }
    this.core = 60;
    this.isGetCode = true;
    this.coreTitle = '秒后重发';
    let timer = setInterval(() => {
      if (this.core == 1) {
        clearInterval(timer);
        this.codeText = "重新获取";
        this.isGetCode = false;
        return;
      }
      this.core--;
      this.codeText = this.core + this.coreTitle;
    }, 1000)

  }

  //从子组件验证码处获取的btn数据
  godata(e) {
    if (e) {
      this.btn_state = false;
    } else {
      this.btn_state = true;
    }
  }

  /**
   * 去认证
   */
  goQuota(){
    this.navCtrl.push('QuotaPage');
  }

  /**
   * 回到首页
   */
  goHome(){
    this.navCtrl.popToRoot();
  }


}
