import { ServiceInterfaceProvider } from './../../providers/service-interface/service-interface';
import { UtilsProvider } from './../../providers/utils/utils';
import { NativeServiceProvider } from './../../providers/native-service/native-service';
import { SERVER_URL } from './../../providers/constants/constants';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
/**
 * Generated class for the IdentityInformationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'IdentityInformationPage'
})
@Component({
  selector: 'page-identity-information',
  templateUrl: 'identity-information.html',
})
export class IdentityInformationPage {

  public path;
  public active = this.navParams.get('stare');
  show1: any;
  show2: any;
  show3: any;
  name: string;//姓名
  idNum: any;//身份证号码
  address: string;//地址
  validity: any;//有效期


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    public native: NativeServiceProvider,
    public transfer: FileTransfer,
    public file: File,
    public alert: AlertController,
    public utils: UtilsProvider,
    public service: ServiceInterfaceProvider
  ) {
  }

  ionViewWillEnter() {
    // this.active = this.navParams.get('active');
    this.getResult();
  }


  /**
   * 查询身份认证情况
   */
  getResult() {
    let loginName = localStorage.getItem('userPhone');
    console.log(loginName);
    this.service.getIdentifyResult(loginName)
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        this.show1 = data.data.frontCardFlag;
        this.show2 = data.data.backCardFlag;
        this.show3 = data.data.resultVideoFlag;

        this.name = data.data.frontName;
        this.idNum = data.data.frontCardNO;
        this.address = data.data.issuedBy;
        this.validity = data.data.tValidDate;
      }, err => { console.log(err) }
      )
  }

  toPhoto1() {
    this.navCtrl.push('IdentifyPhotoPage', { page: 1 });
  }

  toPhoto11() {
    this.navCtrl.push('IdentifyPhotoPage', { page: 11, name: this.name, idNum: this.idNum });
  }

  toPhoto22() {
    this.navCtrl.push('IdentifyPhotoPage', { page: 22, address: this.address, validity: this.validity });
  }

  toPhoto2() {
    if (!this.show1) {
      this.showChoose('请先进行身份证人像面认证?', 'IdentifyPhotoPage', 1);

    } else {
      this.navCtrl.push('IdentifyPhotoPage', { page: 2 });//如果第一张已经认证成功,才能进入第二页
    }
  }


  toVideo() {
    if (!this.show1) {
      this.showChoose('请先进行身份证正面认证?', 'IdentifyPhotoPage', 1);
    } else if (this.show1 && !this.show2) {
      this.showChoose('请先进行身份证背面认证?', 'IdentifyPhotoPage', 2);
    } else {
      this.navCtrl.push('RecordVideoPage');
    }
  }


  /**
   * 重新认证
   */
  reCheck() {
    // this.navCtrl.setRoot('RepaymentPage');
    // this.navCtrl.remove(this.navCtrl.length()-2);
    // this.navCtrl.getActive();
    this.navCtrl.remove(this.navCtrl.length()-2,2);
  }


  /**
   * 跳转页面
   * @param text 
   * @param page 
   */
  showChoose(text, p, t) {
    let alert = this.alert.create({
      title: text,
      buttons: [
        { text: '取消' },
        {
          text: '确定',
          handler: () => {
            this.navCtrl.push(p, { page: t });
          }
        }
      ]
    });
    alert.present();
  }

}
