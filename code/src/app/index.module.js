/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { SearchbarDirective } from '../app/components/searchbar/searchbar.directive';
import { SearchbarController } from '../app/components/searchbar/searchbar.controller';
import { SearchResultsController } from '../app/components/searchresults/searchresults.controller';
import { SearchResultsDirective } from '../app/components/searchresults/searchresults.directive';
import { SearchResultController } from '../app/components/searchresult/searchresult.controller';
import { SearchResultDirective } from '../app/components/searchresult/searchresult.directive';
import { WikipediaService } from '../app/components/wikipedia/wikipedia.service';

angular.module('code', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ui.bootstrap', 'toastr'])
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('WikipediaService', WikipediaService)
  .controller('MainController', MainController)
  .controller('SearchbarController', SearchbarController)
  .controller('SearchResultsController', SearchResultsController)
  .directive('searchResults', SearchResultsDirective)
  .controller('SearchResultController', SearchResultController)
  .directive('searchResult', SearchResultDirective)
  .directive('searchbar', SearchbarDirective)
;
