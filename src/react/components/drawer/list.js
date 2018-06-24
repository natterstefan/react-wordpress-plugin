import React from 'react'
import PropTypes from 'prop-types'
import map from 'lodash.map'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const DrawerList = ({ list = [], onClick = () => {} }) => (
  <React.Fragment>
    {map(list, (item, index) => (
      <ListItem button onClick={() => onClick(index)} key={item.name}>
        <ListItemIcon>
          <item.icon />
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItem>
    ))}
  </React.Fragment>
)

DrawerList.propTypes = {
  list: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  onClick: PropTypes.func.isRequired,
}

export default DrawerList
