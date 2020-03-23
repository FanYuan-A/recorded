import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import app from './app'
import lxb from './lxb'

export default {
  /**
   * mock bootstrap
   */

  bootstrap () {
    const mock = new MockAdapter(axios)
    let URL_LXB = process.env.VUE_APP_BASE_LXB

    mock.onGet(URL_LXB + '/product/type').reply(config => {
      return new Promise(resolve => {resolve([200,lxb.getProductTypeList()])});
    });
    mock.onGet(`${URL_LXB}/product/list?productSubType=all&isFromPlanBook=1`).reply(config => {
      return new Promise(resolve => {resolve([200,lxb.getProductList('all')])});
    });

    app.doAppMock();
    mock.onAny().passThrough()
  }
}
