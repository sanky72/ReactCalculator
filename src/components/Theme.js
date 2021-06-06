import React, { useContext } from "react";
import { ThemeContext } from "../Contexts/index";
const ThemeComponent = (WrapperComponent) => {
  const NewCompoent = (props) => {
    const [theme, setTheme] = useContext(ThemeContext);

    return (
      <WrapperComponent
        setTheme={setTheme}
        isDarkTheme={theme === "Dark"}
        {...props}
      />
    );
  };

  return NewCompoent;
};

export default ThemeComponent;
