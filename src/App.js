import React, { Component } from 'react'

// UI Components
import Header from './components/header'

// Styles
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import lightTheme from './themes/light.theme.js';
import './App.css'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={lightTheme}>
          <div className="App">
            <Header />
            { this.props.children }
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App
