import React from 'react'
import { shallow } from 'enzyme'
import StarIcon from '@material-ui/icons/Star'
import ListItem from '@material-ui/core/ListItem'

import DrawerList from '../list'

describe('Components/DrawerList', () => {
  const props = {
    list: [
      {
        name: 'Settings',
        icon: StarIcon,
      },
    ],
    onClick: jest.fn(),
  }

  beforeEach(() => {
    props.onClick.mockReset()
  })

  it('renders component', () => {
    expect(shallow(<DrawerList {...props} />)).toMatchSnapshot()
  })

  it("it's listItems invoke onClick", () => {
    const wrapper = shallow(<DrawerList {...props} />)
    const element = wrapper.find(ListItem)
    element.simulate('click')
    expect(props.onClick).toHaveBeenCalledTimes(1)
    expect(props.onClick).toHaveBeenCalledWith(0)
  })
})
