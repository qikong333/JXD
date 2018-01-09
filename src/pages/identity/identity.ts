import { UtilsProvider } from './../../providers/utils/utils';
import { SERVER_URL } from './../../providers/constants/constants';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { IdentityPhonePage } from '../identity-phone/identity-phone';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { NativeServiceProvider } from '../../providers/native-service/native-service';
import { ServiceInterfaceProvider } from "../../providers/service-interface/service-interface";
/**
 * Generated class for the IdentityPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
	name: 'IdentityPage',
})
@Component({
	selector: 'page-identity',
	templateUrl: 'identity.html',
})
export class IdentityPage {
	private phoneName = localStorage.getItem('userPhone');;//手机号码
	private nub;//芝麻分
	private phonezt;//运营商状态
	private isDisabled = true;
	private color;

	show1: boolean = true;//判断显示芝麻
	show2: boolean = true;//判断显示手机运营

	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
		public helpers: HelpersProvider,
		public httpservice: HttpServiceProvider,
		public nativeservice: NativeServiceProvider,
		public serviceinter: ServiceInterfaceProvider,
		public utils: UtilsProvider

	) { }
	ngOnInit() {
		//初始化
		// this.isDisabled = true;
		// this.phoneName = localStorage.getItem('userPhone');
		// this.phonezt = "";
		// this.isDisabled = false;

	}

	ionViewWillEnter() {
		this.GetZm();

		this.helpers.hideTabs1();
	}

	ionViewWillLeave() {
		this.helpers.hideTabs2();
	}

	/**
	* 下拉刷新
	* @param obj
	*/
	doRefresh(obj) {
		// this.presentLoading();//加载中
		this.ionViewWillEnter();
		setTimeout(function () {
			obj.complete();
		}, 400);
	}

	toApprove() {
		if (!this.isDisabled) {

		} else {
			this.serviceinter.GetZm(this.phoneName)
				.map(data => data.json())
				.subscribe(data => {
					if (data.data.brStatu == 2) {
						this.utils.showAlert('已完成认证');
					} else {
						this.navCtrl.push('FirstOperationPage');
					}
				})
		}
	}
	/**
	 * 查询获取芝麻信用分和手机运营状态
	 */
	GetZm() {
		this.serviceinter.GetZm(localStorage.getItem("userPhone"))
			.map(data => data.json())
			.subscribe(
			data => {
				// alert('回来更新了');
				console.log(data);
				if (data.success) {
					// alert('回来更新了,成功了');

					// 芝麻
					if (data.data.zmScore == "") {
						this.nub = "去查询"
						this.isDisabled = false;
						this.color = true;
					} else {
						this.nub = data.data.zmScore;
						this.show1 = false;//显示已认证,不能再点击
						this.phonezt = "认证成功";
						this.isDisabled = true;
						this.color = false;
					}

					// 手机运营商
					if (data.data.brStatu == 1) {
						this.phonezt = "未认证";
					} else if (data.data.brStatu == 2) {
						this.phonezt = "认证成功";
						this.show2 = false;//显示手机运营商已认证,不能再点击
					} else if (data.data.brStatu == 3) {

						this.phonezt = "认证失败";
					}
				}
			}, err => {
				this.utils.showBlock('服务器连接错误,请稍候重试');
			}
			)
	}


	/**http://192.168.4.40:8080/cf_main/cf/getZMCode?loginName=15920282738&params=RYDCF09072107
	 * 获取芝麻信用分,弹窗选择
	 */
	getZhiMa() {

		this.serviceinter.GetZm(this.phoneName)
			.map(data => data.json())
			.subscribe(data => {
				if (data.data.zmScore == '') {
					let alert = this.alertCtrl.create({
						title: '授权获取芝麻信用分?',
						buttons: [
							{ text: '取消' },
							{
								text: '确定',
								handler: () => {
									this.zhiMa();
								}
							}
						]
					});
					alert.present();
				} else {
					this.utils.showAlert('已完成认证');
				}
			}, err => {
				this.utils.showBlock('服务器连接错误,请稍候重试');
			}
			)
	}

	/**
	 * 获取芝麻分的方法
	 */
	zhiMa() {

		this.httpservice.get(SERVER_URL + '/cf_main/cf/getZMAuthURL', { loginName: this.phoneName, params: 'RYDCF09072107' })
			.map(data => data.json())
			.subscribe(
			data => {
				console.log(data);
				if (data.success) {
					// alert(data.msg);
					this.nativeservice.themeable(data.msg)//打开第三方芝麻认证
						.on('closeevent')
						.subscribe(
						data => {
							this.ionViewWillEnter();
						});

					// this.navCtrl.push('QuotaPage');
				} else {
					this.utils.showAlert(data.msg)
				}
			},
			error => {
				console.log(error);
				this.utils.showBlock('服务器连接错误,请稍候重试');
			}
			)
	}


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
}
