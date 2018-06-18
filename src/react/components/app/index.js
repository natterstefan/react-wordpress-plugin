import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'

// NOTE i18n
// - https://www.npmjs.com/package/po2json
// - https://github.com/yahoo/react-intl/issues/1100#issuecomment-394096631
// - extract from react-intl ==> and do not mix w/ wordpress ==> https://github.com/yahoo/babel-plugin-react-intl
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import messages from './languages'

// helpers
import apiClient from '../../utils/api-client'

// logging and debugging
const debug = require('debug')('App')

// REACT component
class App extends React.Component {
  static parseData(data) {
    try {
      return JSON.stringify(data)
    } catch (e) {
      return 'failed to parse data'
    }
  }

  static getTranslation = id => get(messages, `['${id}']`)

  constructor(props) {
    super(props)
    this.state = {
      appContext: {},
    }
  }

  componentDidMount() {
    // load data from the WP API
    this.getData()
  }

  async getData() {
    try {
      const result = await apiClient.request('GET', `/options`)
      this.setState({ appContext: get(result, 'data.data') })
    } catch (err) {
      debug('failed to get appContext', err)
    }
  }

  getAsset(path) {
    // TODO: create generalised asset-helper for other components
    const appContext = get(this.state, 'appContext', {})
    const assetPath = get(appContext, 'asset_path')
    if (assetPath) {
      return `${assetPath}/${path}`
    }
    return ''
  }

  render() {
    const { intl, wpGlobals } = this.props

    // i18n
    const title = intl.formatMessage(App.getTranslation('react.settings.title'))
    const appContext = get(this.state, 'appContext', {})
    const currentData = App.parseData(appContext)

    return (
      <div className="app-plugin-name">
        <h1>{title}</h1>
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
            {appContext &&
              appContext.asset_path && <img src={this.getAsset('img/350x150.png')} alt="" />}
          </p>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  wpGlobals: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  intl: intlShape.isRequired,
}

App.defaultProps = {
  wpGlobals: {},
}

export default injectIntl(App)
