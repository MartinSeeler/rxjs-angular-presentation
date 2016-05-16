export function SearchResultsController($log, $scope, WikipediaService) {
  'ngInject';

  const vm = this;

  vm.results = [];

  activate();

  function activate() {

    $log.info('SearchResultsController created');

    const resultsSubscription = WikipediaService.searchResults.subscribe(newResults => {
      $log.info('results', newResults);
      $scope.$applyAsync(() => vm.results = newResults);
    });

    $scope.$on('$destroy', () => {
      resultsSubscription.dispose();
      $log.info('SearchResultsController destroyed');
    })
  }
}
