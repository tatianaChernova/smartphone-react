import './App.css'
import { BrowserRouter as Router } from "react-router-dom";
import Header from './components/Header'
import AnimatedRoutes from "./routes/AnimatedRoutes";

function App() {

  return (
    <>
      <Router>
        <Header />
        <main>
          <AnimatedRoutes />
        </main>
      </Router>
    </>
  )
}

export default App
