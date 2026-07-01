import React, { useEffect, useRef, useState } from 'react';

const technologiesData = [
  { name: 'React', category: 'Frontend', icon: 'https://cdn.simpleicons.org/react', description: 'Building modern user interfaces' },
  { name: 'Next.js', category: 'Frontend', icon: 'https://cdn.simpleicons.org/nextdotjs/white', description: 'React framework for production' },
  { name: 'TypeScript', category: 'Frontend', icon: 'https://cdn.simpleicons.org/typescript', description: 'Strongly typed JavaScript' },
  { name: 'Tailwind CSS', category: 'Frontend', icon: 'https://cdn.simpleicons.org/tailwindcss', description: 'Utility-first CSS framework' },
  { name: 'Node.js', category: 'Backend', icon: 'https://cdn.simpleicons.org/nodedotjs', description: 'JavaScript runtime environment' },
  { name: 'FastAPI', category: 'Backend', icon: 'https://cdn.simpleicons.org/fastapi', description: 'Modern, fast Python web framework' },
  { name: 'Express.js', category: 'Backend', icon: 'https://cdn.simpleicons.org/express/white', description: 'Fast, unopinionated web framework' },
  { name: 'PostgreSQL', category: 'Databases', icon: 'https://cdn.simpleicons.org/postgresql', description: 'Advanced open source relational database' },
  { name: 'MongoDB', category: 'Databases', icon: 'https://cdn.simpleicons.org/mongodb', description: 'Document-based NoSQL database' },
  { name: 'MySQL', category: 'Databases', icon: 'https://cdn.simpleicons.org/mysql', description: 'Open-source relational database' },
  { name: 'Python', category: 'Data Science', icon: 'https://cdn.simpleicons.org/python', description: 'Used for Data Analytics, AI and Automation' },
  { name: 'Pandas', category: 'Data Science', icon: 'https://cdn.simpleicons.org/pandas', description: 'Data analysis and manipulation library' },
  { name: 'NumPy', category: 'Data Science', icon: 'https://cdn.simpleicons.org/numpy', description: 'Scientific computing in Python' },
  { name: 'Power BI', category: 'Data Science', icon: 'https://cdn.simpleicons.org/powerbi', description: 'Interactive data visualization software' },
  { name: 'Scikit-learn', category: 'Data Science', icon: 'https://cdn.simpleicons.org/scikitlearn', description: 'Machine learning in Python' },
  { name: 'OpenAI', category: 'AI & Automation', icon: 'https://cdn.simpleicons.org/openai/white', description: 'Advanced AI models and research' },
  { name: 'Google Gemini', category: 'AI & Automation', icon: 'https://cdn.simpleicons.org/googlegemini', description: 'Multimodal generative AI models' },
  { name: 'LangChain', category: 'AI & Automation', icon: 'https://cdn.simpleicons.org/langchain/white', description: 'Building applications with LLMs' },
  { name: 'n8n', category: 'AI & Automation', icon: 'https://cdn.simpleicons.org/n8n', description: 'Workflow automation tool' },
  { name: 'Docker', category: 'Cloud', icon: 'https://cdn.simpleicons.org/docker', description: 'Containerized application deployment' },
  { name: 'AWS', category: 'Cloud', icon: 'https://cdn.simpleicons.org/amazonaws', description: 'Comprehensive cloud computing platform' },
  { name: 'Git', category: 'Cloud', icon: 'https://cdn.simpleicons.org/git', description: 'Distributed version control system' },
  { name: 'GitHub', category: 'Cloud', icon: 'https://cdn.simpleicons.org/github/white', description: 'Hosting platform for version control' },
  { name: 'Vercel', category: 'Cloud', icon: 'https://cdn.simpleicons.org/vercel/white', description: 'Platform for frontend frameworks' }
];

const technologies = technologiesData.map((tech, index) => {
  let orbit, angle;
  if (index < 6) {
    orbit = 1;
    angle = (index * 60) + 15;
  } else if (index < 14) {
    orbit = 2;
    angle = ((index - 6) * 45) + 30;
  } else {
    orbit = 3;
    angle = ((index - 14) * 36) + 10;
  }
  
  const parallaxFactor = orbit === 1 ? 0.4 : orbit === 2 ? 0.7 : 1.0;
  const duration = 8 + Math.random() * 7;
  const delay = -(Math.random() * 15);
  
  return { ...tech, orbit, angle, parallaxFactor, duration, delay };
});

