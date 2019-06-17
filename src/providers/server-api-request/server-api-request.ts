import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

/* providers */
import { Globals } from '../globals/globals';

declare var cordova: any;

@Injectable()
export class ServerApiRequest {

  lastImage: string = null;
  constructor(public http: Http, private globals: Globals) {
    
  }

  getEmailExsist(email){
    return this.http.get(this.globals.apiUrl+"?method=getEmailExsist&email="+email)    
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError)
  }

  getSiteSettingsData(){
    return this.http.get(this.globals.apiUrl+"?method=getSiteSettingsData&lang_id="+this.globals.lang_id)    
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError)
  }

  getUserData(user_id){
    return this.http.get(this.globals.apiUrl+"?method=getUserData"+
      "&user_id="+user_id)
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError)        
  }

  setUserData(userData){
    let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		});
		let options = new RequestOptions({
			headers: headers
    });

    let body = "method=setUserData&userData="+JSON.stringify(userData);
              
    return this.http.post(this.globals.apiUrl, body, options)
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError);

  }

  chekLogin(userData){
    let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		});
		let options = new RequestOptions({
			headers: headers
    });

    let body = "method=chekLogin&userData="+JSON.stringify(userData);
              
    return this.http.post(this.globals.apiUrl, body, options)
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError);

  }
  
  updateUserData(userData){
    let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		});
		let options = new RequestOptions({
			headers: headers
    });

    let body = "method=updateUserData&userData="+JSON.stringify(userData);
              
    return this.http.post(this.globals.apiUrl, body, options)
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError);

  }

  forgotPassword(email){
    return this.http.get(this.globals.apiUrl+"?method=sendForgotPassword&email="+email)    
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError)
  }

  getPreviousReadingsPageing(data){
    return this.http.get(this.globals.apiUrl+"?method=getPreviousReadingsPageing"+"&user_id="+data.user_id+
                                              "&pages_limit="+data.pages_limit+
                                              "&pages_offset="+data.pages_offset
    )      
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError)        
  }
  
  setRegisterClient(userData){
    let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		});
		let options = new RequestOptions({
			headers: headers
    });

    let body = "method=setRegisterClient&userData="+JSON.stringify(userData);
              
    return this.http.post(this.globals.apiUrl, body, options)
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError);
  }
 
  setRegisterUser(userData){
    console.log('setRegisterUser: ', userData);
    let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		});
		let options = new RequestOptions({
			headers: headers
    });

    let body = "method=setRegisterUser&userData="+JSON.stringify(userData);
              
    return this.http.post(this.globals.apiUrl, body, options)
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError);
  }

  contactForm(userData){
    console.log('setRegisterUser: ', userData);
    let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		});
		let options = new RequestOptions({
			headers: headers
    });

    let body = "method=contactForm&userData="+JSON.stringify(userData);
              
    return this.http.post(this.globals.apiUrl, body, options)
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError);
  }
  setClientData(data){
    let browser = data.browser || '';
    let user_id = data.user_id || '';
    let app_gcm_id = data.app_gcm_id || '';
    let app_device_type = data.app_device_type || '';
    let app_version = data.app_version || '';    
    let lat = data.lat || '';    
    let lng = data.lng || '';    
    return this.http.get(this.globals.apiUrl+"?method=setClientData"+
      "&browser="+browser+
      "&user_id="+user_id+
      "&app_gcm_id="+app_gcm_id+
      "&app_device_type="+app_device_type+
      "&app_version="+app_version+
      "&lat="+lat+
      "&lng="+lng
    )      
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError)    
  }
  setSigninUser(userData){
    console.log('setRegisterUser: ', userData);
    let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		});
		let options = new RequestOptions({
			headers: headers
    });

    let body = "method=setSigninUser&userData="+JSON.stringify(userData);
              
    return this.http.post(this.globals.apiUrl, body, options)
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError);
  }

  getRegisterUser(userData){
    console.log('getRegisterUser: ', userData);
    let headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		});
		let options = new RequestOptions({
			headers: headers
    });

    let body = "method=getRegisterUser&userData="+JSON.stringify(userData);
              
    return this.http.post(this.globals.apiUrl, body, options)
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError);
  }
  

  getSigninCheck(email, password){
    return this.http.get(this.globals.apiUrl+"?method=getSigninCheck"+
      "&email="+email+
      "&password="+password
    )      
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError)        
  }

  getForgotEmailExsist(email){
    return this.http.get(this.globals.apiUrl+"?method=getForgotEmailExsist&email="+this.globals.lang_id)    
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError)    
  }

  sendForgotPasswordCode(email){
    return this.http.get(this.globals.apiUrl+"?method=sendForgotPasswordCode"+
      "&email="+email+
      "&lang_id="+this.globals.lang_id
    )    
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError)        
  }


  getForgotCodeCheck(code,email){
    return this.http.get(this.globals.apiUrl+"?method=getForgotCodeCheck"+
      "&email="+email+
      "&code="+code
    )    
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError)        
  }


  setUserPassword(email, password){
    return this.http.get(this.globals.apiUrl+"?method=setUserPassword"+
      "&email="+email+
      "&password="+password
    )    
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError)            
  }

  setProfileNameEmail(data){
    let full_name = data.full_name || "";
    let phone = data.phone || "";    
    let user_id = data.user_id || "";        
    return this.http.get(this.globals.apiUrl+"?method=setProfileNameEmail"+
      "&user_id="+user_id+
      "&full_name="+full_name+
      "&phone="+phone
    )    
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError)          
  }

  setPushOpen(row_id){
    return this.http.get(this.globals.apiUrl+"?method=setPushOpen"+
      "&row_id="+row_id
    )    
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError)      
  }

  setUserLogoff(user_id){
    return this.http.get(this.globals.apiUrl+"?method=setUserLogoff"+
      "&user_id="+user_id
    )    
    .map(this.extrectData)
    .do(this.logResponse)
    .catch(this.catchError)          
  }



  private catchError(error: Response | any){
    return Observable.throw(error.json().error || 'Server error');
  }

  private logResponse(res: Response){
  }

  private extrectData(res: Response){
    return res.json();
  }

  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  
}
