import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { getCategories } from '../services';

const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories))
    }, []);

    return (
        <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                Categorías
            </h3>
            {categories.map((category) => (
                <Link key={category.slug} href={`/category/${category.slug}`}>
                    <span className='cursor-pointer block pb-3 mb-3 hover:text-blue-800 transition duration-400 rounded'>
                        {category.nombre}
                    </span>
                </Link>
            ))}
        </div>
    )
}

export default Categories