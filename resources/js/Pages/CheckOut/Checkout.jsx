import {useEffect} from 'react';

export default function Checkout({checkoutUrl}) {
    useEffect(() => {
        window.location.href = checkoutUrl;
    }, [checkoutUrl]);

    return null;
}
