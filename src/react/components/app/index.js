import React from 'react'
import Drawer from '../drawer'
import getPages from '../pages/config'

const App = props => (
  <div className="app-plugin-name">
    <div className="app-plugin-name__container">
      <Drawer content={getPages(props)} />
    </div>
  </div>
)

App.displayName = 'App'
export default App
