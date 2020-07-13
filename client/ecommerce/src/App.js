import React, {Component} from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppBarNonAuth from './Components/AppBar/AppBarNonAuth'
import AppRouter from './AppRouter'
import Context from './Store/Store'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Context>
          {/* TODO: merge appbar non auth and auth into one component */}
          <AppBarNonAuth />
          <React.Suspense fallback={<h2>Loading...</h2>}>
            <AppRouter />
          </React.Suspense>
        </Context>
      </BrowserRouter>
    )
  }
}

export default App