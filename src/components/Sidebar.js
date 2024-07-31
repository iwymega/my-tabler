import React from "react";

function Sidebar() {
  return (
    <aside class="navbar navbar-vertical navbar-expand-sm navbar-dark">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <h1 class="navbar-brand navbar-brand-autodark">
        <a href="#">IMG
          {/* <img src="..." width="110" height="32" alt="Tabler" class="navbar-brand-image"> */}
        </a>
      </h1>
      <div class="collapse navbar-collapse" id="sidebar-menu">
        <ul class="navbar-nav pt-lg-3">
          <li class="nav-item">
            <a class="nav-link" href="./">
              <span class="nav-link-title">
                Home
              </span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span class="nav-link-title">
                Link 1
              </span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span class="nav-link-title">
                Link 2
              </span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span class="nav-link-title">
                Link 3
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
  );
}

export default Sidebar;