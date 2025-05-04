
import React from 'react';

const Header = () => {
  return (
    <header className="py-4 px-6 flex justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <span className="text-white font-bold">TS</span>
        </div>
        <div>
          <h1 className="text-xl font-medium">TeachSpark</h1>
          <p className="text-xs text-muted-foreground">Your AI Teaching Assistant</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-right">
          <div className="font-medium">Physics 101</div>
          <div className="text-muted-foreground text-xs">Spring 2025</div>
        </div>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          <span className="text-sm">JD</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
