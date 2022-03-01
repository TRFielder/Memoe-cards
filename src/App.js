import './App.css';
import Cards from './components/cards';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Cards key="1" name="ayaka" vision="cryo"/>
        <Cards key="2" name="sara" vision="electro"/>
        <Cards key="3" name="raiden" vision="electro"/>
      </header>
    </div>
  );
}

export default App;
