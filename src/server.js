import path from 'path';
import express from 'express';
import webpack from 'webpack';
import React from 'react';
import { createStore } from 'redux';
import createMemoryHistory from 'history/lib/createMemoryHistory';
import { renderToString } from 'react-dom/server';

import App from './containers/App';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

app.get('/api', (req, res) => {
  res.send([
    {
      first: 'jonathan',
      last: 'kupcho',
    },
    {
      first: 'boomer',
      last: 'cat',
    }
  ])
})

const handleRender = (req, res) => {
  const history = createMemoryHistory();
  const store = createStore((state='message', action) {
    switch (action.type) {
      default:
        return state;
    }
  });
  res.send(renderToString(<App history={history} store={store}></App>));
};

app.use(handleRender);

app.listen(port, '0.0.0.0', function(err) {
  if (err) {
    console.log(err);
  }
  console.log(`listening on port ${port}`);
});