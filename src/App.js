import './App.css';
import {ThemeContext} from "./theme";
import {useState} from "react";
import TodoApp from "./components/TodoApp/TodoApp";

function App() {

  var [isLightTheme, setLightTheme] = useState(true);
  const toggleTheme = () => {
    setLightTheme(!isLightTheme);
  };

  return (
    <div className={`App ${isLightTheme ? "light" : "dark"}`}>
      <ThemeContext.Provider value={{isLightTheme, toggleTheme}}>
        <TodoApp />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
