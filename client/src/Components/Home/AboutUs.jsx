function AboutUs() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10 font-title'>
            {/* Title */}
            <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400 mb-8'>
                About Us
            </h1>

            {/* Developer Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-10 px-4 m-2'>
                {/* Developer 1 */}
                <div className='flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transition hover:scale-105'>
                    {/* Profile Icon */}
                    <div className='bg-blue-100 rounded-full p-3 mb-4'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-16 h-16 text-blue-600"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    {/* Text Info */}
                    <div className='text-center'>
                        <h2 className='text-lg font-semibold text-gray-700 mb-2'>Frontend Developer</h2>
                        <p className='text-gray-600 text-sm mb-4'>
                            Creating user-friendly interfaces that enhance the client experience.
                        </p>
                    </div>
                    {/* Social Icons */}
                    <div className='flex space-x-4'>
                        <SocialIcon />
                    </div>
                </div>

                {/* Developer 2 */}
                <div className='flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transition hover:scale-105'>
                    <div className='bg-blue-100 rounded-full p-3 mb-4'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-16 h-16 text-blue-600"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className='text-center'>
                        <h2 className='text-lg font-semibold text-gray-700 mb-2'>Frontend Developer</h2>
                        <p className='text-gray-600 text-sm mb-4'>
                            Crafting responsive designs for seamless client interactions.
                        </p>
                    </div>
                    <div className='flex space-x-4'>
                        <SocialIcon />
                    </div>
                </div>

                
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-10 px-4 m-2'>
                {/* Developer 1 */}
                <div className='flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transition hover:scale-105'>
                    {/* Profile Icon */}
                    <div className='bg-blue-100 rounded-full p-3 mb-4'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-16 h-16 text-blue-600"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    {/* Text Info */}
                    <div className='text-center'>
                        <h2 className='text-lg font-semibold text-gray-700 mb-2'>Frontend Developer</h2>
                        <p className='text-gray-600 text-sm mb-4'>
                            Creating user-friendly interfaces that enhance the client experience.
                        </p>
                    </div>
                    {/* Social Icons */}
                    <div className='flex space-x-4'>
                        <SocialIcon />
                    </div>
                </div>

                {/* Developer 2 */}
                <div className='flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transition hover:scale-105'>
                    <div className='bg-blue-100 rounded-full p-3 mb-4'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-16 h-16 text-blue-600"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <div className='text-center'>
                        <h2 className='text-lg font-semibold text-gray-700 mb-2'>Frontend Developer</h2>
                        <p className='text-gray-600 text-sm mb-4'>
                            Crafting responsive designs for seamless client interactions.
                        </p>
                    </div>
                    <div className='flex space-x-4'>
                        <SocialIcon />
                    </div>
                </div>
            </div>
             
        </div>
    );
}

const SocialIcon = () => (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:text-blue-500 transition">
  <path d="M12 7.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
  <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 14.625v-9.75ZM8.25 9.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM18.75 9a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V9.75a.75.75 0 0 0-.75-.75h-.008ZM4.5 9.75A.75.75 0 0 1 5.25 9h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V9.75Z" clipRule="evenodd" />
  <path d="M2.25 18a.75.75 0 0 0 0 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 0 0-.75-.75H2.25Z" />
</svg>


        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:text-green-500 transition">
  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
</svg>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:text-yellow-500 transition">
  <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
</svg>

    </>
);

export default AboutUs;
