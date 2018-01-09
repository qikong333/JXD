import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
import { IonicApp, IonicModule, IonicErrorHandler, IonicPageModule, IonicPage } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http, XHRBackend, RequestOptions, ConnectionBackend, HttpModule, JsonpModule } from "@angular/http";
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileOpener } from '@ionic-native/file-opener';
import { AppVersion } from '@ionic-native/app-version';
import { ImagePicker } from '@ionic-native/image-picker';
import { FileTransfer } from '@ionic-native/file-transfer';
 
import { MyApp } from './app.component';
import { ValidateMobileDirective } from '../directives/validate-mobile/validate-mobile';
import { PopuoDirective } from '../directives/popuo/popuo';
import { UtilsProvider } from '../providers/utils/utils';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { NativeServiceProvider } from '../providers/native-service/native-service';
import { HttpInterceptHeadleProvider } from '../providers/http-intercept-headle/http-intercept-headle';
import { HttpInterceptProvider } from '../providers/http-intercept/http-intercept';
import { ServiceInterfaceProvider } from '../providers/service-interface/service-interface';
import { CityPickerModule } from 'ionic2-city-picker';
import { HelpersProvider } from '../providers/helpers/helpers';

import { Network } from '@ionic-native/network';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { BackbuttonProvider } from '../providers/backbutton/backbutton';
import { File } from '@ionic-native/file';
import { AppUpdate } from '@ionic-native/app-update';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { MediaCapture, MediaFile } from '@ionic-native/media-capture';
import { VideoEditor } from '@ionic-native/video-editor';
import { Device } from '@ionic-native/device';
import { Keyboard } from '@ionic-native/keyboard';
import { Autostart } from '@ionic-native/autostart';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';


export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions, httpInterceptHandle: HttpInterceptHeadleProvider) {
  return new HttpInterceptProvider(backend, defaultOptions, httpInterceptHandle);
}

@NgModule({ 
  declarations: [
    MyApp, 
    PopuoDirective,
    ValidateMobileDirective,
    
  ],
  imports: [
    CityPickerModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: 'true',//所有子页面tabs隐藏
      backButtonText: '',
      iconMode: 'ios',
      mode: 'ios',
      cache: false,             //禁止应用缓存
      autoFocusassist: false,   //自动聚焦
      scrollAssist: false,      // 禁止智能滚动
      tabsHighlight: false,      //是否在选择该选项卡时显示高亮线。

       modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition',
      // 后面这两是应对手机键盘弹出时会把界面撑上去的问题
    }),
    JsonpModule,
    ReactiveFormsModule,



  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidPermissions,
    Camera,
    FileOpener,
    AppVersion,
    ImagePicker,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HttpServiceProvider,
    UtilsProvider,
    HttpInterceptHeadleProvider,
    HttpInterceptProvider,
    NativeServiceProvider,
    ServiceInterfaceProvider,
    HelpersProvider,
    Network,
    ThemeableBrowser,
    Contacts,
    BackbuttonProvider,
    File,
    FileTransfer,
    AppUpdate,
    InAppBrowser,
    MediaCapture,
    VideoEditor,
    AndroidPermissions ,
    Device,
    Keyboard,
    Autostart,
    OpenNativeSettings,
    
    

  
  
  ]
})
export class AppModule { }
