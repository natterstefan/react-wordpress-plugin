import InboxIcon from '@material-ui/icons/MoveToInbox'
import StarIcon from '@material-ui/icons/Star'

import ManagePage from '../manage'
import SettingsPage from '../settings'

import config from '../config'

describe('Pages/config', () => {
  test('returns correct config', () => {
    const expected = [
      {
        name: 'Manage',
        icon: InboxIcon,
        component: ManagePage,
        props: undefined,
      },
      {
        name: 'Settings',
        icon: StarIcon,
        component: SettingsPage,
        props: undefined,
      },
    ]

    expect(config()).toEqual(expected)
  })
})
