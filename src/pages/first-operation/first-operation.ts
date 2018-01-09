import { NativeServiceProvider } from './../../providers/native-service/native-service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SERVER_URL } from '../../providers/constants/constants';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { UtilsProvider } from '../../providers/utils/utils';
import { ServiceInterfaceProvider } from '../../providers/service-interface/service-interface';

/**
 * Generated class for the FirstOperationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'FirstOperationPage'
})
@Component({
  selector: 'page-first-operation',
  templateUrl: 'first-operation.html',
})
export class FirstOperationPage implements OnInit {
  public mobile;               ////用户手机

  public codeText;               //倒计时number+title
  public core: number;            //倒计时的number
  public coreTitle: string;       //倒计时的title

  public active: boolean;        //眼睛的显隐性
  public psw: string;            //服务密码的类型
  public isCleanName: boolean;   //点x的显隐性
  public service_password: any   //服务密码的文字

  public sms: boolean;           //验证码的禁止boolean
  public dynamics: boolean;      //登录动态码
  public state: number;          //点击登录状态
  public dynamic_code: any;       //动态码
  public reqId: any;             //点击验证码会获取后台reqId参数
  public login_state: boolean;   //登录的禁止按钮
  public gps: any = localStorage.getItem('gps');                   //获取GPS，省份和城市---》广东省，广州市
  public time: number = 0;//延迟时间

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public utils: UtilsProvider, public alertCtrl: AlertController,
    public httpservice: HttpServiceProvider, public ServiceInterfaceProvider: ServiceInterfaceProvider,
    public native: NativeServiceProvider
  ) {
  }

  ngOnInit() {
    this.codeText = '获取验证码';
    this.psw = 'password';
    this.active = true;
    this.isCleanName = false;
    this.service_password = '';
    this.sms = false;
    this.dynamics = false;
    this.state = 1;
    this.dynamic_code = '';
    this.reqId = '';
    this.login_state = false;
  }

  ionViewWillEnter() {
    let json = localStorage.getItem('user');
    this.mobile = JSON.parse(json).mobile;
    console.log(this.mobile);
    this.login_state = false;

    // 重新获取gps
    let gps = localStorage.getItem('gps');
    if (!gps) {
      this.reGetGps();
      this.time = 800;
    }
  }

  /**
 * 获取gps
 */
  reGetGps() {
    this.ServiceInterfaceProvider.GBS()//gps
      .map(data => data.json())
      .subscribe(
      data => {
        let address = data.content.address_detail.province + ',' + data.content.address_detail.city;
        this.gps = address;
        localStorage.setItem('gps', address);

      }, err => {
        // this.utils.showAlert('gps定位出错,稍候重试')
      });
  }


  //输入文字的
  textctrl(val) {
    console.log(val);
    if (val.length > 0) {
      this.isCleanName = true;
    } else {
      this.isCleanName = false;
    }
  }

  //点X的清除
  CleanButton(val) {
    this.service_password = '';
    this.isCleanName = false;
  }

  //眼睛的显隐性
  passwordCtrl() {
    console.log(this.active);
    this.active = !this.active;
    if (this.active) {
      this.psw = 'password';
    } else {
      this.psw = 'text';
    }
  }

  //短信倒计时
  SMS_validation() {
    this.sms = true;
    this.login_state = false;
    this.codeText = 60 + '秒';
    this.core = 60;                          //倒计时始头60秒
    this.coreTitle = '秒';              //拼接秒数的字符串
    let timer = setInterval(() => {
      if (this.core <= 1) {
        clearInterval(timer);                 //秒数等于1秒时清楚定时器
        this.codeText = "重发";      //重新获取验证码的字符串
        this.sms = false;
        this.login_state = true;
      } else {
        this.core--;
        this.codeText = this.core + this.coreTitle;
      }
    }, 1000)
  }

  //点击获取验证码时，请求接口
  core_serve() {
    this.sms = true;
    this.httpservice.post(SERVER_URL + '/cf_main/operator/sendloginsms', { reqId: this.reqId })
      .map(res => res.json())
      .subscribe((data) => {
        console.log(data);
        if (data.success) {
          this.SMS_validation();
          this.utils.showAlert(data.msg);
        } else {
          this.sms = false;
          this.utils.showAlert(data.msg);
        }
      }, err => {
        this.utils.showBlock('服务器连接错误,请稍候重试');
      })
  }

  /**
   * 点击保存调用的方法/gps在app.ts中获取并存储在localstart中
   */
  save() {
    this.ServiceInterfaceProvider.GBS()
      .map(data => data.json())
      .subscribe(data => {

        let userGps = data.content.address_detail.province + ',' + data.content.address_detail.city;
        // this.result(userGps);
      }, err => {
        this.utils.showAlert('gps定位出错,稍候重试');
      });
  }



  /**
   * 点击确定提交
   */
  toSave() {

    if (this.state == 1) {
      if (this.mobile.substring(0, 3) == '170' || this.mobile.substring(0, 3) == '171') {
        this.utils.showAlert('您的手机号码暂不在此虚拟运营商手机号');
      } else if (this.service_password == '') {
        this.utils.showAlert('请输入服务密码');
      } else {

        this.native.showLoading('正在处理...');
        this.login_state = true;
        // setTimeout作异步处理
        setTimeout(() => {

          if (!localStorage.getItem('gps')) {
            this.ServiceInterfaceProvider.GBS()//gps
              .map(data => data.json())
              .subscribe(
              data => {
                let address = data.content.address_detail.province + ',' + data.content.address_detail.city;
                this.gps = address;
                localStorage.setItem('gps', address);
                this.result();

              }, err => {
                this.utils.showBlock('您的gps定位失败，可能会影响您的额度获取');
                this.result();
              });
          } else {
            this.result();
          }
        }, this.time)
      }
    }
    else if (this.state == 2) {

      if (this.mobile.substring(0, 3) == '170' || this.mobile.substring(0, 3) == '171') {
        this.utils.showAlert('您的手机号码暂不在此虚拟运营商手机号');
      } else if (this.service_password == '') {
        this.utils.showAlert('请输入服务密码');
      } else if (this.dynamic_code == '') {
        this.utils.showAlert('请输入动态码');
      } else {

        this.login_state = true;
        let params = { reqId: this.reqId, mobile: this.mobile, pwd: this.service_password, smsCode: this.dynamic_code };
        this.httpservice.post(SERVER_URL + '/cf_main/operator/loginTwo', params)
          .map(res => res.json())
          .subscribe((data) => {
            console.log(data);
            if (data.errorCode == 'CCOM1000') {                      //成功
              // this.utils.showAlert(data.msg);
              this.navCtrl.push('CheckPhoneResultPage');
            } else if (data.errorCode == 'CCOM3014') {                  //需要调用二次鉴权
              this.navCtrl.push('TwoOperationPage', { id: data.data.reqId });
            } else {
              this.utils.showAlert(data.msg);
              this.login_state = false;
            }

          }, err => {
            this.utils.showBlock('服务器连接错误,请稍候重试');
          })

      }

    }
  }


  /**
     * 获取gps后提交数据
     * @param userGps gps
     */
  result() {
    this.gps = localStorage.getItem('gps') ? localStorage.getItem('gps') : 'gps获取失败';

    let params = { mobile: this.mobile, pwd: this.service_password, gps: this.gps };

    this.httpservice.post(SERVER_URL + '/cf_main/operator/login', params)
      .map(res => res.json())
      .subscribe((data) => {
        this.native.hideLoading();//关闭正在加载窗

        console.log(data);
        if (data.errorCode == 'CCOM1000') {                      //成功
          // this.utils.showAlert(data.msg);
          this.navCtrl.push('CheckPhoneResultPage');
        } else if (data.errorCode == 'CCOM3069') {                 //需要调用短信接口
          this.dynamics = true;
          this.SMS_validation();
          this.state = 2;
          this.reqId = data.data.reqId;                         //拿到reqId
          this.utils.showAlert('登录验证码已发送到您的手机，请注意查收！');
          this.login_state = false;
        } else if (data.errorCode == 'CCOM3014') {                  //需要调用二次鉴权
          this.navCtrl.push('TwoOperationPage', { id: data.data.reqId });
        } else {
          this.utils.showAlert(data.msg);
          this.login_state = false;
        }

      }, err => {
        this.utils.showBlock('服务器连接错误,请稍候重试');
        this.native.hideLoading();//关闭正在加载窗

      })
  }



}
