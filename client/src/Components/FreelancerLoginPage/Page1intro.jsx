import React from 'react'

function Page1intro() {
    return (
        <>
            <div className='h-screen w-screen flex  flex-col justify-center items-center'>
                <div>
                    <img src="/FreelancerLoginPageImages/intro.png" alt="" />
                </div>
                <div>
                    <h1 className='text-6xl mb-4 text-center'> <strong>Here's what's next:</strong></h1>
                </div>
                <div className='mb-5'>
                    <span className='text-2xl font-semibold'><strong className='text-primary'>1.</strong> Complete your Freelancer profile</span><br />
                    <span className='text-2xl font-semibold'><strong className='text-primary'>2.</strong> Fill the information</span><br />
                    <span className='text-2xl font-semibold'><strong className='text-primary'>3.</strong> Publish and start selling!</span><br />
                </div >
                <div className='flex' >
                    <div><button className='mb-4 mr-4 py-2 px-8 text-white text-xl transition-all duration-300 hover:bg-yellow-600 hover:shadow-lg bg-primary rounded-lg '>
                        Complete your Freelancer profile</button>
                    </div>
                    <div><button className='mb-4 mr-4 py-2 px-8 text-white text-xl transition-all duration-300 hover:bg-slate-400 hover:shadow-lg bg-slate-600 rounded-lg '>
                        Back</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page1intro