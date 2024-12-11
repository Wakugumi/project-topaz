import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { generateURL } from '../utils/pictureUtils';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setAvatar(
      `https://ui-avatars.com/api/?name=${encodeURIComponent(sessionStorage.getItem("name") as string)}&background=random`);

    setName(sessionStorage.getItem("name") as string);
  })



  const handleShutdown = (e: any) => {
    e.preventDefault();
    navigate("/");
  }

  useEffect(() => {
    const name = sessionStorage.getItem("name")
    setAvatar(
      generateURL(name as string));
  }, [])
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm border rounded px-3">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link "
                id="profileDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="ps-3 pe-0 py-0 border rounded-pill shadow-sm d-flex align-items-center gap-3">
                  <span>{name}</span>
                  <img src={avatar} alt="Profile" className="img-fluid rounded-circle" style={{ width: "3rem" }} />

                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">

                <li>
                  <button
                    className="dropdown-item btn btn-danger d-flex align-items-center gap-3"
                    onClick={handleShutdown}

                  ><span className="material-symbols-outlined">
                      power_settings_new
                    </span>Shutdown</button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
