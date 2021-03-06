/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import Helmet from 'react-helmet'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
jest.mock('src/img/opengraph-img.png', () => '/static/some-image.png')

const getMockProps = () => ({
  brand: 'tab',
  children: null,
  data: {
    site: {
      siteMetadata: {
        domain: 'example.com',
        descriptionLong: 'This is a very long example description',
        descriptionShort: 'A shorter description',
        keywords: 'here, are, keywords',
        metaTagCallToAction: 'Check this out!',
        title: 'My Example Site',
        twitterHandle: '@example',
      },
    },
  },
  location: {
    pathname: '/',
  },
})

describe('index layout page', () => {
  it('renders without error', () => {
    const { LayoutContent } = require('../Layout')
    shallow(<LayoutContent {...getMockProps()} />)
  })

  it('sets the canonical URL', () => {
    const { LayoutContent } = require('../Layout')
    const wrapper = shallow(<LayoutContent {...getMockProps()} />)
    const elem = wrapper.find('link[rel="canonical"]')
    expect(elem.prop('href')).toBe('https://tab.gladly.io/')
  })

  it('sets the default page title using Helmet', () => {
    const { LayoutContent } = require('../Layout')
    const wrapper = shallow(<LayoutContent {...getMockProps()} />)
    const elem = wrapper.find(Helmet)
    expect(elem.prop('defaultTitle')).toBe('My Example Site')
  })

  it('sets the open graph title to the call-to-action text', () => {
    const { LayoutContent } = require('../Layout')
    const wrapper = shallow(<LayoutContent {...getMockProps()} />)
    const elem = wrapper.find('meta[property="og:title"]')
    expect(elem.prop('content')).toBe('Check this out!')
  })

  it('sets the open graph description', () => {
    const { LayoutContent } = require('../Layout')
    const wrapper = shallow(<LayoutContent {...getMockProps()} />)
    const elem = wrapper.find('meta[property="og:description"]')
    expect(elem.prop('content')).toBe('A shorter description')
  })

  it('sets the open graph image', () => {
    const { LayoutContent } = require('../Layout')
    const wrapper = shallow(<LayoutContent {...getMockProps()} />)
    const elem = wrapper.find('meta[property="og:image"]')
    expect(elem.prop('content')).toBe(
      'https://tab.gladly.io/static/some-image.png'
    )
  })

  it('renders the Header component', () => {
    const { LayoutContent } = require('../Layout')
    const wrapper = shallow(<LayoutContent {...getMockProps()} />)
    expect(wrapper.find(Header).exists()).toBe(true)
  })

  it('passes the "brand" value to the Header component', () => {
    const { LayoutContent } = require('../Layout')
    const mockProps = getMockProps()
    mockProps.brand = 'tab'
    const wrapper = shallow(<LayoutContent {...mockProps} />)
    expect(wrapper.find(Header).prop('brand')).toEqual('tab')
    wrapper.setProps({ brand: 'search' })
    expect(wrapper.find(Header).prop('brand')).toEqual('search')
  })

  it('renders the Footer component', () => {
    const { LayoutContent } = require('../Layout')
    const wrapper = shallow(<LayoutContent {...getMockProps()} />)
    expect(wrapper.find(Footer).exists()).toBe(true)
  })
})
