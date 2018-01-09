import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Repayment2ManualPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'Repayment2ManualPage'
})
@Component({
  selector: 'page-repayment2-manual',
  templateUrl: 'repayment2-manual.html',
})
export class Repayment2ManualPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Repayment2ManualPage');
  }

}
