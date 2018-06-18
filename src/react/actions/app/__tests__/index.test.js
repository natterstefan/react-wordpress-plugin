import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { actions, initApp } from '../'

jest.mock('../../../utils/api-client')

describe('actions/app', () => {
  const expectedActions = {
    INIT_REQUEST: 'INIT_REQUEST',
    INIT_RECEIVE: 'INIT_RECEIVE',
  }

  test('returns the correct actions', () => {
    expect(actions).toMatchObject(expectedActions)
  })
})

describe('actions/app:async actions', () => {
  // docs/some links
  // - https://redux.js.org/recipes/writing-tests#async-action-creators
  // - https://stackoverflow.com/a/45082119/1238150
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  afterAll(() => {
    jest.resetModules()
    jest.unmock('../../../utils/api-client')
  })

  test('dispatches both REQUEST and RECEIVE when init app', async () => {
    // payload is set in setup-jest.js (config mock)
    const expectedActions = [
      { type: actions.INIT_REQUEST },
      { error: undefined, payload: { prop: 'some-data' }, type: actions.INIT_RECEIVE },
    ]
    const store = mockStore({})
    await store.dispatch(initApp())
    expect(store.getActions()).toEqual(expectedActions)
  })
})
