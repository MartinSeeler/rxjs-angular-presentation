export function WikipediaService() {
  'ngInject';

  const queryTerm = new Rx.BehaviorSubject('');
  const searchSize = new Rx.BehaviorSubject(10);
  const searchResults = new Rx.BehaviorSubject([]);

  Rx.Observable.combineLatest(queryTerm, searchSize)
    .map(x => {
      const [term = '', size = 10] = x;
      return {term: term, size: size};
    })
    .flatMap(executeSearch)
    .flatMap(parseWikipediaResponse)
    .subscribe(searchResults);

  return {
    queryTerm: queryTerm,
    searchSize: searchSize,
    searchResults: searchResults,
    executeSearch: executeSearch
  };

  function executeSearch(query) {
    const url = `http://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${encodeURIComponent(query.term)}&callback=JSONPCallback&limit=${query.size}`;
    return Rx.DOM.jsonpRequest(url);
  }

  function parseWikipediaResponse(resp) {
    const titles = Rx.Observable.from(_.get(resp, '.response[1]', []));
    const contents = Rx.Observable.from(_.get(resp, '.response[2]', []));
    const urls = Rx.Observable.from(_.get(resp, '.response[3]', []));
    return Rx.Observable
      .zip(titles, contents, urls)
      .map(x => {
        const [title = '', content = '', link = ''] = x;
        return {
          title: title,
          content: content,
          link: link
        }
      }).toArray();
  }

}
