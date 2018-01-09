import { Component, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera'
import { NativeServiceProvider } from '../../providers/native-service/native-service';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { Contacts, Contact, ContactField, ContactName, ContactFindOptions, ContactFieldType } from '@ionic-native/contacts';
// import { Geolocation } from '@ionic-native/geolocation';
import { SERVER_URL, KEY } from '../../providers/constants/constants';
import { UtilsProvider } from '../../providers/utils/utils';
import { VideoEditor } from '@ionic-native/video-editor';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { ServiceInterfaceProvider } from '../../providers/service-interface/service-interface';
import { Subscription } from 'rxjs/Subscription';



/**
 * Generated class for the HomeFootPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var window: any;
declare var SMS: any;
declare var cordova: any;
declare let CryptoJS: any;

@IonicPage({
  name: 'HomeFootPage',
})
@Component({
  selector: 'page-home-foot',
  templateUrl: 'home-foot.html',

})

export class HomeFootPage implements OnInit, OnChanges {
  // @Input() content:any='';
  // @Output() bb:any='ddddddddd'
  name: string;
  account: {
    email: string;
    confirm: string;

  }

  iscordova: boolean;

  number;
  _inputcontent;


  @Input()
  set inputcontent(v) {
    this._inputcontent = v;

    console.log(v);
  };

  get inputcontent(): string {

    return this._inputcontent;

  }


  @Output()

  output: EventEmitter<string> = new EventEmitter<string>();

  click() {

    this.output.emit("i am from child");

  }
  public urla;
  public alertt;
  public yd //已读短信
	public wd //未读信息
	public alld //未读信息
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    public alertCrtl: AlertController,
    public native: NativeServiceProvider,
    public androidPermissions: AndroidPermissions,
    public modalCtrl: ModalController,
    public themeableBrowser: ThemeableBrowser,
    public http: HttpServiceProvider,
    private contacts: Contacts,
    private utils: UtilsProvider,
    private videoEditor: VideoEditor,
    public helpers: HelpersProvider,
    public serviceinterface: ServiceInterfaceProvider,
    // private geolocation: Geolocation
  ) {

    // this.http.get('http://192.168.4.40:8080/cf_main/cf/getFaceURL?loginName=15767978576&params=RYDCF09072107')
    //   .map(data => data.json())
    //   .subscribe(
    //   data => {
    //     console.log(data.data)
    //     this.urla = data.data
    //   }
    //   )


    // this.geolocation.getCurrentPosition().then((resp) => {
    //   // resp.coords.latitude
    //   // resp.coords.longitude
    //   alert(JSON.stringify(resp))
    //  }).catch((error) => {
    //   alert(error);
    //  });

    //  let watch = this.geolocation.watchPosition();
    //  watch.subscribe((data) => {
    //   // data can be a set of coordinates, or an error (if an error occurred).
    //   // data.coords.latitude
    //   // data.coords.longitude

    //   alert(JSON.stringify(data))
    //  });


  }

  Real_face() {
    this.native.themeable('https://www.baidu.com')
  }

  OpenCamera() {
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // alert(imageData);
      let base64Image = 'data:image/jpeg;base64,' + imageData;


    },
      (err) => {
        // alert(222222);
        // alert(err);
      })
  }

  ionViewDidLoad() {

    // console.log(inputcontent);
  }

  ngOnInit() {



    // if (this.native.isMobile()) {
    //   this.iscordova = true;
    // } else {
    //   this.iscordova = false;
    // }

    // // document.getElementById("snap")
    // //         .addEventListener("click", function() {//获取拍照按钮绑定事件
    // //             var canvans = document.getElementById("canvas"),//调用canvas接口
    // //                     context = canvans['getContext']("2d");
    // //             context.drawImage(video, 0, 0, 640, 480);//调用canvas接口的drawImage方法绘制当前video标签中的静态图片，其实就是截图

    // //             var imgData = canvans.toDataURL();//获取图片的base64格式的数据
    // //             //这里就可以写上传服务器代码了
    // //         });
  }

  ngOnChanges() {

  }

  openCamar1() {


    <any>window.addEventListener("DOMContentLoaded", function () {
      var canvas = document.getElementById("canvas"),//调用canvas接口
        context = canvas['getContext']("2d"),
        video = document.getElementById("video"),
        videoObj = { "video": true },
        errBack = function (error) {//错误处理
          console.log("Video capture error: ", error.code);
        };
      if (navigator.getUserMedia) {//调用html5拍摄接口
        navigator.getUserMedia(videoObj, function (stream) {
          video['src'] = stream;//摄像机属于视频流，所以当然要输出到html5的video标签中了
          video['play']();//开始播放
        }, errBack);
      } else if (navigator['webkitGetUserMedia']) { //WebKit内核调用html5拍摄接口
        navigator['webkitGetUserMedia'](videoObj, function (stream) {
          video['src'] = window['webkitURL'].createObjectURL(stream);//同上
          video['play']();//同上
        }, errBack);
      }
      else if (navigator['mozGetUserMedia']) { //moz内核调用html5拍摄接口
        navigator['mozGetUserMedia'](videoObj, function (stream) {
          video['src'] = window.URL.createObjectURL(stream);//同上
          video['play']();//同上
        }, errBack);
      }
    }, false);
  }

  alert() {
    this.alertt = this.alertCrtl.create({
      title: 'Hello',
      buttons: [{
        text: 'Ok',
        handler: () => {
          // user has clicked the alert button
          // begin the alert's dismiss transition
          let navTransition = this.alertt.dismiss();


          return false;
        }
      }]
    });

    this.alertt.present();
  }

  ionViewDidLeave() {


  }


  a33333() {//通过拍照获取照片
    this.native.getPictureByCamera()
  }
  // a4() {//通过图库获取照片
  //   this.native.getPictureByPhotoLibrary()
  // }


  contast() {
    // let contact: Contact = this.contacts.create();

    // contact.name = new ContactName(null, 'Smith', 'John');
    // contact.phoneNumbers = [new ContactField('mobile', '6471234567')];
    // contact.save().then(
    //   () => console.log('Contact saved!', contact),
    //   (error: any) => console.error('Error saving contact.', error)
    // );

    let aa = this.contacts.pickContact()
    aa.then(
      (data) => {
        // alert( JSON.stringify(data))
        // alert(  JSON.stringify(data.name))  
        // alert(JSON.stringify(data.phoneNumbers) )
      }
    )
      .catch(
      (err) => { console.log(err) }
      )



  }

  hK() {
    let params = {
      user_id: '112',
      money_order: '',
      card_no: '6212262010043977666'
    }
    this.http.get(SERVER_URL + 'cf_main/order/applyRepayment', params)
      .subscribe(
      data => {
        console.log(data);

      }
      )
  }


  chisss() {
    let options = new ContactFindOptions();
    options.filter = "";
    options.multiple = true;
    let filter: ContactFieldType[] = ["displayName", "addresses"];
    this.contacts.find(filter, options)
      .then(

      d => {
        this.onSuccess(d), e => this.onError(e)

      }
      )
      .catch(
      e => this.onError(e)
      )
  }


  onSuccess(contacts) {

    try {
      alert(JSON.stringify(contacts))
      // for (var i = 0; i < contacts.length; i++) {
      //   for (var j = 0; j < contacts[i].addresses.length; j++) {
      //     alert("Pref: " + contacts[i].addresses[j].pref + "\n" +
      //       "Type: " + contacts[i].addresses[j].type + "\n" +
      //       "Formatted: " + contacts[i].addresses[j].formatted + "\n" +
      //       "Street Address: " + contacts[i].addresses[j].streetAddress + "\n" +
      //       "Locality: " + contacts[i].addresses[j].locality + "\n" +
      //       "Region: " + contacts[i].addresses[j].region + "\n" +
      //       "Postal Code: " + contacts[i].addresses[j].postalCode + "\n" +
      //       "Country: " + contacts[i].addresses[j].country);
      //   }
      // }
    }
    catch (e) {
      alert(e)
    }
  };

  onError(contactError) {
    alert('onError!');
  };



  chi() {
    this.videoEditor.transcodeVideo({
      fileUri: '/path/to/input.mov',
      outputFileName: 'output.mp4',
      outputFileType: this.videoEditor.OutputFileType.MPEG4
    })
      .then((fileUri: string) => console.log('video transcode success', fileUri))
      .catch((error: any) => console.log('video transcode error', error));
  }


  dl() {

    //百融
    let brParam = {
      loginName: '13794836380'
    }
    this.bairong('register', brParam);

  }

  zc() {
    // this.serviceinterface.brRegisterTest( );
    // this.helpers.bairong('register')
  }

  /**
  * 百融
  */
  bairong(type, obj) {
    console.log(111111)
    try {

      let win = window,
        doc = document,
        br = win["BAIRONG"] = win["BAIRONG"] || {},
        s = doc.createElement("script"),
        url = 'https://static.100credit.com/ifae/js/braf.min.js?v=2.4.0';
      s.type = "text/javascript";
      s.charset = "utf-8";
      s.src = url;
      br.client_id = "3000775";

      br.config = {
        timeout: 3000,
        gidCrossBrowser: true,

      }
      console.log(22222222)

      doc.getElementsByTagName("head")[0].appendChild(s);
      br.BAIRONG_INFO = {
        "app": "antifraud",
        "event": type,
        "page_type": "dft",
      }

      console.log(3333333)
      window.GetSwiftNumber = (data) => {
        console.log(444444)
        // if (win.isGetSwiftNumberExec) {
        //   console.log(5555555)
        //   return;

        // }
        console.log('aaaa')
        window.isGetSwiftNumberExec = true;

        console.log(66666666666)
        if (data.code) {
          console.log(data.code)
          // console.log(data.response) 
          console.log(data.response.event)
          console.log(data.response.af_swift_number)
          console.log(77777777)
          let allparams = {}
          let brparams = {
            event: data.response.event,
            afSwiftNumber: data.response.af_swift_number
          }

          for (let attr in brparams) {
            allparams[attr] = brparams[attr];
          }
          for (let attr in obj) {
            allparams[attr] = obj[attr];
          }

          console.log(allparams);
          this.brchoose(type, allparams)

        } else {
          console.log(data.code)
          console.log(data.response)
          // this.serviceinterface.brRegisterTest(data.response.af_swift_number)
          // .map(data=>data.json())

          // alert(JSON.stringify(data));
          // console.log(JSON.stringify(data))
        }
      }
    } catch (error) {
      alert(error)
    }
  }

  /**
   * @name 判断百融条件
   */
  brchoose(type, data) {
    switch (type) {
      case 'lend':   //借款
        this.serviceinterface.brLoanequipment(data)
          .subscribe(
          data => console.log(data)
          )
        break;

      case 'register':  //注册
        this.serviceinterface.brRegisterTest(data)
          .subscribe(
          data => console.log(data)
          )
        break;

      default:
        break;
    }
  }

  sms() {
    this.getqx()
    let file = {
      box: 'inbox',
      read: 1,
      indexFrom: 0,
      maxCount: 10,
    }
    window.SMS.listSMS(file, function (data) {
      alert(JSON.stringify(data));
      alert(111)

    }, function (err) {
      alert(err);
      alert(222)
    });

  }

  sms2() {
    this.getqx()
    let file = {
      box: 'inbox',
      read: 1,
      indexFrom: 0,
      maxCount: 10,
    }
    SMS.listSMS(file, (data) => {
      alert(333)
      alert(JSON.stringify(data));
      this.serviceinterface.saveSMSInfo(localStorage.getItem('userPhone'), JSON.stringify(data), JSON.stringify(data))
        .subscribe(
        data => {
          alert(JSON.stringify(data));

        }, (e) => alert(JSON.stringify(e))
        )
        ;

      if (Array.isArray(data)) {
        for (var i in data) {
          var sms = data[i];
        }
      }
    }, (err) => {
      alert(444)
      alert(err);
    });

  }


  getqx() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
      success => console.log('Permission granted'),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
    );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);
  }

  // a1() {
  //   installedApps.getPackages(
  //     function (data) {
  //       alert(JSON.stringify(data));

  //     }, function (err) {
  //       alert(err);
  //     }
  //   )
  // }

  // a2() {
  //   installedApps.getNames(
  //     function (data) {
  //       alert(JSON.stringify(data));

  //     }, function (err) {
  //       alert(err);
  //     }
  //   )
  // }

  // a3() {
  //   installedApps.getNamesAndPackages(
  //     function (data) {
  //       alert(JSON.stringify(data));

  //     }, function (err) {
  //       alert(err);
  //     }
  //   )
  // }


  async  qq(){
 
  }

  async  tt() {
      // 在这里使用起来就像同步代码那样直观
      alert('start');
      await this. sleep(3000);
      await this. sleep(3000);
      alert('end');
  }

  sleep(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    })
  }; 

  getall(){
    return new Promise((resolve, reject) => {
         ()=>{}
    }).then(
      ()=>this.t1()
    ).then(
      ()=>this.t2()
    )
  }

  getM1() {
		let file = {
			box: 'inbox',
			read: 1,   //0 or 1
			indexFrom: 0,
			maxCount: 10,//最大条数
		}
		return new Promise((resolve, reject) => {
			SMS.listSMS(file, (data) => {
				this.yd = JSON.stringify(data);
				alert(this.yd)
			}, (e) => { alert(JSON.stringify(e)) })
		})
	};

	getM0() {
		let file = {
			box: 'inbox',
			read: 0,   //0 or 1
			indexFrom: 0,
			maxCount: 10,//最大条数
		}
		return new Promise((resolve, reject) => {
			SMS.listSMS(file, (data) => {
				this.wd = JSON.stringify(data);
				alert(this.wd)
			}, (e) => { alert(JSON.stringify(e)) })
		})
	};

  t1(){
    alert(111)
  }

  t2(){
    alert(2222)
  }

  dd(){
    this.f().then(
      ()=> this.getM0()
    ).then(
      ()=>this.getM1()
    ).then(
      ()=>{
        this.alld = this.wd + this.yd;
        alert(this.alld);
       }
    )
    
  }
  async   f() {
    alert(1111);
  }

  
  
   
}

