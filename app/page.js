import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className='flex justify-center flex-col items-center gap-4 text-white h-[44vh] px-5 md:px-0 text-s md:text-base'>
        <div className='font-bold md:text-3xl flex gap-2 text-2xl justify-center items-center'>Buy me A Chai<span><img className='invertImg' src="/tea.gif" width={88} alt="TEA GIF" /></span></div>
          
        <p className="text-center md:text-left md:text-xl">A crowdfunding platform for creators. Get funded your projects. Start now!</p>
        <div>
          <Link href={"/login"}>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
          </Link>
          <Link href={"/about"}>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
          </Link>
        </div>
      </div>
      <div className='bg-white opacity-10 h-1'></div>
      <div className='text-white container mx-auto pb-32 pt-14 px-10 text-s md:text-base'>
        <h2 className='md:text-2xl text-xl font-bold text-center mb-14'>Your fans can buy you a ☕Chai</h2>
        <div className='flex gap-5 justify-around'>
        <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className='bg-slate-400 rounded-full p-2 text-black' src="https://lordicon.com/icons/wired/lineal/1846-employee-working.gif" width={88} alt="" />
            <p className='font-bold text-center'>Fans want to help</p>
            <p className='text-center'>Your fans are available to help you.</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className='bg-slate-400 rounded-full p-2 text-black' src="https://lordicon.com/icons/wired/flat/291-coin-dollar.gif" width={88} alt="" />
            <p className='font-bold text-center'>Fans want to help</p>
            <p className='text-center'>Your fans are available to help you.</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className='bg-slate-400 rounded-full p-2 text-black' src="https://lordicon.com/icons/wired/flat/2374-crowdfunding.gif" width={88} alt="" />
            <p className='font-bold text-center'>Fans want to help</p>
            <p className='text-center'>Your fans are available to help you.</p>
          </div>
        </div>
      </div>
    </>
  );
}
