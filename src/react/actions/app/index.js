import get from 'lodash.get'
import apiClient from '../../utils/api-client'

const debug = require('debug')('Actions/app')

const actions = {
  INIT_REQUEST: 'INIT_REQUEST',
  INIT_RECEIVE: 'INIT_RECEIVE',
}

const initRequest = () => ({ type: actions.INIT_REQUEST })
const initReceive = (payload, error) => ({ type: actions.INIT_RECEIVE, payload, error })

const initApp = () => async dispatch => {
  // trigger dispatch to indicate isLoading state before we dispatch the received
  // payload from the api
  dispatch(initRequest())
  try {
    const result = await apiClient.request('GET', `/options`)
    dispatch(initReceive(get(result, 'data.data')))
  } catch (err) {
    debug('failed to initApp', err)
    dispatch(initReceive(null, err))
  }
}

export { actions, initApp }