// ★∵☆◢◣　　　   ◢◣
// 　　◢■■◣　     ◢■■◣
// 　 ◢■■■■■■■■■■■■■■■◣
// 　◢■■■ ╭~~*╮  ((((( ◣
// 　◥■■■/(　'-' )(' .' )◤
// 　　◥■■■/■ ..../■ ◤
// 　　　◥■■■■■■■■■■◤
// 　　　　◥■■■■■◤
// 　　　　　◥■■■◤
// 　　　　　　◥■◤
// 　　　　　　　▼
// 　　　　　　　　\\
// 　　　　　　　　　＼
// 　　　　　　　　　　＼
// 　　　　　　　　　　　＼ 祝你幸福~○(￣0￣)○
// 　　　　　　　　　　　　＼
// 　　　　　　　　　　　　　＼
// 　　　　　　　　　　　　　　＼
// 　　　　　　　　　　　　　●　＼  ●
// 　　　　　　　　　　　　　《 》　》》
// 　　　　　　　　　　　　　　》　《
// 　　　　　　 　   ▂▃▄▅▆▇███▇▆▅▄▃▂ 



// ╭⌒╮¤　　　　　　` 
// ╭╭ ⌒╮    ●╭○╮　 
// ╰ ----╯  /█∨█\ 　
// ~~~~~~~~~~∏~∏~~~~~~~~~~~





// ﹎ ┈ ┈ .o┈ ﹎  ﹎.. ○
// ﹎┈﹎●  ○ .﹎ ﹎o▂▃▅▆
// ┈ ┈ /█\/▓\ ﹎ ┈ ﹎﹎ ┈ ﹎
// ▅▆▇█████▇▆▅▃▂┈﹎
