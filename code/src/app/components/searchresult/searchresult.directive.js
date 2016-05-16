import { SearchResultController } from './searchresult.controller';

export function SearchResultDirective() {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'app/components/searchresult/searchresult.html',
    scope: {
      result: '='
    },
    controller: SearchResultController,
    controllerAs: 'searchResult',
    bindToController: true
  };

}
