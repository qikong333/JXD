import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { SERVER_URL } from '../../providers/constants/constants';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { UtilsProvider } from '../../providers/utils/utils';
import { ServiceInterfaceProvider }from '../../providers/service-interface/service-interface';

/**
 * Generated class for the TwoOperationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name:'TwoOperationPage'
})
@Component({
  selector: 'page-two-operation',
  templateUrl: 'two-operation.html',
})
export class TwoOperationPage  implements OnInit{
  public mobile;               ////用户手机

  public codeText;               //倒计时number+title
  public core:number;            //倒计时的number
  public coreTitle:string;       //倒计时的title

  public sms:boolean;           //验证码的禁止boolean
  public dynamic_code1:any;     //动态码
  public reqId:any;             //点击验证码会获取后台reqId参数
  public login_state:boolean;   //登录的禁止按钮




  constructor(public navCtrl: NavController, public navParams: NavParams,public utils: UtilsProvider,public alertCtrl: AlertController, public httpservice: HttpServiceProvider,public ServiceInterfaceProvider:ServiceInterfaceProvider,) {
  }

   ngOnInit() {
    this.codeText='获取验证码';
    this.sms=false;
    this.dynamic_code1='';
    this.reqId='';
    this.login_state=false;
    this.ServiceInterfaceProvider.GBS();      //GPS
  }

  //进入页面马上倒计时还有获取手机号码
  ionViewWillEnter(){
    let json=localStorage.getItem('user');
    this.mobile=JSON.parse(json).mobile;
    this.reqId=this.navParams.get('id');
    console.log(this.reqId)
    console.log(this.mobile)
    this.SMS_validation();
  }


  //短信倒计时
   SMS_validation() {
    this.sms=true;
    this.login_state=false;
    this.codeText = 60 + '秒';
    this.core = 60;                          //倒计时始头60秒
    this.coreTitle = '秒';              //拼接秒数的字符串
    let timer = setInterval(() => {
      if (this.core <= 1) {
        clearInterval(timer);                 //秒数等于1秒时清楚定时器
        this.codeText = "重发";      //重新获取验证码的字符串
        this.sms=false;
        this.login_state=true;
      } else {
        this.core--;
        this.codeText = this.core + this.coreTitle;
      }
    }, 1000)
  }

  //点击获取验证码时，请求接口
  core_serve(){
    console.log("2")
     this.sms=true;
     this.httpservice.post(SERVER_URL + '/cf_main/operator/sendauthsms', {reqId:this.reqId})
      .map(res => res.json())
      .subscribe((data) => {
        console.log(data);
        if(data.success){
           this.SMS_validation();
           this.utils.showAlert(data.msg);
        }else{
          this.sms=false;
          this.utils.showAlert(data.msg);
        }
      })
  }

  save(){
    if(this.dynamic_code1==''){
      this.utils.showAlert('请输入您的手机登录动态码');
    }else{
      this.login_state=true;
      let params={smsCode:this.dynamic_code1,reqId:this.reqId,mobile:this.mobile};
      console.log(params);
      this.httpservice.post(SERVER_URL + '/cf_main/operator/verifyauthsms', params)
      .map(res => res.json())
      .subscribe((data) => {
        console.log(data);
        if(data.errorCode=='CCOM1000'){                      //成功
          // this.utils.showAlert(data.msg);
          this.navCtrl.push('CheckPhoneResultPage');
        }else{
          this.utils.showAlert(data.msg);
          this.login_state=false;
        }
      })
    }
  }























}
