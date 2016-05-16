export function SearchResultController(WikipediaService) {
  'ngInject';

  const vm = this;

  vm.setTitleAsNewQuery = setTitleAsNewQuery;

  activate();

  function activate() {

  }

  function setTitleAsNewQuery() {
    WikipediaService.queryTerm.onNext(vm.result.title);
  }
}
