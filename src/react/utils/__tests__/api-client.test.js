import moxios from 'moxios'
import apiClient from '../api-client'

describe('utils/apiClient', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('calls an GET endpoint properly', async () => {
    moxios.stubOnce('GET', /.*/, {
      status: 200,
      response: {
        status: 'OK',
      },
    })

    await apiClient.request('GET', 'example-endpoint')
    const { config } = moxios.requests.mostRecent()
    expect(config.url).toBe('https://example.com/wp-json/plugin-name/v1/example-endpoint')
    expect(config.method).toBe('get')
    expect(config.params).toEqual({ _wpnonce: wpGlobals.nonce })
  })

  it('calls an POST endpoint properly', async () => {
    moxios.stubOnce('POST', /.*/, {
      status: 200,
      response: {
        status: 'OK',
      },
    })

    await apiClient.request('POST', 'example-endpoint')
    const { config } = moxios.requests.mostRecent()
    expect(config.url).toBe('https://example.com/wp-json/plugin-name/v1/example-endpoint')
    expect(config.method).toBe('post')
    expect(config.params).toEqual({ _wpnonce: wpGlobals.nonce })
  })

  it('calls an endpoint with additional query parameters properly', async () => {
    moxios.stubOnce('GET', /.*/, {
      status: 200,
      response: {
        status: 'OK',
      },
    })

    await apiClient.request('GET', 'example-endpoint', { params: { test: 1 } })
    const { config } = moxios.requests.mostRecent()
    expect(config.params).toEqual({ _wpnonce: wpGlobals.nonce, test: 1 })
  })
})
