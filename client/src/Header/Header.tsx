import React from 'react';
import Authenticated from './Authenticated';
import Unauthorized from './Unauthorized';

const Header: React.FC = () => {
  return (
    <header>
      <div className="px-3 py-2 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none"
            >
              PenPal Clone
            </a>

            <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
              <Authenticated />
              <Unauthorized />
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
