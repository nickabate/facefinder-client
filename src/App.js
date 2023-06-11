import { Navigation } from "./components/Navigation/Navigation";
import "./App.css";
import { Logo } from "./components/Logo/Logo";
import { ImageLink } from "./components/ImageLink/ImageLink";
import { Rank } from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";

function App() {
  return (
    <div className="App">
      <ParticlesBg bg={true} type="cobweb" />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLink />
    </div>
  );
}

export default App;
