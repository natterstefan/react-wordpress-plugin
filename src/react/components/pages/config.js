import InboxIcon from '@material-ui/icons/MoveToInbox'
import StarIcon from '@material-ui/icons/Star'

import ManagePage from './manage'
import SettingsPage from './settings'

export default props => [
  {
    name: 'Manage',
    icon: InboxIcon,
    component: ManagePage,
    props,
  },
  {
    name: 'Settings',
    icon: StarIcon,
    component: SettingsPage,
    props,
  },
]
