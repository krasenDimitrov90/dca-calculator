import React from 'react';
import * as Variants from './Loaders/index';

import { useSelector } from 'react-redux';

export const Loader = React.memo((props) => {
    const appIsLoading = useSelector(state => state.appLoading.appIsLoading);
    const variant = props.variant;

    const VariantComponent = React.useMemo(() => {
        return Variants[variant] || <div>There is missing variant for ${variant}</div>
    },[variant]);

    return (
        appIsLoading ? <VariantComponent {...props} /> : undefined
    );
});


Loader.variants = {
    LOADER_BARS: 'LoaderBars',
};
