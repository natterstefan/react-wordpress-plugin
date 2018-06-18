import { actions } from '../../../actions/app'
import { reducer as app } from '../'

describe('reducers/app', () => {
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

  test('returns the correct initial state', () => {
    const testState = app()
    expect(testState).toMatchObject(initialState)
  })

  test('returns the the current state if no action matches', () => {
    const action = { type: 'SOME_ACTION' }
    const result = app({ someState: 1 }, action)
    expect(result).toMatchObject({ someState: 1 })
  })

  test('changes isLoading to true when INIT_REQUEST is triggered', () => {
    const action = { type: actions.INIT_REQUEST }
    const result = app(initialState, action)
    expect(result).toMatchObject({
      ...initialState,
      isLoading: true,
    })
  })

  test('returns a new togglePreferred state when TOGGLE_PREFERRED is triggered with toggle=true', () => {
    const action = { type: actions.INIT_RECEIVE, payload: { someData: 1 }, error: null }
    const result = app(initialState, action)
    expect(result).toMatchObject({
      data: {
        asset_path: null,
        name: null,
        options: {},
        someData: 1,
        translation_slug: null,
        version: null,
      },
      error: null,
      isLoading: false,
    })
  })
})
