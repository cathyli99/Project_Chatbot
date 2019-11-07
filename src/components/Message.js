import React, { Component } from 'react';

const TypingAnimation = () => (
  <div id="wave">
    <span className="dot" />
    <span className="dot" />
    <span className="dot" />
  </div>
);

//create a much richer responses from Dialogflow AI platform - Cathy
const aiResponseMessage = ({richResponses, handleSendMessage}) => {
  const handleOnClick = (event) => {
    handleSendMessage(event.target.value);
    const elements = document.querySelectorAll('input[type=button');
    elements.forEach((element) => {
      element.style.display = 'none';
    });
  };

if (richResponses[0] && richResponses[0].message === 'suggestions') {
  const suggestions = richResponses[0].suggestions.suggestions;
  const buttons = [];
  suggestions.forEach((element, index) => {
    buttons.push(<input type="button" key={index} style={{margin: 6}} onClick={handleOnClick} value={element.title} />);
  });
  return buttons;
}
return null;
}

/**
 * 3. TODO - update to use function component
 */
// class Message extends Component {
  
//   render() {
//     const { message, isUser } = this.props;
//     return (
//       <div className={`group group-${isUser ? 'user' : 'bot'}`}>
//         <div className="message" style={{ margin: 0 }}>
//           {message === null ? <TypingAnimation /> : <p>{message}</p>}
//         </div>
//       </div>
//     );
//   }
// }

//function Message({ message, isUser}) {
  function Message({ message, handleSendMessage}) {
  return (
      <div className={`group group-${message.isUser ? 'user' : 'bot'}`}>
        <div className="message" style={{ margin: 0 }}>
        {message === null ? <TypingAnimation /> : <p>{message.content}</p>}
        {message.contents.length === 0 ? <TypingAnimation /> : <p>{message.contents}</p>}
        </div>
        { message.richResponses && message.richResponses.length > 0 &&
          <aiResponseMessage richResponses={message.richResponses} handleSendMessage={handleSendMessage} />
        }
      </div>
  );
}

export default Message;
