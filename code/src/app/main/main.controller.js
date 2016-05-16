export function MainController($log, $scope, WikipediaService) {
  'ngInject';

  activate();

  function activate() {
    $log.info('MainController created');

    const cheatCode = [38,38,40,40,37,39,37,39,66,65];

    const konamiSubscription = Rx.DOM.keydown(document)
      .pluck('keyCode')
      .windowWithCount(cheatCode.length, 1)
      .flatMap((xs) => xs.toArray())
      .filter((xs) => _.isEqual(cheatCode, xs))
      .subscribe(() => WikipediaService.queryTerm.onNext('Konami'));

    $scope.$on('$destroy', () => {
      konamiSubscription.dispose();
      $log.info('MainController destroyed');
    });
  }

}
