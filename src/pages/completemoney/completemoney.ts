import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SERVER_URL } from '../../providers/constants/constants';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the CompletemoneyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'CompletemoneyPage'
})
@Component({
  selector: 'page-completemoney',
  templateUrl: 'completemoney.html',
})
export class CompletemoneyPage {
  redata:any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpservice: HttpServiceProvider,
    public helpers:HelpersProvider,
  ) {
  }

   ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.helpers.hideTabs1();

  }
  

  ionViewWillLeave(){
  this.helpers.hideTabs2();
  }

  ionViewWillEnter() {
    let code = this.navParams.get('key1');

    let params = {
      orderCode: code
    }
    console.log(params);
// http://192.168.4.40:8080/cf_main/cf/order/cfRepaymentRecord?orderCode=15
    this.httpservice.get(SERVER_URL + '/cf_main/cf/order/cfRepaymentRecord', params)
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        this.redata = data.data;
      },
      erro => { console.log(erro) },
    )
  }
}
