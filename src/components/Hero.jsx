
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import Link from "next/link";

const Hero = () => {
    return (
        <div className="max-w-7xl mx-auto my-10 px-4">
            <div className="flex flex-col md:flex-row items-center gap-10">

                {/* Left Side */}
                <div className="flex-1 flex flex-col gap-6">
                    <div className="flex gap-2 items-center px-5 py-2 rounded-2xl bg-red-100 dark:bg-red-900 w-fit">
                        <CiHeart className="text-red-500 text-xl" />
                        <p className="text-red-600 dark:text-red-300 font-medium">500+ Happy Adoptions</p>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold leading-tight dark:text-white">
                        <span>Give a</span><br />
                        <span>Pet a Forever</span><br />
                        <span>Home</span>
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md">
                        Thousands of loving animals are waiting for the right family.
                        Browse pets near you and start your adoption journey today.
                    </p>

                    <div className="flex gap-4">
                        <Link href="/all-pets" className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors">
                            Adopt Now <FaArrowRightLong />
                        </Link>
                        <Link href="/add-pet" className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 dark:text-white rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            List a Pet <IoIosAddCircle />
                        </Link>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex-1 flex justify-center items-center">
                    <div className="relative" style={{ width: "400px", height: "450px" }}>

                        {/* Top-left floating card */}
                        <div
                            className="absolute z-10 bg-white dark:bg-gray-800 shadow-xl rounded-2xl px-4 py-3 flex gap-3 items-center"
                            style={{ top: "-24px", left: "-32px" }}
                        >
                            <Image
                                src="/dog.jpeg"
                                alt="Max"
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                                style={{ width: "40px", height: "40px" }}
                            />
                            <div>
                                <p className="text-sm font-bold dark:text-white">Max</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Looking for home</p>
                            </div>
                        </div>

                        {/* Main Image with float animation */}
                        <div style={{
                            width: "400px",
                            height: "450px",
                            animation: "floatUpDown 3s ease-in-out infinite"
                        }}>
                            <Image
                                src="/cat.jpg"
                                alt="Hero Cat"
                                width={400}
                                height={450}
                                className="rounded-3xl object-cover shadow-2xl"
                                style={{ width: "400px", height: "450px" }}
                            />
                        </div>

                        {/* Bottom-right floating card */}
                        <div
                            className="absolute z-10 bg-white dark:bg-gray-800 shadow-xl rounded-2xl px-4 py-3 flex gap-3 items-center"
                            style={{ bottom: "-24px", right: "-32px" }}
                        >
                            <Image
                                src="/dog1.jpeg"
                                alt="Luna"
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                                style={{ width: "40px", height: "40px" }}
                            />
                            <div>
                                <p className="text-sm font-bold dark:text-white">Luna</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Available now</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* Float keyframe inline */}
            <style>{`
                @keyframes floatUpDown {
                0%   { transform: translate(0px, 0px); }
                25%  { transform: translate(10px, -15px); }
                50%  { transform: translate(0px, -20px); }
                75%  { transform: translate(-10px, -15px); }
                100% { transform: translate(0px, 0px); }
                }
            `}</style>

        </div>
    );
};

export default Hero;
