import "./styles/globalstyle.css";
import Header from './components/header';
import Game from './components/game';

function App() {
  return (
    <div className="App">
      <Header />  
        <header className="App-header">
        <Game />
      </header>
    </div>
  );
}

export default App;
