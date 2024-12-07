import { createContext } from 'react';
import { UpdateCurrentThemeContextType, initialThemeContext } from './initialThemeState';
const ThemeContext = createContext<UpdateCurrentThemeContextType>(initialThemeContext);

export default ThemeContext;
