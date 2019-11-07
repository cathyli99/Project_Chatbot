import React, { Component } from 'react';
import { render } from 'react-dom';

import ReactBot from './components/ReactBot';
import './css/demo.css';

/**
 * 1. TODO - update to use function bind for the ref
 */
class APP extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }

  reactBotRef = (ref) => {
    this.chatRef = ref;
  }

  handleToggle() {
    // if (this.chat) {
    //   this.chat.handleToggle();
    // }
    this.chatRef.handleToggle(); //use ref to call a function - Cathy
  }

  render() {
    return (
      <div>
        <h1>Simple React interview bot</h1>
        <button onClick={this.handleToggle}>Toggle Chat</button>
        <ReactBot
          dialogHeightMax={350}
          isMinimized={false}
          title="React Interview Bot"
          //ref={el => (this.chat = el)}
          ref = {this.reactBotRef}
        />
      </div>
    );
  }
}

render(<APP />, document.querySelector('#demo'));
