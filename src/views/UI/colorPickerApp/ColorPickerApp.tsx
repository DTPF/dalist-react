import { useContext } from 'react';
import ThemeContext from 'context/theme/ThemeContext';
import { ChromePicker as ColorPicker } from 'react-color';

export default function ColorPickerApp() {
  const { currentThemeColor, setAppThemeColorAction } = useContext(ThemeContext);
  return (
    <ColorPicker color={currentThemeColor.colorPrimaryBg} onChange={(e) => setAppThemeColorAction(e.hex)} />
  );
}
