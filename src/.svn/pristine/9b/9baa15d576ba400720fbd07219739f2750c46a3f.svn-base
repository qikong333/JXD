import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { SERVER_URL } from './../../providers/constants/constants';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { NewpasswordPage } from '../newpassword/newpassword';
import { UtilsProvider } from '../../providers/utils/utils';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the RetrievePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'RetrievePage',
})
@Component({
  selector: 'page-retrieve',
  templateUrl: 'retrieve.html',
})
export class RetrievePage implements OnInit {

  private username: any = '';             //用户手机
  private yzcode: any = '';               //验证码
  private isCleanName;          //是否清空用户手机
  private isGetCode;            //是否允许获取验证码
  private codeText: string;      //短信提示
  private amount: number;        //次数
  private core: number;          //60秒定时器
  private coreTitle: string;     //按钮显示文字
  private btn_state:boolean;    //按钮禁止

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utils: UtilsProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public httpservice: HttpServiceProvider
  ) {
  }

  ngOnInit() {
    this.isCleanName = false;
    this.isGetCode = false;
    this.codeText = '获取验证码';
    this.amount = 0;
    this.btn_state=true;  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RetrievePage');
  }

  //从子组件验证码处获取的btn数据
  godata(e){
    if(e){
      this.btn_state=false;
    }else{
      this.btn_state=true;
    }
  }

  // ionViewWillEnter() {
  //   let user = localStorage.getItem("user");
  //   if (user != null) {
  //     var json = JSON.parse(user);//将其转换成json对象
  //     this.phoneName = json.mobile;
  //   }
  //   console.log(this.phoneName)
  // }


  /**
   *显示清除按钮和验证号码的正确性是否允许发送验证码 
   * @param num 
   */
  showPhoneCleanButton(num) {

    if (!num) {
      this.isCleanName = false;
    } else {
      this.isCleanName = true;
    }
  }

  /**http://192.168.4.40:8080/cf_main/cf/checkMobile?loginName=15920111222&params=RYDCF09072107
   * 检验手机号码是否注册
   */
  goVerify() {

    let par = /[0-9]{6}/;
    if (!this.utils.isPhoneMunber(this.username)) {
      this.utils.showAlert('手机号码不正确');
      return;
    }

    this.httpservice.get(SERVER_URL + '/cf_main/cf/checkMobile', { loginName: this.username, params: 'RYDCF09072107' })
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        if (!data.success) {//手机已注册
          this.getPicCode();//调用获取图片验证码
        } else {
          this.utils.showAlert('手机号码未注册');
        }

      }, error => { console.log(error); }
      )
  }



  /**
  * 点击获取图片验证码
  * 
  */
  getPicCode() {

      this.httpservice.get(SERVER_URL + '/cf_main/cf/VerifyCode', { uid: this.username })
        .subscribe(
        data => {
          // console.log(data);

          let alert = this.alertCtrl.create({
            title: "图片验证码",
            message: "<img src='" + data.url + "'>",
            cssClass: 'registerWin',
            inputs: [
              {
                name: 'verCode',
                placeholder: '请输入图片验证码',
                type: 'text',
              }
            ],
            buttons: [
              {
                text: '确定',
                handler: data => {//此处就可以获取用户填入的值，data.verCode
                  console.log(data);
                  this.getPhoneCode(data);
                }
              }
            ]
          });
          alert.present();
        },
        erro => { console.log(erro) },
      )
  }


  /**
   * 点击提交输入的图片验证码,以获取手机验证码
   */
  getPhoneCode(data) {

    let p = {
      verCode: data.verCode,
      loginName: this.username,
      params: "RYDCF09072107"
    }
    console.log(p);
    // 获取手机验证码
    this.httpservice.postFormData(SERVER_URL + '/cf_main/cf/VerifyCodeAndSendMobileCode', p)
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        if (data.success) {
          this.yzcode = '';//每次点击获取手机验证码时清空输入框
          this.time();
          this.utils.showBlock('短信已发送，请注意查收');
        } else {
          this.utils.showAlert(data.msg);
        }
      },
      erro => { console.log(erro) },
    )
  }

  /**
   * 点击下一步调用方法
   */
  toNewpasswordPage() {
    let par = /^\d{6}$/; //正则验证六位数字手机验证码

    if (!this.utils.isPhoneMunber(this.username)) {
      this.utils.showAlert('手机号码不正确');
    }
     else if (this.yzcode == '') {

      this.utils.showAlert('请输入正确的手机验证码');
    }
    //  else if (!par.test(this.yzcode)) {

    //   this.utils.showAlert('请输入正确的手机验证码');
    // }
     else {

      let p = {
        loginName: this.username,
        mobileCode: this.yzcode,
        params: 'RYDCF09072107'
      }
      console.log(p);

      this.httpservice.get(SERVER_URL + '/cf_main/cf/checkMobieCode', p)
        .map(data => data.json())
        .subscribe(
        data => {
          console.log(data);
          if (data.success) {
            this.navCtrl.push('NewpasswordPage', { loginName: this.username, mobileCode: this.yzcode, }, { duration: 200 });

          } else {
            this.utils.showAlert('验证码输入错误');
            // this.utils.showAlert(data.msg);
          }
        },
        erro => { console.log(erro) }
        )

    }
  }


  /**
  * 清空手机号码
  */
  usernameCtrl() {
    // this.isGetCode = true;
    this.username = "";
    this.isCleanName = false;
  }

  /**
   * 获取验证码倒计时
   */
  time() {
    this.amount++;
    this.codeText = 60 + '秒后重发';
    if (this.amount >= 10) {
      this.utils.showAlert('获取验证码太频繁请稍后再试');
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


}
