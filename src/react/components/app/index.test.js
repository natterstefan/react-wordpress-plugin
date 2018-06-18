import React from 'react'
import App from './'
import { createComponentWithIntl } from '../../../../jest/intl-enzyme-setup'

// useful tipps for testing with JEST
// - https://marmelab.com/blog/2015/06/24/jest-in-practice.html
describe('Components/App', () => {
  it('renders app component', () => {
    const wrapper = createComponentWithIntl(<App />)
    expect(wrapper).toMatchSnapshot()
  })
})
