import React from "react";
import { logout } from "../api/auth";
import { Button } from './Button';

function Header() {
  const handleLogout = async () => {
    try {
      await logout();
      // Hapus token dari localStorage atau sessionStorage jika ada
      localStorage.removeItem("token");
      // Redirect ke halaman login
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <header className="navbar navbar-expand-md navbar-light d-print-none">
      <div className="container-xl">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <a href=".">Tabler</a>
        </h1>
        <div className="navbar-nav flex-row order-md-last">
          {/* Tambahkan konten header di sini */}
          {/* panggil komponen button */}
          <Button type="danger" onClick={handleLogout}>Logout</Button>

        </div>
      </div>
    </header>
  );
}

export default Header;