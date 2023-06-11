import Tilt from "react-parallax-tilt";
import logo from "./brain-icon.png";
import "./Logo.css";

export const Logo = () => {
  return (
    <div className="ma4 mt0 logo-container">
      <Tilt>
        <div className="tilt pa3 shadow-5 br3">
          <img style={{ paddingTop: "5px" }} src={logo} alt="logo" />
        </div>
      </Tilt>
    </div>
  );
};
