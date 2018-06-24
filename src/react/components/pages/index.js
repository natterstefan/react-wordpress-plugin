import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

// material-ui
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  title: {
    marginBottom: 16,
  },
})

const PageWrapper = props => {
  const { classes, component, placeholder: Placeholder } = props
  const Component = component.component

  return (
    <Paper className={classNames(classes.root, props.className)} elevation={4}>
      <Placeholder />
      <Typography className={classes.title} variant="headline" component="h2">
        {component.name}
      </Typography>
      <Component {...props.component.props} />
    </Paper>
  )
}

PageWrapper.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  component: PropTypes.shape({
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    icon: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    props: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }).isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
}

PageWrapper.defaultProps = {
  className: '',
}

export default withStyles(styles)(PageWrapper)
