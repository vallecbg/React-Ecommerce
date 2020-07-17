import React, {Component} from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppBarComponent from './Components/AppBar/AppBar'
import AppRouter from './AppRouter'
import Context from './Store/Store'
import Spinner from './Components/Loader/Spinner'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Context>
          {/* TODO: merge appbar non auth and auth into one component */}
          {/* <AppBarNonAuth /> */}
          <AppBarComponent />
          <React.Suspense fallback={<Spinner />}>
            <AppRouter />
          </React.Suspense>
        </Context>
      </BrowserRouter>
    )
  }
}

export default App