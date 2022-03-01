import './App.css';
import Cards from './components/cards';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Cards name="ayaka" vision="cryo"/>
        <Cards name="sara" vision="electro"/>
        <Cards name="raiden" vision="electro"/>
      </header>
    </div>
  );
}

export default App;
