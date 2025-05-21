import React from 'react'
import productIMG from '../assets/Image/Cactus.jpg'
function ProductAds() {
    return (
        <>
            <section className="sm:h-82 py-16  bg-cover " style={{ backgroundImage: `url(${productIMG})` }}>
                <div className="container mx-auto px-4 text-center ">
                    <h1 className="text-4xl  text-gray-800 font-extrabold">Products</h1>
                    <p className="text-black-600 mt-2 font-medium">“A beautiful plant is like having a friend around the house.”</p>
                </div>
            </section>
        </>
    )
}

export default ProductAds