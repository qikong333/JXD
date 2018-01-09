import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { HttpServiceProvider } from '../http-service/http-service';
import { SERVER_URL } from '../constants/constants';
import { Contact } from '@ionic-native/contacts';
import { NativeServiceProvider } from '../native-service/native-service';
import { ServiceInterfaceProvider } from '../service-interface/service-interface';

declare var window: any;
declare let cordova: any;

/**
* Helper类存放和业务有关的公共方法
* @description
*/
@Injectable()
export class HelpersProvider {


  constructor(
    // private storage: Storage,
    public httpservice: HttpServiceProvider,
    public serviceinterface: ServiceInterfaceProvider,
  ) {
  }

  /**
   * 隐藏tabs
   */
  hideTabs1() {//当页面进入初始化的时候
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'none'; 
      });
    }
  }

  hideTabs2() { //当退出页面的时候
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
      Object.keys(elements).map((key) => {
        elements[key].style.display = 'flex';
      });
    }
  }



  /**
   * 百融
   */
  bairong(type, obj) {
    console.log(111111)
    try {

      let win = window,
        doc = document,
        br = win["BAIRONG"] = win["BAIRONG"] || {},
        s = doc.createElement("script"),
        url = 'https://static.100credit.com/ifae/js/braf.min.js?v=2.4.0';
      s.type = "text/javascript";
      s.charset = "utf-8";
      s.src = url;
      br.client_id = "3000775";

      br.config = {
        timeout: 3000,
        gidCrossBrowser: true,

      }

      doc.getElementsByTagName("head")[0].appendChild(s);
      br.BAIRONG_INFO = {
        "app": "antifraud",
        "event": type,
        "page_type": "dft",
      }

      window.GetSwiftNumber = (data) => {
        // if (win.isGetSwiftNumberExec) {
        //   return;
        // }
        window.isGetSwiftNumberExec = true;

        if (data.code) {
          console.log(data.code)
          // console.log(data.response) 
          console.log(data.response.event)
          console.log(data.response.af_swift_number)
          let allparams = {}
          let brparams = {
            event: data.response.event,
            afSwiftNumber: data.response.af_swift_number
          }

          for (let attr in brparams) {
            allparams[attr] = brparams[attr];
          }
          for (let attr in obj) {
            allparams[attr] = obj[attr];
          }

          console.log(allparams);
          this.brchoose(type, allparams)

        } else {
          console.log(data.code)
          console.log(data.response)
          // this.serviceinterface.brRegisterTest(data.response.af_swift_number)
          // .map(data=>data.json())

          // alert(JSON.stringify(data));
          // console.log(JSON.stringify(data))
        }
      }
    } catch (error) {
      alert(error)
    }
  }

  /**
   * @name 判断百融条件
   */
  brchoose(type, data) {
    switch (type) {
      case 'lend':   //借款
        this.serviceinterface.brLoanequipment(data)
          .subscribe(
          data => console.log(data)
          )
        break;

      case 'register':  //注册
        this.serviceinterface.brRegisterTest(data)
          .subscribe(
          data => console.log(data)
          )
        break;

      default:
        break;
    }
  }

  getbqsToken(){
    try {
      cordova.plugins.MyPlugin.coolMethod(  
        '1111', 
        success =>{
          // alert(success)
          localStorage.setItem('bqiToken', success);
          
        }, 
        error => console.log(error));
    } catch (e) { console.log(e) }
  }

}
