import React from 'react';
import LogoLoop from './LogoLoop';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiVercel,
  SiGithub,
  SiTensorflow,
  SiPytorch,
  SiZapier,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiSap,
  SiApple,
  SiAndroid,
  SiFlutter,
  SiSwift,
  SiKotlin
} from 'react-icons/si';
import { FaAws, FaSalesforce } from 'react-icons/fa';

const techLogos = [
  // Web & Software
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  // Data Science
  { node: <SiPython />, title: "Python", href: "https://www.python.org" },
  { node: <SiPandas />, title: "Pandas", href: "https://pandas.pydata.org" },
  { node: <SiNumpy />, title: "NumPy", href: "https://numpy.org" },
  { node: <SiScikitlearn />, title: "Scikit-learn", href: "https://scikit-learn.org" },
  // AI & Automation
  { node: <SiTensorflow />, title: "TensorFlow", href: "https://www.tensorflow.org" },
  { node: <SiPytorch />, title: "PyTorch", href: "https://pytorch.org" },
  { node: <SiZapier />, title: "Zapier", href: "https://zapier.com" },
  // ERP & CRM
  { node: <FaSalesforce />, title: "Salesforce", href: "https://www.salesforce.com" },
  { node: <SiSap />, title: "SAP", href: "https://www.sap.com" },
  // Mobile & iOS
  { node: <SiApple />, title: "iOS", href: "https://developer.apple.com/ios/" },
  { node: <SiAndroid />, title: "Android", href: "https://developer.android.com" },
  { node: <SiFlutter />, title: "Flutter", href: "https://flutter.dev" },
  { node: <SiSwift />, title: "Swift", href: "https://swift.org" },
  { node: <SiKotlin />, title: "Kotlin", href: "https://kotlinlang.org" },
  // Infrastructure & DB
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
  { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
  { node: <FaAws />, title: "AWS", href: "https://aws.amazon.com" },
  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com" }
];

export default function TechnologyStack() {
  return (
    <section className="py-16 bg-[#0b1120] text-white overflow-hidden border-y border-white/5">
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

