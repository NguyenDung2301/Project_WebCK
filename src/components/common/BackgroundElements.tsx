
import React from 'react';

export const BackgroundElements = () => {
  return (
    <>
      <div className="fixed -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full bg-primary-500/5 animate-[float_15s_ease-in-out_infinite] pointer-events-none -z-0"></div>
      <div className="fixed -bottom-[150px] -left-[150px] w-[400px] h-[400px] rounded-full bg-primary-500/5 animate-[float_12s_ease-in-out_infinite_reverse] pointer-events-none -z-0"></div>
    </>
  );
};
