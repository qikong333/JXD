import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpServiceProvider } from '../http-service/http-service';
import { SERVER_URL } from '../constants/constants';
import { AlertController, NavController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AppVersion } from '@ionic-native/app-version';
import { VERSION_NUM } from '../constants/constants'
import { NativeServiceProvider } from '../native-service/native-service';

/*
  Generated class for the ServiceInterfaceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ServiceInterfaceProvider {

  public userPhone: number;    //获取用户电话号码

  constructor(
    public http: Http, 
    public httpservice: HttpServiceProvider, 
    public alertCtrl: AlertController,
    private appVersion: AppVersion,
    public nativeservice: NativeServiceProvider,
    // public navcon:NavController
  ) {
    //  if(localStorage.getItem("user")){
    //     let getItem =  localStorage.getItem("user");
    //     let json = JSON.parse(getItem);
    //     let params={
    //       loginName:json.mobile,
    //       params:'RYDCF09072107'
    //     }}
  }


  /**
   * @name 2.13.查询认证信息完整性
   */
  userInfoStatus(phone, num = 'RYDCF09072107'): Observable<any> {
    let params = {
      loginName: phone,
      params: num
    }
    console.log(params)
    return this.httpservice.get(SERVER_URL + '/cf_main/cf/userInfoStatus', params)
      .map(data => data.json())

  }

  /**
   * @name 查询个人账号(带银行卡)
   * @param loginName：用户手机号码
   */
  personalInformation(phone, num = 'RYDCF09072107'): Observable<any> {
    let params = {
      loginName: phone,
      params: num
    }
    return this.httpservice.get(SERVER_URL + '/cf_main/cf/user/personalInformation', params)
      .map(data => data.json())

  }

  /**
   * 2.3.获取图形验证
   */
  VerifyCode() {
    return this.httpservice.get(SERVER_URL + '/cf_main/cf/VerifyCode')
    // .map(data=>data.json())

  }

  /**
   * 提交验证码
   */
  VerifyCodeAndSendMobileCode(phone, code) {
    let params = {
      loginName: phone,
      verCode: code
    }
    console.log(params);
    return this.httpservice.postFormData(SERVER_URL + '/cf_main/cf/VerifyCodeAndSendMobileCode', params)
      .map(data => data.json())
  }

  /**
   * 2.27.我的个人信息
   */
  order(phone) {
    let params = {
      loginName: phone,
    }
    return this.httpservice.get(SERVER_URL + '/cf_main/cf/wap/myInfo', params)
      .map(data => data.json())
  }


  /**
   * 2.12.银行卡操作（绑定、修改）
   * bankCard   银行卡号
   * bankName   开户名称
   * mobile     预留手机号码
   * name       持卡人姓名
   * operateType    操作类型（1查询 2 绑定 3修改 4删除）
   * cardType       标识   1借款  2还款
   * id             银行卡编号（修改时携带）
   */

  //  name: this.username,
  // 	bankCard: this.bankNum,
  // 	bankName: this.bank,
  // 	mobile: this.phone,
  // 	mobileCode: this.verify,
  // 	operateType: 2,//添加操作
  // 	loginName: this.phoneName,//全局变量，获取当前用户手机号码
  // 	params: "RYDCF09072107",
  // 	cardType: 1
  addBankCard(bankCard, bankName, mobile, name, operateType, cardType, phoneName, id?) {
    let params = {
      bankCard: bankCard,
      bankName: bankName,
      mobile: mobile,
      name: name,
      mobileCode: operateType,
      operateType: 3,//修改操作对应3
      cardType: cardType,
      loginName: phoneName,
      id: 28,//此处id只适用于修改(重绑银行卡)
      userid: 37,//登录用户对应的id
      params: "RYDCF09072107",
    }

    console.log(params);

    return this.httpservice.post(SERVER_URL + '/cf_main/cf/BankCard', params)
      .map(data => data.json())
  }


  /**
  * 2.1.发送短信验证码
  * loginName   手机号码
  * params      加密参数
  */

  mobieCode(loginName, p) {
    let params = {
      loginName: loginName,
      params: p
    }
    return this.httpservice.get(SERVER_URL + '/cf_main/cf/mobieCode', params)
    // .map(data=>data.json())
  }


  /**
   * 图片上传
   */
  saveIdentityCard(data) {

    console.log(data)
    return this.httpservice.post(SERVER_URL + '/cf_main/cf/saveIdentityCard', data)
    // .map(data=>data.json())
  }

  /**
   * 额度信息
   */
  myQuotaInfo(phone) {
    let params = {
      loginName: phone,
      params: "RYDCF09072107"
    }
    return this.httpservice.get(SERVER_URL + '/cf_main/cf/userInfoStatus', params)
    // .map(data=>data.json())
  }

  /**
   *
   */
  userInfoBase(phone) {
    let params = {
      loginName: phone,
      params: "RYDCF09072107"
    }
    return this.httpservice.get(SERVER_URL + '/cf_main/cf/userInfoBase', params)
    // .map(data=>data.json())
  }

  /**
   * faceid身份验证返回url
   */
  getFaceURL(phone) {
    let params = {
      loginName: phone,
      params: "RYDCF09072107"
    }
    return this.httpservice.get(SERVER_URL + '/cf_main/cf/getFaceURL', params)
  }
  /**
   * 实名验证
   */
  RealName(phone, name, certNo, bankCard, bankName, mobile,mobileCode) {
    let params = {
      loginName: phone,
      params: "RYDCF09072107",
      name: name,
      certNo: certNo,
      bankCard: bankCard,
      bankName: bankName,
      mobile: mobile,
      operateType:2,
      cardType:1,
      mobileCode:mobileCode
    }
    return this.httpservice.post(SERVER_URL + '/cf_main/cf/BankCard', params)
  }

  /**
   * @name GBS定位
   *
   */
  GBS(){
    let params = {
      // ip:'',    //IP地址:可选，IP不出现，或者出现且为空字符串的情况下，会使用当前访问者的IP地址作为定位参数。
      ak:'D5a8456c3d038f11d60ae606ba4533c8',    //开发者密钥:必选，登录API控制台，申请AK，作为访问的依据。
      // sn:'',    //用户的权限签名:可选，若用户所用AK的校验方式为SN校验时该参数必须。（SN生成算法）
      coor:'bd09ll'   //输出的坐标格式:可选，coor不出现时，默认为百度墨卡托坐标；coor=bd09ll时，返回为百度经纬度坐标；coor=gcj02时，返回为国测局坐标。
    }
    return this.httpservice.get('https://api.map.baidu.com/location/ip',params)
  }


  /**
   * 绑定银行卡进入前的身份验证
   */
  GetBank(phone) {
    let params = {
      loginName: phone,
      // params: "RYDCF09072107"
    }
    return this.httpservice.get(SERVER_URL + '/cf_main/cf/getNameAndCardNo', params)
  }
  /**
   * 查询芝麻信用和手机营运
   */
  GetZm(phone) {
    let params = {
      loginName: phone,
      params: "RYDCF09072107"
    }
    return this.httpservice.get(SERVER_URL + '/cf_main/cf/getZmScoreAndBr', params)
  }

  /**
   * @name app升级
   */
  appUpData(){
     
    
    return this.httpservice.get(SERVER_URL + '/cf_main/cfAppVersion/checkVersion')
  }

 /**
  * @name 功能开关
  */
  Funct(){
    return this.httpservice.get(SERVER_URL + '/cf_main/cf/firewall')
  }


  /**
   * @name 连连支付判断
   */
  lian(obj){
    return this.httpservice.post(SERVER_URL + '/cf_main/cf/user/confirmSignContract',obj)
  }

  /**
   * @name 还款
   */
  applyRepayment(obj){
    return this.httpservice.post(SERVER_URL + '/cf_main/cf/user/applyRepayment',obj)
  }

  /**
   * @name 保存联系人
   */
    saveContact(loginName,data){
     
      let param={
        loginName:loginName,
        data:data,
      }
      return this.httpservice.postFormData(SERVER_URL + '/cf_main/cf/contactInfo',param)
    }

    /**
     * 查询faceid认证结果
     * @param loginName 
     */
    getIdentifyResult(loginName){

      return this.httpservice.get(SERVER_URL + '/cf_main/cf/idVerificationStatu',{loginName:loginName})
      
    }

  /**
   * 检测银行卡是否是已经绑定的了
   * @param bankCark 
   */
  checkBankCard(bankCark) {
    return this.http.get(SERVER_URL + `/cf_main/cf/bankCard?CardNO=${bankCark}`);
  }


 
