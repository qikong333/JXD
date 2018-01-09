import { UtilsProvider } from './../../providers/utils/utils';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { SERVER_URL } from '../../providers/constants/constants';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the CouponsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'CouponsPage'
})
@Component({
  selector: 'page-coupons',
  templateUrl: 'coupons.html',
})
export class CouponsPage {
  paper: string;
  nodata1: boolean;
  nodata2: boolean;
  nodata3: boolean;
  neverdata1: boolean;
  neverdata2: boolean;
  neverdata3: boolean;
  array1: any[];
  array2: any[];
  array3: any[];
  scroll_first: boolean;
  scroll_two: boolean;
  scroll_three: boolean;
  params1: Object;
  params2: Object;
  params3: Object;
  pageNum1: number;
  pageNum2: number;
  pageNum3: number;
  a: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public HttpServiceProvider: HttpServiceProvider, public helpers: HelpersProvider,
    public utils:UtilsProvider
  ) {
    this.a = "<span>1</span>";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.helpers.hideTabs1();

  }


  ionViewWillLeave() {
    this.helpers.hideTabs2();
  }


  //即将要进入的页面
  ionViewWillEnter() {
    this.neverdata1 = false;
    this.neverdata2 = false;
    this.neverdata3 = false;

    this.nodata1 = false;                        //无更多的数据了--未使用
    this.nodata2 = false;                        //无更多的数据了--已使用
    this.nodata3 = false;                        //无更多的数据了--已过期


    this.scroll_first = false;                   //未使用不允许滚动加载
    this.scroll_two = false;                     //已使用不允许滚动加载
    this.scroll_three = false;                   //已过期不允许滚动加载

    this.pageNum1 = 0;                            //数据默认是第一页
    this.pageNum2 = 0;                            //数据默认是第一页
    this.pageNum3 = 0;                            //数据默认是第一页

    this.paper = 'notuse'
    this.first('1');                            //默认请求未使用

  }

  //未使用-已使用-已过期===》》请求数据
  first(type) {

    //未使用
    if (type == '1') {
      this.pageNum1 = 0;
      //默认请求未使用的数据     
      this.params1 = {
        loginName: JSON.parse(localStorage.getItem('user')).mobile,    //客户
        status: '1',         //类型
        pageSize: 10,        //默认10条数据
        pageNum: this.pageNum1          //第一页
      };

      this.HttpServiceProvider.get(SERVER_URL + '/cf_main/cf/user/myCoupon', this.params1)
        .map(data => data.json())
        .subscribe((res) => {
          // 是否有数据数据this.array1
          if (res.success) {
            this.array1 = res.data.cfMyCoupons;
            if (this.array1.length == 0) {
              this.neverdata1 = true;
              this.scroll_first = false;
            } else {
              for (let i = 0; i < this.array1.length; i++) {
                // 类型转换
                if (this.array1[i].mold == '1') {
                  this.array1[i].mold = '抵现券';
                  this.array1[i].value1 = "<span>" + this.array1[i].value1 + "</span>元";
                  this.array1[i].value2 = this.array1[i].value2 + '元';
                } else if (this.array1[i].mold == '2') {
                  this.array1[i].mold = '免息券';
                  this.array1[i].value1 = "<span>" + this.array1[i].value1 + "</span>天";
                  this.array1[i].value2 = this.array1[i].value2 + '天';
                }
              }

              console.log(this.array1);
              this.scroll_first = true;
            }
          } else {
            console.log(res);
            this.utils.showAlert(res.msg);
          }

        }, err => {
          this.utils.showBlock('服务器连接错误,请稍候重试');
        })
    }

    //已使用
    if (type == '2') {
      this.pageNum2 = 0;
      //默认请求未使用的数据     
      this.params2 = {
        loginName: JSON.parse(localStorage.getItem('user')).mobile,    //客户
        status: '2',         //类型
        pageSize: 10,        //默认10条数据
        pageNum: this.pageNum2          //第一页
      };

      this.HttpServiceProvider.get(SERVER_URL + '/cf_main/cf/user/myCoupon', this.params2)
        .map(data => data.json())
        .subscribe((res) => {
          // 是否有数据数据this.array1
          if (res.success) {
            this.array2 = res.data.cfMyCoupons;
            console.log(this.array2);
            if (this.array2.length == 0) {
              this.neverdata2 = true;
              this.scroll_two = false;
            } else {
              for (let i = 0; i < this.array2.length; i++) {
                // 类型转换
                if (this.array2[i].mold == '2') {
                  this.array2[i].mold = '免息券';
                  this.array2[i].value1 = "<span>" + this.array2[i].value1 + "</span>天";
                  this.array2[i].value2 = this.array2[i].value2 + '天';
                } else if (this.array2[i].mold == '1') {
                  this.array2[i].mold = '抵现券';
                  this.array2[i].value1 = "<span>" + this.array2[i].value1 + "</span>元";
                  this.array2[i].value2 = this.array2[i].value2 + '元';
                }
              }

              console.log(this.array2);
              this.scroll_two = true;
            }
          } else {
            console.log("数据请求失败，后台原因");
            this.utils.showAlert(res.msg);
          }
        },err => {this.utils.showBlock('服务器连接错误,请稍候重试');})
    }

    // 已过期
    if (type == "3") {
      this.pageNum3 = 0;
      //默认请求未使用的数据     
      this.params3 = {
        loginName: JSON.parse(localStorage.getItem('user')).mobile,    //客户
        status: '3',         //类型
        pageSize: 10,        //默认10条数据
        pageNum: this.pageNum3          //第一页
      };

      this.HttpServiceProvider.get(SERVER_URL + '/cf_main/cf/user/myCoupon', this.params3)
        .map(data => data.json())
        .subscribe((res) => {
          // 是否有数据数据this.array1
          if (res.success) {
            this.array3 = res.data.cfMyCoupons;
            console.log(this.array3);
            if (this.array3.length == 0) {
              this.neverdata3 = true;
              this.scroll_three = false;
            } else {
              for (let i = 0; i < this.array3.length; i++) {
                // 类型转换
                if (this.array3[i].mold == '2') {
                  this.array3[i].mold = '免息券';
                  this.array3[i].value1 = "<span>" + this.array3[i].value1 + "</span>天";
                  this.array3[i].value2 = this.array3[i].value2 + '天';
                } else if (this.array3[i].mold == '1') {
                  this.array3[i].mold = '抵现券';
                  this.array3[i].value1 = "<span>" + this.array3[i].value1 + "</span>元";
                  this.array3[i].value2 = this.array3[i].value2 + '元';
                }
              }

              console.log(this.array3);
              this.scroll_three = true;
            }
          } else {
            console.log("数据请求失败，后台原因");
            this.utils.showAlert(res.msg);
          }
        },err => {this.utils.showBlock('服务器连接错误,请稍候重试');})
    }
  }









  //上拉加载
  doInfinite1(infiniteScroll) {
    //上拉加载
    this.params1 = {
      loginName: JSON.parse(localStorage.getItem('user')).mobile,    //客户
      status: '1',         //类型
      pageSize: 10,        //默认10条数据
      pageNum: ++this.pageNum1
    };
    this.HttpServiceProvider.get(SERVER_URL + '/cf_main/cf/user/myCoupon', this.params1)
      .map(data => data.json())
      .subscribe((res) => {
        let data = res.data.cfMyCoupons;
        console.log(data);
        if (data.length == 0) {
          this.scroll_first = false;
          this.nodata1 = true;
        } else {
          for (let i = 0; i < data.length; i++) {
            // 类型转换
            if (data[i].mold == '1') {
              data[i].mold = '免息券';
              data[i].value1 = "<span>" + data[i].value1 + "</span>天";
              data[i].value2 = data[i].value2 + '天';
            } else if (data[i].mold == '2') {
              data[i].mold = '抵现券';
              data[i].value1 = "<span>" + data[i].value1 + "</span>元";
              data[i].value2 = data[i].value2 + '元';
            }
          }
          //数组相接
          this.array1 = this.array1.concat(data);
          infiniteScroll.complete();
        }

      })
  }

  doInfinite2(infiniteScroll) {
    //上拉加载
    this.params2 = {
      loginName: JSON.parse(localStorage.getItem('user')).mobile,    //客户
      status: '2',         //类型
      pageSize: 10,        //默认10条数据
      pageNum: ++this.pageNum2
    };
    this.HttpServiceProvider.get(SERVER_URL + '/cf_main/cf/user/myCoupon', this.params2)
      .map(data => data.json())
      .subscribe((res) => {
        let data = res.data.cfMyCoupons;
        console.log(data);
        if (data.length == 0) {
          this.scroll_two = false;
          this.nodata2 = true;
        } else {
          for (let i = 0; i < data.length; i++) {
            // 类型转换
            if (data[i].mold == '1') {
              data[i].mold = '免息券';
              data[i].value1 = "<span>" + data[i].value1 + "</span>天";
              data[i].value2 = data[i].value2 + '天';
            } else if (data[i].mold == '2') {
              data[i].mold = '抵现券';
              data[i].value1 = "<span>" + data[i].value1 + "</span>元";
              data[i].value2 = data[i].value2 + '元';
            }
          }
          //数组相接
          this.array2 = this.array2.concat(data);
          infiniteScroll.complete();
        }

      })
  }

  doInfinite3(infiniteScroll) {
    //上拉加载
    this.params3 = {
      loginName: JSON.parse(localStorage.getItem('user')).mobile,    //客户
      status: '3',         //类型
      pageSize: 10,        //默认10条数据
      pageNum: ++this.pageNum3
    };
    this.HttpServiceProvider.get(SERVER_URL + '/cf_main/cf/user/myCoupon', this.params3)
      .map(data => data.json())
      .subscribe((res) => {
        let data = res.data.cfMyCoupons;
        console.log(data);
        if (data.length == 0) {
          this.scroll_three = false;
          this.nodata3 = true;
        } else {
          for (let i = 0; i < data.length; i++) {
            // 类型转换
            if (data[i].mold == '1') {
              data[i].mold = '免息券';
              data[i].value1 = "<span>" + data[i].value1 + "</span>天";
              data[i].value2 = data[i].value2 + '天';
            } else if (data[i].mold == '2') {
              data[i].mold = '抵现券';
              data[i].value1 = "<span>" + data[i].value1 + "</span>元";
              data[i].value2 = data[i].value2 + '元';
            }
          }
          //数组相接
          this.array3 = this.array3.concat(data);
          infiniteScroll.complete();
        }

      })
  }

}
