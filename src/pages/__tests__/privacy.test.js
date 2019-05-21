/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import Helmet from 'react-helmet'

const getMockProps = () => ({
  location: {
    pathname: '/foo/',
  },
})

describe('privacy policy page', () => {
  it('renders without error', () => {
    const PrivacyPage = require('../privacy').default
    shallow(<PrivacyPage {...getMockProps()} />)
  })

  it('sets the page title using Helmet', () => {
    const PrivacyPage = require('../privacy').default
    const wrapper = shallow(<PrivacyPage {...getMockProps()} />)
    const elem = wrapper.find(Helmet)
    expect(elem.prop('title')).toBe('Privacy Policy')
  })

  it('sets the open graph title', () => {
    const PrivacyPage = require('../privacy').default
    const wrapper = shallow(<PrivacyPage {...getMockProps()} />)
    const elem = wrapper.find('meta[property="og:title"]')
    expect(elem.prop('content')).toBe('Privacy Policy - Tab for a Cause')
  })

  it('sets the open graph description', () => {
    const PrivacyPage = require('../privacy').default
    const wrapper = shallow(<PrivacyPage {...getMockProps()} />)
    const elem = wrapper.find('meta[property="og:description"]')
    expect(elem.prop('content')).toBe(
      'Read our Privacy Policy. Tab for a Cause raises money for charity with every browser tab you open.'
    )
  })
})
