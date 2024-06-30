import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-gray-600 text-white flex justify-center items-center px-4 h-16'>
        <p className='text-center'>Copyright &copy; {currentYear} Get me A ☕chai - All rights reserved!</p>
    </footer>
  )
}

export default Footer
