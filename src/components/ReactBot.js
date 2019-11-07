import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Dialog from './Dialog';
import Input from './Input';
import '../css/main.css';


export default class ReactBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      messages: [],
      dialogHeight: 300,
      isOpen: props.isOpen !== undefined ? props.isOpen : true,
      isMinimized: props.isMinimized !== undefined ? props.isMinimized : true
    };

    this.handleResize = this.handleResize.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this); //bind handleSendMessage - Cathy
    this.handleToggle = this.handleToggle.bind(this);
  }

  /**
   * 9. TODO - add component resize when component is mounted
   * change to asyn...await component - Cathy
   */
  async componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize(window);
    await this.getWelcome();
  }

  /**
   * 10. TODO - remove component resize when component is unmounted
   */
  componentWillUnMount() {
    window.removeEventListener('resize');
  }

  //create getWelcome() function - Cathy
  async getWelcome() {
    const response = await axios.post('https://jikelecture4.cathyli99nz.now.sh/dialogflow/event', { event: 'WELCOME'});
    const { contents, richResponses } = response.data;
    this.appendMessage({ contents, richResponses, isUser: false });
  }

    //create appendMessage() function - Cathy
    appendMessage = (message) => {
      this.setState((prevState) => {
        prevState.messages.push(message);
        return prevState;
      });
    }

  /**
   * 11. TODO - add send message
   * push the message into messages array - cathy
   */
  async handleSendMessage(message) {
    // this.setState((prevState) => {
    //   prevState.messages.push(message);
    //   return prevState;
    // });

    //customer sends message - Cathy
    this.appendMessage({ content: [message], isUser: true});
    //response message from server - Cathy
    const response = await axios.post('https://jikelecture4.cathyli99nz.now.sh/dialogflow/query', { message });
    const {contents, richResponses} = response.data;
    this.appendMessage({contents, richResponses, isUser: false});
  }

  handleResize(e) {
    if (!this.state.isOpen) return; //if window is not open, return default - cathy 
    const window = e.target || e;
    const y = window.innerHeight;
    const header = document.querySelector('.container header');
    const input = document.querySelector('.container .text-form');
    let dialogHeight = y - header.offsetHeight - input.offsetHeight;
    if (dialogHeight < 0 || !dialogHeight) {
      dialogHeight = 0;
    } else if (this.props.dialogHeightMax && dialogHeight > this.props.dialogHeightMax) {
      dialogHeight = this.props.dialogHeightMax;
    }
    this.setState({ dialogHeight });
  }

  handleToggle() {
    if (this.state.isMinimized) {
      this.setState({ isOpen: !this.state.isOpen });
    } else {
      this.setState({ isMinimized: true });
    }
  }


  render() {
    /**
     * 8. TODO - change to use destructing
     */
    const {isMinimized, title, isOpen, dialogHeight, messages} = this.state;
    if (!isOpen) return null;
    return (
      <div
        className="container"
        style={isMinimized ? { display: 'block' } : { display: 'none' }}
      >
        <Header title={title} onClick={this.handleToggle} />
        <div
          style={ isOpen
              ? { minHeight: `${dialogHeight}px` }
              : { maxHeight: 0, overflow: 'hidden' }
          }
        >
          <Dialog messages={messages} dialogHeight={dialogHeight} handleSendMessage={this.handleSendMessage} />
          { isOpen && <Input handleSendMessage={this.handleSendMessage} />}
          {/* <Input handleSendMessage = {this.handleSendMessage}/> */}
        </div>
      </div>
    );
  }
}
