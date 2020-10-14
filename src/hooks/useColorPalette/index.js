import { useEffect, useState } from 'react';
import { generate } from '@ant-design/colors';
import { generateThemeColor, changeAntdTheme } from 'mini-dynamic-antd-theme';
import { STYLES } from '../../constants';
import colorsCss from './colors.css';

const useColorPalette = (initialPrimaryColor = STYLES.DEFAULT_PRIMARY_COLOR) => {
    const [primaryColor, setPrimaryColor] = useState(initialPrimaryColor)
    const [colorPalette, setColorPalette] = useState();
    const [themeColors, setThemeColors] = useState();

    useEffect(() => {
        const newColorPalette = generate(primaryColor)
        setColorPalette(newColorPalette);

        const newThemeColors = generateThemeColor(primaryColor);
        setThemeColors(newThemeColors);
    }, [primaryColor])

    useEffect(() => {
        if (themeColors) {
            changeAntdTheme(themeColors);

            const colorPaletteStyleElm = document.getElementById(STYLES.COLOR_PALETTE_STYLE_ID)

            if (!colorPaletteStyleElm) {
                const styleNode = document.createElement('style')
                styleNode.id = STYLES.COLOR_PALETTE_STYLE_ID
                styleNode.innerHTML = colorsCss(colorPalette);
                document.getElementsByTagName('head')[0].appendChild(styleNode)

            }
            else {
                colorPaletteStyleElm.innerHTML = colorsCss(colorPalette);
            }
        }

    }, [themeColors, colorPalette])

    return [primaryColor, setPrimaryColor, colorPalette]
}

export default useColorPalette;