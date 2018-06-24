import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import invoke from 'lodash.invoke'

import { FormattedMessage } from 'react-intl'
import Typography from '@material-ui/core/Typography'

class SettingsPage extends React.Component {
  static parseData(data) {
    try {
      return JSON.stringify(data)
    } catch (e) {
      return 'failed to parse data'
    }
  }

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
    const { app, wpGlobals } = this.props
    const appData = get(app, 'data', {})
    const currentData = SettingsPage.parseData(appData)

    return (
      <React.Fragment>
        {app.isLoading && (
          <div style={{ margin: '20px auto', textAlign: 'center' }}>Loading data...</div>
        )}
        {!app.isLoading && (
          <React.Fragment>
            <div>
              <Typography component="p">
                <FormattedMessage
                  id="react.settings.intro"
                  defaultMessage="This is what I get from the options table so far:"
                />
              </Typography>
              <p>
                <code>{currentData}</code>
              </p>
            </div>
            <div>
              <Typography component="p">
                <FormattedMessage
                  id="react.settings.wpGlobals"
                  defaultMessage="This is what I get as wpGlobals so far:"
                />
              </Typography>
              <p>
                <code>{SettingsPage.parseData(wpGlobals)}</code>
              </p>
            </div>
            <div>
              <Typography component="p">
                <FormattedMessage id="react.settings.asset" defaultMessage="Example static file:" />
              </Typography>
              <p>
                {appData &&
                  appData.asset_path && <img src={this.getAsset('img/350x150.png')} alt="" />}
              </p>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

SettingsPage.propTypes = {
  actions: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  app: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  wpGlobals: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

SettingsPage.defaultProps = {
  app: {},
  actions: {},
  wpGlobals: {},
}

export default SettingsPage
