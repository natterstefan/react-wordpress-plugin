/* eslint-disable import/no-extraneous-dependencies */
/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 *
 * Docs for the code below
 *  - https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl#enzyme
 *  - https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl#snapshot-testing
 */
import React from 'react'
import { IntlProvider, intlShape } from 'react-intl'
import renderer from 'react-test-renderer'
import { mount, shallow } from 'enzyme'

// You can pass your messages to the IntlProvider. Optional: remove if unneeded.
// Create the IntlProvider to retrieve context for wrapping around.
// NOTE: currently before each test the we have to build the app to get this file!
import messages from '../dist/static/languages/en.json'

const intlProvider = new IntlProvider({ locale: 'en', messages }, {})
const { intl } = intlProvider.getChildContext()

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node) {
  return React.cloneElement(node, { intl })
}

export function shallowWithIntl(node, { context } = {}) {
  return shallow(nodeWithIntlProp(node), {
    context: Object.assign({}, context, { intl }),
  })
}

export function mountWithIntl(node, { context, childContextTypes } = {}) {
  return mount(nodeWithIntlProp(node), {
    context: Object.assign({}, context, { intl }),
    childContextTypes: Object.assign({}, { intl: intlShape }, childContextTypes),
  })
}

export const createComponentWithIntl = (children, props = { locale: 'en' }) =>
  renderer.create(
    <IntlProvider {...props} locale="en" messages={messages}>
      {children}
    </IntlProvider>,
  )

// as we also use PropTypes we need to mock the Intl PropTypes
export const mockIntlShape = {
  formatDate: jest.fn(),
  formatTime: jest.fn(),
  formatRelative: jest.fn(),
  formatNumber: jest.fn(),
  formatPlural: jest.fn(),
  formatMessage: jest.fn(),
  formatHTMLMessage: jest.fn(),
  now: jest.fn(),
}
