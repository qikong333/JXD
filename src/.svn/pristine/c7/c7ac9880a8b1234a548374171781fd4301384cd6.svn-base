import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { SERVER_URL } from '../../providers/constants/constants';
import {ServiceInterfaceProvider} from "../../providers/service-interface/service-interface";
import { HelpersProvider } from '../../providers/helpers/helpers';


/**
 * Generated class for the ManbdingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name:'ManbdingPage'
})
@Component({
  selector: 'page-manbding',
  templateUrl: 'manbding.html',
})
export class ManbdingPage {
  private phoneName;
  private name;
  private residence;
  private cardNo;
  private resAddress;
  private oneMobile;
  private twoMobile;
  private threeMobile;
  private oneName;
  private twoName;
  private threeName;
  private education;
  private oneType;
  private twoType;
  private threeType;

  constructor(public navCtrl: NavController, public navParams: NavParams,public serviceinter:ServiceInterfaceProvider, public helpers:HelpersProvider) {

  }
  ngOnInit() {
    //初始化
    this.phoneName = "";
    this.name = "";
    this.cardNo = "";
    this.residence = "";
    this.resAddress = "";
    this.oneMobile = "";
    this.twoMobile = "";
    this.threeMobile = "";
    this.oneName = "";
    this.twoName = "";
    this.threeName = "";
    this.education = "";
    this.oneType = "";
    this.twoType = "";
    this.threeType = "";


  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ManbdingPage');
  }
  Informations() {
    this.navCtrl.push('InformationsPage')
  }

  ionViewWillEnter() {
    let user = localStorage.getItem("user");
    if (user != null) {
      var json = JSON.parse(user);//将其转换成json对象
      this.phoneName = json.mobile;
    }
    console.log(this.phoneName);

    // 查询个人信息
    console.log('ionViewWillEnter ManbdingPage');
    this.serviceinter.userInfoBase(this.phoneName)
      .map(data => data.json())
      .subscribe(
        data => {
          console.log(data);
          if (data.success) {
            this.name = data.data.name;
            this.cardNo = data.data.cardNo;
            this.residence = data.data.residence;
            this.resAddress = data.data.resAddress;
            this.oneMobile = data.data.oneMobile;
            this.twoMobile = data.data.twpMobile;
            this.threeMobile = data.data.threeMobile;
            this.oneName = data.data.oneName;
            this.twoName = data.data.twoName;
            this.threeName = data.data.threeName;
            // 判断学历的type
            if(data.data.education == 1){
              this.education = "高中或以下";
            }
            if(data.data.education == 2){
              this.education = "大专";
            }
            if(data.data.education == 3){
              this.education = "本科";
            }
            if(data.data.education == 4){
              this.education = "研究生或以上";
            }
            // 判断联系人1的type
            if(data.data.oneType == 1){
              this.oneType = "配偶";
            }
            if(data.data.oneType == 2){
              this.oneType = "子女";
            }
            if(data.data.oneType == 3){
              this.oneType = "父母";
            }
            if(data.data.oneType == 4){
              this.oneType = "兄弟姐妹";
            }
            if(data.data.oneType == 5){
              this.oneType = "朋友";
            }
            if(data.data.oneType == 6){
              this.oneType = "同事";
            }
            if(data.data.oneType == 7){
              this.oneType = "其他";
            }
            // 判断联系人2的type
            if(data.data.twoType == 1){
              this.twoType = "配偶";
            }
            if(data.data.twoType == 2){
              this.twoType = "子女";
            }
            if(data.data.twoType == 3){
              this.twoType = "父母";
            }
            if(data.data.twoType == 4){
              this.twoType = "兄弟姐妹";
            }
            if(data.data.twoType == 5){
              this.twoType = "朋友";
            }
            if(data.data.twoType == 6){
              this.twoType = "同事";
            }
            if(data.data.twoType == 7){
              this.twoType = "其他";
            }
            // 判断联系人3的type
            if(data.data.threeType == 1){
              this.threeType = "配偶";
            }
            if(data.data.threeType == 2){
              this.threeType = "子女";
            }
            if(data.data.threeType == 3){
              this.threeType = "父母";
            }
            if(data.data.threeType == 4){
              this.threeType = "兄弟姐妹";
            }
            if(data.data.threeType == 5){
              this.threeType = "朋友";
            }
            if(data.data.threeType == 6){
              this.threeType = "同事";
            }
            if(data.data.threeType == 7){
              this.threeType = "其他";
            }

          }
        },
        erro => {
          console.log(erro);

        },
      )
  }

}
