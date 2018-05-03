import React from 'react'
import Button from 'material-ui/Button'
import detectBrowser from 'browser-detect'
import {
  CHROME_BROWSER,
  FIREFOX_BROWSER,
  UNSUPPORTED_BROWSER,
} from 'utils/constants'
import { chromeExtensionURL, firefoxExtensionURL } from 'utils/navigation'

class InstallButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // One of: 'chrome', 'firefox', or 'other'
      browser: UNSUPPORTED_BROWSER,
      mobile: false,
      // true when we are done detecting the browser and OS
      // in a client environment
      clientReady: false,
    }
  }

  componentDidMount() {
    // Client-specific code must run after mounting because this
    // is a static site:
    // https://reactjs.org/docs/react-dom.html#hydrate
    this.detectBrowser(() => {
      this.setState({ clientReady: true })
    })
  }

  detectBrowser(callback = () => {}) {
    const browserInfo = detectBrowser()
    var browser = 'other'
    switch (browserInfo.name) {
      case 'chrome':
        browser = CHROME_BROWSER
        break
      case 'chromium':
        browser = CHROME_BROWSER
        break
      case 'firefox':
        browser = FIREFOX_BROWSER
        break
      default:
        browser = UNSUPPORTED_BROWSER
        break
    }
    const mobile = browserInfo.mobile ? true : false
    this.setState(
      {
        browser: browser,
        mobile: mobile,
      },
      callback
    )
  }

  addToFirefox() {
    window.location = firefoxExtensionURL
  }

  addToChrome() {
    window.location = chromeExtensionURL
  }

  onClick() {
    if (this.state.mobile) {
      console.log(
        'Cannot add Tab for a Cause extension: this is a mobile device'
      )
    } else {
      switch (this.state.browser) {
        case CHROME_BROWSER:
          this.addToChrome()
          break
        case FIREFOX_BROWSER:
          this.addToFirefox()
          break
        default:
          console.log(
            'Cannot add Tab for a Cause extension: this browser is not supported'
          )
          break
      }
    }
  }

  getButtonText() {
    // Customize text to browser and device
    if (this.state.mobile) {
      return 'Get it Now'
    } else {
      switch (this.state.browser) {
        case CHROME_BROWSER:
          return 'Add to Chrome'
        case FIREFOX_BROWSER:
          return 'Add to Firefox'
        default:
          return 'Get it Now'
      }
    }
  }

  render() {
    const buttonText = this.getButtonText()
    return (
      <Button
        variant="raised"
        color="primary"
        onClick={this.onClick.bind(this)}
        size="large"
        style={{
          minWidth: 200,
        }}
      >
        {buttonText}
      </Button>
    )
  }
}

export default InstallButton
