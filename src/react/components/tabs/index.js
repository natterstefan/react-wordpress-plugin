import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import map from 'lodash.map'

import TabsContent from './content'

const styles = () => ({
  root: {
    backgroundColor: 'transparent',
    flexGrow: 1,
    width: '100%',
  },
})

class ScrollableTabsButtonAuto extends React.Component {
  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            {map(this.props.tabs, tab => <Tab key={tab.name} label={tab.name} />)}
          </Tabs>
        </AppBar>
        <div>
          <TabsContent {...this.props.tabs[value]} />
        </div>
      </div>
    )
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
  tabs: PropTypes.array.isRequired,
}

export default withStyles(styles)(ScrollableTabsButtonAuto)
