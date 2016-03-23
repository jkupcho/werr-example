import 'babel-polyfill';
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import React from 'react';
import createHistory from 'react-router/lib/createMemoryHistory';
import { match, Router } from 'react-router';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

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

const handleRender = (req, res) => {
  const history = createHistory(req.originalUrl);
  const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
  );

  match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (renderProps) {
      res.send(renderToString(
        <Provider store={store}>
          <Router history={history} routes={routes} />
        </Provider>
      ));
    }
  })
};

app.use(handleRender);

app.listen(port, '0.0.0.0', function(err) {
  if (err) {
    console.log(err);
  }
  console.log(`listening on port ${port}`);
});