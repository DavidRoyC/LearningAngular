import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpContext,
  HttpContextToken,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../common-services';
import { LoggerService } from 'src/lib/art-and-doc-core';

export type ModoCRUD = 'list' | 'add' | 'edit' | 'view' | 'delete';
export const AUTH_REQUIRED = new HttpContextToken<boolean>(() => false);

export abstract class RESTDAOService<T, K> {
  protected baseUrl = environment.apiURL;
  protected http: HttpClient = inject(HttpClient);
  constructor(entidad: string, protected option = {}) {
    this.baseUrl += entidad;
  }
  query(): Observable<Array<T>> {
    return this.http.get<Array<T>>(this.baseUrl, this.option);
  }
  get(id: K): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`, this.option);
  }
  add(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item, this.option);
  }
  change(id: K, item: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, item, this.option);
  }
  remove(id: K): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${id}`, this.option);
  }
}

@Injectable({
  providedIn: 'root',
})
export class ContactosDAOService extends RESTDAOService<any, any> {
  constructor() {
    super('contactos', { context: new HttpContext().set(AUTH_REQUIRED, true) });
  }
}

@Injectable({
  providedIn: 'root',
})
export class ContactosViewModelService {
  protected modo: ModoCRUD = 'list';
  protected listado: Array<any> = [];
  protected elemento: any = {};
  protected idOriginal: any = null;

  constructor(
    protected notify: NotificationService,
    protected out: LoggerService,
    protected dao: ContactosDAOService
  ) {}

  public get Modo(): ModoCRUD {
    return this.modo;
  }
  public get Listado(): Array<any> {
    return this.listado;
  }
  public get Elemento(): any {
    return this.elemento;
  }

  public list(): void {
    this.dao.query().subscribe({
      next: (data) => {
        this.listado = data;
        this.modo = 'list';
      },
      error: (err) => this.handleError(err),
    });
  }
  public add(): void {
    this.elemento = {};
    this.modo = 'add';
  }
  public edit(key: any): void {
    this.dao.get(key).subscribe({
      next: (data) => {
        this.elemento = data;
        this.idOriginal = key;
        this.modo = 'edit';
      },
      error: (err) => this.handleError(err),
    });
  }
  public view(key: any): void {
    this.dao.get(key).subscribe({
      next: (data) => {
        this.elemento = data;
        this.modo = 'view';
      },
      error: (err) => this.handleError(err),
    });
  }
  public delete(key: any): void {
    if (!window.confirm('¿Seguro?')) {
      return;
    }
    this.dao.remove(key).subscribe({
      next: (data) => this.list(),
      error: (err) => this.handleError(err),
    });
  }
  public clear(): void {
    this.listado = [];
  }
  public cancel(): void {
    this.elemento = {};
    this.idOriginal = null;
    this.list();
  }
  public send(): void {
    switch (this.modo) {
      case 'add':
        this.dao.add(this.elemento).subscribe({
          next: (data) => this.cancel(),
          error: (err) => this.handleError(err),
        });
        break;
      case 'edit':
        this.dao.change(this.idOriginal, this.elemento).subscribe({
          next: (data) => this.cancel(),
          error: (err) => this.handleError(err),
        });
        break;
      case 'view':
        this.cancel();
        break;
    }
  }

  private handleError(err: HttpErrorResponse) {
    let msg = '';
    switch (err.status) {
      case 0:
        msg = err.message;
        break;
      case 404:
        msg = `ERROR: ${err.status} ${err.statusText}`;
        break;
      default:
        msg = `ERROR: ${err.status} ${err.statusText}.${err.error['title'] ? `Detalles: ${err.error['title']}` : ''}`;
        break;
    }
    this.notify.add(msg);
  }
}
