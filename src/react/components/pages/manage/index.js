import { connect } from 'react-redux'
import get from 'lodash.get'

import ManagePage from './component'

const mapStateToProps = state => ({
  app: get(state, 'app', {}),
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ManagePage)
