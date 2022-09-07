import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Alert from './components/Alert';
import Signup from './components/Signup';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          {/* <Alert message={"This is React App"}/> */}
          <div className="container">
          <Switch>
            <Route exact path="/" key="home">
              <Home />
            </Route>
            <Route exact path="/about" key="about">
              <About />
            </Route>
            <Route exact path="/login" key="login">
              <Login />
            </Route>
            <Route exact path="/signup" key="signup">
              <Signup />
            </Route>
            
          </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
