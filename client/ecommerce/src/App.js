import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import AppBarComponent from "./Components/AppBar/AppBar";
import AppRouter from "./AppRouter";
import Context from "./Store/Store";
import Spinner from "./Components/Loader/Spinner";
import { CloudinaryContext } from "cloudinary-react";
import { SnackbarProvider } from "notistack";
import Notification from "./Components/Notification/Notification";
import { ConfirmProvider } from "material-ui-confirm";

import theme from "./theme";
//import 'react-perfect-scrollbar/dist/css/styles.css'

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Context>
            <CloudinaryContext cloudName="vallec">
              <SnackbarProvider maxSnack={3}>
                <ConfirmProvider>
                  <Notification />
                  <AppBarComponent />
                  <React.Suspense fallback={<Spinner />}>
                    <AppRouter />
                  </React.Suspense>
                </ConfirmProvider>
              </SnackbarProvider>
            </CloudinaryContext>
          </Context>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

export default App;
