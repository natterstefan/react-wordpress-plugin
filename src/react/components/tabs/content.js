import React from 'react'
import PropTypes from 'prop-types'

// material-ui
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    marginBottom: 16,
  },
}

const TabsContent = ({ classes, component: Component, name, props }) => (
  <div>
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} variant="headline" component="h2">
          {name}
        </Typography>
        <Component {...props} />
      </CardContent>
    </Card>
  </div>
)
TabsContent.displayName = 'TabsContent'

TabsContent.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  component: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  props: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

TabsContent.defaultProps = {
  props: {},
}

export default withStyles(styles)(TabsContent)
