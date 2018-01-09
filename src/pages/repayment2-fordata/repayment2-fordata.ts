import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Repayment2FordataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name:'Repayment2FordataPage'
})
@Component({
  selector: 'page-repayment2-fordata',
  templateUrl: 'repayment2-fordata.html',
})
export class Repayment2FordataPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Repayment2FordataPage');
  }

}
