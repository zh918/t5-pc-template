import urls from './url';

class DemoLogic {
  constructor() {}

  getData(parms) {
    return $http.post(urls.apiGetData, parms);
  }

  getDemoList(parms) {
    return $http.post(urls.getDemoList, parms);
  }

  getDemoList1(parms) {
    return $http.post(urls.getDemoList1, parms);
  }
}

export default new DemoLogic();
