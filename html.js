import React from 'react';

const Html = ({ content, cssBundles, jsBundles, apiData }) => (
  <html lang="en">
  <head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Server Side Rendering and Bundle Splitting</title>
    <link
    href="http://localhost:8000/dist/main.css"
    rel="stylesheet"
    as="style"
    media="screen, projection"
    type="text/css"
    charSet="UTF-8"
  />

    {
      cssBundles.map( (bundle) => 
        (<link
          href={`http://localhost:8000${bundle.publicPath}`}
          rel="stylesheet"
          as="style"
          media="screen, projection"
          type="text/css"
          charSet="UTF-8"
        />))
    }

    {jsBundles.map( ( {file}) => (<script src={`http://localhost:8000/dist/${file}`}>{file}</script>) )}

    <script dangerouslySetInnerHTML={{
          __html: `window.__API_DATA__=${JSON.stringify(apiData)}`}} />    
  </head>
  <body cz-shortcut-listen="true">
    <div id="root" dangerouslySetInnerHTML={{ __html: content }} />  
    <script src="http://localhost:8000/dist/main-bundle.js"></script>
  </body>
</html>  

);

export default Html;  