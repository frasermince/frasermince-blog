import React from 'react';

let anchorStyle = {
  fontSize: "20px",
  textDecoration: "none",
  paddingTop: ".3215rem",
  paddingBottom: ".3215rem",
  color: "rgba(0,0,0,.9)"
}
const Header = (Props) => {
  return (
    <nav style={{width: "100%", borderBottom: "1px solid #e6e6e6"}}>
      <div style={{flex: 1, maxWidth: "60%", margin: "auto", padding: ".5rem 1rem"}}>
        <a style={anchorStyle} href="https://unchart.io">Unchart</a>
      </div>
    </nav>
  );
}
export default Header;
