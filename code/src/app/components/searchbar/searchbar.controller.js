export function SearchbarController($log, $scope, WikipediaService) {
  'ngInject';

  const vm = this;
  vm.searchSize = WikipediaService.searchSize.getValue();

  vm.updateSearchSize = updateSearchSize;

  activate();

  function activate() {

    const inputElem = document.getElementById('queryterm');

    const queryTermUpdatesSubscription = WikipediaService.queryTerm.subscribe(newTerm => {
      $log.info('Received new query term');
      $('#queryterm').val(newTerm);
    });

    const searchSizeSubscription = WikipediaService.searchSize.subscribe(newSize => {
      $scope.$applyAsync(() => vm.searchSize = newSize);
    });

    const keyDownEvents = Rx.DOM.keydown(inputElem);
    const enterHits = keyDownEvents.filter( e => _.eq(e.keyCode, 13));

    const queryTermUpdates = enterHits
      .pluck('target', 'value')
      .subscribe(queryTerm => WikipediaService.queryTerm.onNext(queryTerm));

    const logKeyEventsSubscription = WikipediaService.searchResults.subscribe(x => $log.info('KeyEvent', x));

    $log.info('SearchbarController created');

    $scope.$on('$destroy', () => {
      logKeyEventsSubscription.dispose();
      queryTermUpdatesSubscription.dispose();
      searchSizeSubscription.dispose();
      $log.info('SearchbarController destroyed');
    });
  }

  function updateSearchSize(newSize) {
    WikipediaService.searchSize.onNext(newSize);
  }

}
