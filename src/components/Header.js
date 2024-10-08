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
    <header className="h-16 flex justify-between bg-white text-gray-800 print:hidden container mx-auto flex items-center justify-between">
      <h1 className="text-xl font-bold dark:text-black hidden md:block pr-0 md:pr-3">
        <a href=".">Tabler</a> 
      </h1>
      <div className="flex flex-row md:order-last">
        {/* Tambahkan konten header di sini */}
        <Button type="danger" onClick={handleLogout}>Logout</Button>
      </div>
    </header>
  );
}

export default Header;