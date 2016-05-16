import { SearchResultsController } from './searchresults.controller';

export function SearchResultsDirective() {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'app/components/searchresults/searchresults.html',
    scope: true,
    controller: SearchResultsController,
    controllerAs: 'searchResults',
    bindToController: true
  };

}
