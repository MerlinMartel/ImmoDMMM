/**
 * Created by Merlin on 2016-01-09.
 */
/// <reference path="../tsReferences/_references.ts" />

import {Component, Injectable} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';

@Component({
    providers: [HTTP_PROVIDERS]
})

@Injectable()
export class DepenseService {

    constructor(http: Http) {
        var restUrl = "https://mm3mm3.sharepoint.com/sites/immoDMMM/1821Bennett/_api/web/lists/getbytitle('Depenses')/items";
        this.http.get(restUrl)
            .map(res => res.text())
            .subscribe(
                data => this.randomQuote = data,
                err => this.logError(err),
                () => console.log('Random Quote Complete')
            );
    }

    getDepenses() {

    }
    getListItems() {
        var restUrl = "https://mm3mm3.sharepoint.com/sites/immoDMMM/1821Bennett/_api/web/lists/getbytitle('Depenses')/items";
        this.http.get(restUrl)
            .map(res => res.text())
            .subscribe(
                data => this.randomQuote = data,
                err => this.logError(err),
                () => console.log('Random Quote Complete')
            );
    }
    getListItemsFromWeb(web: string, listName: string, filter: string, select: string, expand: string, orderBy: string) {
        var restUrl = spRest.buildRestUrlWeb(web, "/web/lists/getbytitle('" + listName + "')/items", filter, select, expand, orderBy);
        $http(
            {
                url: restUrl,
                method: "GET",
                headers: { "Accept": "application/json; odata=verbose" }
            })
            .success( function (data) {
                // After successfully reading a List, save its Type obtained from the __metadata in an array (if not already done)
                // So that we will have it later, in case we need to do an Update operation (updateListItem)
                updateListsType(listName, data.d.results);
                d.resolve(data.d.results);
            })
            .error(function (data, status) {
                d.reject(status);
                $log.error("spList.getListItems error reading list: ", listName, " status=", status, "\nError message: ", data.error.message);
            });
        return d.promise;
    }

}