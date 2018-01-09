import { UtilsProvider } from './../../providers/utils/utils';
import { Component,OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController} from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { SERVER_URL } from '../../providers/constants/constants';
import { HelpersProvider } from '../../providers/helpers/helpers';
/**
 * Generated class for the ChooseCouponsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name:"ChooseCouponsPage",
})
@Component({
  selector: 'page-choose-coupons',
  templateUrl: 'choose-coupons.html',
})
export class ChooseCouponsPage implements OnInit {
  public data:any[];            //data数组--》数据     
  public params:Object;         //优惠卷--参数
  public main_data:boolean;    //判断有无有数据
  public isactive:number;      //选中的下标
  public noactive:boolean;     //默认从来不选中   
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpServiceProvider,
    public helpers:HelpersProvider,public viewCtrl:ViewController,
    public utils:UtilsProvider
  ) {
  }

 ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
    this.helpers.hideTabs1();
  }
  

  ionViewWillLeave(){
  this.helpers.hideTabs2();
  }

   ngOnInit() {
    this.noactive=true;
    // this.isactive=false;
  }

// 进入页面前,判断有没有缓存机制
ionViewWillEnter(){
   this.params={
      loginName:JSON.parse(localStorage.getItem("user")).mobile,
      status:'1',
      pageNum:0,
      pageSize:10
    }
  
  this.http.get(SERVER_URL+'/cf_main/cf/user/myCoupon',this.params)
  .map(data=>data.json())
  .subscribe(
    res=>{

    console.log(res);
    if(res.success){
      this.main_data=true;
      this.data=res.data.cfMyCoupons;

      if(this.data.length!=0){
        this.main_data=true;
        if(localStorage.getItem("ChooseCoupons")){
          this.isactive=JSON.parse(localStorage.getItem("ChooseCoupons")).back_index;
          for(let i=0;i<this.data.length;i++){
            // 类型转换
           if(this.data[i].mold=='1'){
              this.data[i].mold='抵现券';
              this.data[i].value1="<span>"+this.data[i].value1+"</span>元";
              this.data[i].value2=this.data[i].value2;
            }else if(this.data[i].mold=='2'){
              this.data[i].mold='免息券';
              this.data[i].value1="<span>"+this.data[i].value1+"</span>天";
              this.data[i].value2=this.data[i].value2+'天';
            }
          }
        }else{
         this.noactive=true;
         for(let i=0;i<this.data.length;i++){
            // 类型转换
           if(this.data[i].mold=='1'){
              this.data[i].mold='抵现券';
              this.data[i].value1="<span>"+this.data[i].value1+"</span>元";
              this.data[i].value2=this.data[i].value2;
            }else if(this.data[i].mold=='2'){
              this.data[i].mold='免息券';
              this.data[i].value1="<span>"+this.data[i].value1+"</span>天";
              this.data[i].value2=this.data[i].value2+'天';
            }
          }
          console.log(this.data);
        }
      }else{
         this.main_data=false;
      }
    }else{
      this.utils.showAlert(res.msg);
    }
  },err => {
    this.utils.showBlock('服务器连接错误,请稍候重试');
  }
)

}





点击触发事件
go(index,id,mold,value){
     var backdata={       //返回去的数据json--》index：序列，id：订单号，mold：类型，value：天数
      'back_index':index,
      'back_id':id,
      'back_mold':mold,
      'back_value':value
    }
    this.isactive=index;
    console.log(this.isactive)
    localStorage.setItem('ChooseCoupons',JSON.stringify(backdata));
    this.viewCtrl.dismiss(JSON.stringify(backdata));
  }
}

  



