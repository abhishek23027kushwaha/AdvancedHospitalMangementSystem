import React from 'react';
import { ChevronDown } from 'lucide-react';

const SearchFilterBar = () => {
  return (
    <div className="w-full bg-white pb-10">
      <div className="max-w-[1200px] mx-auto px-4">
        
        <div className="flex flex-col md:flex-row items-center gap-4">
          
          {/* Location Dropdown */}
          <div className="relative w-full md:w-[220px]">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-gray-500 font-medium">Location*</label>
            <div className="flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 cursor-pointer hover:border-gray-400">
              <span className="text-[14px] text-gray-800">Bangalore</span>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="relative w-full md:w-[300px]">
            <div className="flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 cursor-pointer hover:border-gray-400">
              <span className="text-[14px] text-gray-500">Hospitals & Clinics</span>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-gray-500 font-medium">Search by name</label>
            <input 
              type="text" 
              placeholder="e.g. Doctor name, Specialty"
              defaultValue="orthopaedics-joint-replacement"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-[14px] text-gray-800 focus:outline-none focus:border-blue-500 placeholder-gray-400"
            />
          </div>

          {/* Apply Button */}
          <button className="w-full md:w-[150px] bg-[#004f9e] hover:bg-[#003d7a] text-white font-medium py-3 rounded-md transition-colors text-[14px]">
            Apply
          </button>

        </div>

      </div>
    </div>
  );
};

export default SearchFilterBar;
