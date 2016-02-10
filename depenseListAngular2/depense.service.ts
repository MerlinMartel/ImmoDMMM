/**
 * Created by Merlin on 2016-01-09.
 */
/// <reference path="../tsReferences/_references.ts" />

import {Component, Injectable} from '../node_modules/angular2/core';
import {Http, HTTP_PROVIDERS} from '../node_modules/angular2/http';

@Component({
    providers: [HTTP_PROVIDERS]
})

@Injectable()
export class DepenseService {
    constructor(http: Http) {
        /*
        var restUrl = "https://mm3mm3.sharepoint.com/sites/immoDMMM/1821Bennett/_api/web/lists/getbytitle('Depenses')/items";
        http.get(restUrl)
            //.map(res => res)
            .subscribe(
                data => this.d.results = data,
                //err => logError(err),
                () => console.log('yo... je fais des tests')
            );
         */
    }

    getDepenses() {

    }
    getListItems() {
        var restUrl = "https://mm3mm3.sharepoint.com/sites/immoDMMM/1821Bennett/_api/web/lists/getbytitle('Depenses')/items";
        http.get(restUrl)
            //.map(res => res)
            .subscribe(
                data => this.d.results = data,
                //err => logError(err),
                () => console.log('yo... je fais des tests')
            );
    }

    ngOnInit() {
        var items = this.getListItems();
        console.log(items);
    }
}