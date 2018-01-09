import { UtilsProvider } from './../../providers/utils/utils';

import { Component, Output, OnChanges, EventEmitter, OnInit, NgModule } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { SERVER_URL } from '../../providers/constants/constants';
import { HelpersProvider } from '../../providers/helpers/helpers';
/**
 * Generated class for the BankPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
	name: 'RepayBankPage'
})
@Component({
	selector: 'page-repay-bank',
	templateUrl: 'repay-bank.html',
})
export class RepayBankPage implements OnInit {

	username: string;
	private bankNum: string; //银行卡号
	private bank; //银行
	private phone; //预留手机号
	private verify; //验证码
	private tuSrc;  //图片地址
	public active;
	public phoneName;//用户账户手机号码

	private isGetCode;        //是否允许获取验证码
	private codeText: string;      //短信提示
	private amount: number;        //次数
	private core: number;          //60秒定时器
	private coreTitle: string;     //按钮显示文字

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public httpservice: HttpServiceProvider,
		public utils: UtilsProvider,
		public helpers:HelpersProvider

	) { }

	ngOnInit() {
		//初始化
		this.username = "";
		this.bankNum = "";
		this.bank = "";
		this.phone = "";
		this.verify = "";
		this.active = true;
		this.isGetCode = false;
		this.codeText = "获取验证码";
		this.phoneName = "";
	}


	ionViewWillEnter() {
		let name = JSON.parse(localStorage.getItem("user")).name;
		this.username = name;
		console.log(this.username);


		let user = localStorage.getItem("user");
		if (user != null) {
			var json = JSON.parse(user);//将其转换成json对象
			this.phoneName = json.mobile;
		}
		console.log(this.phoneName)

	}


	getBank() {
		// let testBank = /^([1-9]{1})(\d{14}|\d{18})$/;
		let testBank = /^([1-9]{1})(\d{14,18})$/;

		if (!testBank.test(this.bankNum)) {
			this.utils.showAlert("请输入正确的银行卡号");
		} else {
			let params = {
				BankNO: this.bankNum
			}
			console.log(params);
			this.httpservice.get(SERVER_URL + '/cf_main/cf/getBankName', params)
				.map(data => data.json())
				.subscribe(
				data => {
					console.log(data);
					if (data.success) {
						this.bank = data.data.BankName;
					}
				},
				erro => { console.log(erro) },
			)
		}
	}


	// 点击获取表单验证表单
	getCode() {
		// let testBank = /^([1-9]{1})(\d{14}|\d{18})$/;
		let testBank = /^([1-9]{1})(\d{14,18})$/;

		let testPhone = /^1(3|4|5|7|8)\d{9}$/;

		if (!testBank.test(this.bankNum)) {
			var text = '请输入正确银行卡号';
			this.utils.showAlert(text);
		} else if (this.bank == "") {
			var text = '请输入正确银行卡号';
			this.utils.showAlert(text);
		} else if (!testPhone.test(this.phone)) {
			var text = '请输入正确手机号';
			this.utils.showAlert(text);
		}
		else {
			this.verify = "";//将验证码设为空
			this.getPicCode();
		}
	}

	//表单提交方法
	save() {
		// let testBank = /^([1-9]{1})(\d{14}|\d{18})$/;		
		let testBank = /^([1-9]{1})(\d{14,18})$/;

		let testPhone = /^1(3|4|5|7|8)\d{9}$/;
		let testCode = /^\d{6}$/;//6位手机验证码
		if (!testBank.test(this.bankNum)) {
			var text = '请输入正确卡号！';
			this.utils.showAlert(text);
		} else if (this.bank == "") {
			var text = '请选择银行！';
			this.utils.showAlert(text);
		} else if (!testPhone.test(this.phone)) {
			var text = '请输入正确手机号';
			this.utils.showAlert(text);
		} else if (this.verify == "") {
			this.utils.showAlert("请输入验证码")
		} else if (!testCode.test(this.verify)) {
			this.utils.showAlert("请输入6位验证码")
		}
		else {
			this.addBank();
		}
	}

	/**
		点击获取图片验证码
	 * 
	 */
	getPicCode() {

		this.httpservice.get(SERVER_URL + '/cf_main/cf/VerifyCode', { uid: this.phoneName })
			.subscribe(
			data => {
				// console.log(data);
				let alert = this.alertCtrl.create({
					title: "图片验证码",
					message: "<img src='" + data.url + "'>",
					cssClass: 'registerWin',
					inputs: [
						{
							name: 'verCode',
							placeholder: '请输入图片验证码',
							type: 'text',
						}
					],
					buttons: [
						{
							text: '确定',
							handler: data => {//此处就可以获取用户填入的值，data.verCode
								console.log(data);
								this.getPhoneCode(data);
							}
						}
					]
				});
				alert.present();
			},
			erro => { console.log(erro) },
		)
	}


	/**
	 * 点击提交输入的图片验证码,以获取手机验证码
	 */
	getPhoneCode(data) {
		let p = {
			verCode: data.verCode,
			loginName: this.phoneName,
			params: "RYDCF09072107"
		}
		console.log(p);
		// 获取手机验证码
		this.httpservice.postFormData(SERVER_URL + '/cf_main/cf/VerifyCodeAndSendMobileCode', p)
			.map(data => data.json())
			.subscribe(
			data => {
				console.log(data);
				if (data.success) {

					// this.isGetCode = this.utils.getLastTime().isGetCode;
					// this.codeText = this.utils.getLastTime().codeText;
					this.time();
				} else {
					this.utils.showAlert(data.msg);
				}
			},
			erro => { console.log(erro) },
		)
	}


	/**
	 * 添加银行卡到后台
	 */
	addBank() {
		let pamers = {
			name: this.username,
			bankCard: this.bankNum,
			bankName: this.bank,
			mobile: this.phone,
			mobileCode: this.verify,
			operateType: 2,//添加操作
			loginName: this.phoneName,//全局变量，获取当前用户手机号码
			params: "RYDCF09072107",
			cardType: 2 //1为借款卡,2为还款卡
		}
		console.log(pamers);
		this.httpservice.post(SERVER_URL + '/cf_main/cf/BankCard', pamers)
			.map(res => res.json())
			.subscribe(
			data => {

				console.log(data);
				if (data.success) {
					this.success();
				} else {
					this.utils.showAlert(data.msg);
				}

			},
			erro => {
				console.log(erro.statusText)
			},
		)
	}


	/**
	 * 获取验证码倒计时
	 */
	time() {
		this.amount++;
		this.codeText = 60 + '秒后重发';
		if (this.amount >= 10) {

			this.utils.showAlert('获取验证码太频繁请稍后再试')
		}
		this.core = 60;
		this.isGetCode = true;
		this.coreTitle = '秒后重发';
		let timer = setInterval(() => {
			if (this.core == 1) {
				clearInterval(timer);
				this.codeText = "重新获取";
				this.isGetCode = false;
				return;
			}
			this.core--;
			this.codeText = this.core + this.coreTitle;
		}, 1000)

	}


	success() {
		let alert = this.alertCtrl.create({
			title: '绑定成功',
			buttons: [
				{
					text: '确定',
					handler: () => {
						this.navCtrl.push('RepaymentPage', {}, { duration: 300 });
					}
				}
			]
		});
		alert.present();
	}

	  ionViewDidLoad() {
		console.log('ionViewDidLoad AccountPage');
		this.helpers.hideTabs1();

	}
	ionViewWillLeave(){
		this.helpers.hideTabs2();
  }

	@Output()
	bankoutput: EventEmitter<string> = new EventEmitter<string>();


}

