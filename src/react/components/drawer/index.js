import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// material-ui
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

// Content and Styling of the Pages
import { FormattedMessage } from 'react-intl'
import DrawerList from './list'
import PageWrapper from '../pages'
import styles from './styles'

class PersistentDrawer extends React.Component {
  state = {
    open: false,
    pageIndex: 0,
  }

  onPageChange = newIndex => this.setState({ pageIndex: newIndex })

  handleDrawerOpen = () => this.setState({ open: true })

  handleDrawerClose = () => this.setState({ open: false })

  render() {
    const { classes, content, theme } = this.props
    const { open, pageIndex = 0 } = this.state

    const drawer = (
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <DrawerList list={content} onClick={this.onPageChange} />
        </List>
      </Drawer>
    )

    return (
      <div className={classNames(classes.root, 'app-plugin-name')}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes['appBarShift-left']]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                <FormattedMessage id="react.settings.title" defaultMessage="PLUGIN-NAME Settings" />
              </Typography>
            </Toolbar>
          </AppBar>
          {drawer}
          <PageWrapper
            className={classNames(classes.content, classes['content-left'], {
              [classes.contentShift]: open,
              [classes['contentShift-left']]: open,
            })}
            component={content[pageIndex]}
            placeholder={() => <div className={classes.drawerHeader} />}
          />
        </div>
      </div>
    )
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  content: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
}

export default withStyles(styles, { withTheme: true })(PersistentDrawer)
