import './App.css'

const tg = window.Telegram?.webApp;

function App() {
  return (
    <div className="App">
      <h1>Pet Health Diary!</h1>
      <h2>Welcome {tg?.initDataUnsafe?.user?.username}</h2>
      <h3>{JSON.stringify(window.Telegram)}</h3>
    </div>
  );
}

export default App;
