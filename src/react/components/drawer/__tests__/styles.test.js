import styles from '../styles'

describe('Components/Drawer styles', () => {
  const themeMock = {
    mixins: {
      toolbar: {
        toolbarProp: 1,
      },
    },
    spacing: {
      unit: 1,
    },
    transitions: {
      duration: {
        enteringScreen: 1,
        leavingScreen: 1,
      },
      easing: {
        easeOut: 1,
        sharp: 1,
      },
      create: jest.fn(),
    },
  }

  test('renders component', () => {
    const expected = {
      appBar: { backgroundColor: '#0073aa', position: 'absolute', transition: undefined },
      appBarShift: { transition: undefined, width: 'calc(100% - 240px)' },
      'appBarShift-left': { marginLeft: 240 },
      appFrame: {
        display: 'flex',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        zIndex: 1,
      },
      content: { flexGrow: 1, padding: 3, transition: undefined },
      'content-left': { marginLeft: -240 },
      contentShift: { transition: undefined },
      'contentShift-left': { marginLeft: 0 },
      drawerHeader: {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '0 8px',
        toolbarProp: 1,
      },
      drawerPaper: { position: 'relative', width: 240 },
      hide: {
        display: 'none',
      },
      menuButton: { marginLeft: 12, marginRight: 20 },
      root: {
        boxShadow:
          '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
        flexGrow: 1,
        marginRight: 5,
        paddingRight: 0,
      },
    }
    const actual = styles(themeMock)
    expect(actual).toEqual(expected)
  })
})
