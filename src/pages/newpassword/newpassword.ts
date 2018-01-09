import { UtilsProvider } from './../../providers/utils/utils';
import { SERVER_URL } from './../../providers/constants/constants';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the NewpasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'NewpasswordPage',
})
@Component({
  selector: 'page-newpassword',
  templateUrl: 'newpassword.html',
})
export class NewpasswordPage {

  password1: any = '';//密码1
  password2: any = '';//密码2

  type1: any = 'password';//查看密码
  type2: any = 'password';//查看密码
  active1: any = true;//显示不同的眼
  active2: any = true;//显示不同的眼
  isCleanPassword1: boolean = false;//显示密码清除按钮
  isCleanPassword2: boolean = false;//显示密码清除按钮


  constructor(public navCtrl: NavController, public navParams: NavParams, public httpservece: HttpServiceProvider,
    public utils: UtilsProvider,
    public alertCtrl: AlertController,
    public helpers: HelpersProvider
  ) {
  }


  /**
 * 查看密码
 */
  seaPassword1() {

    if (this.type1 == 'password') {
      this.type1 = 'text';
      this.active1 = false;
    } else {
      this.type1 = 'password';
      this.active1 = true;
    }

  }

  /**
 * 显示密码清空按钮
 */
  showPasswordCleanButton1(obj) {
    if (!obj) {
      this.isCleanPassword1 = false;
    } else {
      this.isCleanPassword1 = true;
    }

  }

  /**
 * 清空密码
 */
  passwordCtrl1() {
    this.password1 = "";
    this.isCleanPassword1 = false
  }


  /**
 * 查看密码
 */
  seaPassword2() {

    if (this.type2 == 'password') {
      this.type2 = 'text';
      this.active2 = false;
    } else {
      this.type2 = 'password';
      this.active2 = true;
    }

  }

  /**
 * 显示密码清空按钮
 */
  showPasswordCleanButton2(obj) {
    // console.log(obj)
    if (!obj) {
      this.isCleanPassword2 = false;
    } else {
      this.isCleanPassword2 = true;
    }

  }

  /**
 * 清空密码
 */
  passwordCtrl2() {
    this.password2 = "";
    this.isCleanPassword2 = false
  }




  
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewpasswordPage');
    this.helpers.hideTabs1();
  }

  /**http://192.168.4.40:8080/cf_main/cf/forgetPassword
   * 获取新密码方法
   */
  getNewPassword() {

    if (!this.utils.isPassword(this.password1) || !this.utils.isPassword(this.password2)) {
      this.utils.showAlert('请输入6~20位数字和字母的密码');
      return;
    }else if(this.password1 != this.password2){
      this.utils.showAlert('输入的两次密码不一样');
      return;
    }

    let p = {
      loginName:this.utils.encryption( this.navParams.get('loginName')) ,
      smsCode:this.utils.encryption( this.navParams.get('mobileCode')),
      newPwd1:this.utils.encryption(this.password1),
      newPwd2:this.utils.encryption(this.password2),
    }
    console.log(p);
    this.httpservece.post(SERVER_URL + '/cf_main/cf/forgetPassword', p)
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        if (data.success) {

          this.showChoose("找回成功");
        } else {
          this.utils.showAlert(data.msg);
        }
      }, error => { this.utils.showBlock('服务器连接错误,请稍候重试'); }
      )
  }

  /**
   * 操作成功后弹窗
   * @param text 
   */
  showChoose(text) {
    let alert = this.alertCtrl.create({
      title: text,
      buttons: [{
        text: '确定',
        handler: () => {
          this.navCtrl.push('LoginPage', {}, { duration: 300 });
        }
      }]
    });
    alert.present();
  }

}
