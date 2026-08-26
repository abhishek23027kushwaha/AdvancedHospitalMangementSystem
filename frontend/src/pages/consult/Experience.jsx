import React from 'react';

const Experience = () => {
  const videos = [
    {
      title: "#HelloDoctor Consult a doctor online from home",
      videoId: "dQw4w9WgXcQ" // Placeholder ID, replace with actual
    },
    {
      title: "#HelloDoctor Consult a doctor online from home",
      videoId: "dQw4w9WgXcQ"
    },
    {
      title: "Video Consult with Top Doctors Online",
      videoId: "dQw4w9WgXcQ"
    }
  ];

  return (
    <div className="w-full bg-white py-16 border-b border-[#F0F0F5]">
      <div className="max-w-[1200px] mx-auto px-4">
        
        <h2 className="text-[24px] font-bold text-[#414146] mb-8 text-left">
          Experience online doctor consultations
        </h2>

        {/* Video Carousel */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x pb-4">
          {videos.map((video, idx) => (
            <div key={idx} className="flex-shrink-0 w-[340px] md:w-[380px] snap-start flex flex-col gap-3">
              {/* YouTube Embed */}
              <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden bg-black shadow-md">
                <iframe 
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.videoId}?modestbranding=1&rel=0`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* Video Title */}
              <p className="text-[14px] font-medium text-[#414146] leading-snug pr-4">
                {video.title}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Experience;
