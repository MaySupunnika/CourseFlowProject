import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation, FreeMode } from 'swiper/modules';

import graduate1 from "../assets/homepage/graduate1.png"
import graduate2 from "../assets/homepage/graduate2.png"
import doublequote from "../assets/homepage/doublequote.png"
import doublequotedown from "../assets/homepage/doublequotedown.png"


function SlideAuto() {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                freeMode={true}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation, FreeMode, Autoplay]}
                className="h-[100%] mb-[215px] w-[80%]"
            >

                <SwiperSlide className="flex justify-center items-center w-[100%] pl-[6%]">
                    <div className="bg-blue-100 w-[40%] h-auto relative">
                        <div className='flex flex-col pt-[15%] pb-[15%] pl-[15%]'>
                            <div className="mb-[10px] font-semibold text-blue-500 text-xl">
                                Saiful Islam
                            </div>
                            <p className="text-gray-700">
                                Start with something simple and small, then expand over time.
                            </p>
                            <p className="text-gray-700">
                                If people call it a ‘toy’ you’re definitely onto something.
                            </p>
                            <p className="text-gray-700">
                                If you’re waiting for encouragement from others, you’re doing it
                            </p>
                            <p className="text-gray-700">
                                wrong. By the time people think an idea is good, it’s probably
                            </p>
                            <p className="text-gray-700">too late.</p>
                            <img
                                className="absolute top-[10%] left-[-25%]"
                                src={graduate1}
                            >
                            </img>
                            <img
                                className="absolute top-0 left-[-25%]"
                                src={doublequote}
                            >
                            </img>
                            <img
                                className="absolute bottom-[5%] right-[5%]"
                                src={doublequotedown}
                            >
                            </img>
                        </div>


                    </div>
                </SwiperSlide>
                <SwiperSlide className="flex justify-center items-center w-[30%] pl-[6%] relative">
                    <div className="bg-blue-100 w-[40%] h-auto relative">
                        <div className='flex flex-col pt-[15%] pb-[15%] pl-[15%]'>
                            <div className="mb-[10px] font-semibold text-blue-500 text-xl">
                                Saiful Islam
                            </div>
                            <p className="text-gray-700">
                                Start with something simple and small, then expand over time.
                            </p>
                            <p className="text-gray-700">
                                If people call it a ‘toy’ you’re definitely onto something.
                            </p>
                            <p className="text-gray-700">
                                If you’re waiting for encouragement from others, you’re doing it
                            </p>
                            <p className="text-gray-700">
                                wrong. By the time people think an idea is good, it’s probably
                            </p>
                            <p className="text-gray-700">too late.</p>
                            <img
                                className="absolute top-[10%] left-[-25%]"
                                src={graduate2}
                            >
                            </img>
                            <img
                                className="absolute top-0 left-[-25%]"
                                src={doublequote}
                            >
                            </img>
                            <img
                                className="absolute bottom-[5%] right-[5%]"
                                src={doublequotedown}
                            >
                            </img>
                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide className="flex justify-center items-center w-[30%] pl-[6%]">
                    <div className="bg-blue-100 w-[40%] h-auto relative">
                        <div className='flex flex-col pt-[15%] pb-[15%] pl-[15%]'>
                            <div className="mb-[10px] font-semibold text-blue-500 text-xl">
                                Saiful Islam
                            </div>
                            <p className="text-gray-700">
                                Start with something simple and small, then expand over time.
                            </p>
                            <p className="text-gray-700">
                                If people call it a ‘toy’ you’re definitely onto something.
                            </p>
                            <p className="text-gray-700">
                                If you’re waiting for encouragement from others, you’re doing it
                            </p>
                            <p className="text-gray-700">
                                wrong. By the time people think an idea is good, it’s probably
                            </p>
                            <p className="text-gray-700">too late.</p>
                            <img
                                className="absolute top-[10%] left-[-25%]"
                                src={graduate1}
                            >
                            </img>
                            <img
                                className="absolute top-0 left-[-25%]"
                                src={doublequote}
                            >
                            </img>
                            <img
                                className="absolute bottom-[5%] right-[5%]"
                                src={doublequotedown}
                            >
                            </img>
                        </div>


                    </div>
                </SwiperSlide>
                <SwiperSlide className="flex justify-center items-center w-[30%] pl-[6%]">
                    <div className="bg-blue-100 w-[40%] h-auto relative">
                        <div className='flex flex-col pt-[15%] pb-[15%] pl-[15%]'>
                            <div className="mb-[10px] font-semibold text-blue-500 text-xl">
                                Saiful Islam
                            </div>
                            <p className="text-gray-700">
                                Start with something simple and small, then expand over time.
                            </p>
                            <p className="text-gray-700">
                                If people call it a ‘toy’ you’re definitely onto something.
                            </p>
                            <p className="text-gray-700">
                                If you’re waiting for encouragement from others, you’re doing it
                            </p>
                            <p className="text-gray-700">
                                wrong. By the time people think an idea is good, it’s probably
                            </p>
                            <p className="text-gray-700">too late.</p>
                            <img
                                className="absolute top-[10%] left-[-25%]"
                                src={graduate2}
                            >
                            </img>
                            <img
                                className="absolute top-0 left-[-25%]"
                                src={doublequote}
                            >
                            </img>
                            <img
                                className="absolute bottom-[5%] right-[5%]"
                                src={doublequotedown}
                            >
                            </img>
                        </div>


                    </div>
                </SwiperSlide>

                {/* <SwiperSlide className="flex justify-center items-center w-[30%] pl-[6%]">
                    <div className="bg-blue-100 w-[40%] h-[312px] py-[5%] pl-[10%] pr-[20px] relative">
                        <div className="mb-[10px] font-semibold text-blue-500 text-xl">
                            Saiful Islam
                        </div>
                        <p className="text-gray-700">
                            Start with something simple and small, then expand over time.
                        </p>
                        <p className="text-gray-700">
                            If people call it a ‘toy’ you’re definitely onto something.
                        </p>
                        <p className="text-gray-700">
                            If you’re waiting for encouragement from others, you’re doing it
                        </p>
                        <p className="text-gray-700">
                            wrong. By the time people think an idea is good, it’s probably
                        </p>
                        <p className="text-gray-700">too late.</p>
                        <img
                            className="absolute top-[10%] left-[-10%]"
                            src={graduate2}
                        ></img>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="flex justify-center items-center w-[30%] pl-[6%]">
                    <div className="bg-blue-100 w-[40%] h-[312px] py-[5%] pl-[10%] pr-[20px] relative">
                        <div className="mb-[10px] font-semibold text-blue-500 text-xl">
                            Saiful Islam
                        </div>
                        <p className="text-gray-700">
                            Start with something simple and small, then expand over time.
                        </p>
                        <p className="text-gray-700">
                            If people call it a ‘toy’ you’re definitely onto something.
                        </p>
                        <p className="text-gray-700">
                            If you’re waiting for encouragement from others, you’re doing it
                        </p>
                        <p className="text-gray-700">
                            wrong. By the time people think an idea is good, it’s probably
                        </p>
                        <p className="text-gray-700">too late.</p>
                        <img
                            className="absolute top-[10%] left-[-10%]"
                            src={graduate1}
                        ></img>
                    </div>
                </SwiperSlide>
                <SwiperSlide className="flex justify-center items-center w-[30%] pl-[6%]">
                    <div className="bg-blue-100 w-[40%] h-[312px] py-[5%] pl-[10%] pr-[20px] relative">
                        <div className="mb-[10px] font-semibold text-blue-500 text-xl">
                            Saiful Islam
                        </div>
                        <p className="text-gray-700">
                            Start with something simple and small, then expand over time.
                        </p>
                        <p className="text-gray-700">
                            If people call it a ‘toy’ you’re definitely onto something.
                        </p>
                        <p className="text-gray-700">
                            If you’re waiting for encouragement from others, you’re doing it
                        </p>
                        <p className="text-gray-700">
                            wrong. By the time people think an idea is good, it’s probably
                        </p>
                        <p className="text-gray-700">too late.</p>
                        <img
                            className="absolute top-[10%] left-[-10%]"
                            src={graduate2}
                        ></img>
                    </div>
                </SwiperSlide> */}
            </Swiper>
        </>
    );
}

export default SlideAuto;
