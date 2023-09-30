import './App.css'

function App() {
  console.log('--window.Telegram', window.Telegram);
  const { webAppData } = window.Telegram.webApp;
  const {
    initDataUnsafe: {
      user: {
        first_name: userFirstName,
        last_name: userLastName,
        username,
      } = {},
    } = {},
  } = webAppData

  const userNameOrNick = `${userFirstName} ${userLastName}`.trim() ?? username;

  return (
    <div className="App">
      <h1>Pet Health Diary!</h1>
      <h2>Welcome {userNameOrNick}</h2>
    </div>
  );
}

export default App;
