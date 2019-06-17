import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ServerApiRequest } from '../server-api-request/server-api-request';

@Injectable()
export class EmailValidator {
 
  debouncer: any;
 
  constructor(public serverApiRequest: ServerApiRequest){
 
  }
 
  checkEmail(control: FormControl): any {
 
    clearTimeout(this.debouncer);
 
    return new Promise(resolve => {
 
      this.debouncer = setTimeout(() => {
 
        this.serverApiRequest.getEmailExsist(control.value).subscribe((res) => {
          if(res.email_exsist==0){
            resolve(null);
          }else{
            resolve({'emailInUse': true});  
          }
        }, (err) => {
          resolve({'emailInUse': true});
        });
 
      }, 1000);     
 
    });
  }
 
}