import './App.css';
import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route
} from "react-router-dom";
import Home from './Home';
import "react-bootstrap/dist/react-bootstrap.min.js";
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
const About = React.lazy(() => import('./About.js'));
const GitSearch = React.lazy(() => import('./GitSearch.js'));
function App() {
  return (
    <div className="App">

      <Router>

        <div>

          <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link><Link to="/"><Button variant="secondary">Home</Button></Link></Nav.Link>
                  <Nav.Link><Link to="/about"><Button variant="secondary">About</Button></Link></Nav.Link>
                  <Nav.Link><Link to="/gitSearch"><Button variant="primary">gitSearch</Button></Link></Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <hr/>
          <Routes>
            <Route path='/' element={<Home />}></Route>

            <Route path='/about' element={<Suspense fallback={<Spinner animation="border" />}><About /></Suspense>}></Route>

            <Route path='/gitSearch' element={<Suspense fallback={<div> Loading Content </div>}><GitSearch /></Suspense>}></Route>
          </Routes>
        </div>

      </Router>

    </div>
  );
}

export default App;
