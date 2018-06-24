import { connect } from 'react-redux'
import get from 'lodash.get'

import SettingsPage from './component'
import { initApp as initAction } from '../../../actions/app'

const mapStateToProps = state => ({
  app: get(state, 'app', {}),
})

const mapDispatchToProps = dispatch => ({ dispatch })

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  actions: {
    initApp: () => dispatchProps.dispatch(initAction()),
  },
  wpGlobals: window.wpGlobals || {},
})

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SettingsPage)
