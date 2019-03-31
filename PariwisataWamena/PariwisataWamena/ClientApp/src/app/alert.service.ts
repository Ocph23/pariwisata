import { Injectable } from '@angular/core';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import swal, { SweetAlertType } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})


export class AlertService {
  private title = 'info';
  private  message: string;
  private  type: SweetAlertType;
  private swal: SwalComponent;
  constructor() { }

  setSwal(swal: SwalComponent) {
    this.swal = swal;
  }


  success(title, message) {
    (!title ? this.setTitle(Kind.success) : this.title = title);
    this.swal.type = 'success';
    this.message = message;
     this.show();
  }


  info(title, message) {
    (!title ? this.setTitle(Kind.info) : this.title = title);
    this.swal.type = 'info';
    this.message = message;
    this.show();
  }


  warning(title, message) {
    (!title ? this.setTitle(Kind.warning) : this.title = title);
    this.swal.type = 'warning';
    this.message = message;
    this.show();
  }



  error(title: string, message: string) {
    (!title ? this.setTitle(Kind.error) : this.title = title);
    this.swal.type = 'error';
    this.message = message;
    this.show();
  }




  question(title, message) {
    (!title ? this.setTitle(Kind.question) : this.title = title);
    this.swal.type = 'question';
    this.message = message;
    this.show();
  }


  private show() {
    this.swal.text = this.message;
    this.swal.title = this.title;
    this.swal.show();
  }


  private setTitle(type: Kind) {
    switch (type) {
      case Kind.success:
        this.title = 'Success';
        break;
      case Kind.error:
        this.title = 'Error';
        break;
      case Kind.warning:
        this.title = 'Warning';
        break;
      case Kind.question:
        this.title = 'Question';
        break;
      default:
        this.title = 'Info';
    }
  }

}


enum Kind {
  success,
  warning,
  error,
  info,
  question
}


