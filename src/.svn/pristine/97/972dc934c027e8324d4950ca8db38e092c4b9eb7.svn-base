import { UtilsProvider } from './../../providers/utils/utils';
import { Http } from '@angular/http';
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
	name: 'BankPage'
})
@Component({
	selector: 'page-bank',
	templateUrl: 'bank.html',
})
export class BankPage implements OnInit {

	username: string;
	private bankNum: string; //银行卡号
	private bank; //银行
	private phone; //预留手机号
	private verify; //验证码
	private tuSrc;  //图片地址
	public active;
	public phoneName;//用户电话号码

	private isGetCode;        //是否允许获取验证码
	private codeText: string;      //短信提示
	private amount: number;        //次数
	private core: number;          //60秒定时器
	private coreTitle: string;     //按钮显示文字

	private banks:any;			//银行

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public httpservice: HttpServiceProvider,
		public http: Http,
		public utils: UtilsProvider,
		public helpers:HelpersProvider

	) { }

	ngOnInit() {
		//初始化
		this.username = "";
		this.bankNum = "";
		this.bank = "0";
		this.phone = "";
		this.verify = "";
		this.active = true;
		this.isGetCode = false;
		this.codeText = "获取验证码";
		this.phoneName = "";
		this.banks =[
			'中国工商银行',
			'中国建设银行',
			'中国银行',
			'中国农业银行',
			'中国交通银行',
			'中国邮政储蓄银行',
			'招商银行',
			'民生银行',
			'兴业银行',
			'平安银行',
			'中国光大银行',
			'浦东发展银行',
			'中信银行',
		]
	}

	/**
	 * 点击同意图标变化
	 */
	agree() {
		this.active = !this.active;
	}

	ionViewWillEnter() {
		let name = localStorage.getItem("name");
		this.username = name;
		console.log(this.username);


		let user = localStorage.getItem("user");

		if (user != null) {
			let json = JSON.parse(user);//将其转换成json对象
			this.phoneName = json.mobile;
		}
		console.log(this.phoneName)
	}


	/**
	 * 输入银行卡后自动获取所属银行显示
	 */ 
	getBank() {
		// let testBank = /^([1-9]{1})(\d{14}|\d{18})$/;
		let testBank = /^([1-9]{1})(\d{14,18})$/;
		if (!testBank.test(this.bankNum)) {
			this.utils.showAlert("请输入正确的银行卡号");

		}
		//  else {

		// 	this.httpservice.get(SERVER_URL + '/cf_main/cf/getBankName', { BankNO: this.bankNum })
		// 		.map(data => data.json())
		// 		.subscribe(
		// 		data => {
		// 			console.log(data);
		// 			if (data.success) {
		// 				this.bank = data.data.BankName;
		// 			}
		// 		},
		// 		erro => { console.log(erro) },
		// 	)
		// }
	}


	/**
	 * 点击获取表单验证表单
	 */
	getCode() {
		// let testBank = /^([1-9]{1})(\d{14}|\d{18})$/;
		let testBank = /^([1-9]{1})(\d{14,18})$/;
		let testPhone = /^1(3|4|5|7|8)\d{9}$/;

		if (!testBank.test(this.bankNum)) {
			let text = '请输入正确银行卡号';
			this.utils.showAlert(text);
		} else if (this.bank == "") {
			let text = '请输入正确银行卡号';
			this.utils.showAlert(text);
		} else if (!testPhone.test(this.phone)) {
			let text = '请输入正确手机号';
			this.utils.showAlert(text);
		}
		else {
			this.verify = "";//将验证码设为空
			this.getPicCode();
		}
	}

	//表单提交方法
	save() {
		// this.bankoutput.emit('bankoutput');
		// let testBank = /^([1-9]{1})(\d{14}|\d{18})$/;
		let testBank = /^([1-9]{1})(\d{14,18})$/;

		let testPhone = /^1(3|4|5|7|8)\d{9}$/;
		let testCode = /^\d{6}$/;//6位手机验证码
		if (!testBank.test(this.bankNum)) {
			let text = '请输入正确卡号！';
			this.utils.showAlert(text);
		} else if (this.bank == "") {
			let text = '请选择银行！';
			this.utils.showAlert(text);
		} else if (!testPhone.test(this.phone)) {
			let text = '请输入正确手机号';
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
	 * 点击获取图片验证码
	 */
	getPicCode() {

		this.httpservice.get(SERVER_URL + '/cf_main/cf/VerifyCode', { uid: this.phoneName })
			// .map(res=>res.json())
			.subscribe(
			data => {
				console.log(data);
				//图片验证码弹窗
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

								this.getPhoneCode(data);//获取手机验证码
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
	* 提交输入的图片验证码获取手机验证码
	*/
	getPhoneCode(data) {
		let p = {
			verCode: data.verCode,
			loginName: this.phoneName,
			params: "RYDCF09072107"
		}
		console.log(p);

		this.httpservice.postFormData(SERVER_URL + '/cf_main/cf/VerifyCodeAndSendMobileCode', p)
			.map(data => data.json())
			.subscribe(
			data => {
				console.log(data);

				if (data.success) {
					this.time();//调用倒计时方法
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
			cardType: 1 //1为借款银行卡
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
		if (this.amount >= 60) {
			this.utils.showAlert('获取验证码太频繁请稍后再试');

		}
		// let toast = this.toastCtrl.create({
		//     message: '短信已发送，请注意查收',
		//     duration: 2000,
		//     position: 'middle'
		//   });
		// toast.present();
		// this.core1=60+'秒后重发';
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


	/**
	 * 成功回调函数
	 */
	success() {
		let alert = this.alertCtrl.create({
			title: '绑定成功',
			buttons: [
				{
					text: '确定',
					handler: () => {
						// 跳转下一页
						this.navCtrl.push('IdentityPage', {}, { duration: 300 });
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


	closePage() {
		let alert = this.alertCtrl.create({
			// title: '获取借款额度需完成认证确定关闭认证？',
			message: '获取借款额度需完成认证确定关闭认证？',
			buttons: [
				{
					text: '关闭',
					handler: () => {
						console.log('Cancel clicked');
						this.navCtrl.popToRoot();
					}
				},
				{
					text: '取消',
					role: 'cancel',
					handler: () => {
						console.log('Buy clicked');
					}
				}
			]
		});
		alert.present();
	}


	cc(){
		console.log(this.bank)
	}

}
