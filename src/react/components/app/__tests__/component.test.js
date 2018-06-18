import React from 'react'
import { createComponentWithIntl } from '../../../../../jest/intl-enzyme-setup'
import App from '../component'

// useful tipps for testing with JEST
// - https://marmelab.com/blog/2015/06/24/jest-in-practice.html
describe('Components/App', () => {
  it('renders app component', () => {
    const wrapper = createComponentWithIntl(<App />)
    expect(wrapper).toMatchSnapshot()
  })
})
