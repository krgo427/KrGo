import React from 'react';
import LogoLoop from './LogoLoop';
import pandasLight from '../assets/pandas-light.svg';
import nextjsLight from '../assets/nextjs-light.svg';
// Removed react-icons as we are using devicon SVGs directly

const InvertLogo = ({ src, alt }) => (
  <img src={src} alt={alt} className="h-full w-auto object-contain brightness-0 invert" />
);

const techLogos = [
  // Web & Software
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", title: "React", href: "https://react.dev" },
  { src: nextjsLight, title: "Next.js", href: "https://nextjs.org" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", title: "TypeScript", href: "https://www.typescriptlang.org" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", title: "Node.js", href: "https://nodejs.org" },
  // Data Science
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", title: "Python", href: "https://www.python.org" },
  { src: pandasLight, title: "Pandas", href: "https://pandas.pydata.org" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg", title: "NumPy", href: "https://numpy.org" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg", title: "Scikit-learn", href: "https://scikit-learn.org" },
  // AI & Automation
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg", title: "TensorFlow", href: "https://www.tensorflow.org" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg", title: "PyTorch", href: "https://pytorch.org" },
  { src: "https://www.vectorlogo.zone/logos/zapier/zapier-icon.svg", title: "Zapier", href: "https://zapier.com" },
  // ERP & CRM
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/salesforce/salesforce-original.svg", title: "Salesforce", href: "https://www.salesforce.com" },
  { src: "https://www.vectorlogo.zone/logos/sap/sap-icon.svg", title: "SAP", href: "https://www.sap.com" },
  // Mobile & iOS
  { node: <InvertLogo src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg" alt="iOS" />, title: "iOS", href: "https://developer.apple.com/ios/" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg", title: "Android", href: "https://developer.android.com" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg", title: "Flutter", href: "https://flutter.dev" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg", title: "Swift", href: "https://swift.org" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg", title: "Kotlin", href: "https://kotlinlang.org" },
  // Infrastructure & DB
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", title: "PostgreSQL", href: "https://www.postgresql.org" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", title: "MongoDB", href: "https://www.mongodb.com" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", title: "Docker", href: "https://www.docker.com" },
  { node: <InvertLogo src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="AWS" />, title: "AWS", href: "https://aws.amazon.com" },
  { node: <InvertLogo src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" alt="Vercel" />, title: "Vercel", href: "https://vercel.com" },
  { node: <InvertLogo src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" />, title: "GitHub", href: "https://github.com" }
];

export default function TechnologyStack() {
  return (
    <section className="py-16 bg-secondary text-white overflow-hidden border-y border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 mb-8 text-center">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-300">
          Technologies We Power
        </h2>
      </div>

      <div className="relative z-10 text-slate-400 hover:text-slate-300 transition-colors">
        <LogoLoop
          logos={techLogos}
          speed={100}
          direction="left"
          logoHeight={48}
          gap={64}
          hoverSpeed={20}
          scaleOnHover={true}
          fadeOut={true}
          fadeOutColor="#0b1120"
          ariaLabel="Technology partners"
        />
      </div>
    </section>
  );
}

