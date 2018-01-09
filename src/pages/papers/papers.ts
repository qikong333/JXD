import { Component, Output, OnChanges, EventEmitter, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { SERVER_URL } from '../../providers/constants/constants';
// import {Response, Headers} from 'http/http'; 
import { Headers } from '@angular/http';
import { Http } from '@angular/http';
import { NgForm } from '@angular/forms';
import { ServiceInterfaceProvider } from '../../providers/service-interface/service-interface';
import { Contact } from '@ionic-native/contacts';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the PapersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'PapersPage'
})
@Component({
  selector: 'page-papers',
  templateUrl: 'papers.html',
})
export class PapersPage {
  public f1;
  public phoneName;
  public files: any[];

  public fileContainer;
  public fileSrc;

  public fileSrc1: string;
  public fileSrc2: string;
  public fileSrc3: string;
  public fileSrc4: string;

  public isfileSrc1: boolean;
  public isfileSrc2: boolean;
  public isfileSrc3: boolean;
  public isfileSrc4: boolean;

  public file: File;
  public url: string;
  headers: Headers;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpservice: HttpServiceProvider,
    public http: Http,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public serviceinterface: ServiceInterfaceProvider,
    public helpers:HelpersProvider,


  ) {
 


    this.f1 = "";
    this.files = [];

    this.fileContainer = [];
    this.fileSrc = "";

    this.fileSrc1 = "";
    this.fileSrc2 = "";
    this.fileSrc3 = "";
    this.fileSrc4 = "";

    this.isfileSrc1 = true;
    this.isfileSrc2 = true;
    this.isfileSrc3 = true;
    this.isfileSrc4 = true;


    this.headers = new Headers();
    // this.headers.set('Content-Type', 'multipart/form-data');
    this.headers.append('Content-Type', 'multipart/form-data')
  }

    ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.helpers.hideTabs1();

  }
  

  ionViewWillLeave(){
  this.helpers.hideTabs2();
  }

  @Output()
  papersoutput: EventEmitter<string> = new EventEmitter<string>();



/**
 * 每次改变图片输入框时调用此方法
 * @param evt 
 * @param Num 
 */
  uploadAPI(evt, Num) {

    let target = evt.target;

    if (target.files[0] == null)
      return;
    let selt = this;
    let size = target.files[0].size / (1024 * 1024);
    if (size > 5) {
      let confirm = this.alertCtrl.create({
        message: '图片大小不能超过5M',
        buttons: ["确定"]
      });
      confirm.present();
      return false;
    }
    selt.fileContainer.push(target.files[0]);
    var OFReader = new FileReader();
    OFReader.onload = function () {
      if (Num == 1) {
        selt.fileSrc1 = this.result;
        selt.isfileSrc1 = false;
      } else if (Num == 2) {
        selt.fileSrc2 = this.result;
        selt.isfileSrc2 = false;
      } else if (Num == 3) {
        selt.fileSrc3 = this.result;
        selt.isfileSrc3 = false;
      } else if (Num == 4) {
        selt.fileSrc4 = this.result;
        selt.isfileSrc4 = false;
      }
    };
    OFReader.readAsDataURL(target.files[0]);
    console.log(OFReader);
    console.log(selt);
    console.log(selt.fileSrc);
    console.log(selt.fileContainer);



  }


/**
 * 提交图片按钮
 * @param f1 
 * @param f2 
 * @param f3 
 * @param f4 
 */
  submitData(f1, f2, f3, f4) {

    this.files = [];//重复提交时将之前已加入的文件清空

    console.log(f1[0], f2[0], f3[0], f4[0])

    if (f1.length == 0 || f2.length == 0 || f3.length == 0 || f4.length == 0) {
      let confirm = this.alertCtrl.create({
        title: '请把相关资料上传完整',
        buttons: ["确定"]
      });
      confirm.present();
      return false;
    }

    this.files.push(f1[0], f2[0], f3[0], f4[0]);
    console.log(this.files)

    var formData = new FormData();
    let fileContainer = this.files;

    // let fileContainer = this.fileContainer;
    console.log(fileContainer);

    // for (var key in fileContainer) {

    for (var key = 0; key < fileContainer.length; key++) {

      let num = Number(key) + 1;
      console.log(num);
      formData.append("files" + num, fileContainer[key]);

    }

    //获取用户手机号码
    let user = localStorage.getItem('user');
    if (user != null) {
      var json = JSON.parse(user);//将其转换成json对象
      this.phoneName = json.mobile;
    }
    console.log(this.phoneName)

    formData.append("loginName", this.phoneName);
    console.log(fileContainer);
    console.log(formData);

    // 提交数据接口
    this.serviceinterface.saveIdentityCard(formData)
      .map(data => data.json())
      .subscribe(
      data => {

        console.log(data)
        if (data.success) {
          this.success();

        }
      }
      )
  }
  
    /**
	 * 成功时弹窗函数
	 */
	success() {
		let alert = this.alertCtrl.create({
			title: '保存成功',
			buttons: [
				{
					text: '确定',
					handler: () => {
						// 跳转下一页
          this.navCtrl.push('BankPage');
					}
				}
			]
		});
		alert.present();
	}

  closePage() {
    let alert = this.alertCtrl.create({
      // title: '获取借款额度需完成认证确定关闭认证？',
      message: '获取借款额度需完成认证确定关闭认证？',
      buttons: [
        {
          text: '关闭',
          handler: () => {
            console.log('Cancel clicked');
            this.navCtrl.popToRoot();
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }


aa(){
  alert(1111111)
}

}
