/**
 * Electronic Asset Management APIs
 * We manage and organize inventory of all purchased electronic assets
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: luluyshaban@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import {Inject, Injectable, Optional} from '@angular/core';
import {
  HttpClient,
  HttpContext,
  HttpEvent,
  HttpHeaders,
  HttpParameterCodec,
  HttpParams,
  HttpResponse
} from '@angular/common/http';
import {CustomHttpParameterCodec} from '../encoder';
import {Observable} from 'rxjs';

// @ts-ignore
import {HealthCheckResponse} from '../model/healthCheckResponse';

// @ts-ignore
import {BASE_PATH, COLLECTION_FORMATS} from '../variables';
import {Configuration} from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class MicroProfileHealthService {

  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();
  public encoder: HttpParameterCodec;
  protected basePath = 'http://localhost:8802';

  constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string | string[], @Optional() configuration: Configuration) {
    if (configuration) {
      this.configuration = configuration;
    }
    if (typeof this.configuration.basePath !== 'string') {
      if (Array.isArray(basePath) && basePath.length > 0) {
        basePath = basePath[0];
      }

      if (typeof basePath !== 'string') {
        basePath = this.basePath;
      }
      this.configuration.basePath = basePath;
    }
    this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
  }

  /**
   * The Liveness check of this application
   * Check the liveness of the application
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public microprofileHealthLiveness(observe?: 'body', reportProgress?: boolean, options?: {
    httpHeaderAccept?: 'application/json',
    context?: HttpContext
  }): Observable<HealthCheckResponse>;

  public microprofileHealthLiveness(observe?: 'response', reportProgress?: boolean, options?: {
    httpHeaderAccept?: 'application/json',
    context?: HttpContext
  }): Observable<HttpResponse<HealthCheckResponse>>;

  public microprofileHealthLiveness(observe?: 'events', reportProgress?: boolean, options?: {
    httpHeaderAccept?: 'application/json',
    context?: HttpContext
  }): Observable<HttpEvent<HealthCheckResponse>>;

  public microprofileHealthLiveness(observe: any = 'body', reportProgress: boolean = false, options?: {
    httpHeaderAccept?: 'application/json',
    context?: HttpContext
  }): Observable<any> {

    let localVarHeaders = this.defaultHeaders;

    let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [
        'application/json'
      ];
      localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== undefined) {
      localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
    }

    let localVarHttpContext: HttpContext | undefined = options && options.context;
    if (localVarHttpContext === undefined) {
      localVarHttpContext = new HttpContext();
    }


    let responseType_: 'text' | 'json' | 'blob' = 'json';
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
        responseType_ = 'text';
      } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
        responseType_ = 'json';
      } else {
        responseType_ = 'blob';
      }
    }

    let localVarPath = `/rest/q/health/live`;
    return this.httpClient.request<HealthCheckResponse>('get', `${this.configuration.basePath}${localVarPath}`,
      {
        context: localVarHttpContext,
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: localVarHeaders,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * The Readiness check of this application
   * Check the readiness of the application
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public microprofileHealthReadiness(observe?: 'body', reportProgress?: boolean, options?: {
    httpHeaderAccept?: 'application/json',
    context?: HttpContext
  }): Observable<HealthCheckResponse>;

  public microprofileHealthReadiness(observe?: 'response', reportProgress?: boolean, options?: {
    httpHeaderAccept?: 'application/json',
    context?: HttpContext
  }): Observable<HttpResponse<HealthCheckResponse>>;

  public microprofileHealthReadiness(observe?: 'events', reportProgress?: boolean, options?: {
    httpHeaderAccept?: 'application/json',
    context?: HttpContext
  }): Observable<HttpEvent<HealthCheckResponse>>;

  public microprofileHealthReadiness(observe: any = 'body', reportProgress: boolean = false, options?: {
    httpHeaderAccept?: 'application/json',
    context?: HttpContext
  }): Observable<any> {

    let localVarHeaders = this.defaultHeaders;

    let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [
        'application/json'
      ];
      localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== undefined) {
      localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
    }

    let localVarHttpContext: HttpContext | undefined = options && options.context;
    if (localVarHttpContext === undefined) {
      localVarHttpContext = new HttpContext();
    }


    let responseType_: 'text' | 'json' | 'blob' = 'json';
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
        responseType_ = 'text';
      } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
        responseType_ = 'json';
      } else {
        responseType_ = 'blob';
      }
    }

    let localVarPath = `/rest/q/health/ready`;
    return this.httpClient.request<HealthCheckResponse>('get', `${this.configuration.basePath}${localVarPath}`,
      {
        context: localVarHttpContext,
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: localVarHeaders,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * An aggregated view of the Liveness, Readiness and Startup of this application
   * Check the health of the application
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public microprofileHealthRoot(observe?: 'body', reportProgress?: boolean, options?: {
    httpHeaderAccept?: 'application/json',
    context?: HttpContext
  }): Observable<HealthCheckResponse>;

  public microprofileHealthRoot(observe?: 'response', reportProgress?: boolean, options?: {
    httpHeaderAccept?: 'application/json',
    context?: HttpContext
  }): Observable<HttpResponse<HealthCheckResponse>>;

  public microprofileHealthRoot(observe?: 'events', reportProgress?: boolean, options?: {
    httpHeaderAccept?: 'application/json',
    context?: HttpContext
  }): Observable<HttpEvent<HealthCheckResponse>>;

  public microprofileHealthRoot(observe: any = 'body', reportProgress: boolean = false, options?: {
    httpHeaderAccept?: 'application/json',
    context?: HttpContext
  }): Observable<any> {

    let localVarHeaders = this.defaultHeaders;

    let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [
        'application/json'
      ];
      localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== undefined) {
      localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
    }

    let localVarHttpContext: HttpContext | undefined = options && options.context;
    if (localVarHttpContext === undefined) {
      localVarHttpContext = new HttpContext();
    }


    let responseType_: 'text' | 'json' | 'blob' = 'json';
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
        responseType_ = 'text';
      } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
        responseType_ = 'json';
      } else {
        responseType_ = 'blob';
      }
    }

    let localVarPath = `/rest/q/health`;
    return this.httpClient.request<HealthCheckResponse>('get', `${this.configuration.basePath}${localVarPath}`,
      {
        context: localVarHttpContext,
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: localVarHeaders,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * The Startup check of this application
   * Check the startup of the application
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public microprofileHealthStartup(observe?: 'body', reportProgress?: boolean, options?: {
    httpHeaderAccept?: 'application/json',
    context?: HttpContext
  }): Observable<HealthCheckResponse>;

  public microprofileHealthStartup(observe?: 'response', reportProgress?: boolean, options?: {
    httpHeaderAccept?: 'application/json',
    context?: HttpContext
  }): Observable<HttpResponse<HealthCheckResponse>>;

  public microprofileHealthStartup(observe?: 'events', reportProgress?: boolean, options?: {
    httpHeaderAccept?: 'application/json',
    context?: HttpContext
  }): Observable<HttpEvent<HealthCheckResponse>>;

  public microprofileHealthStartup(observe: any = 'body', reportProgress: boolean = false, options?: {
    httpHeaderAccept?: 'application/json',
    context?: HttpContext
  }): Observable<any> {

    let localVarHeaders = this.defaultHeaders;

    let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (localVarHttpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [
        'application/json'
      ];
      localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (localVarHttpHeaderAcceptSelected !== undefined) {
      localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
    }

    let localVarHttpContext: HttpContext | undefined = options && options.context;
    if (localVarHttpContext === undefined) {
      localVarHttpContext = new HttpContext();
    }


    let responseType_: 'text' | 'json' | 'blob' = 'json';
    if (localVarHttpHeaderAcceptSelected) {
      if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
        responseType_ = 'text';
      } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
        responseType_ = 'json';
      } else {
        responseType_ = 'blob';
      }
    }

    let localVarPath = `/rest/q/health/started`;
    return this.httpClient.request<HealthCheckResponse>('get', `${this.configuration.basePath}${localVarPath}`,
      {
        context: localVarHttpContext,
        responseType: <any>responseType_,
        withCredentials: this.configuration.withCredentials,
        headers: localVarHeaders,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  // @ts-ignore
  private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
    if (typeof value === "object" && value instanceof Date === false) {
      httpParams = this.addToHttpParamsRecursive(httpParams, value);
    } else {
      httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
    }
    return httpParams;
  }

  private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
    if (value == null) {
      return httpParams;
    }

    if (typeof value === "object") {
      if (Array.isArray(value)) {
        (value as any[]).forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
      } else if (value instanceof Date) {
        if (key != null) {
          httpParams = httpParams.append(key, (value as Date).toISOString().substr(0, 10));
        } else {
          throw Error("key may not be null if value is Date");
        }
      } else {
        Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(
          httpParams, value[k], key != null ? `${key}.${k}` : k));
      }
    } else if (key != null) {
      httpParams = httpParams.append(key, value);
    } else {
      throw Error("key may not be null if value is not object or array");
    }
    return httpParams;
  }

}
