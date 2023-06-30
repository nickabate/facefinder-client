import { Navigation } from "./components/Navigation/Navigation";
import "./App.css";
import { Logo } from "./components/Logo/Logo";
import { ImageLink } from "./components/ImageLink/ImageLink";
import { Rank } from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import { useState } from "react";
import { FaceRecognition } from "./components/FaceRecognition/FaceRecognition";
import { SignIn } from "./components/SignIn/SignIn";
import { Register } from "./components/Register/Register";

const BASEAPI_URL = process.env.REACT_APP_BASEAPI_URL;

const initialUserState = {
  id: "",
  name: "",
  email: "",
  entries: 0,
  joined: "",
};

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [boundingBox, setBoundingBox] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(initialUserState);

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setIsSignedIn(false);
      setUser(initialUserState);
      setImageUrl("");
      setBoundingBox([]);
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const findFaceLocation = (data) => {
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    const multiple = data.outputs[0].data.regions.map((face) => {
      return face.region_info.bounding_box;
    });

    const multiple2 = multiple.map((item) => {
      return {
        leftCol: item.left_col * width,
        topRow: item.top_row * height,
        rightCol: width - item.right_col * width,
        bottomRow: height - item.bottom_row * height,
      };
    });

    return multiple2;
  };

  const displayFaceBox = (box) => {
    setBoundingBox(box);
  };

  const onSubmit = () => {
    setImageUrl(input);

    fetch(`${BASEAPI_URL}/imageurl`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch(`${BASEAPI_URL}/image`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => setUser({ ...user, entries: count }))
            .catch((err) => console.log(err));
        }
        displayFaceBox(findFaceLocation(response));
      })

      .catch((error) => console.log("error", error));
  };

  return (
    <div className="App">
      <ParticlesBg bg={true} type="cobweb" />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      <Logo />
      {route === "home" ? (
        <>
          <Rank user={user} />
          <ImageLink onInputChange={onInputChange} onSubmit={onSubmit} />
          <FaceRecognition box={boundingBox} imageUrl={imageUrl} />
        </>
      ) : route === "signin" ? (
        <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
