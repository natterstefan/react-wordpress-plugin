/* eslint-disable import/no-extraneous-dependencies */
const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

Enzyme.configure({ adapter: new Adapter() })

// usually injected by WordPress (see wp_localize_script in class-admin.php)
global.wpGlobals = {
  namespace: 'plugin-name/v1',
  nonce: 'example-nonce-123',
  root: 'https://example.com/wp-json/',
}

// helper to wait for something (eg. async actions)
global.nextTick = () => new Promise(res => process.nextTick(res)) // eslint-disable-line
