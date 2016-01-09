/**
 * Created by Merlin on 2016-01-09.
 */
/// <reference path="../tsReferences/_references.ts" />
import {Component, OnInit} from 'angular2/core';
import {DepenseService} from "./depense.service.js";
import {Depense} from "./depense.js";


@Component({
    selector: 'depense-list-app',
    template:`
        <h2>Ma liste de dépense</h2>
        <div class="depenseList">
          <div *ngFor="#depense of depenses" >
            {{depense.title}}
          </div>
        </div>
        `,
    styles:[`

    `],
    providers: [DepenseService]
})

export class DepenseListComponent implements OnInit {
    public depenses : Depense[];


    constructor(private _depenseService: DepenseService) { }

    getDepenses() {
        this._depenseService.getDepenses().then(depenses => this.depenses = depenses);
        //function(heroes){this.heroes = heroes}
        //équivalent de la flèche =>
    }

    ngOnInit() {
        this.getDepenses();
    }
}