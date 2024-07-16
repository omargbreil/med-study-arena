import { useEffect, useRef } from 'react';

import React from 'react'

export default function VideoPlayer() {
    const videoRef = useRef();
  const cloudinaryRef = useRef();

  // Store the Cloudinary window instance to a ref when the page renders

  useEffect(() => {
    if ( cloudinaryRef.current ) return;

    cloudinaryRef.current = window.cloudinary;

     cloudinaryRef.current.videoPlayer(videoRef.current,{
      cloud_name:'dhqe8isrb',
    });
  }, []);

  return (<>
    
        <div className='w-100 rounded-5 alert-danger'>
        <video 
        width= '450'
        height= '240'
        ref={videoRef}
        data-cld-public-id='l-video/hkeh9vyq64klhtxwgxv9'
        controls
        />
        
        </div>
        </>
    
  )
}