import React, { useEffect } from "react"; 
import {Link, useHistory, useLocation} from "react-router-dom";

const Navbar = () => {
  let history = useHistory();
  const handleLogout = () =>{
    localStorage.removeItem('token');
    history.push('/login');
  }

  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    
      //<nav className="navbar navbar-expand-lg bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} as={Link} to="/about">About</Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li> */}
              
            </ul>

              {!localStorage.getItem('token')? <form className="d-flex" role="search">
                
                <Link className="btn btn-success mx-4" style={{color: 'white' }} role="button" to="/login">Login</Link>
                <Link className="btn btn-success mx - 4" style={{color: 'white' }} role="button" to="/signup">Signup</Link>
              </form>:<button onClick={handleLogout} className="btn btn-success mx - 4" style={{color: 'white' }}>Logout</button>}
            
          </div>
        </div>
      </nav>

    
  )
}

export default Navbar
