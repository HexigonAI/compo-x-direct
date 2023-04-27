import React from 'react'

export const WelcomeModal = ({
    setShowWelcome,
    fetchPromptData
  }) => {
  return (
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full justify-center p-4 text-center items-center">
  
      <div class=" bg-[#31353C] relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all w-[26rem]">
            <img src='../../images/tayler-profile-p-500.png' className=" z-20 h-72 object-cover w-full"/>

        <div class=" px-4 pb-4 pt-2 ">
          <div class="sm:flex sm:items-start">
            <div class=" ">
              <h3 class="text-base font-semibold  text-white" id="modal-title">Deactivate account</h3>
              <div class=" w-96">
                <p class="text-xs font-mono text-white">
                As the next generation of ai-based visual editors for the web, we are proud to release our beta 1.2 version to yoursel and your team. Take a moment to watch how different our web creation experience is compared to anything else out there.  
                <br/> <br/>Then, start by adding a prompt with proper, HTML based cues such as..
                </p> 
              </div>
              <div className="text-xs text-white flex  justify-center flex-col items-center">
                <p>Start with an example prompt:</p>
                <div className=' w-96 p-2  rounded-xl bg-[#F7F7F7] text-black'> Create a Hero Section </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-[#6366F1] px-4 py-2 sm:flex sm:flex-row-reverse sm:px-6">
          <button onClick={(e) =>{ fetchPromptData(e, 'Create a Hero section'); setShowWelcome(false); console.log('test');}} type="button" class=" bg-transparent w-full text-white">Generate</button>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default WelcomeModal