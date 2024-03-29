import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import store from "./store/index"
import { Provider } from 'react-redux';

const theme = createTheme({
palette:{
  primary:{
  main:"#8DC63F"
  },
}
})

ReactDOM.render(
      <Provider store={store}>
    <ThemeProvider theme={theme} >
     <BrowserRouter>
      <App />
      </BrowserRouter>
    </ThemeProvider>
    </Provider>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
