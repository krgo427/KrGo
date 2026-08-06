export const services = [
  {
    slug: "data-science",
    title: "Data Science",
    shortDescription: "Transform your raw data into meaningful business insights through dashboards, visualization, reporting, predictive analytics, and business intelligence.",
    details: "Unlock the hidden potential in your data. We provide comprehensive data science services to help you make data-driven decisions that drive growth.",
    deliverables: [
      "Data Analytics & Visualization",
      "Dashboard Development (Power BI, Tableau)",
      "Predictive Analytics & Machine Learning",
      "Data Cleaning & Preprocessing",
      "ETL Pipelines & Data Warehousing",
      "Reporting Automation"
    ],
    icon: "chart"
  },
  {
    slug: "automation-ai",
    title: "Automation & AI",
    shortDescription: "Automate repetitive tasks, integrate AI-powered assistants, build intelligent workflows, and improve business efficiency using modern AI technologies.",
    details: "Enhance your business operations with cutting-edge AI and automation. Reduce manual work, improve accuracy, and deliver 24/7 intelligent assistance.",
    deliverables: [
      "AI Chatbots & Intelligent Assistants",
      "Workflow Automation (Zapier, Make, custom)",
      "OpenAI & LLM Integration",
      "OCR Solutions & Document Processing",
      "Recommendation Systems",
      "Business Process Automation"
    ],
    icon: "bot"
  },
  {
    slug: "software-website-development",
    title: "Software & Website Development",
    shortDescription: "We develop scalable websites, business applications, ERP systems, CRM solutions, mobile apps, and custom software tailored to your business needs.",
    details: "Our software development services encompass everything from business websites to complex ERP systems. We build reliable, secure, and scalable solutions.",
    deliverables: [
      "Business Websites & Web Applications",
      "Mobile Apps (iOS & Android)",
      "ERP & CRM Solutions",
      "Billing & Inventory Systems",
      "API Development & Integration",
      "Website Maintenance & Support"
    ],
    icon: "code"
  }
];

export const servicesBySlug = services.reduce((acc, service) => {
  acc[service.slug] = service;
  return acc;
}, {});