/**
 * @name 百融借款
 * @param afSwiftNumber 设备号
 * @param event 设备号参数
 * @param no 身份证号
 * @param name 用户名字
 * @param cell 手机号码
 * @param userid 用户id
 */
brLoanequipment(data) {
    
    // let param = {
    //   afSwiftNumber:afSwiftNumber,
    //   event:event,
    //    no:no,
    //    name:name,
    //    cell:cell,
    //    userid:userid
    // }
    return this.httpservice.post(SERVER_URL + '/cf_main/cf/brLoanequipment', data);
  }

/**
 * @name 百融
 * @param afSwiftNumber 设备号
 * @param event 设备号参数
 * @param loginName 注册手机号码
 */
  brRegisterTest(data) {
  console.log("成功")
  console.log(JSON.stringify(data))
    // let param = {
    //   afSwiftNumber:afSwiftNumber,
    //   event:event,
    //   loginName:loginName
    // }
    return this.httpservice.post(SERVER_URL + '/cf_main/cf/brRegister', data);
  }

  /**
   * @name 传送短信
   */
  saveSMSInfo(loginName,data,data1){
    let param = {
      loginName:loginName,
      data:data,//已读
      data1:data1,//未读
    }
    return this.httpservice.postFormData(SERVER_URL + '/cf_main/cf/saveSMSInfo', param);
  }

  /**
   * @name 收集安装app信息
   */
  saveAPPInfo(loginName,data){
    let param = {
      loginName:loginName,
      data:data,
    }
    return this.httpservice.postFormData(SERVER_URL + '/cf_main/cf/saveAPPInfo', param);
  }

  /**
   * @name 白骑士
   */
  webquery(mobile, tokenkey){
    let param = {
      mobile: mobile,
      tokenkey: tokenkey,
    }
    return this.httpservice.postFormData(SERVER_URL + 'cf_main/BqsAntiFraud/webquery', param);
  }

    /**
   * @name 小额贷和蓝白贷
   */
  small_blue(flag,money,date){
    return this.httpservice.get(SERVER_URL + '/cf_main/pettyLoan/modeOfRepayment/'+flag+'/'+money+'/'+date);
  }

  blue_small(loginName){
      return this.httpservice.get(SERVER_URL + '/cf_main/pettyLoan/userInfoStatus/'+loginName);
  }

  loan_SB(userId,loanUse,loanMoney,loanMonths,repayMethod,totalInterest){
     let param = {
      userId: userId,
      loanUse: loanUse,
      loanMoney: loanMoney,
      loanMonths: loanMonths,
      repayMethod: repayMethod,
      totalInterest: totalInterest,
    }
      return this.httpservice.post(SERVER_URL + '/cf_main/pettyLoan/submitLoan', param);
  }

  loan_certification(loginName){
    return this.httpservice.get(SERVER_URL + '/cf_main/pettyLoan/getuserAuth/'+loginName);
  }






}
