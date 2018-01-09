import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ValidateMobileDirective } from '../../directives/validate-mobile/validate-mobile';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { KEY } from '../constants/constants';

import 'rxjs/add/operator/toPromise';


declare let CryptoJS :any;

@Injectable()
export class UtilsProvider {

  constructor(
    public http: Http,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
    //  public navCtrl: NavController,
    // public navparams: NavParams,
  ) {

  }

  /**
   * @name 加密
   */
  encryption(word){
    let  key = CryptoJS.enc.Utf8.parse(KEY);
    let srcs = CryptoJS.enc.Utf8.parse(word);  
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});  
    return encrypted.toString();  
  }

  /**
   * @name 解密
   */
  decrypted(word){
    let  key = CryptoJS.enc.Utf8.parse(KEY); 
    let decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});  
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();  
  }

  /**
 * 格式“是”or“否”
 * @param value
 * @returns {string|string}
 */
  static formatYesOrNo(value: number | string) {
    return value == 1 ? '是' : (value == '0' ? '否' : null);
  }


  /**
   * 格式化日期
   * sFormat：日期格式:默认为yyyy-MM-dd     年：y，月：M，日：d，时：h，分：m，秒：s
   * @example  dateFormat(new Date(),'yyyy-MM-dd')   "2017-02-28"
   * @example  dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss')   "2017-02-28 09:24:00"
   * @example  dateFormat(new Date(),'hh:mm')   "09:24"
   * @param date 日期
   * @param sFormat 格式化后的日期字符串
   * @returns {String}
   */
  static dateFormat(date: Date, sFormat: String = 'yyyy-MM-dd') {
    let time = {
      Year: 0,
      TYear: '0',
      Month: 0,
      TMonth: '0',
      Day: 0,
      TDay: '0',
      Hour: 0,
      THour: '0',
      hour: 0,
      Thour: '0',
      Minute: 0,
      TMinute: '0',
      Second: 0,
      TSecond: '0',
      Millisecond: 0
    };
    time.Year = date.getFullYear();
    time.TYear = String(time.Year).substr(2);
    time.Month = date.getMonth() + 1;
    time.TMonth = time.Month < 10 ? "0" + time.Month : String(time.Month);
    time.Day = date.getDate();
    time.TDay = time.Day < 10 ? "0" + time.Day : String(time.Day);
    time.Hour = date.getHours();
    time.THour = time.Hour < 10 ? "0" + time.Hour : String(time.Hour);
    time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
    time.Thour = time.hour < 10 ? "0" + time.hour : String(time.hour);
    time.Minute = date.getMinutes();
    time.TMinute = time.Minute < 10 ? "0" + time.Minute : String(time.Minute);
    time.Second = date.getSeconds();
    time.TSecond = time.Second < 10 ? "0" + time.Second : String(time.Second);
    time.Millisecond = date.getMilliseconds();

    if (sFormat != undefined && sFormat.replace(/\s/g, "").length > 0) {
      sFormat = sFormat.replace(/yyyy/ig, String(time.Year))
        .replace(/yyy/ig, String(time.Year))
        .replace(/yy/ig, time.TYear)
        .replace(/y/ig, time.TYear)
        .replace(/MM/g, time.TMonth)
        .replace(/M/g, String(time.Month))
        .replace(/dd/ig, time.TDay)
        .replace(/d/ig, String(time.Day))
        .replace(/HH/g, time.THour)
        .replace(/H/g, String(time.Hour))
        .replace(/hh/g, time.Thour)
        .replace(/h/g, String(time.hour))
        .replace(/mm/g, time.TMinute)
        .replace(/m/g, String(time.Minute))
        .replace(/ss/ig, time.TSecond)
        .replace(/s/ig, String(time.Second))
        .replace(/fff/ig, String(time.Millisecond))
    } else {
      sFormat = time.Year + "-" + time.Month + "-" + time.Day + " " + time.Thour + ":" + time.TMinute + ":" + time.TSecond;
    }
    return sFormat;
  }

  /**
   * 每次调用sequence加1
   * @type {()=>number}
   */
  getSequence = (function () {
    let sequence = 100;
    return function () {
      return ++sequence;
    };
  })();


  /**
   * 验证手机号码
   */
  isPhoneMunber(PhoneMunber) {
    let patrn = /^1(3|4|5|7|8)\d{9}$/;
    if (!patrn.test(PhoneMunber)) return false
    return true
  }

  /**
   * 验证身份证
   */
  isIdCard(num) {
    let patrn = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
    if (!patrn.test(num)) return false
    return true
  }

  /**
   * 验证银行卡号码
   */
  isBankCard(num) {
    // let patrn = /^([1-9]{1})(\d{14}|\d{18})$/;
    let patrn = /^([1-9]{1})(\d{14,18})$/;

    if (!patrn.test(num)) return false
    return true
  }

  /**
  * 验证密码格式
  */
  isPassword(num) {
    let patrn = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    if (!patrn.test(num)) return false
    return true
  }

  /**
   * 验证图片验证码
   */
  isPicCode(num) {
    let patrn = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{4}$/;
    if (!patrn.test(num)) return false
    return true
  }
  /**
   * 验证姓名
   */
  isName(num) {
    let patrn = /^[\u4E00-\u9FA5]{2,6}$/;
    if (!patrn.test(num)) return false
    return true
  }

  // // 获取城市数据
  // getCitiesData() {
  //   return this.http.get('../assets/json/city-data.json')
  //     .toPromise()
  //     .then(response => response.json())
  //     .catch(err => {
  //       return Promise.reject(err)
  //     })

  // }


  /**
   * 弹窗
   */
  showAlert(text) {
    let alert = this.alertCtrl.create({
      title: text,
      buttons: ['确定']
    });
    alert.present();
  }

  /**
   * 黑色闪窗
   */
  showBlock(text:string = '操作成功',time:number = 1200) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: time,
      position: 'middle'
    });
    toast.present();
  }


  /**
   * 生成随机六位数
   */
  getVerifyNum(): number {

    let num = Math.floor((Math.random() + 1) * 100000);//生成随机的六位数
    return num;
  }



  /**
   * 获取验证码倒计时
   */
  getLastTime(): any {
    let amount = 0;//次数
    let codeText = '';//提示文字
    let core;    //60秒定时器
    // let coreTitle;//按钮显示文字
    let isGetCode;//是否允许获取验证码,按钮是否可按,返回到当前页面中.


    amount++;
    // codeText = 60 + '秒后重发';
    if (amount >= 10) {

      this.showAlert('获取验证码太频繁请稍后再试')
    }
    core = 60;
    isGetCode = true;
    // coreTitle = '秒后重发';
    let timer = setInterval(() => {
      if (core == 1) {
        clearInterval(timer);
        codeText = "重新获取";
        isGetCode = false;
      }
      core--;
      codeText = core + '秒后重发';
    }, 1000)

    return {isGetCode,codeText};
  }
  
  /**
   * 输入时间戳获取yyyy-MM-dd的时间格式
   * 
   */
  getDateFormat(time:any){

    let date = new Date(parseInt(time));
    var y = date.getFullYear();
    var m = (date.getMonth()+1) < 10? '0' + (date.getMonth()+1) : ''+(date.getMonth()+1);
		var d = date.getDate() < 10? '0' + date.getDate() : date.getDate();
    return y+'-'+m+'-'+d;
  }




}

