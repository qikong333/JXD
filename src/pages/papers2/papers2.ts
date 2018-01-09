import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceInterfaceProvider } from '../../providers/service-interface/service-interface';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the Papers2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name: 'Papers2Page'
})
@Component({
  selector: 'page-papers2',
  templateUrl: 'papers2.html',
})
export class Papers2Page {

  public isActive: boolean;    //判断是否认证完成
  public dataUrl: string;      //faceid返回的第三方跳转地址


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public serviceinterface: ServiceInterfaceProvider,

  ) {
    this.isActive = this.navParams.get('stare');
    // this.isActive = false
    console.log(this.isActive );
    this.getUrl();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Papers2Page');
  }


  //生成faceid地址
  getUrl() {
    this.serviceinterface.getFaceURL(localStorage.getItem('userPhone'))
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data)
        if (data.success) {
          this.dataUrl = data.data;
        }
      }
      )

  }

  //点击弹窗
  tis() {
    
    let alert = this.alertCtrl.create({
      title: '请完成所有认证',
      // message: 'Do you want to buy this book?',
      buttons: [
        {
          text: '不认证了',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.getUrl();
          }
        },
        {
          text: '完成认证',
          handler: () => {
            console.log('Buy clicked');
            //请问服务器，判断状态，刷新数据
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }


  //查证件接口



  //判断是否经过认证





}
