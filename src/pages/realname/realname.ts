import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { SERVER_URL } from '../../providers/constants/constants';
import { ServiceInterfaceProvider } from "../../providers/service-interface/service-interface";
import { HelpersProvider } from '../../providers/helpers/helpers';
import { UtilsProvider } from './../../providers/utils/utils';

/**
 * Generated class for the RealnamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'RealnamePage'
})
@Component({
  selector: 'page-realname',
  templateUrl: 'realname.html',
})
export class RealnamePage {
  public phoneName;
  public name;
  public certNo;
  public bankCard;
  public bankName;
  public mobile;
  public isGetCode;        //是否允许获取验证码
  public codeText: string;      //短信提示
  public amount: number;        //次数
  public core: number;          //60秒定时器
  public coreTitle: string;     //按钮显示文字
  public yzm;                   //验证码
  public show: boolean;     //判断数据有无，显示页面
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public serviceinter: ServiceInterfaceProvider,
    public helpers: HelpersProvider,
    public utils: UtilsProvider,
    public httpservice: HttpServiceProvider,
    public alertCtrl: AlertController,
  ) {
  }
  ngOnInit() {
    //初始化
    this.phoneName = "";
    this.name = "";
    this.certNo = "";
    this.bankCard = "";
    this.bankName = "请选择银行";
    this.mobile = "";
    this.codeText = "获取验证码";
    this.yzm = "";
    this.show = true;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RealnamePage');
  }
  ionViewWillEnter() {
    // 获取登录电话号码
    let user = localStorage.getItem("user");
    if (user != null) {
      var json = JSON.parse(user);//将其转换成json对象
      this.phoneName = json.mobile;
    }

    this.navParams.get('stare')
    this.navParams.get('bankName')
    this.navParams.get('bankNum')
    // console.log(this.navParams.get('stare'))
    // console.log(this.navParams.get('bankName'))
    // console.log( this.navParams.get('bankNum'))
    if (this.navParams.get('stare') == true) {
      if (this.navParams.get('bankName') && this.navParams.get('bankNum')) {
        this.show = false;
        this.bankName = this.navParams.get('bankName').split("(")[0];
        this.bankCard = this.navParams.get('bankNum');
      } else {
        this.show = true;
      }
    } else {
      this.show = true;
    }

    console.log(this.phoneName);
    this.serviceinter.GetBank(this.phoneName)
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        if (data.success) {
          this.name = data.data.realName;
          this.certNo = data.data.cardNo;

        } else if (data.success == false) {
          this.gosfyz();
        }
      },
      erro => {
        console.log(erro);

      },
    )

  }

  /**
   * 点击获取图片验证码
   */
  getPicCode() {

    this.httpservice.get(SERVER_URL + '/cf_main/cf/VerifyCode', { uid: this.mobile })
      // .map(res=>res.json())
      .subscribe(
      data => {
        console.log(data);
        //图片验证码弹窗
        let alert = this.alertCtrl.create({
          title: "图片验证码",
          message: "<img src='" + data.url + "'>",
          cssClass: 'registerWin',
          enableBackdropDismiss: false,
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

                this.getPhoneCode(data);//获取手机验证码
              }
            }
          ]
        });
        alert.present();
      },
      erro => {
        this.utils.showBlock('服务器连接错误,请稍候重试');
        console.log(erro)
      },
    )
  }


  /**
   * 提交输入的图片验证码获取手机验证码
   */
  getPhoneCode(data) {
    let p = {
      verCode: data.verCode,
      loginName: this.mobile,
      params: "RYDCF09072107"
    }
    console.log(p);

    this.httpservice.postFormData(SERVER_URL + '/cf_main/cf/VerifyCodeAndSendMobileCode', p)
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);

        if (data.success) {
          this.time();//调用倒计时方法
        } else {

          this.utils.showAlert(data.msg);
        }

      },
      erro => {
        this.utils.showBlock('服务器连接错误,请稍候重试');
        console.log(erro)
      },
    )
  }
  /**
   * 获取验证码倒计时
   */
  time() {
    this.amount++;
    this.codeText = 60 + '秒后重发';
    if (this.amount >= 60) {
      this.utils.showAlert('获取验证码太频繁请稍后再试');

    }
    // let toast = this.toastCtrl.create({
    //     message: '短信已发送，请注意查收',
    //     duration: 2000,
    //     position: 'middle'
    //   });
    // toast.present();
    // this.core1=60+'秒后重发';
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


  getCode() {
    if (!this.utils.isBankCard(this.bankCard)) {
      this.utils.showAlert('请输入正确的银行卡号');
    } else if (!this.utils.isPhoneMunber(this.mobile)) {
      this.utils.showAlert('请输入正确手机号');
    } else {

      this.serviceinter.checkBankCard(this.bankCard)//验证银行卡是否已认证
        .map(data => data.json())
        .subscribe(
        data => {
          console.log(data);
          if (data.success) {
            this.yzm = '';//清空手机验证码
            this.getPicCode();//获取手机验证码
          } else {
            this.utils.showAlert(data.msg);
          }
        }, err => {
          console.log(err);
          this.utils.showBlock('服务器连接错误,请稍候重试');
        }
        )

    }
  }


  butActive: boolean = true;//提交按钮是否可用

  save() {

    if (!this.utils.isName(this.name)) {
      let text = '请输入正确姓名！';
      this.utils.showAlert(text);
    } else if (!this.utils.isIdCard(this.certNo)) {
      let text = '请输入正确身份证号！';
      this.utils.showAlert(text);
    } else if (!this.utils.isBankCard(this.bankCard)) {
      let text = '请输入正确银行卡号！';
      this.utils.showAlert(text);
    } else if (this.bankName == "请选择银行") {
      let text = '请选择银行';
      this.utils.showAlert(text);
    }
    else if (!this.utils.isPhoneMunber(this.mobile)) {
      let text = '请输入正确手机号！';
      this.utils.showAlert(text);
    } else if (this.yzm == "") {
      let text = '请输手机验证码！';
      this.utils.showAlert(text);
    } else {
      this.saveUser();
    }
  }
  /**
   * 保存数据到后台函数
   */
  saveUser() {
    this.butActive = false;
    let params = {
      loginName: this.phoneName,
      params: "RYDCF09072107",
      name: this.name,
      certNo: this.certNo,
      bankCard: this.bankCard,
      bankName: this.bankName,
      mobile: this.mobile,
      mobileCode: this.yzm,
      operateType: 2,//添加操作
      cardType: 1 //1为借还款银行卡
    }
    console.log(params);
    this.serviceinter.RealName(this.phoneName, this.name, this.certNo, this.bankCard, this.bankName, this.mobile, this.yzm)
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        this.butActive = true;
        if (data.success) {
          this.presentConfirm();
        } else if (data.success == false) {
          this.utils.showAlert(data.msg);
        }
      },
      erro => {
        console.log(erro);
        this.utils.showBlock('服务器连接错误,请稍候重试');
      },
    )

  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: '验证成功',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.navCtrl.pop();
          }
        },
      ]
    });
    alert.present();
  }

  gosfyz() {
    let alert = this.alertCtrl.create({
      message: '未进行身份信息认证，请前往操作',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.navCtrl.push("IdentityInformationPage");
          }
        },
      ]
    });
    alert.present()
  }

}
