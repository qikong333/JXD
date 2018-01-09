import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HelpersProvider } from '../../providers/helpers/helpers';
/**
 * Generated class for the IdentityPhonePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
	name: 'IdentityPhonePage',
})
@Component({
	selector: 'page-identity-phone',
	templateUrl: 'identity-phone.html',
})
export class IdentityPhonePage implements OnInit {

	public active;//用于验证同意按钮的变量
	public password;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public helpers:HelpersProvider
	) { }

	ionViewDidLoad() {
		console.log('ionViewDidLoad AccountPage');
		this.helpers.hideTabs1();
	}
	
	ionViewWillLeave(){
		this.helpers.hideTabs2();
	}

	// 初始化
	ngOnInit() {
		this.active = true;
		this.password = "";
	}

	save() {
		let testCode = /^\d{6}$/;//6位手机验证码

		if (this.password == "") {
			this.showAlert("请输入服务密码");
		} else if (!testCode.test(this.password)) {
			this.showAlert("请输入正确的服务密码");
		} else {
			this.success();
		}
	}

	toForget() {
		this.navCtrl.push('ForgetPasswordPage',{},{duration:100});

	}

// 验证成功时的弹窗
	success() {
		let alert = this.alertCtrl.create({
			title: '保存成功',
			buttons: [
				{
					text: '确定',
					handler: () => {
						console.log('Buy clicked');
						// 跳转下一页
						// this.Informationsoutput.emit("Informationsoutput");
						// this.navCtrl.push('IdentityPage');
					}
				}
			]
		});
		alert.present();
	}

// 提示弹窗
	showAlert(text) {
		let alert = this.alertCtrl.create({
			title: text,
			cssClass: 'aaaa',
			//    subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
			buttons: ['确定']
		});
		alert.present();
	}

	// 点击同意图标变化
	agree() {
		let d = document.getElementById("dphone");
		if (d.className == 'icon iconfont icon-yixuan blue') {
			this.active = false;
		} else {
			this.active = true;
		}
		// console.log(d.className);
	}

}