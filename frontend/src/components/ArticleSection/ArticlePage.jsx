import React from 'react';
import { Link } from 'react-router-dom';

const ArticlePage = () => {
  const articles = [
    {
      category: "CORONAVIRUS",
      title: "12 Coronavirus Myths and Facts That You Should Be Aware Of",
      author: "Dr. Diana Borgio",
      image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&q=80&w=400&h=300",
      link: "#"
    },
    {
      category: "VITAMINS AND SUPPLEMENTS",
      title: "Eating Right to Build Immunity Against Cold and Viral Infections",
      author: "Dr. Diana Borgio",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400&h=300",
      link: "#"
    }
  ];

  return (
    <div className="w-full bg-white py-12 border-b border-[#F0F0F5]">
      <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Content Area */}
        <div className="w-full md:w-1/3 flex flex-col items-start text-left">
          <h2 className="text-[28px] font-bold text-[#414146] mb-3 leading-tight">
            Read top articles from health experts
          </h2>
          <p className="text-[14px] text-[#787887] mb-6 leading-relaxed">
            Health articles that keep you informed about good health practices and achieve your goals.
          </p>
          <Link 
            to="/articles"
            className="px-6 py-3 bg-[#00B8E6] text-white font-bold text-[14px] rounded hover:bg-[#0096bf] transition-colors inline-block no-underline"
          >
            See all articles
          </Link>
        </div>

        {/* Right Articles Grid */}
        <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article, idx) => (
            <Link 
              key={idx} 
              to={article.link} 
              className="flex flex-col group cursor-pointer no-underline"
            >
              {/* Image */}
              <div className="w-full h-[200px] rounded-lg overflow-hidden mb-4">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              
              {/* Text Content */}
              <div>
                <span className="text-[12px] font-bold text-[#00B8E6] uppercase tracking-wide mb-1 block">
                  {article.category}
                </span>
                <h3 className="text-[16px] font-bold text-[#414146] mb-2 leading-snug group-hover:text-[#00B8E6] transition-colors">
                  {article.title}
                </h3>
                <p className="text-[13px] text-[#787887]">
                  {article.author}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ArticlePage;
