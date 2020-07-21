import React, {Component} from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import AppBarComponent from './Components/AppBar/AppBar'
import AppRouter from './AppRouter'
import Context from './Store/Store'
import Spinner from './Components/Loader/Spinner'

import theme from './theme'
//import 'react-perfect-scrollbar/dist/css/styles.css'

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Context>
            <AppBarComponent />
            <React.Suspense fallback={<Spinner />}>
              <AppRouter />
            </React.Suspense>
          </Context>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default App