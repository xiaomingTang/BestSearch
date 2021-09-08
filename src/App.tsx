import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core'

import Search from './pages/Search'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

const theme = createTheme({
  palette: {
    primary: {
      main: '#FAF7EE',
      contrastText: '#333333',
    },
    background: {
      default: '#FAF7EE',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
        },
      },
    },
  },
})

export default function App() {
  return <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Switch>
        <Route path='/search/:word'>
          <Search />
        </Route>
        <Route path='/search'>
          <Search />
        </Route>
        <Route path='/' exact>
          <Home />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  </ThemeProvider>
}
