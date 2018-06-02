// for a more sophisticated usage, one could use http://wp-api.org/node-wpapi/ instead.
import axios from 'axios'
import get from 'lodash.get'

const request = (method = 'GET', url, options) =>
  axios.request({
    method,
    url,
    ...options,
    baseURL: `${wpGlobals.root}${wpGlobals.namespace}`,
    params: { _wpnonce: wpGlobals.nonce, ...get(options, 'params', {}) },
  })

export default {
  request,
}
