// import { useState } from "react";
import Logo from "./Logo";

export default function NavBar({children}) {
  
  return (
    <nav className="nav-bar">
      <Logo></Logo>
      {children}
    </nav>
  );
}
