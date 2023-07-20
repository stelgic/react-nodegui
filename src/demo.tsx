import React from "react";
import { QWebChannel } from "@nodegui/nodegui";
import { Text, Renderer, Window } from ".";
import { Button } from "./components/Button";
import { View } from "./components/View";
import { WebView } from "./components/WebView";

const channel = new QWebChannel();
const html = `
<!DOCTYPE html>
<html>
<body>
<h1>My First Heading</h1>
<p>My first paragraph.</p>
</body>
</html> 
`;

const App = () => {
  return (
    <Window styleSheet={styleSheet}>
      <View id="container">
        <View id="textContainer">
          <Text>Hello</Text>
        </View>
        <View>
          <Button text="Click me"></Button>
        </View>
        <View>
          <WebView channel={channel} html={html}></WebView>
        </View>
      </View>
    </Window>
  );
};

const styleSheet = `
  #container {
    flex: 1;
    min-height: '100%';
    justify-content: 'center';
  }
  #textContainer {
    flex-direction: 'row';
    justify-content: 'space-around';
    align-items: 'center';
  }
`;

Renderer.render(<App />);
