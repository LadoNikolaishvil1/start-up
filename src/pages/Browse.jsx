import React from 'react'
import Card from '../components/Card';

const Browse = ({ themeColors }) => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Mock Cards */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <Card type="influencer" themeColors={themeColors} />
            <Card type="company" themeColors={themeColors} />
            <Card type="influencer" themeColors={themeColors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse
