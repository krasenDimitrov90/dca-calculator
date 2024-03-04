import React from 'react';
import * as Variants from './Loaders/index';

export const Loader = React.memo((props) => {
    const variant = props.variant;

    const VariantComponent = React.useMemo(() => {
        return Variants[variant] || <div>There is missing variant for ${variant}</div>
    },[variant]);


    return (
        <VariantComponent {...props} />
    );
});


Loader.variants = {
    LOADER_BARS: 'LoaderBars',
};
