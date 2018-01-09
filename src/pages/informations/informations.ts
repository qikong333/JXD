import { UtilsProvider } from './../../providers/utils/utils';
import { Component, Output, OnChanges, EventEmitter, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { SERVER_URL } from '../../providers/constants/constants';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Http } from '@angular/http';
import { HelpersProvider } from '../../providers/helpers/helpers';


/**
 * Generated class for the InformationsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
	name: 'InformationsPage',
})
@Component({
	selector: 'page-informations',
	templateUrl: 'informations.html',
})
export class InformationsPage implements OnInit {
	//定义双向绑定的属性
	// private username: any; //用户姓名
	// private identity; //身份证号码
	private education; //学历
	private marry; 	//婚姻
	private residence;//现居住地
	private address; //详细地址
	public phoneName;

	private active; //显示隐藏密码
	private picUrl; //图片验证码src

	private friends;//验证是否已添加联系人
	private isfriends;//用于ngif的判断
	public n1;
	public n2;
	public n3;
	public p1;
	public p2;
	public p3;
	public r1;
	public r2;
	public r3;

	public gx1;
	public gx2;
	public gx3;

	public url;

	public no_friends: boolean; 	//判断紧急联系人是否已填写
	// public no_upload:boolean;	//判断身份信息是否已上传
	// public token:boolean;		//身份信息识别命令
	butActive: boolean = true;
	canChange:any;//判断是否可修改信息

	cityData: any[]; //城市数据
	cityName: string = '未填写'; //初始化城市名
	code: string; //城市编码

	constructor(
		//添加组件
		public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public httpservice: HttpServiceProvider,
		public frombuilder: FormBuilder,
		public http: HttpServiceProvider,
		public http2: Http,
		public utils: UtilsProvider,
		public helpers: HelpersProvider,
		public modalCtrl: ModalController
	) {

	}

	ngOnInit() {
		this.education = '未填写';
		this.marry = '未填写';
		this.address = "";
		this.isfriends = false;
		this.phoneName = "";
		this.getCitiesData();

	}


	/**
	 * 城市三级联动方法
	 */
	getCitiesData() {
		// let server = SERVER_URL;
		// if (server == 'http://120.26.199.175:80') {
		// 	this.url = "/www/assets/json/city-data.json";
		// } else {
		// 	this.url = "assets/json/city-data.json";
		// }
		this.url = "assets/json/city-data.json";
		this.http.get(this.url)
			.map(data => data.json())
			.subscribe(
			data => {
				this.cityData = data;//获得全部城市的数组
			}
			)
	}

	// getCitiesData(){
	//     return this.http.get('../assets/json/city-data.json')
	//       .toPromise()
	//       .then(response => response.json())
	//       .catch( err => {
	//         return Promise.reject(err)
	//       })
	//   }

	//   setCityPickerData(){
	//     this.getCitiesData()
	//       .then( data => {
	// 		  console.log(data);
	//         this.cityData = data;
	// 		console.log(this.cityData);
	//       });
	//   }



	/**
	  * 城市选择器被改变时触发的事件
	  * @param event
	  */
	cityChange(event) {
		console.log(event);
		this.code = event['region'].value;
		this.cityName = event['province'].text + event['city'].text + event['region'].text;//将已经选择的信息的城市拼接成地区字符串

	}


	// 生命周期，添加联系人放回此页面时自动更新
	ionViewWillEnter() {

		// 获取登录电话号码
		let user = localStorage.getItem("user");
		let json = JSON.parse(user);//将其转换成json对象
		this.phoneName = json.mobile;

		//一进入页面就查询一次后台的数据
		let params = { loginName: this.phoneName, params: "RYDCF09072107" }
		this.httpservice.get(SERVER_URL + '/cf_main/cf/userInfoBase', params)
			.map(data => data.json())
			.subscribe((data) => {
				console.log(data);
				// 1.进入页面先查下数据库还有判断紧急联系人是进行了更改
				// if(data.errorCode=='0' && friends){
				// 	this.education = data.data.education;			//学历
				// 	this.marry=data.data.maritalState;				//婚姻
				// 	this.cityName = data.data.residence;			//现居住地
				// 	this.address = data.data.resAddress;			//详细地址

				// 	let obj = JSON.parse(friends);					//将其转换成json对象
				// 	this.n1=obj.username1;							//紧急1
				// 	this.p1=obj.phone1;
				// 	this.r1=obj.relation1;
				// 	this.n2=obj.username2;							//紧急2
				// 	this.p2=obj.phone2;
				// 	this.r2=obj.relation2;
				// 	this.no_friends = true;							//紧急联系人是否有填写
				// 	console.log("tttttttttt")
				// }
				// 2.进入页面先查下数据库还有判断紧急联系人没进行了更新
				if (data.success) {
					this.education = data.data.education;			//学历
					this.marry = data.data.maritalState;				//婚姻
					this.cityName = data.data.residence;			//现居住地
					this.address = data.data.resAddress;			//详细地址
					this.n1 = data.data.oneName;						//紧急1名字
					this.p1 = data.data.oneMobile;					//紧急1手机号
					this.r1 = data.data.oneType;						//紧急1关系
					this.n2 = data.data.twoName;						//紧急2名字
					this.p2 = data.data.twoMobile;					//紧急2手机号
					this.r2 = data.data.twoType;						//紧急2关系
					this.canChange = data.data.allowChange;//是否可以修改

					if (data.errorCode == 0) {
						this.no_friends = true;							//紧急联系人是否有填写
					}
				}
				// 3.进入页面查下了数据库，发现没有数据导入
				else {
					this.no_friends = false;
					//获取紧急联系人的已填写的数据
					// if (friends) {
					// 	let obj = JSON.parse(friends);					//将其转换成json对象
					// 	this.n1=obj.username1;							//紧急1
					// 	this.p1=obj.phone1;
					// 	this.r1=obj.relation1;
					// 	this.n2=obj.username2;							//紧急2
					// 	this.p2=obj.phone2;
					// 	this.r2=obj.relation2;
					// 	this.no_friends = true;							//紧急联系人是否有填写
					// 	console.log("ccccccccccc");
					// }else{
					// 	this.no_friends = false;
					// 	console.log("tzctzc")
					// }		

				}
			})



	}

	// 将返回的123。。转换成中文关系显示在个人信息首页
	// getrelation(r) {
	// 	let relation;
	// 	switch (r) {
	// 		case "1":
	// 			relation = "配偶";
	// 			break;
	// 		case "2":
	// 			relation = "儿女";
	// 			break;
	// 		case "3":
	// 			relation = "父母";
	// 			break;
	// 		case "4":
	// 			relation = "兄弟姐妹";
	// 			break;
	// 		case "5":
	// 			relation = "朋友";
	// 			break;
	// 		case "6":
	// 			relation = "同事";
	// 			break;
	// 		case "7":
	// 			relation = "其它";
	// 			break;
	// 	}
	// 	return relation;
	// }

	// 表单验证弹窗
	showAlert(text) {
		let alert = this.alertCtrl.create({
			title: text,
			buttons: ['确定']
		});
		alert.present();
	}

	/**
	 * 点击提交验证表单主函数
	 */
	save() {

		if (this.canChange == 1) {
			this.utils.showAlert('您有未完结订单,无法修改');
			return
		}
		
		if (this.education == "未填写") {
			let text = '请选择最高学历!';
			this.showAlert(text);
		} else if (this.marry == '未填写') {
			this.showAlert('请选择婚姻状况');
		} else if (this.cityName == '未填写') {
			this.showAlert('请选择城市');
		}
		else if (this.address == "") {
			let text = '请填写详细地址';
			this.showAlert(text);
		} else if (this.address.length > 100) {
			let text = '详细地址在100个字符内!';
			this.showAlert(text);
		} else {
			this.httpservice.get(SERVER_URL + '/cf_main/cf/userInfoBase', { loginName: this.phoneName, params: "RYDCF09072107" })
				.map(data => data.json())
				.subscribe((data) => {
					console.log(data);
					if (data.errorCode == '0') {
						let friends = localStorage.getItem("add");
						if (friends) {
							let obj = JSON.parse(friends);					//将其转换成json对象
							this.n1 = obj.username1;							//紧急1
							this.p1 = obj.phone1;
							this.r1 = obj.relation1;
							this.n2 = obj.username2;							//紧急2
							this.p2 = obj.phone2;
							this.r2 = obj.relation2;
							this.saveUser();
						} else {
							this.saveUser();
						}
					} else {
						//获取紧急联系人的已填写的数据
						let friends = localStorage.getItem("add");
						if (friends) {
							let obj = JSON.parse(friends);					//将其转换成json对象
							this.n1 = obj.username1;							//紧急1
							this.p1 = obj.phone1;
							this.r1 = obj.relation1;
							this.n2 = obj.username2;							//紧急2
							this.p2 = obj.phone2;
							this.r2 = obj.relation2;
							this.saveUser();
						} else {
							this.showAlert('请添加紧急联系人');
						}

					}
				}, err => { this.utils.showBlock('服务器连接错误,请稍候重试'); })
		}
	}

	/**
	 * 保存数据到后台函数
	 */
	saveUser() {
		let params = {
			education: this.education,		//学历
			maritalState: this.marry,		//婚姻
			resAddress: this.address,		//地址
			residence: this.cityName,		//城市
			oneName: this.n1,				//紧急1
			oneMobile: this.p1,
			oneType: this.r1,
			twoName: this.n2,				//紧急2
			twoMobile: this.p2,
			twoType: this.r2,
			loginName: this.phoneName,		//登录手机号码
			params: "RYDCF09072107"			//密钥

		}
		console.log(params);

		this.httpservice.post(SERVER_URL + '/cf_main/cf/userBase', params)
			.map(data => data.json())
			.subscribe(
			data => {
				console.log(data);
				if (data.success) {
					localStorage.removeItem('add');//清除缓存
					this.success();
				} else {
					this.utils.showAlert(data.msg);
					if (data.errorCode == -10) {
						this.butActive = false;
					}
				}
			}, err => { this.utils.showBlock('服务器连接错误,请稍候重试'); }
			)
	}


	/**
	 * 成功时弹窗函数
	 */
	success() {
		let alert = this.alertCtrl.create({
			title: '保存成功',
			buttons: [
				{
					text: '确定',
					handler: () => {
						this.navCtrl.pop();
					}
				}
			]
		});
		alert.present();
	}

	//信息未完成，提示是否确定关闭认证？
	closePage() {
		this.navCtrl.pop();
		localStorage.removeItem("add")
	}

	//跳转紧急联系人
	addFriends() {
		console.log(this.canChange);
		// this.navCtrl.push('FriendsPage')
		let profileModal = this.modalCtrl.create('FriendsPage', {canChange:this.canChange});
		profileModal.onDidDismiss(data => {
			console.log(data);
			if (data) {
				this.no_friends = data.state;
			} else {

			}

		});
		profileModal.present();
	}

	//跳转身份信息
	// addidentity(){
	// 	this.navCtrl.push('Papers2Page',{'token':this.token})
	// }

	ionViewDidLoad() {
		console.log('ionViewDidLoad AccountPage');
		this.helpers.hideTabs1();
	}

	ionViewWillLeave() {
		this.helpers.hideTabs2();
	}

}