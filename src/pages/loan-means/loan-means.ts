import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ServiceInterfaceProvider } from '../../providers/service-interface/service-interface';

/**
 * Generated class for the LoanMeansPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
  name:'LoanMeansPage'
})
@Component({
  selector: 'page-loan-means',
  templateUrl: 'loan-means.html',
})
export class LoanMeansPage {
  public active1:boolean;       //选中1
  public active2:boolean;       //选中2
  public active3:boolean;       //选中3

  public money:any;             //借款金额
  public date:any;              //借款日期
  public hk_type:any;              //还款方式
  public ary_data:any;          //main数组
  public all_money1:any;                           //总金额
  public date_rate1:any;                           //日利率
  public all_money2:any;                           //总金额
  public date_rate2:any;                           //日利率
  public all_money3:any;                           //总金额
  public date_rate3:any;                           //日利率
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     public serve:ServiceInterfaceProvider,
     public viewCtrl:ViewController
     ) {
  }

 ionViewWillEnter(){
   this.money=this.navParams.get('money');
   this.date=this.navParams.get('date');
   this.hk_type=this.navParams.get('huankuan_data');
   this.date_1();
   this.date_2();
   this.date_3();

   console.log(this.hk_type);

   if(this.hk_type=='请选择'){
      this.active1=false;
      this.active2=false;
      this.active3=false;
   }else if(this.hk_type=='先息后本'){
      this.active1=true;
      this.active2=false;
      this.active3=false;
      this.data_1();
   }else if(this.hk_type=='等额本息'){
      this.active1=false;
      this.active2=true;
      this.active3=false;
       this.data_2();
   }else{
      this.active1=false;
      this.active2=false;
      this.active3=true;
      this.data_3();
   }
 }

 //返回
 return(){
   this.viewCtrl.dismiss({type1:this.active1,type2:this.active2,type3:this.active3})
 }

 //点击圆圈
 agree1(){
   this.active1=!this.active1;
   this.active2=false;
   this.active3=false;
   this.data_1();
 }
 agree2(){
   this.active2=!this.active2;
   this.active1=false;
   this.active3=false;
   this.data_2();
 }
 agree3(){
   this.active3=!this.active3;
   this.active1=false;
   this.active2=false;
   this.data_3();
 }

 //数据请求
 data_1(){
   this.serve.small_blue(1,this.money,this.date).map(data => data.json()).subscribe(data => {
     this.ary_data=data.data.averageCapitalPlusInterestInfo.detailInfo;
     console.log(this.ary_data);
   })
 }
 data_2(){
   this.serve.small_blue(2,this.money,this.date).map(data => data.json()).subscribe(data => {
     this.ary_data=data.data.averageCapitalPlusInterestInfo.detailInfo;
     console.log(this.ary_data);
   })
 }
 data_3(){
   this.serve.small_blue(3,this.money,this.date).map(data => data.json()).subscribe(data => {
     this.ary_data=data.data.averageCapitalPlusInterestInfo.detailInfo;
     console.log(this.ary_data);
   })
 }

 date_1(){
   this.serve.small_blue(1,this.money,this.date).map(data => data.json()).subscribe(data => {
     this.all_money1=data.data.averageCapitalPlusInterestInfo.principalInterestCount;
     this.date_rate1=data.data.averageCapitalPlusInterestInfo.dayRate;
   })
 }
  date_2(){
   this.serve.small_blue(2,this.money,this.date).map(data => data.json()).subscribe(data => {
     this.all_money2=data.data.averageCapitalPlusInterestInfo.principalInterestCount;
     this.date_rate2=data.data.averageCapitalPlusInterestInfo.dayRate;
   })
 }
 date_3(){
   this.serve.small_blue(3,this.money,this.date).map(data => data.json()).subscribe(data => {
     this.all_money3=data.data.averageCapitalPlusInterestInfo.principalInterestCount;
     this.date_rate3=data.data.averageCapitalPlusInterestInfo.dayRate;
   })
 }

}
