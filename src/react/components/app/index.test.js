import React from 'react'
import { shallow } from 'enzyme'
import App from './'

// useful links
// - https://marmelab.com/blog/2015/06/24/jest-in-practice.html
describe('Components/App', () => {
  it('renders app component', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toMatchSnapshot()
  })
})
