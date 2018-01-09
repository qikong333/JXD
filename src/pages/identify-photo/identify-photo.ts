import { SERVER_URL } from './../../providers/constants/constants';
import { ServiceInterfaceProvider } from './../../providers/service-interface/service-interface';
import { NativeServiceProvider } from './../../providers/native-service/native-service';
import { UtilsProvider } from './../../providers/utils/utils';
import { AlertController } from 'ionic-angular';
// import { IdentityInformationPage } from './../identity-information/identity-information';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the IdentifyPhotoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'IdentifyPhotoPage'
})
@Component({
  selector: 'page-identify-photo',
  templateUrl: 'identify-photo.html',
})
export class IdentifyPhotoPage {

  path: any;//图片路径
  idNumber: any = '';//身份证号码
  name: string = '';//姓名
  address: string = '';//签发地址
  time: string = '';//有效时间

  active: number = this.navParams.get('page');//判断显示
  photo1: boolean = false;
  photo2: boolean = false;

  button1: boolean = false;
  button2: boolean = false;
  // public show:number = this.navParams.get('page');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    public transfer: FileTransfer,
    public alert: AlertController,
    public utils: UtilsProvider,
    public nativeService: NativeServiceProvider,
    public serviceInter: ServiceInterfaceProvider
    // public idPhoto: IdentityInformationPage
  ) {
  }

  ionViewWillEnter() {

    this.active = this.navParams.get('page');
    if (this.active == 1) {//未认证正面时
      this.toPhoto1();
    } else if (this.active == 2) {//未认证背面时
      this.toPhoto2();
    } else if (this.active == 11) {//已认证正面时
      this.name = this.navParams.get('name');
      this.idNumber = this.navParams.get('idNum');
    } else if (this.active == 22) {//已认证背面时
      this.address = this.navParams.get('address');
      this.time = this.navParams.get('validity');
    } else if (this.active == 5) {//未认证手持身份证照时

      
    }
  }

  /**
   * 重拍1
   */
  rePhoto1() {
    let show1;
    let loginName = localStorage.getItem('userPhone');
    this.serviceInter.getIdentifyResult(loginName)
      .map(data => data.json())
      .subscribe(
      data => {
        show1 = data.data.frontCardFlag;
        if (show1) {
          this.utils.showAlert('您的身份证正面已认证成功');

        } else {
          this.toPhoto1();
        }
      }, err => { this.utils.showBlock('服务器连接错误,请稍候重试'); }
      )
  }

  /**
   * 重拍2
   */
  rePhoto2() {

    let show2;
    let loginName = localStorage.getItem('userPhone');
    this.serviceInter.getIdentifyResult(loginName)
      .map(data => data.json())
      .subscribe(
      data => {
        show2 = data.data.backCardFlag;
        if (show2) {
          this.utils.showAlert('您的身份证反面已认证成功');
        } else {
          this.toPhoto2();
        }
      }, err => { this.utils.showBlock('服务器连接错误,请稍候重试'); }
      )
  }

  goPhoto2() {
    let show3;
    let loginName = localStorage.getItem('userPhone');
    this.serviceInter.getIdentifyResult(loginName)
      .map(data => data.json())
      .subscribe(
      data => {
        show3 = data.data.frontCardFlag;//正面情况
        if (show3) {
          this.toPhoto2();
        } else {
          this.utils.showAlert('请重拍身份证正面');
        }
      }, err => { this.utils.showBlock('服务器连接错误,请稍候重试'); }
      )

  }

  /**
   * 点击录视频
   */
  goVideo() {
    let show3;
    let loginName = localStorage.getItem('userPhone');
    this.serviceInter.getIdentifyResult(loginName)
      .map(data => data.json())
      .subscribe(
      data => {
        show3 = data.data.backCardFlag;//反面情况
        if (show3) {
          this.toVideo();
        } else {
          this.utils.showAlert('请重拍身份证反面');
        }
      }, err => { this.utils.showBlock('服务器连接错误,请稍候重试'); }
      )
  }

  /**
   * 拍摄身份证正面
   */
  toPhoto1() {

    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: false,
      sourceType: 1,
    }

    this.camera.getPicture(options).then(
      (imageData) => {
        this.path = imageData;

        this.upload1();
      }, (err) => {
        // this.failResult(err);
        this.utils.showBlock(err);
      });
  }

  /**
   * 拍摄身份证背面图
   */
  toPhoto2() {

    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: false,
      sourceType: 1,
    }

    this.camera.getPicture(options).then(
      (imageData) => {
        this.path = imageData;

        this.upload2();
      }, (err) => {
        // this.failResult(err);
        this.utils.showBlock(err);
      });

  }

  /**
   * 拍摄手持身份证
   */
  toPhoto5() {

    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: false,
      allowEdit: false,
      sourceType: 1,
    }

    this.camera.getPicture(options).then(
      (imageData) => {
        this.path = imageData;

        this.upload2();
      }, (err) => {
        // this.failResult(err);
        this.utils.showBlock(err);
      });

  }
  /**
   * 上传图片
   */
  upload1() {
    this.nativeService.showLoading('正在认证....');

    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'up.jpg',
      params: { loginName: localStorage.getItem('userPhone'), type: 1 }
    }
    fileTransfer.upload(this.path, SERVER_URL + '/cf_main/cf/cardidVide', options)
      .then(
        (data) => {
        let result = JSON.parse(data.response);
        this.nativeService.hideLoading();//关闭正在加载窗

        if (result.success) {
          this.photo1 = true;
          this.showSuccess('身份证正面上传成功', '请核实是否有误');

          this.idNumber = result.data.cardId;
          this.name = result.data.realName;
        } else {
          this.utils.showAlert(result.msg);
        }
      }, (err) => {
        this.nativeService.hideLoading();//关闭
        this.utils.showBlock('服务器连接错误,请稍候重试');
      })
  }

  /**
   * 上传图片
   */
  upload2() {
    this.nativeService.showLoading('正在认证....');

    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: 'down.jpg',
      params: { loginName: localStorage.getItem('userPhone'), type: 2 }
    }
    fileTransfer.upload(this.path, SERVER_URL + '/cf_main/cf/cardidVide', options)
      .then((data) => {
        let result = JSON.parse(data.response);

        this.nativeService.hideLoading();//关闭

        if (result.success) {
          this.showSuccess('身份证反面上传成功', '请核实是否有误');

          this.active = 2;
          // this.button2 = true;
          this.photo2 = true;

          this.address = result.data.issuedBy;
          this.time = result.data.tValidDate;

        } else {
          this.utils.showAlert(result.msg);
        }
      }, (err) => {
        this.nativeService.hideLoading();//关闭
        // this.utils.showBlock('认证失败', 2000);//显示上传结果
        this.utils.showBlock('服务器连接错误,请稍候重试');
      })
  }

  /**
   * 点击拍摄背面时
   */
  downPhoto() {
    let alert = this.alert.create({
      title: '拍摄身份证背面(国徽面)',
      buttons: [
        { text: '取消' },
        {
          text: '确定',
          handler: () => {
            this.toPhoto2();
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * 去拍摄录像
   */
  toVideo() {
    this.navCtrl.push('RecordVideoPage', { name: this.name, idNumber: this.idNumber });
  }

  /**
   * 调用相机失败回调函数
   */
  failResult(err) {
    let alert = this.alert.create({
      title: err,
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }


  showSuccess(title, text) {
    let alert = this.alert.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: '确定',
        }
      ]
    });
    alert.present();
  }


}
