import React  from 'react';
import { useFormScreenPlugin, useForm } from 'tinacms';
import useColorPalette from '../useColorPalette';

const useStyleForm = () => {
    const [_, setPrimaryColor] = useColorPalette() /* eslint-disable-line no-unused-vars */
    const onSubmit = (e) => {
        if(e.color && e.color.primary) {
            setPrimaryColor(e.color.primary)
        }
    }
    const ScreenPluginForm = {
        label: "Styles",
        name: "global.styles",
        Icon: () => <span role="img" aria-label="llama">🦙</span>,
        onSubmit,
        fields: [
            {
                label: "Primary Color",
                name: "color.primary",
                component: "ant-color-selector"
            },
            {
                label: "Secondary Color",
                name: "color.secondary",
                component: "ant-color-selector"
            }
        ],
        layout: 'fullscreen' 
    }

    const [data, form] = useForm(ScreenPluginForm)
    useFormScreenPlugin(form);
    return data;
}
export default useStyleForm;