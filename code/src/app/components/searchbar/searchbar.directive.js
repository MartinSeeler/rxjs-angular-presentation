import { SearchBarController } from './searchbar.controller';

export function SearchBarDirective() {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'app/components/searchbar/searchbar.html',
    scope: {
      creationDate: '='
    },
    controller: SearchBarController,
    controllerAs: 'searchBar',
    bindToController: true
  };
}
