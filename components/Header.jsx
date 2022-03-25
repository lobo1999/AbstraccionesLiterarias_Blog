import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { getCategories } from '../services';
import ucrlogo from '../public/ucrlogo.png';
import clijlogo from '../public/CLIJlogo.png';
import Image from 'next/image'

const Header = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then((newCategories) => setCategories(newCategories))
    }, []);

    return (
        <div className='container mx-auto px-10 mb-8'>
            <div className='border-b w-full inline-block border-blue-400 py-8'>
                <Link href="/">
                    <span className='cursor-pointer font-semibold text-4xl right-12 text-white'>
                        Abstracciones literarias TCU-370
                    </span>
                </Link>
                <div className='md:fliat-left display: block'>
                    <Image
                        unoptimized
                        height='200px'
                        width='385px'
                        layout='intrinsic'
                        className='align-middle rounded-full mx-auto'
                        src={ucrlogo}
                    />
                </div>
                <div className='hidden md:float-left md:contents'>
                    {categories.map((category) => (
                        <Link key={category.slug} href={`/category/${category.slug}`}>
                            <span className='md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer'>
                                {category.nombre}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Header
