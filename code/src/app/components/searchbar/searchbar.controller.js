export function SearchBarController($log, $scope, WikipediaService) {
  'ngInject';

  const inputElem = document.getElementById('queryterm');
  const vm = this;
  vm.searchSize = WikipediaService.searchSize.getValue();

  vm.updateSearchSize = updateSearchSize;

  activate();

  function activate() {
    $log.info('SearchBarController created');

    const queryTermChangesSubscription = WikipediaService.queryTerm.subscribe(newTerm => {
      $log.info('Received new query term', newTerm);
      $('#queryterm').val(newTerm);
    });

    const keyDownEvents = Rx.DOM.keydown(inputElem);
    const enterEvents = keyDownEvents.filter( e => _.eq(e.keyCode, 13));

    const queryTermUpdatesSubscription = enterEvents
      .pluck('target', 'value')
      .subscribe(WikipediaService.queryTerm);

    const searchSizeSubscription = WikipediaService.searchSize.subscribe(newSize => {
      $log.info('Received new query size', newSize);
      $scope.$applyAsync(() => vm.searchSize = newSize);
    });


    $scope.$on('$destroy', () => {
      queryTermUpdatesSubscription.dispose();
      queryTermChangesSubscription.dispose();
      searchSizeSubscription.dispose();
      $log.info('SearchBarController destroyed');
    });
  }

  function updateSearchSize(newSize) {
    WikipediaService.searchSize.onNext(newSize);
  }

}
