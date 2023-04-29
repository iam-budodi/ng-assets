/**
 * Electronic Asset Inventory API
 * We keep and organize inventory of all purchased electronic assets
 *
 * OpenAPI spec version: 1.0.0
 * Contact: luluyshaban@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { Asset } from '../model/asset';
import { LocalDate } from '../model/localDate';
import { Purchase } from '../model/purchase';
import { PurchasePerSupplier } from '../model/purchasePerSupplier';
import { SelectOptions } from '../model/selectOptions';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class PurchaseEndpointService {

    protected basePath = 'http://localhost:8802';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Counts all purchases per each supplier in the database
     *
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public restPurchasesCountGet(observe?: 'body', reportProgress?: boolean): Observable<Array<PurchasePerSupplier>>;
    public restPurchasesCountGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<PurchasePerSupplier>>>;
    public restPurchasesCountGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<PurchasePerSupplier>>>;
    public restPurchasesCountGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<PurchasePerSupplier>>('get',`${this.basePath}/rest/purchases/count`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Retrieves all available purchases from the database
     *
     * @param date Search date
     * @param order Order direction
     * @param page Page index
     * @param prop Order property
     * @param search Search string
     * @param size Page size
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public restPurchasesGet(date?: LocalDate, order?: string, page?: number, prop?: string, search?: string, size?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Purchase>>>;
    public restPurchasesGet(date?: LocalDate, order?: string, page?: number, prop?: string, search?: string, size?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Purchase>>;
    public restPurchasesGet(date?: LocalDate, order?: string, page?: number, prop?: string, search?: string, size?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Purchase>>>;
    public restPurchasesGet(date?: LocalDate, order?: string, page?: number, prop?: string, search?: string, size?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {







        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (date !== undefined && date !== null) {
            queryParameters = queryParameters.set('date', <any>date);
        }
        if (order !== undefined && order !== null) {
            queryParameters = queryParameters.set('order', <any>order);
        }
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (prop !== undefined && prop !== null) {
            queryParameters = queryParameters.set('prop', <any>prop);
        }
        if (search !== undefined && search !== null) {
            queryParameters = queryParameters.set('search', <any>search);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', <any>size);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<Purchase>>('get',`${this.basePath}/rest/purchases`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Deletes an existing purchase record
     *
     * @param id Purchase record identifier
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public restPurchasesIdDelete(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public restPurchasesIdDelete(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public restPurchasesIdDelete(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public restPurchasesIdDelete(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling restPurchasesIdDelete.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<any>('delete',`${this.basePath}/rest/purchases/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Returns the purchase record for a given identifier
     *
     * @param id Purchase identifier
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public restPurchasesIdGet(id: number, observe?: 'body', reportProgress?: boolean): Observable<Purchase>;
    public restPurchasesIdGet(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Purchase>>;
    public restPurchasesIdGet(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Purchase>>;
    public restPurchasesIdGet(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling restPurchasesIdGet.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Purchase>('get',`${this.basePath}/rest/purchases/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Updates an existing purchase record
     *
     * @param body
     * @param id Purchase record identifier
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public restPurchasesIdPut(body: Purchase, id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public restPurchasesIdPut(body: Purchase, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public restPurchasesIdPut(body: Purchase, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public restPurchasesIdPut(body: Purchase, id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling restPurchasesIdPut.');
        }

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling restPurchasesIdPut.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<any>('put',`${this.basePath}/rest/purchases/${encodeURIComponent(String(id))}`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Retrieves all available assets for particular purchase from the database
     *
     * @param invoice Invoice for particular purchase record
     * @param page Page index
     * @param size Page size
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public restPurchasesInvoiceAssetsGet(invoice: string, page?: number, size?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Asset>>;
    public restPurchasesInvoiceAssetsGet(invoice: string, page?: number, size?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Asset>>>;
    public restPurchasesInvoiceAssetsGet(invoice: string, page?: number, size?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Asset>>>;
    public restPurchasesInvoiceAssetsGet(invoice: string, page?: number, size?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (invoice === null || invoice === undefined) {
            throw new Error('Required parameter invoice was null or undefined when calling restPurchasesInvoiceAssetsGet.');
        }



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }
        if (size !== undefined && size !== null) {
            queryParameters = queryParameters.set('size', <any>size);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<Asset>>('get',`${this.basePath}/rest/purchases/${encodeURIComponent(String(invoice))}/assets`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Creates a valid purchase record and stores it into the database
     *
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public restPurchasesPost(body: Purchase, observe?: 'body', reportProgress?: boolean): Observable<string>;
    public restPurchasesPost(body: Purchase, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public restPurchasesPost(body: Purchase, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public restPurchasesPost(body: Purchase, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling restPurchasesPost.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.request<string>('post',`${this.basePath}/rest/purchases`,
            {
                body: body,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Fetch only purchase ID and name for all purchases available to be used for client side selection options
     *
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public restPurchasesSelectGet(observe?: 'body', reportProgress?: boolean): Observable<Array<SelectOptions>>;
    public restPurchasesSelectGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<SelectOptions>>>;
    public restPurchasesSelectGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<SelectOptions>>>;
    public restPurchasesSelectGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<Array<SelectOptions>>('get',`${this.basePath}/rest/purchases/select`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
