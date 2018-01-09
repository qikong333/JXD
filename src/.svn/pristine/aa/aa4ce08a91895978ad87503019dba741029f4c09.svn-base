import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
/**
 * Generated class for the ProgressPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name:'ProgressPage'
})
@Component({
  selector: 'page-progress',
  templateUrl: 'progress.html',
})
export class ProgressPage implements OnInit {
  measure1:any;    
  measure2:any;    
  measure3:any;

  link1:string;    
  link2:string;    
  link3:string;    
  link4:string;

  palette1:string;
  palette2:string;
  palette3:string;
  palette4:string;

  title:string; //标题

  isInformations:boolean;   //个人信息
  isPapers:boolean;         //上传证件
  isBank:boolean;           //绑定银行卡
  isIdentity:boolean;       //身份验证

  private d1;
  constructor(public navCtrl: NavController, public navParams: NavParams,public helpers:HelpersProvider) {
  }


  // 初始化
  ngOnInit(){
    this.link1="url('assets/images/ball1.png') center top / 25% no-repeat";
    this.link2="url('assets/images/unball2.png') center top / 25% no-repeat";
    this.link3="url('assets/images/unball3.png') center top / 25% no-repeat";
    this.link4="url('assets/images/unball4.png') center top / 25% no-repeat";

    this.palette1="#4a6bee";
    this.palette2="#909090";
    this.palette3="#909090";
    this.palette4="#909090";

    this.title = "个人信息"

    this.isInformations = true;
    this.isPapers = false;
    this.isBank = false;
    this.isIdentity = false;

  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.helpers.hideTabs1();

  }
  

  ionViewWillLeave(){
  this.helpers.hideTabs2();
  }


  // 第一次点击
  firstTime(){
    this.measure1="33.3%";
    setTimeout(()=>{
       this.link2="url('assets/images/ball2.png') center top / 25% no-repeat";
       this.palette2="#4a6bee";
    },1000)
  }


//第二次点击
  twoTime(){
    this.measure2="33.3%";
     setTimeout(()=>{
        this.link3="url('assets/images/ball3.png') center top / 25% no-repeat";
        this.palette3="#4a6bee";
    },1000)
  }


// 第三次点击
   threeTime(){
    this.measure3="33.3%";
    setTimeout(()=>{
        this.link4="url('assets/images/ball4.png') center top / 25% no-repeat";
        this.palette4="#4a6bee";
    },1000)
  }



  go1(){
    this.firstTime();
  }
  go2(){
    this.twoTime();
  }
  go3(){
    this.threeTime();
  }



  //个人信息提交方法
  Informationsoutput($event){
      console.log($event);
      this.firstTime();
      this.title='上传证件';
      this.isInformations = false;
      this.isPapers = true;

      
  }

  //跳添加联系人
  toFriends($event){
    console.log($event);
    this.navCtrl.push('FriendsPage',{},{duration:100});
  }

   //个人信息提交方法
  papersoutput($event){
    this.twoTime();
    console.log($event);
    this.title='绑定银行卡';
    this.isPapers = false;
    this.isBank = true;

  }

  //绑定银行卡提交方法
  bankoutput($event){
    this.threeTime();
    console.log($event);
    this.title='身份认证';
    this.isBank = false;
    this.isIdentity = true;

  }

// 生命周期，添加联系人放回此页面时自动更新
// ionViewWillEnter() {
// 		console.log(1);
// 		let d =  localStorage.getItem("key");
//   if(d != null){
// 		var json = JSON.parse(d);
// 		this.d1 = json.username1;
// 		alert(this.d1);
// 		console.log(d);
// 	}else{
//     return;
//   }
//   }

}

  