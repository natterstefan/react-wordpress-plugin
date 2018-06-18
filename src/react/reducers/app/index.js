import get from 'lodash.get'
import merge from 'lodash.merge'
import { actions } from '../../actions/app'

const initialState = {
  data: {
    asset_path: null,
    name: null,
    options: {},
    translation_slug: null,
    version: null,
  },
  error: false,
  isLoading: false,
}

export function reducer(state = initialState, action) {
  const type = get(action, 'type')

  switch (type) {
    case actions.INIT_REQUEST:
      return merge({}, state, {
        isLoading: true,
        error: false,
      })

    case actions.INIT_RECEIVE:
      return merge({}, state, {
        isLoading: false,
        data: action.payload,
        error: action.error,
      })

    default:
      return state
  }
}
