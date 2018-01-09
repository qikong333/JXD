import { Network } from '@ionic-native/network';
import { NativeServiveProvider } from './../../providers/native-servive/native-servive';
import { NavController } from 'ionic-angular';
import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the NetworkFailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'network-fail',
  templateUrl: 'network-fail.html'
})
export class NetworkFailComponent {
  net:any;

  constructor(public navCtrl:NavController,
    public network:Network
  ) {
  }

 
  networkFail(){
    this.navCtrl.push('NeverNetworkPage');
  }
}
