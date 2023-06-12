import { Navigation } from "./components/Navigation/Navigation";
import "./App.css";
import { Logo } from "./components/Logo/Logo";
import { ImageLink } from "./components/ImageLink/ImageLink";
import { Rank } from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");

  const onInputChange = (event) => {
    console.log(event.target.value);
  };

  const onSubmit = (event) => {
    console.log("click");

    // URL of image to use. Change this to your image.
    const IMAGE_URL = "https://samples.clarifai.com/metro-north.jpg";

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
        Authorization: "Key " + "6ee94d09e09e4254a440f10b9f58d8de",
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
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="App">
      <ParticlesBg bg={true} type="cobweb" />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLink onInputChange={onInputChange} onSubmit={onSubmit} />
    </div>
  );
}

export default App;
