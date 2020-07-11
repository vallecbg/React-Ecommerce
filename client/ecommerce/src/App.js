import React, {Component} from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppBarNonAuth from './Components/AppBar/AppBarNonAuth'
import AppRouter from './AppRouter'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* TODO: merge appbar non auth and auth into one component */}
        <AppBarNonAuth />
        <React.Suspense fallback={<h2>Loading...</h2>}>
          <AppRouter />
        </React.Suspense>
      </BrowserRouter>
    )
  }
}

export default App