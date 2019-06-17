import { Component ,ViewChild} from '@angular/core';
import { Nav, Platform ,Toast, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen'; 
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { Func } from '../providers/func/func';
import { ServerApiRequest } from '../providers/server-api-request/server-api-request';
import { Globals } from '../providers/globals/globals';
import { OneSignal } from '@ionic-native/onesignal';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';


import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = TabsPage;

  
 // rootPage: any;

  pages: Array<{title: string, component: any, typePage: string, icon:string}>;

  networkToast: Toast;
  appLoaded: string = '';
  settings_data = [];
  user_data = [];
  oneSignal_id: any;
  app_version: any;
  app_device_type: any;
  translate: any;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public func: Func,
              public oneSignal :OneSignal,
              public network: Network,
              public device :Device,
              public appVersion: AppVersion,
              public toastCtrl :ToastController,
              public serverApiRequest: ServerApiRequest,
              public storage: Storage,
              public translateService: TranslateService,
              public globals: Globals) {
    this.initializeApp();
    translateService.get([
      'start_your_readings',
      'readings_history',
      'my_profile',
      'terms_ampersand_conditions',
      'contact_us',
      'log_out'
    ]).subscribe(translations => {
      this.translate = translations;
      this.pages = [
        { title: this.translate['update_user_data'], component: 'ReadingPage', typePage:'', icon:'arrow-dropright-circle'},
        { title: this.translate['terms_of_use'], component: 'PreviousReadingsPage', typePage:'', icon:'timer'} ,
        { title: this.translate['second_hand'], component: 'ProfilePage' , typePage:'', icon:'contact'},
        { title: this.translate['contact'], component: 'ContactPage' , typePage:'', icon:'mail'},
        { title: this.translate['log_off'], component: 'TermsPage',typePage:'TermsPage', icon:'paper'},
        { title: this.translate['log_out'], component: 'IntroPage', typePage:'', icon:'log-out'}
      ];
    });
  }


   initializeApp() {

     this.platform.ready().then(() => {
 
       //on reconnect
       this.network.onConnect().subscribe(() => {
         try {
           this.networkToast.dismiss();
           window.location.reload();
         } catch(e) {
 
         }
       });      
 
       //if no internet
       if (this.network.type == 'none' ){
         try {
           this.networkToast.dismiss();
         } catch(e) {
 
         }     
         this.networkToast = this.toastCtrl.create({
           message: this.translate['no_internet_connection'],
           position: 'top',
           showCloseButton: true,
           closeButtonText: this.translate['close'],
           cssClass: "network-toast" 
         });
         
         this.networkToast.present();      
       }
       //if has internet
       else{
         // watch network for a disconnect
         this.network.onDisconnect().subscribe(() => {
           try {
             this.networkToast.dismiss();
           } catch(e) {
 
           }    
 
           this.networkToast = this.toastCtrl.create({
            message: this.translate['no_internet_connection'],
            position: 'top',
            showCloseButton: true,
            closeButtonText: this.translate['close'],
            cssClass: "network-toast" 
          });
           
           this.networkToast.present();      
         });    
 
 
         this.func.googleAnalyticsTrack('App started');
 
        /* this.getSiteSettingsData().then(() =>
           this.configoneSignal().then(() => 
             this.getStorageUserData().then(() =>
               this.setRootPage().then(() =>
                 this.hideSplashScreen()
               )
             )
           )
         )*/
       }
     })    
 
    //set lang
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
    
     
     /********initial test********/
     //googleAnalytics
    /* this.func.googleAnalyticsTrack('App started');
     if(this.platform.is('cordova')){          
       //onesignal
       this.configoneSignal();
     }
     //network
     this.checkNetwork();
     //get device detailes
     console.log('Device detailes: ' + this.device.manufacturer+" "+this.device.model+" "+this.device.platform
     +" "+this.device.version);
     //get app version
     this.appVersion.getVersionNumber().then((val) => {
     console.log(val);
    });*/
 
   }



}
