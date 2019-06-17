import { Injectable } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Platform } from 'ionic-angular';
import { Globals } from '../../providers/globals/globals';
@Injectable()
export class Func {

  userData = [];

  menuModal: any;

  public platformName: string = '';

  constructor(
    public ga: GoogleAnalytics,
    public globals: Globals,
    public platform: Platform
  ) {    
            
  }

  public googleAnalyticsTrack(text){
    if(this.platform.is('android')){
      this.platformName = 'android';
    }
    else if(this.platform.is('ios')){
      this.platformName = 'ios';
    }else{
      this.platformName = 'web';
    }
    
    this.ga.startTrackerWithId(this.globals.googleAnalyticsTrackingId).then(() => {
      this.ga.trackView(text+' - '+this.platformName);
      console.log('googleAnalyticsTrack:', text+' - '+this.platformName);
    }).catch((e) => {
      console.log('Error googleAnalyticsTrack:', e+', '+text+' - '+this.platformName);
    });
          
  }

}
