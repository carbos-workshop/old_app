import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';

// UI Components
import Header from './components/header'

// Styles
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import lightTheme from './themes/light.theme.js';
import './App.css'

const styles = theme => ({
  root: {
    margin: '0 auto',
    paddingTop: theme.spacing.unit * 5,
    width: '70%',
    flex:'1',
    [theme.breakpoints.down('md')]: {
      width: '80%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
  },
})

class App extends Component {

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={lightTheme}>
          <div className="App">
            <Header />
            <div className={classes.root}>
              { this.props.children }
            </div>
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(App)
