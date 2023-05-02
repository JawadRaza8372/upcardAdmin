import React from "react";
import { NavLink } from "react-router-dom";
function LinkButton({ title, link, children }) {
  return (
    <>
      <NavLink
        // activeClassName="navbtnCheck"
        // exact
        // className="navbtnCheckActive"
        className={({ isActive }) =>
          isActive ? "navbtnCheckActive" : "navbtnCheck"
        }
        to={`${link}`}
      >
        {children}
        <span className="linkName">{title}</span>
      </NavLink>
      <span className="tooltip">{title}</span>
    </>
  );
}

export default LinkButton;
