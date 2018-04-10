// Used in package.json Jest configuration
// and run before tests

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

// Initialize Enzyme
configure({ adapter: new Adapter() })
