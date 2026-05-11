import React from "react";
import HeaderTop from "./HeaderTop/HeaderTop";
import HeaderBottom from "./HeaderBottom/HeaderBottm";

const Header = () => {
  return (
    <div className=" bg-base-200 shadow-sm ">
        <HeaderTop />
        <HeaderBottom />
    </div>
        
  );
};

export default Header;
