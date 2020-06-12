import urls from './url';

class DemoLogic {
  constructor() {}

  getData(parms) {
    return $http.post(urls.apiGetData, parms);
  }
}

export default new DemoLogic();
