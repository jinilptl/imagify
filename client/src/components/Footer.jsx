import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className=' flex items-center justify-between gap-4 py-3 mt-20'>
        <img src={assets.logo} width={150}/>
        <p className=' flex-1  border-l border-grey-400 pl-4 text-sm text-gray-500 max-sm:hidden'>
            Copyright @JinilPatel.dev | All right reserved
        </p>
        <div className=' flex gap-2.5'>
            <img src={assets.facebook_icon}/>
            <img src={assets.instagram_icon}/>
            <img src={assets.twitter_icon}/>
        </div>
    </div>
  )
}

export default Footer