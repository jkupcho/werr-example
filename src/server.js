import 'babel-polyfill';
import Promise from 'promise';
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import React from 'react';
import createHistory from 'react-router/lib/createMemoryHistory';
import { match, Router } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import rootReducer from './reducers/reducers';
import routes from './routes';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

app.get('/api', (req, res) => {
  res.send([
    {
      name: 'Boomer',
      sex: 'Female',
      type: 'Calico'
    },
    {
      name: 'Charli',
      sex: 'Female',
      type: 'Calico',
    },
    {
      name: 'Mel',
      sex: 'Female',
      type: 'Tabby',
    }
  ])
})

const promiseMiddleware = promises => {

  const trimPrefix = (action) => {
    if (isRequest(action)) { return action.type.substr(action.type.indexOf('REQUEST') + 'REQUEST'.length); }
    else if (isReceive(action)) { return action.type.substr(action.type.indexOf('RECEIVE') + 'RECEIVE'.length); }
    return action;
  }

  const isRequest = (action) => {
    return isPromisable(action, 'REQUEST')
  }

  const isReceive = (action) => {
    return isPromisable(action, 'RECEIVE')
  }

  const isPromisable = (action, actionType) => {
    return action.type.indexOf(actionType) > -1
  }

  return store => next => action => {
    console.log('dispatching', action)
    if (isRequest(action)) {
      promises.push({
        type: trimPrefix(action),
        promise: new Promise((resolve, reject) => { resolve('done'); })
      })
    }
    if (isReceive(action)) {
      promises.filter(promise => {
        console.log(promise.type, trimPrefix(action))
        return promise.type === trimPrefix(action)
      })
      .forEach(promise => { 
        promise.promise.then(function (value) {
          return value;
        });
      })
    }
    return next(action)
  }
}

const handleRender = (req, res) => {
  let promises = [];
  const history = createHistory(req.originalUrl);
  const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, promiseMiddleware(promises))
  );

  const html = renderToString(
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  )

  Promise.all(promises.map(promise => promise.promise))
    .then(function() {
      res.send(html)
    })
};

app.use(handleRender);

app.listen(port, '0.0.0.0', function(err) {
  if (err) {
    console.log(err);
  }
  console.log(`listening on port ${port}`);
});