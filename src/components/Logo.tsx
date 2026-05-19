import { motion } from 'motion/react';

export default function Logo() {
  return (
    <div className="flex flex-col items-center justify-center p-3 sm:p-6" id="logo-header">
      {/* Outer Scalloped-style Badge Frame */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white/80 backdrop-blur-xs border-2 border-[#F8BBD0]/60 rounded-[40px] px-8 py-7 sm:px-16 sm:py-10 soft-shadow max-w-lg w-full text-center"
      >
        {/* Inner delicate pink border line */}
        <div className="absolute inset-1.5 border border-[#F8BBD0]/40 rounded-[34px] pointer-events-none" />
        
        {/* Tiny hearts decorator at corners */}
        <span className="absolute top-3 left-3 text-brand-pink-dark/40 text-xs">♥</span>
        <span className="absolute top-3 right-3 text-brand-pink-dark/40 text-xs">♥</span>
        <span className="absolute bottom-3 left-3 text-brand-pink-dark/40 text-xs">♥</span>
        <span className="absolute bottom-3 right-3 text-brand-pink-dark/40 text-xs">♥</span>

        {/* Brand Name Layout */}
        <div className="relative flex flex-col items-center">
          {/* "Ana" in premium serif styling with letter spacing */}
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-brand-brown tracking-wider leading-tight">
            Ana
          </h1>
          
          {/* Overlapping cursive elegant "Palha" */}
          <span className="font-cursive text-5xl sm:text-6xl text-brand-pink-dark/95 -mt-3 sm:-mt-4 mb-2 select-none transform -rotate-1 drop-shadow-sm filter">
            Palha
          </span>

          {/* Heart indicator with scroll flourishes */}
          <div className="flex items-center gap-3 w-full justify-center my-1 select-none">
            <span className="w-8 sm:w-16 h-[1px] bg-brand-pink-dark/40" />
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-brand-pink-dark text-sm inline-block cursor-pointer mx-1"
            >
              ♥
            </motion.span>
            <span className="w-8 sm:w-16 h-[1px] bg-brand-pink-dark/40" />
          </div>

          {/* Subheading "Doceria Artesanal" with tiny dots */}
          <p className="font-serif text-sm sm:text-base tracking-[0.25em] font-medium text-brand-brown uppercase mt-2">
            Doceria Artesanal
          </p>
        </div>
      </motion.div>
    </div>
  );
}
