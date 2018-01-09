import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, Events, ModalController, ViewController } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils'
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { SERVER_URL } from '../../providers/constants/constants';
// import { Md5 } from 'ts-md5/dist/md5'
import { Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ServiceInterfaceProvider } from '../../providers/service-interface/service-interface';
import { NativeServiceProvider } from '../../providers/native-service/native-service';
import { Device } from '@ionic-native/device';
import { HelpcenterPage } from '../helpcenter/helpcenter';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'LoginPage',
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {

  private username;         //用户手机
  private password;         //密码
  private yzcode;           //验证码
  private isCleanName;      //是否清空用户手机
  private isCleanPassword;  //是否清空密码
  private active;           //显示隐藏密码
  private loginTime;        //登陆次数
  private type;             //密码框type
  private picUrl;           //图片验证码src
  private gbs = "0";              //地理位置

  isUsed: boolean = false;    //登录按钮是否可用
  myUid: any = this.utils.getVerifyNum();//获取六位随机数作为验证


  private data;

  constructor(

    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public utils: UtilsProvider,
    public events: Events,
    public httpservice: HttpServiceProvider,
    public http: Http,
    public helpers: HelpersProvider,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public serviceface: ServiceInterfaceProvider,
    public native: NativeServiceProvider,
    public device: Device,

  ) {

    this.data = {
      name: "",
    }

    this.isCleanName = false;
    this.isCleanPassword = false;
    this.active = true;
    this.loginTime = 0;
    this.type = 'password';

    //  console.log(Md5.hashStr("123456"));    //md5用法  
    //params.set("password", Md5.hashStr(this.password).toString());


  }

  ngOnInit() {
    console.log(this.navCtrl.getViews())
    // this.helpers.bairong('login');

  }


  ionViewWillLeave() {
    this.helpers.hideTabs2();
  }

  ionViewDidLoad() {
    // alert(this.device.uuid);
    this.getPicCode();
    this.helpers.hideTabs1();

  }



  toRetrieve() {
    this.navCtrl.push('RetrievePage', {}, { duration: 100 });
  }

  /**
   * 去注册
   */
  toRegister() {
    this.navCtrl.push('RegisterPage', {}, { duration: 100 });
  }



  aa(user) {
    console.log('User created!')
    this.events.publish('user:created', user, Date.now());
  }



  /**http://192.168.4.40:8080/cf_main/cf/checkMobile?loginName=15920111222&params=RYDCF09072107
  * 检验手机号码是否注册
  */
  checkPhone() {

    this.httpservice.get(SERVER_URL + '/cf_main/cf/checkMobile', { loginName: this.username, params: 'RYDCF09072107' })
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        if (!data.success) {//手机已注册
          this.login();
        } else {
          // this.utils.showAlert('手机号码未注册');
          let alert = this.alertCtrl.create({
            title: '手机号码未注册',
            buttons: [
              {
                text: '确定',
                handler: () => {
                  this.navCtrl.push('RegisterPage', {}, { duration: 100 });
                }
              }
            ]
          });
          alert.present();
        }

      }, error => {
        console.log(error);
        this.utils.showBlock('服务器连接错误,请稍候重试');

      }
      )
  }


  /**
   *提交表单,现在需求不需要gps
   */
  logiHttp() {

    if (this.native.isMobile()) {
      this.serviceface.GBS()
        .map(data => data.json())
        .subscribe(
        data => {
           let gps = data.content.address;
          // alert(JSON.stringify(data))
          // alert(this.gbs);
          // this.login(gps);
        }
        )
    }
  }

  /**
   * 提交接口
   */
  login(){
    let params = {
      loginName: this.utils.encryption(this.username),//用户名
      password: this.utils.encryption(this.password),//密码
      verCode: this.utils.encryption(this.yzcode), //验证码
      deviceNumber: this.device.uuid,//设备号
      uid: this.myUid,
      ip: '1',
      // gps: gps,
      flag: '3',
      time: '4',
      params: 'RYDCF09072107'
    }

    // alert(JSON.stringify(params))

    this.httpservice.post(SERVER_URL + '/cf_main/cf/login', params)
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        // this.lockacc(this.loginTime);//错误次数超过二十次时,锁定用户账号
        //黑色提示框
        this.utils.showBlock(data.msg);

        //订阅登录
        if (data.success) {
          //设置订阅
          // this.createUser(data.data)
          localStorage.setItem('user', JSON.stringify(data.data));//将json对象转换成json字符串
          localStorage.setItem('loginState', 'true');       //保存联系人状态
          localStorage.setItem('userPhone', this.username);    //保存联系人号码

          //跳转
          this.navCtrl.popToRoot();
          //关闭模态框
          // this.viewCtrl.dismiss();
        } else {
          this.loginTime = this.loginTime + 1;
          // this.lockacc(this.loginTime);//错误次数
          // this.utils.showBlock(data.msg);
        }

      },
      error => {
        console.log(error);
        //登录错误时候调用， 
        this.loginTime = this.loginTime + 1;
        // this.lockacc(this.loginTime);
        this.utils.showBlock('服务器连接错误,请稍候重试');
      },
      () => { this.getPicCode(); }
      )

    //登录成功是调用；且this.loginTime=0；

  }

  /**
   * 输入次数错20次锁定账号提示
   */
  lockacc(num) {
    if (num > 19) {
      this.isUsed = true;//将按钮不可用
      let alert = this.alertCtrl.create({
        title: '信息提醒',
        message: '账户已被锁定，请联系客服解锁<br>客服热线：400188****',
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: '拨号',
            handler: () => {
              console.log('Buy clicked');
            }
          }
        ]
      });
      alert.present();
    }
  }


  /**
   * 清空手机号码
   */
  usernameCtrl() {
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
    this.isUsed = false;//改变手机号码时按钮变为可用;
    this.loginTime = 0;//将错误次数设为0次(如果回退一位又输入同样的数字,还是会从0开始,有bug,待解决)

    if (!obj) {
      this.isCleanName = false;
    } else {
      this.isCleanName = true;
    }

  }

  /**
  * 显示密码清空按钮
  */
  showPasswordCleanButton(obj) {
    // console.log(obj)
    if (obj == null || obj == " ") {
      this.isCleanPassword = false;
    } else {
      this.isCleanPassword = true;
    }

  }

  /**
   * 查看密码
   */
  seaPassword() {

    if (this.type == 'password') {
      this.type = 'text';
      this.active = false;
    } else {
      this.type = 'password';
      this.active = true;
    }

  }

  //获取图片验证码
  getPicCode() {
    this.picUrl = "";
    this.yzcode = '';//清空验证码输入框
    this.httpservice.get(SERVER_URL + '/cf_main/cf/VerifyCode', { uid: this.myUid })
      //.map(data=>data.json())
      .subscribe(

      data => { this.picUrl = data.url; },
      erro => { console.log(erro) },

    )
  }

  /**
   * 提交表单,验证
   */
  gologin() {
    if (!this.utils.isPhoneMunber(this.username)) {
      this.utils.showAlert('请输入正确手机号码');
      return false;

    } else if (!this.utils.isPassword(this.password)) {
      this.utils.showAlert('密码6-20位(字母+数字)，区分大小写');
      return false;
    } else if (this.yzcode == "") {
      this.utils.showAlert('请输入验证码');
      return false;
    } else {
      this.checkPhone();
    }

  }



  //发布订阅
  createUser(obj) {
    console.log('User created!')
    console.log(obj)
    this.events.publish('user:created', obj);
  }


}
