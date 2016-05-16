import { SearchbarController } from './searchbar.controller';

export function SearchbarDirective() {
  'ngInject';

  return {
    restrict: 'E',
    templateUrl: 'app/components/searchbar/searchbar.html',
    scope: {
      creationDate: '='
    },
    controller: SearchbarController,
    controllerAs: 'searchbar',
    bindToController: true
  };
}
