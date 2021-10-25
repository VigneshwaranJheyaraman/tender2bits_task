import React from "react";

export const ThemeContext = React.createContext({
	isLightTheme:true,
	toggleTheme: () => {}
});