import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { UtilsProvider } from '../../providers/utils/utils';

/**
 * Generated class for the HelpcenterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage(
  {
    name: 'HelpcenterPage',
  }
)
@Component({
  selector: 'page-helpcenter',
  templateUrl: 'helpcenter.html',
})
export class HelpcenterPage {
  public isshow1;
  public isshow2;
  public isshow3;
  public isshow4;
  public isshow5;
  public isshow6;
  public isshow7;
  public isshow8;
  public isshow9;
  public isshow10;
  public isshow11;
  public isshow12;
  public isshow13;
  public isshow14;
  public isshow15;
  public isshow20 = false;
  public isshow21 = false;
  public isshow22 = false;
  public isshow23 = false;
  public isshow24 = false;
  public isshow25 = false;
  public isshow26 = false;
  public isshow27 = false;
  public isshow30 = false;
  public isshow31 = false;
  public isshow32 = false;
  public isshow33 = false;
  public isshow34 = false;
  public isshow35 = false;
  public isshow36 = false;
  segmentsArray = ['segmentOne','segmentTwo','segmentThree'];
  segmentModel: string = this.segmentsArray[0];
  constructor(public navCtrl: NavController, public navParams: NavParams,public helpers:HelpersProvider,public utils:UtilsProvider) {
    this.isshow1=false;
    this.isshow2=false;
    this.isshow3=false;
    this.isshow4=false;
    this.isshow5=false;
    this.isshow6=false;
    this.isshow7=false;
    this.isshow8=false;
    this.isshow9=false;
    this.isshow10=false;
    this.isshow11=false;
    this.isshow12=false;
    this.isshow13=false;
    this.isshow14=false;
    this.isshow15=false;
  }
  swipeEvent(event){
    //向左滑
    if(event.direction==2){
      if(this.segmentsArray.indexOf(this.segmentModel)<2){
        this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel)+1];
      }
    }
   //向右滑
    if(event.direction==4){
      if(this.segmentsArray.indexOf(this.segmentModel)>0){
        this.segmentModel = this.segmentsArray[this.segmentsArray.indexOf(this.segmentModel)-1];
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.helpers.hideTabs1();

  }
  

  ionViewWillLeave(){
  this.helpers.hideTabs2();
  }

  tel(){
    this.utils.showAlert('400-188-7398')
  }

}
