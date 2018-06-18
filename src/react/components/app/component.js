import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import invoke from 'lodash.invoke'

// Material-UI
import Typography from '@material-ui/core/Typography'

// NOTE i18n
// - https://www.npmjs.com/package/po2json
// - https://github.com/yahoo/react-intl/issues/1100#issuecomment-394096631
// - extract from react-intl ==> and do not mix w/ wordpress ==> https://github.com/yahoo/babel-plugin-react-intl
import { injectIntl, intlShape } from 'react-intl'
import messages from './languages'

import Tabs from '../tabs'
import ManagePage from '../pages/manage'
import SettingsPage from '../pages/settings'

class App extends React.Component {
  static parseData(data) {
    try {
      return JSON.stringify(data)
    } catch (e) {
      return 'failed to parse data'
    }
  }

  static getTranslation = id => get(messages, `['${id}']`)

  componentDidMount() {
    // load data from the WP API
    const { actions } = this.props
    invoke(actions, 'initApp')
  }

  getAsset(path) {
    const { app } = this.props
    // TODO: create generalised asset-helper for other components
    const assetPath = get(app, 'data.asset_path')
    if (assetPath) {
      return `${assetPath}/${path}`
    }
    return ''
  }

  render() {
    const { app, intl } = this.props

    // i18n
    const title = intl.formatMessage(App.getTranslation('react.settings.title'))

    return (
      <div className="app-plugin-name">
        <Typography variant="headline" component="h1">
          {title}
        </Typography>
        {app.isLoading && (
          <div style={{ margin: '20px auto', textAlign: 'center' }}>Loading data...</div>
        )}
        {!app.isLoading && (
          <div className="app-plugin-name__tabs">
            <Tabs
              tabs={[
                {
                  name: 'Manage',
                  component: ManagePage,
                  props: this.props,
                },
                {
                  name: 'Settings',
                  component: SettingsPage,
                  props: this.props,
                },
              ]}
            />
          </div>
        )}
      </div>
    )
  }
}

App.propTypes = {
  app: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  actions: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  intl: intlShape.isRequired,
}

App.defaultProps = {
  app: {},
  actions: {},
}

export default injectIntl(App)
