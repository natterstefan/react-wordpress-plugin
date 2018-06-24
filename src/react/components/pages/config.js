import InboxIcon from '@material-ui/icons/MoveToInbox'
import StarIcon from '@material-ui/icons/Star'

import ManagePage from '../pages/manage'
import SettingsPage from '../pages/settings'

export default () => [
  {
    name: 'Manage',
    icon: InboxIcon,
    component: ManagePage,
  },
  {
    name: 'Settings',
    icon: StarIcon,
    component: SettingsPage,
  },
]
