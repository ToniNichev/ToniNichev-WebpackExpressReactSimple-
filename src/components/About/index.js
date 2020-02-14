import React, { Component, useEffect, useState } from 'react';

const CHANGE_USERNAME = 'CHANGE_USERNAME';

const AboutContainer = (state) => {
  const [which, setWhich] = useState(false);

  function handleChange() {
    const userName = 'TEST';
    state.onEdit(userName);
  }

  function switchComponents() {
    setWhich(!which);
  }

  let componentA = (<p>This is <input type="text" name="username" value={state.userName} onChange={() => { handleChange() }} /></p>);
  let componentB = (<p>Another component</p>)
  return (
    <div>
      {!which ? componentA : componentB}
      <button onClick={ () => {switchComponents() } }>TEST</button>
    </div>
  );

}

export default AboutContainer;
