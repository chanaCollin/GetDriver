import { Injectable } from '@angular/core';


@Injectable()
export class Globals {
  public lang_id: number = 2;
  public lang_dir_class: string = 'direction-rtl';
  public siteUrl: string = "https://yeshnahag.shtibel.com";
  public apiUrl: string  = "https://yeshnahag.shtibel.com/ki-api";
  
  public googleAnalyticsTrackingId: string = 'UA-121805273-1';

  public siteSettings = [];
  public doctorList = [];
  public medicationList = [];
  public BrandList = [];
  public takeDrugTypeList = [];
  public sicknessList = [];
  public titlesList = [];
  

  constructor() {
    
  }

}
