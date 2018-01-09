import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the DelayResultPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name:'DelayResultPage'
})
@Component({
  selector: 'page-delay-result',
  templateUrl: 'delay-result.html',
})
export class DelayResultPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public helpers:HelpersProvider) {
  }

ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.helpers.hideTabs1();

  }
  

  ionViewWillLeave(){
  this.helpers.hideTabs2();
  }

}
