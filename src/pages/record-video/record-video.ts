import { ServiceInterfaceProvider } from './../../providers/service-interface/service-interface';
import { NativeServiceProvider } from './../../providers/native-service/native-service';
import { UtilsProvider } from './../../providers/utils/utils';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { SERVER_URL } from './../../providers/constants/constants';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions, MediaFileData } from '@ionic-native/media-capture';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
// import { VideoCapturePlus, VideoCapturePlusOptions } from '@ionic-native/video-capture-plus';
import { VideoEditor } from '@ionic-native/video-editor';
import { AndroidPermissions } from '@ionic-native/android-permissions';
/**
 * Generated class for the RecordVideoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'RecordVideoPage'
})
@Component({
  selector: 'page-record-video',
  templateUrl: 'record-video.html',
})
export class RecordVideoPage {

  public number: string = '';//用户朗读的数字
  public token_random_number: string;//携带到后台的数字编码
  public result: boolean = false;//判断成功显示成功页面

  public title: string;   //开始录制视频文字
  public code: number;    //倒计时
  public active: boolean;  //点击禁止按钮
  public

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaCapture: MediaCapture,
    public http: Http,
    public httpservice: HttpServiceProvider,
    public utils: UtilsProvider,
    public transfer: FileTransfer,
    public alert: AlertController,
    public native: NativeServiceProvider,
    // private videoCapturePlus: VideoCapturePlus,
    private videoEditor: VideoEditor,
    private androidPermissions: AndroidPermissions,
    public service: ServiceInterfaceProvider

  ) {
    this.title = '开始录制视频';
    this.code = 3;
    this.active = false;
  }

  ionViewDidLoad() {

    if (this.native.isAndroid()) {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
        success => { console.log('Permission granted') },
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
      );

      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]);


      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
        success => { console.log('Permission granted') },
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      );

      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.MOUNT_UNMOUNT_FILESYSTEMS]);

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.MOUNT_UNMOUNT_FILESYSTEMS).then(
        success => { console.log('Permission granted') },
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.MOUNT_UNMOUNT_FILESYSTEMS)
      );

      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.MOUNT_UNMOUNT_FILESYSTEMS]);

    }
  }

  ionViewWillEnter() {
    this.getNumber();
  }

  /**进入页面获取四位数字
   * 192.168.3.150:8080/cf_main/cf/getRandomNumber?loginName=15920282738
   */
  getNumber() {

    this.httpservice.get(SERVER_URL + '/cf_main/cf/getRandomNumber', { loginName: localStorage.getItem('userPhone') })
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        this.number = data.data.randomNumber;
        this.token_random_number = data.data.randomNumberToken;
      }, err => {
        this.utils.showBlock('服务器出错,请重新加载页面');
      }
      )
  }

  /**
   * 获取用户身份证号码
   * 
   */
  getIdNum() {
    this.service.personalInformation(localStorage.getItem('userPhone'))
      .map(data => data.json())
      .subscribe(data => {

      }, err => { this.utils.showBlock(err) })
  }


  // 拍照
  real_video() {

    this.active = true;
    this.title = "请牢记数字（" + this.code + "秒后录制）";
    var aa = setInterval(() => {
      if (this.code <= 1) {
        clearInterval(aa);
        this.video2();
        return;
      } else {
        this.code--;
        this.title = "请牢记数字（" + this.code + "秒后录制）";
      }
    }, 1000)

  }


  /**
   * 录像
   */
  file: string;
  test() {
    try { this.video2() }
    catch (e) { alert(e) }
  }

  video2() {

    this.active = false;

    this.code = 3;
    this.title = "开始录制视频";

    let options: CaptureVideoOptions = { limit: 1, duration: 3, quality: 1 };     //视频剪辑的最大数量。在iOS中，这个值被忽略，每次调用只有一个视频剪辑。
    this.mediaCapture.captureVideo(options)
      .then(
      (data: MediaFile[]) => {
        // this.utils.showBlock('录制成功');

        this.edit(data[0].fullPath, data[0].name);
        this.native.showLoading('正在认证...');
      }, err => {
        this.utils.showBlock('录制终止');
      }
      );
  }


  /**
   * 编辑视频
   */
  edit(dataurl, dataname) {
    this.videoEditor.transcodeVideo({
      fileUri: dataurl,
      outputFileName: 'output.mp4',
      outputFileType: this.videoEditor.OutputFileType.MPEG4,
      width: 900,//  可选，请参见下面的宽度和高度  
      height: 900,//  可选，请参见下面的宽度和高度  
      videoBitrate: 1500000, //  可选，比特率位，默认为1兆比特（1000000）  
      saveToLibrary: false,//不保存新视频
      deleteInputFile: true,//删除原视频
    }).then(
      (fileUri) => {

        let file = 'file://' + fileUri;
        this.native.showLoading('上传视频中');
        this.upvideo(dataname, file)

      },
      (e) => {
        this.upvideo(dataname, dataurl);//上传原视频

        // let alert = this.alert.create({
        //   title: '权限提示',
        //   subTitle: '请到设置功能开启手机的文件读取权限, 若无法开启请点击直接上传视频源文件，但是可能上传时间会比较长请您耐心等待。',
        //   // subTitle: JSON.stringify(e),
        //   buttons: [
        //     {
        //       text: '去开启权限',
        //       role: 'cancel',
        //       handler: () => {
        //         console.log('Cancel clicked');
        //       }
        //     },
        //     {
        //       text: '上传源文件',
        //       handler: () => {
        //         this.upvideo(dataname, dataurl)
        //       }
        //     }
        //   ]
        // });
        // alert.present();
      }
      )
      .catch((error: any) => this.utils.showAlert(JSON.stringify(error)));
  }


  /**
   * 上传视频
   */
  upvideo(name, fileUrl) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: name,
      chunkedMode: false,
      mimeType: 'video/3gpp',
      params: {
        loginName: localStorage.getItem('userPhone'), type: 3, token_random_number: this.token_random_number,
        // idcard_name: this.navParams.get('name'), idcard_number: this.navParams.get('idNumber')
      }

    }

    // fileTransfer.upload(fileUrl, SERVER_URL + '/cf_main/test/file', options)
    fileTransfer.upload(fileUrl, SERVER_URL + '/cf_main/cf/cardidVide', options)
      .then((data) => {
        let result = JSON.parse(data.response);
        this.native.hideLoading();
        this.utils.showBlock(result.msg);

        if (result.success) {
          // this.successResult("身份认证成功");
          this.result = true;

        } else {
          this.utils.showAlert(result.msg);
        }

      }, (err) => {
        this.native.hideLoading();
        this.utils.showAlert('视频上传失败,请重新认证');
      })
  }

  /**
   * 录像
   */
  video() {
    this.active = false;

    this.code = 3;
    this.title = "开始录制视频";
    let options: CaptureVideoOptions = { limit: 1, duration: 3, quality: 1 };     //视频剪辑的最大数量。在iOS中，这个值被忽略，每次调用只有一个视频剪辑。
    this.mediaCapture.captureVideo(options)
      .then(
      (data: MediaFile[]) => {
        // alert(data[0].name + '....名称')
        // alert(data[0].fullPath+'....完整路劲')
        // alert(data[0].type+'..类型')
        // alert(data[0].lastModifiedDate+'..上次修改日期')
        // alert(data[0].size + "...文件大小")
        // alert(data[0].getFormatData+"..格式信息")
        this.native.showLoading('正在认证...');

        const fileTransfer: FileTransferObject = this.transfer.create();

        let options: FileUploadOptions = {
          fileKey: 'file',
          fileName: data[0].name,
          chunkedMode: false,
          mimeType: 'video/3gpp',
          params: {
            loginName: localStorage.getItem('userPhone'), type: 3, token_random_number: this.token_random_number,
            // idcard_name: '陈炼成', idcard_number: 441721199311180074
            idcard_name: this.navParams.get('name'), idcard_number: this.navParams.get('idNumber')
          }

        }

        fileTransfer.upload(data[0].fullPath, SERVER_URL + '/cf_main/cf/cardidVide', options)
          .then((data) => {
            // alert(data.response);

            let result = JSON.parse(data.response);

            this.native.hideLoading();
            this.utils.showBlock(result.msg);

            if (result.success) {
              // this.successResult("身份认证成功");
              this.result = true;

            } else {
              this.utils.showAlert(result.msg);
            }

          }, (err) => {
            this.utils.showAlert(err);
          })

      },
      (err: CaptureError) => {
        this.utils.showBlock(err.code)
      }
      );
  }

  // this.mediaCapture.onPendingCaptureResult()._finally(()=>{})

  /**
   * 点击完成
   */
  success() {
    this.navCtrl.remove(this.navCtrl.length() - 2, 2);
  }

  /**
     * 调用摄像成功回调函数
     */
  successResult(text) {
    let alert = this.alert.create({
      title: text,
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.navCtrl.push('IdentityInformationPage', { active: true });
          }
        }
      ]
    });
    alert.present();
  }

  //退出
  out_video() {
    this.navCtrl.remove(this.navCtrl.length() - 2, 2);
  }

}
