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

function App() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  // const [boundingBox, setBoundingBox] = useState({});
  const [boundingBox, setBoundingBox] = useState([]);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const onRouteChange = (route) => {
    if (route === "signout") {
      setIsSignedIn(false);
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const findFaceLocation = (data) => {
    console.log(data.outputs[0].data.regions);
    // const clarifaiFace =
    //   data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    const multiple = data.outputs[0].data.regions.map((face) => {
      return face.region_info.bounding_box;
    });
    // console.log(multiple);

    const multiple2 = multiple.map((item) => {
      return {
        leftCol: item.left_col * width,
        topRow: item.top_row * height,
        rightCol: width - item.right_col * width,
        bottomRow: height - item.bottom_row * height,
      };
    });
    console.log(multiple2);

    // return {
    //   leftCol: clarifaiFace.left_col * width,
    //   topRow: clarifaiFace.top_row * height,
    //   rightCol: width - clarifaiFace.right_col * width,
    //   bottomRow: height - clarifaiFace.bottom_row * height,
    // };

    return multiple2;
  };

  const displayFaceBox = (box) => {
    console.log(box);

    setBoundingBox(box);
  };

  const onSubmit = () => {
    setImageUrl(input);

    // URL of image to use. Change this to your image.
    // const IMAGE_URL = "https://samples.clarifai.com/metro-north.jpg";
    const IMAGE_URL = input;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: "clarifai",
        app_id: "main",
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key 6ee94d09e09e4254a440f10b9f58d8de",
      },
      body: raw,
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch(
      `https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs`,
      requestOptions
    )
      .then((response) => response.json())
      .then((response) => displayFaceBox(findFaceLocation(response)))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="App">
      <ParticlesBg bg={true} type="cobweb" />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      <Logo />
      {route === "home" ? (
        <>
          <Rank />
          <ImageLink onInputChange={onInputChange} onSubmit={onSubmit} />
          <FaceRecognition box={boundingBox} imageUrl={imageUrl} />
        </>
      ) : route === "signin" ? (
        <SignIn onRouteChange={onRouteChange} />
      ) : (
        <Register onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
