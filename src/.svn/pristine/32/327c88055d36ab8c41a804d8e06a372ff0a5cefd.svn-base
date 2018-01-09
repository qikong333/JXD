import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController,Events } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { SERVER_URL } from '../../providers/constants/constants';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the BannkcardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage(
  {
    name: 'BannkcardPage',
  }
)
@Component({
  selector: 'page-bannkcard',
  templateUrl: 'bannkcard.html',
})
export class BannkcardPage {
  public yzcode;           //验证码
  public tuSrc;            //图片地址
  public tuWinTitle;       //弹窗标题
  public isGetCode;        //是否允许获取验证码


  constructor(
    public alertCtrl:AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public utils:UtilsProvider,
    public events:Events,
    public httpservice:HttpServiceProvider,
    public helpers:HelpersProvider

  ) {
    this.tuWinTitle = '请按照图形输入字母数字';
    this.isGetCode = true;
  }


  
  ionViewWillLeave(){
  this.helpers.hideTabs2();
  }

    ionViewDidLoad(){
      this.getPicCode();
      this.helpers.hideTabs1();
    }
  /**
   * 显示图片验证码弹框
   */
  showTuCode(num){

    this.getPicCode();

    console.log(this.tuSrc )

    let alert = this.alertCtrl.create({
      title: this.tuWinTitle,
      message: "<img src='"+this.tuSrc+"'>",
      cssClass:'registerWin',
      inputs: [
        {
          name: 'tucode',
          placeholder: '请输入图片验证码',
          type: 'number',
        }
      ],
      buttons: [
        {
          text: '确定',
          handler: data => {
            console.log(data);
            if (true) {
              // logged in!
              //提交验证码

            } else {
              // invalid login

            }
          }
        }
      ]
    });
    alert.present();
  }

  //获取图片验证码
  getPicCode(){
    this.httpservice.get(SERVER_URL+'/jeeplus/servlet/validateCodeServlet')
      .subscribe(
        data=> {this.tuSrc=data.url;console.log(data )},
        erro=>{console.log(erro )},

      )
  }

}
