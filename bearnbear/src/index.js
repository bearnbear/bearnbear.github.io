import React, { Suspense } from 'react'
import { HashRouter } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import thunk from 'redux-thunk'
import reportWebVitals from './reportWebVitals'
import reducers from './reducers'
import history from './utils/history'
import './assets/scss/style.scss'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <HashRouter history={history}>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
