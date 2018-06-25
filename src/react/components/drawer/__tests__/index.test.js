import React from 'react'
import { shallow } from 'enzyme'
import Drawer from '../'

// Mocks & Configs
import getPages from '../../pages/config'
import DrawerList from '../list'
// import PageWrapper from '../../pages'

describe('Components/shallow', () => {
  const props = {
    content: getPages(),
  }

  it('renders app component', () => {
    // test withStyles ==> https://github.com/mui-org/material-ui/issues/9266#issuecomment-349447137
    expect(shallow(<Drawer {...props} />).dive()).toMatchSnapshot()
  })

  it('renders DrawerList component with the correct props', () => {
    const wrapper = shallow(<Drawer {...props} />).dive()

    expect(wrapper.find(DrawerList).length).toEqual(1)
    expect(wrapper.find(DrawerList).props().list).toEqual(getPages())
    expect(wrapper.find(DrawerList).props().onClick).toEqual(wrapper.instance().onPageChange)
  })

  // TODO: fix test, it does not render props.content[1] after the change
  // it('renders PageWrapper component with the correct props', async () => {
  //   const wrapper = shallow(<Drawer {...props} />).dive()
  //   const element = wrapper.find(PageWrapper)
  //   expect(element.length).toEqual(1)
  //   expect(element.props().component).toEqual(props.content[0])
  //
  //   const instance = wrapper.instance()
  //   instance.onPageChange(1)
  //   await nextTick()
  //   expect(element.props().component).toEqual(props.content[1])
  // })

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
