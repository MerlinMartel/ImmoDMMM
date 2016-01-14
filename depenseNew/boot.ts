/**
 * Created by Merlin on 2016-01-09.
 */
import {bootstrap}    from 'angular2/platform/browser'
import {DepenseListComponent} from './depense-list.component.js'
import {HTTP_PROVIDERS} from '../node_modules/angular2/http.js';
import {DepenseService} from "./depense.service.js";

bootstrap(DepenseListComponent, [... HTTP_PROVIDERS], [DepenseService]);