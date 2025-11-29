import './App.css';
import Header from './Layout/Header';
import Home from './pages/Home';
import Footer from './Layout/Footer';

function App(props) {
  return (
    <div className="App">
      <Header />
        <section>
          
                  {props.children}
              
        </section>
      <Footer />
    </div>
  );
}

export default App;