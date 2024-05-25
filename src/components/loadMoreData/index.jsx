import { useEffect, useRef, useState } from 'react';
import './styles.css';

export default function LoadMoreData({ url, limit }) {
    const [count, setCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [disableButton, setDisableButton] = useState(false);
    const isMounted = useRef(false);

    async function fetchProducts() {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(`${url}?limit=${limit}&skip=${count * limit}`);
            if (!res.ok) {
                throw new Error('Error occured. please try again.');
            }
            const data = await res.json();
            setProducts((prevData) => [...prevData, ...data.products])
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isMounted.current) {
            fetchProducts();
        } else {
            isMounted.current = true;
        }
    }, [count, url])

    useEffect(() => {
        products?.length === 100 && setDisableButton(true);
    })

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{error}</div>
    }

    console.log(products);

    return (
        <div className='container'>

            <div
                className='products-container'
            >
                {
                    products?.length
                    && products.map(product => (
                        <div
                            key={product.id}
                            className='product'>
                            <p>{product.id}</p>
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                            />
                            <p>{product.title}</p>
                        </div>
                    ))
                }
            </div>
            {disableButton && <p>No more products to load</p>}
            <button disabled={disableButton} className={!disableButton ? 'button' : 'button disabled'} onClick={() => setCount(count + 1)}>Load More Products</button>
        </div>
    )
}