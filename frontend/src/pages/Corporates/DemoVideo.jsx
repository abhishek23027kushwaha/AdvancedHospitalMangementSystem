import React from 'react';

const DemoVideo = () => {
  return (
    <div className="w-full bg-[#f8f9fa] py-12 md:py-20">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        <h2 className="text-[24px] md:text-[28px] font-bold text-[#1a1a1a] text-center mb-10">
          Demo Video
        </h2>
        
        <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
          {/* Using a placeholder YouTube embed link. Replace the src with actual Video ID */}
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            title="Practo - Employee Health Benefits | Designed for Corporates" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default DemoVideo;
