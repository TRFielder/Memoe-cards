import "./styles/globalstyle.css";
import Header from './components/header';
import Game from './components/game';
import Footer from './components/footer';
import { Helmet, HelmetProvider } from "react-helmet-async"

function App() {
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <Game />
      </header>
      <Footer />
    </div>
  );
}

export default App;
