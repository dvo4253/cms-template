import React, { useState } from 'react'
import { Input } from 'antd';
import { generate } from '@ant-design/colors';
import { FIELDS } from '../../../constants';

const { ANT_COLOR_SELECTOR } = FIELDS;

const AntColorSelector = ({ input }) => {
    const [color, setColor] = useState(input.value);
    const colors = generate(color)

    const onChange = (e) => {
        input.onChange(e);
        if (e.target) {
            setColor(e.target.value);
        }
    }

    const ColorPalate = Array.isArray(colors) ? colors.map((color, i) => {
        return <div key={i} style={{ background: color, width: "75px", height: '60px' }} />
    }) : null;
    return (<>

        <Input addonBefore='Primary Color' type="color"   {...input} onChange={onChange} />
        <div style={{ display: "flex" }}>{ColorPalate}</div>
    </>
    )
}

export default {
    name: ANT_COLOR_SELECTOR,
    Component: AntColorSelector,
}