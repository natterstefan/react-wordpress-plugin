import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import get from 'lodash.get'
import find from 'lodash.find'
import map from 'lodash.map'

// ATTENTION: import new languages here below in the Safari intl. fallback logic
import { IntlProvider, addLocaleData } from 'react-intl'
import enLocaleData from 'react-intl/locale-data/en'
import deLocaleData from 'react-intl/locale-data/de'

// Store
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'

// Components
import App from './components/app'

// Redux Store
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)))

// logging and debugging
const debug = require('debug')('Admin')

// Add the languages's local data (required for each language)
// inspired by
// - https://medium.freecodecamp.org/internationalization-in-react-7264738274a0
// - https://blog.idagio.com/localisation-or-how-i-learned-to-stop-worrying-and-love-babel-plugin-react-intl-8eeb51d80d77
const supportedLanguages = [{ lang: 'en', intl: enLocaleData }, { lang: 'de', intl: deLocaleData }]
const intlLanguages = [].concat(...map(supportedLanguages, lang => lang.intl))
addLocaleData(intlLanguages)

// get language from the browser (NOTE: alternative would be to get the language from the WP instance via wpGlobals)
const language = get(navigator, 'languages[0]') || navigator.language || navigator.userLanguage
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0]

// TODO
// - IntlProvider w/ Redux:
//   - https://stackoverflow.com/questions/35776663/react-intl-multi-language-app-changing-languages-and-translations-storage/40603629
//   - https://github.com/yahoo/react-intl/issues/243#issuecomment-165924794
// - try: https://github.com/ratson/react-intl-redux
const renderApp = async () => {
  try {
    const lang =
      get(find(supportedLanguages, item => item.lang === languageWithoutRegionCode), 'lang') || 'en'
    const result = await axios.get(`${wpGlobals.asset_path}/languages/${lang}.json`)

    render(
      <Provider store={store}>
        <IntlProvider locale={lang} messages={result.data}>
          <App wpGlobals={wpGlobals} />
        </IntlProvider>
      </Provider>,
      document.getElementById('plugin-name-app'),
    )
  } catch (err) {
    const text = 'An error occured. Please try it again.'
    debug(`${text}: ${err}`)
    render(<div style={{ marginTop: 30 }}>{text}</div>, document.getElementById('plugin-name-app'))
  }
}

// If browser doesn't support Intl (i.e. Safari), then we manually import
// the intl polyfill and locale data.
// Based on
// - https://medium.freecodecamp.org/internationalization-in-react-7264738274a0
// - https://github.com/coryhouse/react-slingshot/issues/270
if (!window.Intl) {
  // ATTENTION: require all languages you imported at the top of the file
  // require.ensure ==> line below allows for code splitting
  require.ensure(
    ['intl', 'intl/locale-data/jsonp/en.js', 'intl/locale-data/jsonp/de.js'],
    require => {
      require('intl')
      require('intl/locale-data/jsonp/en.js')
      renderApp()
    },
  )
} else {
  renderApp()
}
