
import './App.css';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import { Outlet } from 'react-router-dom'; 

function App() { 
  return (
    <div className="App">
      <Header />
      
      {/* Outlet là nơi React Router sẽ render các trang con vào */}
      <main className="min-h-screen bg-[#0e1217]"> 
         <Outlet /> 
      </main>

      <Footer />
    </div>
  );
}

export default App;