export default function TechnologyStack() {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  useEffect(() => {
    let animationFrameId;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      targetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', currentX.toFixed(4));
        containerRef.current.style.setProperty('--mouse-y', currentY.toFixed(4));
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const centerPos = (windowHeight - rect.height) / 2;
      const distFromCenter = Math.abs(rect.top - centerPos);
      const maxDist = (windowHeight + rect.height) / 2;
      
      const deadZone = rect.height * 0.25; // 25% of the large scroll area is fully assembled
      let progress = 1;
      if (distFromCenter > deadZone) {
         progress = 1 - ((distFromCenter - deadZone) / (maxDist - deadZone));
      }
      progress = Math.max(0, Math.min(1, progress));
      
      sectionRef.current.style.setProperty('--scroll-progress', progress.toFixed(4));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger immediately to set initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="h-[250vh] bg-[#0b1120] text-white relative" aria-label="Technology Stack">
      
      {/* Sticky Container for Scroll Scrubbing */}
      <div className="sticky top-0 h-[100vh] w-full flex items-center justify-center overflow-hidden">
        
        {/* Background gradients and particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] opacity-50"></div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] opacity-40"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30"></div>
        </div>

        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 relative z-10 flex items-center justify-center">
        
        {/* Interactive Floating Technology Cloud */}
        <div 
          ref={containerRef}
          className="relative w-full flex items-center justify-center __tech-cloud-container"
        >
          <style dangerouslySetInnerHTML={{__html: `
            .__tech-cloud-container {
              height: 100%;
              width: 100%;
              --radius-1: 240px;
              --radius-2: 370px;
              --radius-3: 500px;
              --base-scale: 1;
              transform: scale(var(--base-scale));
            }
            @media (max-width: 1400px), (max-height: 1000px) {
              .__tech-cloud-container { --base-scale: 0.85; }
            }
            @media (max-width: 1024px), (max-height: 800px) {
              .__tech-cloud-container { --base-scale: 0.7; }
            }
            @media (max-width: 768px), (max-height: 650px) {
              .__tech-cloud-container { --base-scale: 0.55; }
            }
            @media (max-width: 480px), (max-height: 550px) {
              .__tech-cloud-container { --base-scale: 0.45; }
            }


            @keyframes float-chip {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-12px); }
            }
            .animate-float-chip {
              animation-name: float-chip;
              animation-timing-function: ease-in-out;
              animation-iteration-count: infinite;
            }
            
            .tech-chip-btn {
              padding: 0.75rem 1.5rem;
              font-size: 1rem;
            }
            .tech-chip-icon {
              width: 1.75rem;
              height: 1.75rem;
            }
            @media (max-width: 768px) {
              .tech-chip-btn {
                padding: 0.5rem 1rem;
                font-size: 0.875rem;
              }
              .tech-chip-icon {
                width: 1.25rem;
                height: 1.25rem;
              }
            }
            
            @media (prefers-reduced-motion: reduce) {
              .animate-float-chip, .__parallax-layer {
                animation: none !important;
                transform: none !important;
                transition: none !important;
              }
              .tech-positioner {
                transform: rotate(var(--angle)) translateX(var(--radius)) rotate(calc(-1 * var(--angle))) translate(-50%, -50%) !important;
              }
            }
          `}} />

          {/* Optional Subtle Connections (Inner Orbit Only) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity: 'calc(var(--scroll-progress) * 0.1)' }} aria-hidden="true">
             <defs>
               <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                 <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
               </linearGradient>
             </defs>
             {technologies.filter(t => t.orbit === 1).map((tech, i) => (
               <line 
                 key={i}
                 x1="50%" 
                 y1="50%" 
                 x2="50%" 
                 y2="50%" 
                 stroke="url(#line-gradient)" 
                 strokeWidth="1"
                 style={{ 
                   transformOrigin: '50% 50%',
                   transform: `rotate(${tech.angle}deg) scaleX(1) translateX(110px)`, 
                   width: 'var(--radius-1)'
                 }}
               />
             ))}
          </svg>

          {/* Central Heading Area */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center z-40 pointer-events-none w-[90%] max-w-[400px] text-center"
            style={{
              opacity: `clamp(0, (var(--scroll-progress) - 0.2) * 1.5, 1)`,
              top: `calc(40% + 10% * clamp(0, var(--scroll-progress), 1))`,
              transform: `translateX(-50%) translateY(-50%) scale(clamp(0.8, 0.5 + 0.5 * var(--scroll-progress), 1))`
            }}
          >
            <div className="bg-[#0b1120]/70 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[2rem] shadow-[0_0_50px_rgba(56,189,248,0.15)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 animate-pulse" style={{ animationDuration: '4s' }}></div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 relative z-10">
                Technologies We Power
              </h2>
              <p className="text-xs md:text-sm lg:text-base text-slate-300 leading-relaxed font-light relative z-10">
                Building scalable software, intelligent AI solutions, and data-driven applications using modern technologies trusted worldwide.
              </p>
            </div>
          </div>

          {/* Technologies */}
          {technologies.map((tech, i) => {
            const rad = tech.angle * Math.PI / 180;
            const startX = Math.cos(rad) * 800;
            const startY = Math.sin(rad) * 800;
            const offset = (3 - tech.orbit) * 0.15 + (i % 6) * 0.02;
            
            return (
              <div 
                key={i}
                className="absolute left-1/2 top-1/2 group z-30 tech-positioner"
                style={{ 
                  '--angle': `${tech.angle}deg`,
                  '--radius': tech.orbit === 1 ? 'var(--radius-1)' : tech.orbit === 2 ? 'var(--radius-2)' : 'var(--radius-3)',
                  transform: `rotate(var(--angle)) translateX(var(--radius)) rotate(calc(-1 * var(--angle))) translate(-50%, -50%)`
                }}
              >
                <div 
                  style={{
                    '--chip-progress': `clamp(0, (var(--scroll-progress) - ${offset}) / ${1 - offset}, 1)`,
                    transform: `translate(calc(${startX}px * (1 - var(--chip-progress))), calc(${startY}px * (1 - var(--chip-progress)))) scale(calc(1.5 - 0.5 * var(--chip-progress)))`,
                    opacity: `clamp(0, var(--chip-progress) * 1.5, 1)`
                  }}
                >
                  <div 
                    className="__parallax-layer transition-transform duration-100 ease-out"
                    style={{ transform: `translate(calc(var(--mouse-x, 0) * ${tech.parallaxFactor} * -15px), calc(var(--mouse-y, 0) * ${tech.parallaxFactor} * -15px))` }}
                  >
                    <div 
                      className="animate-float-chip"
                      style={{ 
                        animationDuration: `${tech.duration}s`,
                        animationDelay: `${tech.delay}s`
                      }}
                    >
                      <button 
                        className="tech-chip-btn relative flex items-center gap-2 md:gap-3 rounded-full bg-[#111827]/80 border border-white/10 backdrop-blur-md shadow-lg transition-all duration-300 group-hover:scale-[1.15] group-hover:bg-[#1f2937]/90 group-hover:border-white/30 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] group-focus-visible:scale-[1.15] outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-default"
                        aria-label={`${tech.name} - ${tech.description}`}
                      >
                        <img 
                          src={tech.icon} 
                          alt="" 
                          className="tech-chip-icon object-contain filter opacity-90 group-hover:opacity-100 group-hover:brightness-125 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" 
                          loading="lazy"
                        />
                        <span className="font-semibold text-slate-300 group-hover:text-white transition-colors whitespace-nowrap">
                          {tech.name}
                        </span>
                      </button>
                      
                      {/* Tooltip */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 pointer-events-none z-50 w-max max-w-[200px] bg-slate-900/95 backdrop-blur-xl border border-slate-700 p-3 rounded-xl shadow-2xl">
                        <div className="text-sm font-bold text-white mb-1 text-center">{tech.name}</div>
                        <div className="text-xs text-slate-300 leading-snug whitespace-normal text-center">{tech.description}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          
        </div>
        </div>
      </div>
    </section>
  );
}

