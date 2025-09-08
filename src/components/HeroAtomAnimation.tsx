import React from 'react';

const HeroAtomAnimation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-transparent overflow-hidden">
      {/* Главный контейнер атома */}
      <div 
        className="relative w-[400px] h-[300px] flex items-center justify-center"
        style={{ perspective: '800px' }}
      >
        
        {/* Центральный протон */}
        <div 
          className="absolute w-4 h-4 rounded-full z-20"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #a855f7, #7c3aed, #5b21b6)',
            boxShadow: '0 0 15px rgba(168, 85, 247, 0.8), 0 0 30px rgba(168, 85, 247, 0.4)',
            animation: 'nucleus-pulse 3s ease-in-out infinite'
          }}
        ></div>
        
        {/* Орбита 1 - Эллиптическая в плоскости XY */}
        <div 
          className="absolute"
          style={{
            width: '200px',
            height: '120px',
            border: '2px solid rgba(6, 182, 212, 0.8)',
            borderRadius: '50%',
            background: 'transparent',
            boxShadow: '0 0 8px rgba(6, 182, 212, 0.6), inset 0 0 6px rgba(59, 130, 246, 0.3)',
            animation: 'orbit-rotation 48s linear infinite',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Электрон 1 */}
          <div 
            className="absolute w-3 h-3 rounded-full"
            style={{
              top: '50%',
              left: '100%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle at 30% 30%, #06b6d4, #0891b2)',
              boxShadow: '0 0 10px rgba(6, 182, 212, 0.8), 0 0 18px rgba(6, 182, 212, 0.4)',
              animation: 'electron-orbit 12s linear infinite'
            }}
          ></div>
        </div>
        
        {/* Орбита 2 - Эллиптическая в плоскости XZ (вертикальная) */}
        <div 
          className="absolute"
          style={{
            width: '160px',
            height: '90px',
            border: '2px solid rgba(59, 130, 246, 0.8)',
            borderRadius: '50%',
            background: 'transparent',
            boxShadow: '0 0 8px rgba(59, 130, 246, 0.7), inset 0 0 8px rgba(147, 51, 234, 0.3)',
            animation: 'orbit-rotation 36s linear infinite reverse',
            transform: 'rotateX(85deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Электрон 2 */}
          <div 
            className="absolute w-3 h-3 rounded-full"
            style={{
              top: '50%',
              left: '100%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle at 30% 30%, #3b82f6, #2563eb)',
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.8), 0 0 18px rgba(59, 130, 246, 0.4)',
              animation: 'electron-orbit 9s linear infinite reverse'
            }}
          ></div>
        </div>
        
        {/* Орбита 3 - Эллиптическая в плоскости YZ (боковая) */}
        <div 
          className="absolute"
          style={{
            width: '140px',
            height: '80px',
            border: '2px solid rgba(147, 51, 234, 0.8)',
            borderRadius: '50%',
            background: 'transparent',
            boxShadow: '0 0 6px rgba(147, 51, 234, 0.6), inset 0 0 6px rgba(168, 85, 247, 0.4)',
            animation: 'orbit-rotation 28s linear infinite',
            transform: 'rotateY(90deg) rotateZ(15deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Электрон 3 */}
          <div 
            className="absolute w-2 h-2 rounded-full"
            style={{
              top: '50%',
              left: '100%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle at 30% 30%, #9333ea, #7c3aed)',
              boxShadow: '0 0 8px rgba(147, 51, 234, 0.8), 0 0 15px rgba(147, 51, 234, 0.4)',
              animation: 'electron-orbit 7s linear infinite'
            }}
          ></div>
        </div>
        
        {/* Орбита 4 - Эллиптическая диагональная */}
        <div 
          className="absolute"
          style={{
            width: '180px',
            height: '100px',
            border: '2px solid rgba(168, 85, 247, 0.7)',
            borderRadius: '50%',
            background: 'transparent',
            boxShadow: '0 0 6px rgba(168, 85, 247, 0.6), inset 0 0 5px rgba(147, 51, 234, 0.3)',
            animation: 'orbit-rotation 52s linear infinite',
            transform: 'rotateX(45deg) rotateY(30deg) rotateZ(60deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Электрон 4 */}
          <div 
            className="absolute w-2 h-2 rounded-full"
            style={{
              top: '50%',
              left: '100%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle at 30% 30%, #a855f7, #9333ea)',
              boxShadow: '0 0 8px rgba(168, 85, 247, 0.8), 0 0 15px rgba(168, 85, 247, 0.4)',
              animation: 'electron-orbit 13s linear infinite'
            }}
          ></div>
        </div>
        
        {/* Орбита 5 - Эллиптическая внутренняя */}
        <div 
          className="absolute"
          style={{
            width: '110px',
            height: '65px',
            border: '2px solid rgba(196, 181, 253, 0.6)',
            borderRadius: '50%',
            background: 'transparent',
            boxShadow: '0 0 6px rgba(196, 181, 253, 0.5), inset 0 0 5px rgba(168, 85, 247, 0.3)',
            animation: 'orbit-rotation 20s linear infinite reverse',
            transform: 'rotateX(120deg) rotateY(45deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Электрон 5 */}
          <div 
            className="absolute w-2 h-2 rounded-full"
            style={{
              top: '50%',
              left: '100%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle at 30% 30%, #c4b5fd, #a78bfa)',
              boxShadow: '0 0 8px rgba(196, 181, 253, 0.8), 0 0 15px rgba(196, 181, 253, 0.4)',
              animation: 'electron-orbit 5s linear infinite reverse'
            }}
          ></div>
        </div>
        
        {/* Энергет��ческие частицы для дополнительного эффекта */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
              style={{
                top: `${30 + Math.sin(i * 0.5) * 20}%`,
                left: `${50 + Math.cos(i * 0.5) * 30}%`,
                animation: `particle-float ${3 + i * 0.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
        
        {/* Центральное свечение */}
        <div 
          className="absolute w-20 h-20 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)',
            animation: 'central-glow 4s ease-in-out infinite'
          }}
        ></div>
        
        <div 
          className="absolute w-36 h-36 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 100%)',
            animation: 'central-glow 6s ease-in-out infinite reverse'
          }}
        ></div>
      </div>
      

    </div>
  );
};

export default HeroAtomAnimation;