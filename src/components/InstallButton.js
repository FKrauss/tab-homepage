import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import {
  CHROME_BROWSER,
  EDGE_BROWSER,
  FIREFOX_BROWSER,
  UNSUPPORTED_BROWSER,
} from 'src/utils/constants'
import {
  chromeExtensionURL,
  edgeExtensionURL,
  firefoxExtensionURL,
} from 'src/utils/navigation'
import redirect from 'src/utils/redirect'
import { downloadButtonClick } from 'src/utils/analytics/logEvent'
import getBrowserInfo from 'src/utils/browserDetection'

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
    const browserInfo = getBrowserInfo()
    let browser
    if (browserInfo.isChrome()) {
      browser = CHROME_BROWSER
    } else if (browserInfo.isFirefox()) {
      browser = FIREFOX_BROWSER
    } else if (browserInfo.isEdge()) {
      browser = EDGE_BROWSER
    } else {
      browser = UNSUPPORTED_BROWSER
    }
    const mobile = browserInfo.isMobile()
    this.setState(
      {
        browser: browser,
        mobile: mobile,
      },
      callback
    )
  }

  async onClick() {
    const { onBeforeInstall, onUnsupportedBrowserInstallClick } = this.props

    // Log the analytics event for a download click. Wait
    // for it to finish before continuing because we may
    // redirect away from the page.
    await downloadButtonClick()

    if (onBeforeInstall) {
      const response = onBeforeInstall()
      await Promise.resolve(response)
    }

    switch (this.state.browser) {
      case CHROME_BROWSER:
        redirect(chromeExtensionURL)
        break
      case EDGE_BROWSER:
        redirect(edgeExtensionURL)
        break
      case FIREFOX_BROWSER:
        redirect(firefoxExtensionURL)
        break
      default:
        console.info(
          'Cannot add Tab for a Cause extension: this browser is not supported'
        )
        onUnsupportedBrowserInstallClick()
        break
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
        case EDGE_BROWSER:
          return 'Add to Edge'
        case FIREFOX_BROWSER:
          return 'Add to Firefox'
        default:
          return 'Get it Now'
      }
    }
  }

  render() {
    const {
      onBeforeInstall, // eslint-disable-line no-unused-vars
      onUnsupportedBrowserInstallClick, // eslint-disable-line no-unused-vars
      ...otherProps
    } = this.props
    const buttonText = this.getButtonText()
    return (
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{
          minWidth: 200,
        }}
        {...otherProps}
        onClick={this.onClick.bind(this)}
      >
        {buttonText}
      </Button>
    )
  }
}

InstallButton.propTypes = {
  onBeforeInstall: PropTypes.func,
  onUnsupportedBrowserInstallClick: PropTypes.func,
}

InstallButton.defaultProps = {
  onBeforeInstall: null,
  onUnsupportedBrowserInstallClick: () => {},
}

export default InstallButton
