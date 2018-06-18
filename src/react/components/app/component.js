import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'
import invoke from 'lodash.invoke'

// NOTE i18n
// - https://www.npmjs.com/package/po2json
// - https://github.com/yahoo/react-intl/issues/1100#issuecomment-394096631
// - extract from react-intl ==> and do not mix w/ wordpress ==> https://github.com/yahoo/babel-plugin-react-intl
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import messages from './languages'

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
    const { app, intl, wpGlobals } = this.props

    // i18n
    const title = intl.formatMessage(App.getTranslation('react.settings.title'))
    const appData = get(app, 'data', {})
    const currentData = App.parseData(appData)

    return (
      <div className="app-plugin-name">
        <h1>{title}</h1>
        {app.isLoading && (
          <div style={{ margin: '20px auto', textAlign: 'center' }}>Loading data...</div>
        )}
        {!app.isLoading && (
          <React.Fragment>
            <div>
              <FormattedMessage
                id="react.settings.intro"
                defaultMessage="This is what I get from the options table so far:"
              />
              <p>
                <code>{currentData}</code>
              </p>
            </div>
            <div>
              <FormattedMessage
                id="react.settings.wpGlobals"
                defaultMessage="This is what I get as wpGlobals so far:"
              />
              <p>
                <code>{App.parseData(wpGlobals)}</code>
              </p>
            </div>
            <div>
              <FormattedMessage id="react.settings.asset" defaultMessage="Example static file:" />
              <p>
                {appData &&
                  appData.asset_path && <img src={this.getAsset('img/350x150.png')} alt="" />}
              </p>
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }
}

App.propTypes = {
  app: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  actions: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  intl: intlShape.isRequired,
  wpGlobals: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

App.defaultProps = {
  app: {},
  actions: {},
  wpGlobals: {},
}

export default injectIntl(App)
