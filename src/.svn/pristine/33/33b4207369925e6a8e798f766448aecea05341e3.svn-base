import { UtilsProvider } from './../../providers/utils/utils';
import { HttpServiceProvider } from './../../providers/http-service/http-service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SERVER_URL } from '../../providers/constants/constants';

@IonicPage({
	name: 'JobPage'
})
@Component({
	selector: 'page-job',
	templateUrl: 'job.html',
})
export class JobPage implements OnInit {

	public phoneName = localStorage.getItem("userPhone");     	//获取登录后的手机号码
	public company_name = '';				//公司名称
	public company_address = '';			//详细地址
	public company_phone = '';				//公司电话
	public company_time = '未填写';		//入职时间
	// public company_time = '1393862400000';		//入职时间
	public company_income = '';			//月薪收入
	public company_payday = '';			//发薪日
	public company_industry = '';		//所在行业
	public showDay: string = '未填写';//显示发薪日字符串
	public today = new Date().toJSON().split('T')[0];//获取今天时间,作为时间选择的最大值

	butActive: boolean = true;

	cityData: any[]; //城市数据
	cityName: string = '未填写'; //初始化城市名
	code: string; //城市编码
	public url;

	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: HttpServiceProvider,
		public httpservice: HttpServiceProvider,
		public utils: UtilsProvider
	) {
	}

	//初始化
	ngOnInit() {
		this.getCitiesData();			//城市三级联动方法
	}

	/**
 * 城市三级联动方法
 */
	getCitiesData() {
		// var server = SERVER_URL;
		// if (server == 'http://120.26.199.175:80') {
		// 	this.url = "/www/assets/json/city-data.json";
		// } else {
		// 	this.url = "/assets/json/city-data.json";
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

	/**
	* 城市选择器被改变时触发的事件
	* @param event
	*/
	cityChange(event) {
		console.log(event);
		this.code = event['region'].value;
		this.cityName = event['province'].text + event['city'].text + event['region'].text;//将已经选择的信息的城市拼接成地区字符串

	}


	/**
	 * 获取发薪日
	 * @param event
	 */
	getDay(event) {
		this.company_payday = event.day;
		this.showDay = `每月${event.day}号`;
	}

	//即将要进入页面，就查一下数据库
	ionViewWillEnter() {

		this.getWork();//调用查询用户工作信息方法
	}


	// 显示当前时间
	getNewDate() {
		this.company_time = new Date().toJSON().split('T')[0];
	}

	/**
	 * 查询用户工作信息
	 */
	getWork() {

		this.httpservice.get(SERVER_URL + '/cf_main/cf/userWorkinfo', { loginName: this.phoneName })
			.map(data => data.json())
			.subscribe(
			data => {
				console.log(data);
				if (data.success) {
					let r = data.data.userWorkinfo;
					this.company_name = r.workUnit;				//公司名称
					this.cityName = r.workAddress;			//公司城市
					this.company_address = r.workDetaiAddress;			//详细地址
					this.company_phone = r.companyPhone;				//公司电话
					if (this.company_time)
						this.company_time = this.utils.getDateFormat(r.employDate);	//入职时间
					this.company_income = r.inCome;			//月薪收入 
					if (r.payDay) {
						this.showDay = `每月${r.payDay}号`;		//展示发薪日
						this.company_payday = r.payDay;
					}
					this.company_industry = r.trade;		//所在行业
				}
			},err => {
				this.utils.showBlock('服务器连接错误,请稍候重试');
			})
	}

	/**
	 * 提交数据到后台保存下来
	 */
	save() {

		if (!this.company_name) {
			this.utils.showAlert('请填写公司全称')
		}
		else if (this.cityName == '未填写') {
			this.utils.showAlert('请选择公司所在城市');
		}
		else if (!this.company_address || this.company_address.length > 100) {
			this.utils.showAlert('请填写公司详细地址');
		}
		else if (this.company_phone.length < 7 || this.company_phone.length > 30) {
			this.utils.showAlert('请填写正确的公司电话');
		}
		else if (this.company_time == '未填写') {
			this.utils.showAlert('请填写入职时间');
		}
		else if (Date.parse(this.company_time) > new Date().getTime()) {
			this.utils.showAlert('填写的时间不能大于当前时间');
		}
		else if (!this.company_income) {
			this.utils.showAlert('请填写月薪收入');
		}
		else if (this.showDay == '未填写') {
			this.utils.showAlert('请填写发薪日');
		}
		else if (!this.company_industry) {
			this.utils.showAlert('请填写所在行业');
		}
		else {
			this.toSave();
		}

	}

	/**
	 * 验证成功后提交数据保存信息
	 */
	toSave() {
		let p = {
			loginName: this.phoneName,
			params: 'RYDCF09072107',
			workUnit: this.company_name,
			workAddress: this.cityName,
			workDetaiAddress: this.company_address,
			companyPhone: this.company_phone,
			employDate: this.company_time,
			inCome: this.company_income,
			payDay: this.company_payday,
			trade: this.company_industry
		}
		console.log(p);

		this.httpservice.post(SERVER_URL + '/cf_main/cf/saveUserWorkinfo', p)
			.map(data => data.json())
			.subscribe(
			data => {
				console.log(data);
				if (data.success) {

					this.success(data.msg);
				} else {
					this.utils.showAlert(data.msg);
					if (data.errorCode == -10) {
						this.butActive = false;
					}
				}
			},err => {
				this.utils.showBlock('服务器连接错误,请稍候重试');
			}
			)
	}

	/**
	 * 成功时弹窗函数
	 */
	success(text) {
		let alert = this.alertCtrl.create({
			title: text,
			buttons: [
				{
					text: '确定',
					handler: () => {
						this.navCtrl.pop({ duration: 100 });
					}
				}
			]
		});
		alert.present();
	}
}
