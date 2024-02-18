import React from 'react';
import * as Variants from './SelectVariants/index';

export const Select = React.memo((props) => {
    
    const VariantComponetn = React.useMemo(() => {
        return Variants[props.variant] || <div>There is missing variant for {props.variant}</div>
    },[props.variant]);

    return <VariantComponetn {...props} />
});

Select.variants = {
    LABEL_UP: 'LabelUp',
    LABEL_LEFT: 'LabelLeft',
};