/**
 * Created by Merlin on 2016-01-09.
 */
/// <reference path="../tsReferences/_references.ts" />

import {HEROES} from './mock-heroes.js';
import {Injectable} from 'angular2/core';

@Injectable()
export class HeroService {
    getHeroes() {
        return Promise.resolve(HEROES);
    }
    getHeroesSlowly() {
        return new Promise<Hero[]>(resolve =>
            setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
        );
    }
}