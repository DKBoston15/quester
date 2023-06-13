import Image from 'next/image';

import backgroundImage from '../../images/background-auth.jpg';

export function AuthLayout({ children }: any) {
  return (
    <>
      <div className="flex justify-center items-center min-h-full justify-center md:px-12 lg:px-0 h-screen bg-[#2381FE]">
        <div className="relative z-10 flex flex-1 flex-col bg-white py-10 px-4 shadow-2xl sm:justify-center md:flex-none md:px-28 h-[45rem] rounded">
          <div className="mx-auto flex justify-center items-center flex-col w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
            <img
              className="w-[3rem] h-[6rem] mt-[-1rem] w-auto object-cover pt-6 md:pt-0"
              src="/nav_logo_dark.png"
              alt="Quester logo"
            />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
