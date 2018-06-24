import React from 'react'
import { shallow } from 'enzyme'
import App from '../'

// useful tipps for testing with JEST
// - https://marmelab.com/blog/2015/06/24/jest-in-practice.html
describe('Components/App', () => {
  it('renders app component', () => {
    expect(shallow(<App />)).toMatchSnapshot()
  })
})
