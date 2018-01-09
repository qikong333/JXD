import { UtilsProvider } from './../../providers/utils/utils';
import { ServiceInterfaceProvider } from './../../providers/service-interface/service-interface';
import { Component, Output, OnChanges, EventEmitter, OnInit, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { SERVER_URL } from '../../providers/constants/constants';
import { HelpersProvider } from '../../providers/helpers/helpers';
/**
 * Generated class for the PenaltyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: "PenaltyPage"
})
@Component({
  selector: 'page-penalty',
  templateUrl: 'penalty.html',
})
export class PenaltyPage implements OnInit {

  redata:any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public serviceInterface: ServiceInterfaceProvider,
    public httpservice: HttpServiceProvider,
    public helpers:HelpersProvider,
    public utils:UtilsProvider
  ) {
  }


  ngOnInit() {
    //初始化

    this.redata = [];
  }

  ionViewWillEnter() {

    this.httpservice.get(SERVER_URL + '/cf_main/cf/order/cfOrderOverdueDetail', {orderCode:this.navParams.get('code')})
      .map(data => data.json())
      .subscribe(
      data => {
        console.log(data);
        if (data.success) {
          this.redata = data.data;
        }
      },
      erro => {
        this.utils.showBlock('服务器连接错误,请稍候重试');
      },

    )
  }

 ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.helpers.hideTabs1();

  }
  

  ionViewWillLeave(){
  this.helpers.hideTabs2();
  }

}
