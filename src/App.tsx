import { createTheme } from "@material-ui/core";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import React from "react";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Passengers from "./Passengers";

const theme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#ff5a43",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Switch>
          <Route path="/passengers">
            <Passengers />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
