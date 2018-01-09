import { NativeServiceProvider } from './../../providers/native-service/native-service';
import { Http } from '@angular/http';
import { UtilsProvider } from './../../providers/utils/utils';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { SERVER_URL } from '../../providers/constants/constants';
import { ServiceInterfaceProvider } from "../../providers/service-interface/service-interface";
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the QuotaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'QuotaPage'
})
@Component({
  selector: 'page-quota',
  templateUrl: 'quota.html',
})
export class QuotaPage {
  public qmoney;
  public phoneName;
  public list1: string;  //个人信息
  public list2: string;  //工作信息
  public list3: string;  //身份信息
  public list4: string;  //绑定银行卡
  public list5: string;  //第三方验证
  public bankNum: string;//银行卡号码
  public JQbankNum: string;//银行卡号码
  public zore: boolean = false;//判断用户额度是否为0
  public userId: any;//用户id
  public gps: any = localStorage.getItem('gps');//用户手机定位

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public serviceinter: ServiceInterfaceProvider,
    public helpers: HelpersProvider,
    public utils: UtilsProvider,
    public http: Http,
    public alert: AlertController,
    public native: NativeServiceProvider
  ) {

  }
  ngOnInit() {
    //初始化
    this.qmoney = 0;
    this.phoneName = "";

  }

  ionViewWillEnter() {
    // 获取登录电话号码
    let user = localStorage.getItem("user");
    if (user != null) {
      var json = JSON.parse(user);//将其转换成json对象
      this.phoneName = json.mobile;
      this.userId = json.userid;
    }

    // 查询认证信息
    this.dataSerch();

  }

  /**
 * 下拉刷新
 */
  doRefresh(refresh) {
    this.ionViewWillEnter();
    setTimeout(function () {
      refresh.complete();
    }, 400);
  }




  // 查询认证信息
  dataSerch() {

    this.serviceinter.myQuotaInfo(localStorage.getItem('userPhone'))
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        if (data.success) {
          if (data.data.cardNO) {
            this.bankNum = data.data.cardNO;
            // this.JQbankNum = this.bankNum.substring(-1, 4);
            this.JQbankNum = this.bankNum.slice(-4);
            // console.log(this.bankNum)
            // console.log(this.JQbankNum)
          }
          this.bankNum = data.data.cardNO;
          this.swicthState1('list1', data.data.baseInfoStatu);
          this.swicthState1('list2', data.data.workInfoStatu);
          this.swicthState1('list3', data.data.faceInfoStatu);
          this.swicthState1('list4', data.data.bankCardStatu);
          this.swicthState1('list5', data.data.thirdCertification);
          this.qmoney = Math.round(data.data.quotaMoney);

          if (this.qmoney == 0 && (data.data.baseInfoStatu && data.data.workInfoStatu && data.data.faceInfoStatu && data.data.bankCardStatu && data.data.thirdCertification) == 's2') {
            this.zore = true;//完成认证后额度为0
          } else {
            this.zore = false;
          }

        }
      },
      erro => {
        this.utils.showBlock('服务器连接错误,请稍候重试');

      },
    )
  }

  swicthState1(text, n) {
    let selt = this;
    switch (n) {
      case 's1':
        selt[text] = '未认证';
        break;

      case 's2':
        selt[text] = '认证成功';
        break;

      case 's3':
        selt[text] = '认证失败';
        break;

      case 'w1':
        selt[text] = '未填写';
        break;

      case 'w2':
        selt[text] = '已填写';
        break;

      default:
        selt[text] = n + "(" + this.JQbankNum + ")";
        break;
    }
  }


  swicthState2(state, page) {
    let obj = {};
    // let obj = { duration: 100 };
    switch (state) {
      case '未认证':
        this.navCtrl.push(page, { stare: false }, obj)
        break;

      case '认证成功':
        this.navCtrl.push(page, { stare: true }, obj)
        break;

      case '认证失败':
        this.navCtrl.push(page, { stare: false }, obj)
        break;

      case '未填写':
        this.navCtrl.push(page, { stare: false }, obj)
        break;

      case '已填写':
        this.navCtrl.push(page, { stare: false }, obj)
        break;

      default:
        this.navCtrl.push(page, { stare: true, bankName: this.list4, bankNum: this.bankNum }, obj)
        break;

    }
  }



  list1State(state) {
    this.swicthState2(state, 'InformationsPage')
  }
  list2State(state) {
    this.swicthState2(state, 'JobPage')
  }
  list3State(state) {
    this.swicthState2(state, 'IdentityInformationPage');
  }
  list4State(state) {
    this.swicthState2(state, 'RealnamePage')
  }
  list5State(state) {
    this.swicthState2(state, 'IdentityPage')
  }


  isDisabled(state) {
    if (state == '未认证' || state == '未填写' || state == '认证失败') {
      return false;
    } else {
      return true;
    }
  }

  /**http://192.168.3.150:8080/cf_main/cf/quotaValue?userid=128
   * 重新生成额度
   */
  getQmoney() {

    let confirm = this.alert.create({
      title: '每周只能重新生成额度一次',
      message: '请确保您的个人信息和工作信息的准确性,再重新生成额度',
      buttons: [
        {
          text: '生成额度',
          handler: () => {
            this.newQmoney();
          }
        },
        {
          text: '去修改',
          handler: () => {
            this.navCtrl.push('InformationsPage', {}, { duration: 200 });
          }
        }
      ]
    });
    confirm.present();

  }


  /**
   * 获取额度
   */
  newQmoney() {

    if (!localStorage.getItem('gps')) {

      this.serviceinter.GBS()
        .map(data => data.json())
        .subscribe(
        data => {
          this.gps = data.content.address_detail.province + ',' + data.content.address_detail.city;
          localStorage.setItem('gps', this.gps);
          this.toQuota();
        }, err => {
          this.utils.showBlock('您的gps定位失败，可能会影响您的额度获取');
          this.toQuota();
        })
    } else {
      this.toQuota();
    }

  }

  /**
   * 提交重新获取额度
   */
  toQuota() {
    this.gps = localStorage.getItem('gps') ? localStorage.getItem('gps') : 'gps获取失败';

    this.http.get(SERVER_URL + `/cf_main/cf/quotaValue?userid=${this.userId}&gps=${this.gps}`)
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);

        if (data.success) {
          this.utils.showAlert(data.msg);
          this.ionViewWillEnter();
        } else {
          this.utils.showAlert(data.msg);
        }

      }, err => {
        this.utils.showBlock('服务器连接错误,请稍候重试');
      }
      )
  }
}

