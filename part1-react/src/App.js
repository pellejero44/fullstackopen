import './App.css';

import Message from './Message.js';

const  App = () => {
  return (
    <div className="App">
      <Message message='Working' color='red'/>
      <Message message='on' color='blue'/>
      <Message message='React' color='yellow'/>
    </div>
  );
}

export default App;
