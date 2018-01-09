import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { SERVER_URL,VERSION_NUM } from '../../providers/constants/constants';
import { NativeServiceProvider } from '../../providers/native-service/native-service';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ServiceInterfaceProvider } from '../../providers/service-interface/service-interface';

/**
 * Generated class for the SetupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage(
  {
    name: 'SetupPage',
  }
)
@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage {
  isshow: boolean;           //修改密码--退出登录
  version = VERSION_NUM;                //版本号

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public NativeServiceProvider: NativeServiceProvider,
    public helpers:HelpersProvider,
    public serviceinterface:ServiceInterfaceProvider,
    public native:NativeServiceProvider,
  ) {
  }

 ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.helpers.hideTabs1();

  }
  ionViewWillLeave(){
    this.helpers.hideTabs2();
  }


  // 即将进入页面
  ionViewWillEnter() {
    this.isshow = true;        //默认没登录---隐藏修改密码和退出登录
    if (localStorage.getItem('loginState')) {
      this.isshow = true;
    } else {
      this.isshow = false;
    }
  }


  //弹窗的封装函数
  alert(type) {
    let alert = this.alertCtrl.create({
      title: type,
      enableBackdropDismiss:false,
      buttons: [
        {
          text: ' 确定',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }

  //修改登录密码
  change() {
    if (!localStorage.getItem('loginState')) {
      this.navCtrl.push('LoginPage')
      return;
    }
    this.navCtrl.push("ChangePasswordPage", {}, { duration: 100 })
  }

  //关于我们 
  go_about() {
    this.navCtrl.push("AboutmePage", {}, { duration: 100 });
  }

  //当前版本
  go_version() {
    if (this.NativeServiceProvider.isAndroid()) {

      this.serviceinterface.appUpData()
      .map(data=>data.json())
      .subscribe(
        data=>{
          console.log('安卓版本升级')//版本号
          console.log(data);
          this.native.isUpdata(data.data.appVersion,data.data.isupdate,data.msg,data.data.downloadUrl,'1')
        }
      )





    }
  }

  //退出登录
  out() {

    let alert = this.alertCtrl.create({
      title: '您确定要退出当前用户吗?',
      enableBackdropDismiss:false,
      buttons: [
        {
          text: '取消'
        }, {
          text: '确定',
          handler: () => {
            localStorage.removeItem('loginState');
            localStorage.removeItem('user');
            localStorage.removeItem('userPhone');
            // localStorage.clear();//清空所有缓存;
            this.navCtrl.pop();

          }
        }
      ]
    });
    alert.present();

  }

}
