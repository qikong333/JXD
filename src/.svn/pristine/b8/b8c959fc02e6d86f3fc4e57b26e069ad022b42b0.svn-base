import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController} from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { SERVER_URL } from '../../providers/constants/constants';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { UtilsProvider } from '../../providers/utils/utils';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name:'ChangePasswordPage'
})
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  public password_old:any;          //原密码
  public password_new:any;          //新密码
  public password_new2:any;         //确认密码
  public first_icon:boolean;        //原密码的icon
  public two_icon:boolean;          //新密码的icon 
  public three_icon:boolean;        //确认密码的icon
  public type_old:string;           //原密码类型
  public type_new:string;           //新密码类型
  public type_new2:string;          //确认密码类型
  public active_old:boolean;        //原密码的眼睛
  public active_new:boolean;        //新密码的眼睛
  public active_new2:boolean;       //确认密码的眼睛
  public params:Object;
  // public gray:boolean;              //确认禁止按钮
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public HttpServiceProvider:HttpServiceProvider,
    public toastCtrl: ToastController,
    public helpers:HelpersProvider,
    public utils:UtilsProvider,
  ) {
  }

   ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.helpers.hideTabs1();

  }
  

  ionViewWillLeave(){
     this.helpers.hideTabs2();
  }

  //即将进入页面
   ionViewWillEnter(){
     this.password_old="";
     this.password_new="";
     this.password_new2="";
     this.first_icon=false;
     this.two_icon=false;
     this.three_icon=false;
     this.type_old="password";
     this.type_new="password";
     this.type_new2="password";
     this.active_old=false;
     this.active_new=false;
     this.active_new2=false;
    //  this.gray=true;

   }

  //原来密码
  cock_original(){
    // console.log(this.password_old)
    if(this.password_old==""){
        this.first_icon=false;
    }else{
        this.first_icon=true;
    } 
  }
  //新密码
  cock_new(){
      // console.log(this.password_new)
      if(this.password_new==""){
          this.two_icon=false;
      }else{
          this.two_icon=true;
      } 
  }
  //确认密码
  cock_sure(){
    // console.log(this.password_new2)
    if(this.password_new2==""){
        this.three_icon=false;
    }else{
        this.three_icon=true;
    } 
  }


  // 图标清空原密码的
  del_original(){
    this.password_old="";
     this.first_icon=false;
  }
  //图标清空新密码的
   del_new(){
    this.password_new="";
     this.two_icon=false;
  }
  //图标清空确认密码的
   del_sure(){
    this.password_new2="";
     this.three_icon=false;
  }

  //眼睛显示原密码
  seaPassword_old(){
    this.active_old=!this.active_old;
    if(this.active_old){
      this.type_old="text"
    }else{
      this.type_old="password"
    }
  }
  //眼睛显示新密码
   seaPassword_new(){
    this.active_new=!this.active_new;
    if(this.active_new){
      this.type_new="text"
    }else{
      this.type_new="password"
    }
  }
  //眼睛显示确认密码
   seaPassword_new2(){
    this.active_new2=!this.active_new2;
    if(this.active_new2){
      this.type_new2="text"
    }else{
      this.type_new2="password"
    }
  }


  //点击确定
  submit(){
    if(this.password_old==""){
      this.utils.showAlert('原密码不能为空')
    }else if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/).test(this.password_new)){
       this.utils.showAlert('新密码需6-20位数字（字母+数字）,区分大小写')
    }else if(this.password_new!=this.password_new2){
       this.utils.showAlert('两次密码输入不一致')
    }else{ 
      this.params={
        pwd:this.utils.encryption(this.password_old),      //原密码
        onePwd:this.utils.encryption(this.password_new),   //新密码
        twoPwd:this.utils.encryption(this.password_new2),  //确认密码
        loginName:this.utils.encryption(localStorage.getItem('userPhone')) ,  //手机号码
        params:'RYDCF09072107'      //MD5字符串
      }
      this.HttpServiceProvider.post(SERVER_URL+'/cf_main/cf/updatePwd',this.params)
      .map(data=>data.json())
      .subscribe((res)=>{
          console.log(res);

          if(res.success){
            this.navCtrl.pop();
            this.utils.showBlock(res.msg);
          }else{
            this.utils.showAlert(res.msg)
          }

      },err=> {
        this.utils.showBlock('服务器连接错误,请稍候重试');
      }
      )
    }



  }


//跳转忘记服务
  go_forget(){
    this.navCtrl.push('RetrievePage',{},{duration:100});
  }

}
