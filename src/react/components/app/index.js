import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash.get'

import apiClient from '../../utils/api-client'

const debug = require('debug')('App')

class App extends React.Component {
  // utilities
  static parseData(data) {
    try {
      return JSON.stringify(data)
    } catch (e) {
      return 'no appContext'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      appContext: {},
    }
  }

  componentDidMount() {
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
    const title = 'Hello from REACT.'
    const appContext = get(this.state, 'appContext', {})
    const currentData = App.parseData(appContext)

    return (
      <div className="app-plugin-name">
        <h1>{title}</h1>
        <div>
          This is what I get from the options table so far:
          <p>
            <code>{currentData}</code>
          </p>
        </div>
        <div>
          This is what I get in my `wpGlobals` so far:
          <p>
            <code>{App.parseData(this.props.wpGlobals)}</code>
          </p>
        </div>
        <div>
          Example static file
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
}

App.defaultProps = {
  wpGlobals: {},
}

export default App
