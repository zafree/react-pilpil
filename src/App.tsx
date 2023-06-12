import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Pilpil } from "./Pilpil/Pilpil";

function App() {
  return (
    <div className="App">
      <Pilpil
        width={3820}
        height={2762}
        smallUrl="https://cdn-images-1.medium.com/freeze/max/30/1*veE0CsrcA2x0NSKF3dzg4g.png?q=20"
        largeUrl="https://cdn-images-1.medium.com/max/2000/1*veE0CsrcA2x0NSKF3dzg4g.png"
        alt="image-alt"
      />
    </div>
  );
}

export default App;
