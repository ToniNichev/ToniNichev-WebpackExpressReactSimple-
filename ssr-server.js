import React from 'react';
import express from 'express';
import App from './src/components/App';
import Loadable from 'react-loadable';
import manifest from './dist/loadable-manifest.json';
import { getBundles } from 'react-loadable/webpack';
import ReactDOMServer from 'react-dom/server';
import Html from './html.js';

const PORT = process.env.PROD_SERVER_PORT;
const app = express();

app.use('/server-build', express.static('./server-build'));
app.use('/dist', express.static('dist')); // to serve frontent prod static files
app.use('/favicon.ico', express.static('./static-assets/favicon.ico'));

app.get('/*', (req, res) => {   

  // Prepare to get list of all modules that have to be loaded for this route
  let modules = [];

  let mainApp = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <App req={req} />
    </Loadable.Capture>
  );


  const HTML_content = ReactDOMServer.renderToString(<App req={req} />);
  // Extract CSS and JS bundles
  const bundles = getBundles(manifest, modules); 
  const cssBundles = bundles.filter(bundle => bundle && bundle.file.split('.').pop() === 'css');
  const jsBundles = bundles.filter(bundle => bundle && bundle.file.split('.').pop() === 'js');

console.log(">>>manifest>>>", manifest);
console.log(">>cssBundles>>", cssBundles);

  const html = <Html content={HTML_content} cssBundles={cssBundles} jsBundles={jsBundles} />;

  res.status(200);
  res.send(`<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`);
  res.end();
});

Loadable.preloadAll().then(() => {
  app.listen(PORT, () => {
    console.log(`😎 Server is listening on port ${PORT}`);
  });
});