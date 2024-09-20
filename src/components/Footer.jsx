import React from 'react'

const Footer = () => {

  const date = new Date()

  return (
    <footer className='footer'>
        <div className='bg-gray-700 text-white p-4 text-center'>
            <p>&copy; {date.getFullYear()} Mosaic. All Rights Reserved.</p>
        </div>
    </footer>
  )
}

export default Footer
