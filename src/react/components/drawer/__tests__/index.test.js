import React from 'react'
import { shallow } from 'enzyme'
import Drawer from '../'

// Mocks & Configs
import getPages from '../../pages/config'
import DrawerList from '../list'
import PageWrapper from '../../pages'

describe('Components/Drawer', () => {
  const props = {
    content: getPages(),
  }

  it('renders a component', () => {
    // test withStyles ==> https://github.com/mui-org/material-ui/issues/9266#issuecomment-349447137
    expect(shallow(<Drawer {...props} />).dive()).toMatchSnapshot()
  })

  it('renders DrawerList component with the correct props', () => {
    const wrapper = shallow(<Drawer {...props} />).dive()

    expect(wrapper.find(DrawerList).length).toEqual(1)
    expect(wrapper.find(DrawerList).props().list).toEqual(getPages())
    expect(wrapper.find(DrawerList).props().onClick).toEqual(wrapper.instance().onPageChange)
  })

  it('renders PageWrapper component with the correct props', async () => {
    const wrapper = shallow(<Drawer {...props} />).dive()
    const element = wrapper.find(PageWrapper)
    expect(element.length).toEqual(1)
    expect(element.props().component).toEqual(props.content[0])

    const instance = wrapper.instance()
    instance.onPageChange(1)
    wrapper.update() // will cause a re-render of the wrapper component

    // Note: we'll have to re-find the component to get the new probs.
    // see: https://github.com/airbnb/enzyme/issues/1221#issuecomment-334953909
    expect(wrapper.find(PageWrapper).props().component).toEqual(props.content[1])
  })

  it('handles onPageChange properly', () => {
    const wrapper = shallow(<Drawer {...props} />).dive()
    const instance = wrapper.instance()
    expect(instance.state).toEqual({ open: false, pageIndex: 0 })

    instance.onPageChange(1)
    expect(instance.state).toEqual({ open: false, pageIndex: 1 })
  })

  it('handles Drawer interactions properly', () => {
    const wrapper = shallow(<Drawer {...props} />).dive()
    const instance = wrapper.instance()
    expect(instance.state).toMatchObject({ open: false })

    instance.handleDrawerOpen()
    expect(instance.state).toMatchObject({ open: true })

    instance.handleDrawerClose()
    expect(instance.state).toMatchObject({ open: false })
  })
})
