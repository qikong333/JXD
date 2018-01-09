import { UtilsProvider } from './../../providers/utils/utils';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { httpFactory } from './../../app/app.module';
import { SERVER_URL } from './../../providers/constants/constants';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceInterfaceProvider } from '../../providers/service-interface/service-interface';
import { HelpersProvider } from '../../providers/helpers/helpers';
/**
 * Generated class for the ReceeptBankPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'ReceeptBankPage'
})
@Component({
  selector: 'page-receept-bank',
  templateUrl: 'receept-bank.html',
})
export class ReceeptBankPage {

  bankName: string;//银行卡所属银行
  bankNum: string;//银行卡
  bankId: any;//银行卡id
  pass: any;//判断是否有还款中的订单
  idCard: string;//身份证
  userName: string;//用户名



  username: string;
  phone: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public serviceinterface: ServiceInterfaceProvider,
    public httpservice: HttpServiceProvider,
    public alertCtrl: AlertController,
    public utils: UtilsProvider,
    public helpers: HelpersProvider
  ) {

  }

  ionViewWillEnter() {

    let getItem = localStorage.getItem("user");
    let json = JSON.parse(getItem);

    console.log(this.phone);
    this.httpservice.get(SERVER_URL + '/cf_main/cf/user/personalInformation', { loginName: json.mobile })
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        if (data.success) {

          this.bankName = data.data.personalInformation.bankCards[0].bankName;
          this.bankNum = data.data.personalInformation.bankCards[0].bankCard;
          this.bankId = data.data.personalInformation.bankCards[0].bankId;
          this.pass = data.data.personalInformation.allowBind;
          this.idCard = data.data.personalInformation.idcard;
          this.userName = data.data.personalInformation.name;

        } else {

        }
      }
      )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.helpers.hideTabs1();

  }


  ionViewWillLeave() {
    this.helpers.hideTabs2();
  }


  /**
   * 点击重新绑定银行卡调用方法
   */
  toReloadBank() {

    if (this.pass == 1) {//1为订单没有待还中
      this.navCtrl.push('ReloadBankPage', { bankId: this.bankId, idCard: this.idCard, username: this.userName }, { duration: 300 });

    } else {
      this.utils.showAlert('请先还清本次借款');
    }
  }
}
