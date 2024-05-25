import { useEffect, useRef, useState } from 'react';
import './styles.css';

export default function LoadMoreData({ url, limit }) {
    const [count, setCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMoreProducts, setHasMoreProducts] = useState(true);
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
            setProducts((prevData) => [...prevData, ...data.products]);
            if (data.products.length < limit) {
                setHasMoreProducts(false);
            }
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

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>{error}</div>
    }

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
            {!hasMoreProducts && <p>No more products to load</p>}
            <button
                disabled={!hasMoreProducts}
                className={hasMoreProducts
                    ? 'button'
                    : 'button disabled'
                }
                onClick={() => setCount(count + 1)}
            >
                Load More Products
            </button>
        </div>
    )
}