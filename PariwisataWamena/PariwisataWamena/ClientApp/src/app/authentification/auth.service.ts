import { Injectable, Inject } from '@angular/core';
import { User } from './login/login.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // tslint:disable-next-line: no-use-before-declare
  public storage: StorageHelper.LocalStorageWorker = new StorageHelper.LocalStorageWorker();
  private token: User;
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router
  ) { }

  login(username: string, password: string) {
    const user = { username: username, Password: password };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http
      .post<any>(this.baseUrl + 'account/authenticate', user, httpOptions);
  }

  public hasLogin() {
    if (this.storage.get('token') != null) {
      return true;
    } else {
      return false;
    }
  }

  public getToken(): string {
    const user = this.storage.getObject('user');
    const inrole = this.IsInRole('Admin');
    const token = user.token;
    if (token != null) {
      return token;
    } else {
      return null;
    }
  }


  public getHttpHeader() {
    try {
      const token = this.getToken();
      if (token) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token
          })
        };
        return httpOptions;
      } else { 
        throw new Error('You Not Have Access');
      }
    } catch (error) {
      throw new Error(error);
    }

  }



  public IsInRole(item: string): boolean {
    const user = this.storage.getObject('user');
    let found = false;
    if (user.roles != null) {
      user.roles.forEach(element => {
        if (element.name === item) {
          found = true;
        }
      });
    }
    return found;
  }
}

module StorageHelper {
  export interface IStorageItem {
    key: string;
    value: any;
  }

  export class StorageItem {
    key: string;
    value: any;

    constructor(data: IStorageItem) {
      this.key = data.key;
      this.value = data.value;
    }
  }

  // class for working with local storage in browser (common that can use other classes for store some data)
  export class LocalStorageWorker {
    localStorageSupported: boolean;

    constructor() {
      this.localStorageSupported =
        typeof window['localStorage'] !== 'undefined' &&
        window['localStorage'] != null;
    }

    // add value to storage
    add(key: string, item: string) {
      if (this.localStorageSupported) {
        localStorage.setItem(key, item);
      }
    }

    addObject(key: string, data: any) {
      const jsonData = JSON.stringify(data);
      if (this.localStorageSupported) {
        localStorage.setItem(key, jsonData);
      }
    }

    getObject(key: string) {
      const item = localStorage.getItem(key);
      return JSON.parse(item);
    }

    // get all values from storage (all items)
    getAllItems(): Array<StorageItem> {
      const list = new Array<StorageItem>();

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        list.push(
          new StorageItem({
            key: key,
            value: value
          })
        );
      }

      return list;
    }

    // get only all values from localStorage
    getAllValues(): Array<any> {
      const list = new Array<any>();

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        list.push(value);
      }

      return list;
    }

    // get one item by key from storage
    get(key: string): string {
      if (this.localStorageSupported) {
        const item = localStorage.getItem(key);
        return item;
      } else {
        return null;
      }
    }

    // remove value from storage
    remove(key: string) {
      if (this.localStorageSupported) {
        localStorage.removeItem(key);
      }
    }

    // clear storage (remove all items from it)
    clear() {
      if (this.localStorageSupported) {
        localStorage.clear();
      }
    }
  }

  // custom class for store emails in local storage
  export class EmailStorage {
    storageWorker: LocalStorageWorker;

    // main key that use for store list of emails
    storageKey: string;

    // list of emails
    addresses: Array<string>;

    constructor(storageKey: string) {
      this.storageWorker = new LocalStorageWorker();

      this.storageKey = storageKey;

      this.addresses = new Array<string>();

      this.activate();
    }

    // activate custom storage for emails
    activate() {
      // this.clear();

      this.loadAll();
    }

    // load all emails from storage to list for working with it
    loadAll() {
      const storageData = this.storageWorker.get(this.storageKey);

      if (storageData != null && storageData.length > 0) {
        const emails = JSON.parse(storageData);
        console.log(emails);
        if (emails != null) {
          this.addresses = emails;
        }
        console.log(this.addresses);
      }
    }

    // add new email (without duplicate)
    addEmail(email: string) {
      if (email.length > 0) {
        // 1. Split email addresses if needed (if we get list of emails)
        const mas = email.split(/,|;/g);
        // console.log(mas);

        // 2. Add each email in the splited list
        for (let i = 0; i < mas.length; i++) {
          // check if not exist and not add new (duplicate)
          const index = this.addresses.indexOf(mas[i].trim());
          if (index < 0) {
            this.addresses.push(mas[i].trim());
          }
        }

        console.log(this.addresses);

        // 3. save to storage
        this.save();
      }
    }

    // clear all data about emails
    clear() {
      // remove data by key from storage
      this.storageWorker.add(this.storageKey, '');

      // or remove with key
      // this.storageWorker.remove(this.storageKey);
    }

    // save to storage (save as JSON string)
    save() {
      const jsonEmails = JSON.stringify(this.addresses);
      this.storageWorker.add(this.storageKey, jsonEmails);
    }
  }
}
