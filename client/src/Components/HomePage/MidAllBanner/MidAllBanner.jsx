import React from 'react';

const MidAllBanner = () => {
    return (
        <div>
            <section className="colection-video w-11/12 mx-auto mt-3 space-y-3">
            <div>
                <video className="rounded-xl" src="./videos/colection-video.mp4" autoPlay muted loop>Your browser does not support the video tag.</video>
            </div>

            <div>
                <img className="rounded-xl" src="./images/colection-2.avif" alt=""></img>
            </div>
            <div>
                <img className='w-full h-70 rounded-xl' src="https://saralifestyle.com/_next/image?url=https%3A%2F%2Fprod.saralifestyle.com%2FImages%2FContent%2Ff5ee353ee2b646b8a8efa2361f37565a.jpeg&w=1080&q=75" alt=""></img>
            </div>
        </section>
        <section className='mt-3 w-11/12 mx-auto gap-y-4 flex flex-wrap justify-between'>
            <div className='w-[170px] h-[255px] bg-green-300 rounded-2xl border-2 border-blue-600 content-center text-center'>
                MEN
            </div>
            <div className='w-[170px] h-[255px] bg-green-300 rounded-2xl border-2 border-blue-600 content-center text-center'>
                WOMEN
            </div>
            <div className='w-[170px] h-[255px] bg-green-300 rounded-2xl border-2 border-blue-600 content-center text-center'>
                KIDS
            </div>
            <div className='w-[170px] h-[255px] bg-green-300 rounded-2xl border-2 border-blue-600 content-center text-center'>
                DHEU
            </div>
        </section>
        </div>
    );
};

export default MidAllBanner;