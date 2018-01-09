import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CheckPhoneResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name:'CheckPhoneResultPage'
})
@Component({
  selector: 'page-check-phone-result',
  templateUrl: 'check-phone-result.html',
})
export class CheckPhoneResultPage {
  public mobile;               ////用户手机
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    setTimeout(()=> {
      this.closePage();
    }, 3000);


  }

   ionViewWillEnter(){
    let json=localStorage.getItem('user');
    this.mobile=JSON.parse(json).mobile;
    console.log(this.mobile);
  }

  closePage(){
    this.navCtrl.popTo(this.navCtrl.getByIndex(1));
  }

}
