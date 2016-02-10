/**
 * Created by Merlin on 2016-01-09.
 */
import {bootstrap}    from '../node_modules/angular2/platform/browser'
import {DepenseListComponent} from 'https://mm3mm3.sharepoint.com/sites/immoDMMM/1821Bennett/code/depensenew/depense-list.component.js'
import {HTTP_PROVIDERS} from '../node_modules/angular2/http.js';
import {DepenseService} from "https://mm3mm3.sharepoint.com/sites/immoDMMM/1821Bennett/code/depensenew/depense.service.js";

bootstrap(DepenseListComponent, [... HTTP_PROVIDERS]);