import './App.css'
import {useEffect} from 'react';

function App() {
  let webApp;

  console.log('--window.Telegram', window.Telegram);
  useEffect(() => {
    webApp = window.Telegram.webApp;
  }, []);

  const {
    initDataUnsafe: {
      user: {
        first_name: userFirstName,
        last_name: userLastName,
        username,
      } = {},
    } = {},
  } = webApp?.webAppData;

  const userNameOrNick = `${userFirstName} ${userLastName}`.trim() ?? username;

  return (
    <div className="App">
      <h1>Pet Health Diary!</h1>
      <h2>Welcome {userNameOrNick}</h2>
    </div>
  );
}

export default App;
