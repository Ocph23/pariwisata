import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-alert-config',
  templateUrl: './alert-config.component.html',
  styleUrls: ['./alert-config.component.scss']
})

export class AlertConfigComponent implements OnInit {
  alerts: Array<Alert>;
  private alertAutoClose = new Subject<Alert>();
  staticAlertClosed = false;

  constructor() {
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  create(data: Alert) {
    this.alerts.push(data);
  }

  ngOnInit() {
    this.alerts = new Array<Alert>();

    this.alertAutoClose.subscribe((message) =>
     this.create(message));
    this.alertAutoClose.pipe(
      debounceTime(5000)
    ).subscribe((x) =>
    this.alerts.splice(this.alerts.indexOf(x), 1));
  }

  successAotuClose(data: string) {
    const message = this.createMessage(data);
    message.type = 'success';
    this.alertAutoClose.next(message);
  }

  warningAotuClose(data: string) {
    const message = this.createMessage(data);
    message.type = 'warning';
    this.alertAutoClose.next(message);
  }

  errorAotuClose(data: string) {
    const message = this.createMessage(data);
    message.type =  'danger',
    this.alertAutoClose.next(message);
  }

  private createMessage(message: string): Alert {
    return  {message: message, isShow:true} as Alert;
  }

}

export interface Alert {
  type: string;
  message: string;
  title:string;
  text:string;
  isShow: boolean;
}
