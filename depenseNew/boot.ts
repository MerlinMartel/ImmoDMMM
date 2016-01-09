/**
 * Created by Merlin on 2016-01-09.
 */
import {bootstrap}    from 'angular2/platform/browser'
import {DepenseListComponent} from './depense-list.component.js'
import {HTTP_PROVIDERS} from 'angular2/http';

bootstrap(DepenseListComponent, [... HTTP_PROVIDERS]);