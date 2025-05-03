
import React from 'react';

const GradientBlobs: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2]">
      <div 
        className="blob blob-1 left-1/4 top-1/4"
        style={{ left: '10%', top: '15%' }}
      ></div>
      <div 
        className="blob blob-2 right-1/4 bottom-1/3"
        style={{ right: '15%', bottom: '20%' }}
      ></div>
      <div 
        className="blob blob-3 left-1/3 bottom-1/4"
        style={{ left: '30%', bottom: '10%' }}
      ></div>
    </div>
  );
};

export default GradientBlobs;
