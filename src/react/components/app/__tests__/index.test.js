import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const mockStore = configureMockStore([thunk])

describe('Component/AppContainer', () => {
  let store
  const mockDispatch = jest.fn()
  const mockInitApp = jest.fn()

  beforeEach(() => {
    store = mockStore({
      app: {
        someData: 1,
      },
    })
    store.dispatch = mockDispatch

    // reset counts
    mockDispatch.mockReset()

    // see https://github.com/facebook/jest/issues/2567#issuecomment-345805358
    jest.mock('../../../actions/app', () => ({
      initApp: mockInitApp,
    }))
  })

  afterAll(() => {
    jest.resetModules()
    jest.unmock('../../../actions/app')
  })

  test('should get data from the store and prepare props without throwing an error', () => {
    const AppContainer = require('../').default
    const wrapper = shallow(<AppContainer store={store} someProp />)

    const expectedContainerProps = {
      app: {
        someData: 1,
      },
      someProp: true,
      actions: {
        initApp: expect.any(Function),
      },
    }

    expect(wrapper.props()).toEqual(
      expect.objectContaining({
        ...expectedContainerProps,
      }),
    )
  })

  test('should dispatch initApp when actions.initApp is invoked', () => {
    const AppContainer = require('../').default
    const wrapper = shallow(<AppContainer store={store} someProp />)

    wrapper.props().actions.initApp()
    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(mockInitApp).toHaveBeenCalledTimes(1)
  })
})
