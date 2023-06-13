export const Navigation = ({ onRouteChange, isSignedIn }) => {
  return isSignedIn === true ? (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <span
        onClick={() => onRouteChange("signout")}
        className="f3 link dim black underline pa3 pointer"
      >
        Sign Out
      </span>
    </nav>
  ) : (
    <>
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <span
          onClick={() => onRouteChange("signin")}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign In
        </span>
        <span
          onClick={() => onRouteChange("register")}
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </span>
      </nav>
    </>
  );
};
