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
 
         this.getSiteSettingsData().then(() =>
    
           //this.configoneSignal().then(() => 
             //this.getStorageUserData().then(() =>
               //this.setRootPage().then(() =>
                 this.hideSplashScreen()
              // )
             //)
          //)
         )
       }
     })    
 
    //set lang
    this.translateService.setDefaultLang('he');
    this.translateService.use('he');
    
     
     /********initial test********/
     //googleAnalytics
    /*this.func.googleAnalyticsTrack('App started');
     //get device detailes
     console.log('Device detailes: ' + this.device.manufacturer+" "+this.device.model+" "+this.device.platform
     +" "+this.device.version);
     //get app version
     this.appVersion.getVersionNumber().then((val) => {
     console.log("appVersion"+val);
    });*/
 
   }

   private getSiteSettingsData(){
    return new Promise(resolve => {

      console.log('111 getSiteSettingsData');
      //get settings page data
      this.serverApiRequest.getSiteSettingsData().subscribe(data => {
        if(data.error!=1){
          //add site settings to storage
          this.settings_data = data.settings_data;
          this.globals.siteSettings = data.settings_data;
          this.globals.jobsList = data.settings_data.jobsList;
          this.globals.secondHandList = data.settings_data.secondHandList;
          console.log(this.globals.siteSettings);
          this.storage.set('siteSettings', data.settings_data).then(() =>{
            resolve(data.settings_data);
          });      
        }else{
          console.log('ERROR getSiteSettingsData: ',data.err_desc);
        }
      });      
    });    
  }


  private configoneSignal(){
    return new Promise(resolve => {
      console.log('112 configoneSignal');
      if(this.platform.is('cordova')){        
        this.oneSignal.startInit('b4bd2a06-f33f-4e3c-8ca0-e6835295a432', '793548654523');
        this.oneSignal.addSubscriptionObserver().subscribe((state) => {console.log('addSubscriptionObserver: ',state)});
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
        this.oneSignal.handleNotificationReceived().subscribe((jsonData) => {
          console.log('oneSignal Received:', jsonData);
        });
        this.oneSignal.handleNotificationOpened().subscribe((jsonData) => {
          console.log('oneSignal Opened:', jsonData)
        });
        this.oneSignal.endInit();
        resolve(this.oneSignal);
      }else{
        console.log('WORNING configoneSignal: not cordova');
        resolve('WORNING');
      }
    });
  }


  private getStorageUserData(){
    return new Promise(resolve => {
      console.log('113 getStorageUserData');
      this.storage.get('user_data').then((userData) => {
        if(userData){
          console.log('4. userData:', userData);
          //get user data from server
          this.serverApiRequest.getUserData(userData['id']).subscribe((data)=>{
            if(data.user_data){
              this.user_data = data.user_data;
              console.log('app user_data:', this.user_data);

              this.storage.set('user_data', this.user_data).then(()=>{
                //update user device data
                this.updateRegisterdUserData().then(()=>{
                  let sendData = {
                    user_id: this.user_data['id'],
                    app_version: this.app_version,
                    app_device_type: this.app_device_type,
                    app_gcm_id: this.oneSignal_id     
                  }
                 
                  this.serverApiRequest.setUserData(sendData).subscribe(data => {
                    resolve(userData);
                  });  
                });
                //resolve(userData);
              });
            }            
            else{
              this.storage.set('rootPage','IntroPage').then(()=>{
                resolve('no user');
              });              
            }
          })
        }else{
          this.storage.set('rootPage','IntroPage').then(()=>{
            resolve('no user');
          });              
        }        
      }).catch(() =>{
        resolve('ERROR');
      })
    });
  }

  updateRegisterdUserData(){
      
    return new Promise(resolve => {
      console.log('114 updateRegisterdUserData');
      //get device
      if(this.platform.is('cordova')){
        this.app_device_type = this.device.platform+','+this.device.model+','+this.device.manufacturer;
      }else{
        this.app_device_type = 'Unknown browser';
      }

      if(this.platform.is('cordova')){
        
        this.appVersion.getVersionNumber().then((app_version)=>{
          this.app_version = app_version;
          //get oneSignal_id
          this.oneSignal.getIds().then((ids) => {      
            this.oneSignal_id = ids.userId;
            this.oneSignal.sendTag('user_type','client');  
            resolve('Done');
          }).catch(()=>{
            this.oneSignal_id = 'Unknown browser';        
            resolve('Done');
          });  
        }).catch(()=>{
          this.app_version = 'Unknown browser';
          this.oneSignal_id = 'Unknown browser';        
          resolve('Done');
        });    
      }else{
        this.app_version = 'Unknown browser';
        this.oneSignal_id = 'Unknown browser';        
        resolve('Done');
      }

    });
  }

  private setRootPage(){
    return new Promise(resolve => {
      console.log('115 setRootPage');
      this.storage.get('rootPage').then((rootPage) => {

        console.log('this.rootPage: ',rootPage);
        
        if(rootPage){
            this.rootPage = rootPage;
          resolve(rootPage);
        }else{
          this.storage.set('rootPage','IntroPage').then(()=>{
            this.rootPage = 'IntroPage';
            /*this.storage.set('rootPage','HomePage').then(()=>{
              this.rootPage = 'HomePage';*/
            resolve(rootPage);
          });
        } 
        
      });        
      
    });
  }

  private hideSplashScreen(){
    return new Promise(resolve => {
      console.log('116 hideSplashScreen');
      this.statusBar.styleDefault();
      this.splashScreen.hide();  

      setTimeout(() => {
        this.appLoaded = "app-did-load";
      }, 2000);            

      resolve('this.splashScreen');
    });
  }


}
