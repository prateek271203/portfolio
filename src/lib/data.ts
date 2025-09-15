
import type { LucideIcon } from 'lucide-react';
import {
  Atom,
  Briefcase,
  Code,
  Container,
  Database,
  GitMerge,
  GraduationCap,
  Move,
  Server,
  Triangle,
  Wind,
  Cloud,
  Cpu,
  Smartphone,
  Globe,
  TrendingUp,
} from 'lucide-react';

export const TIMELINE_DATA = [
  {
    type: 'Work',
    date: '2023 - Present',
    title: 'Full Stack Developer',
    company: 'Digiidunia',
    description: 'Developing and maintaining robust, scalable web applications using modern technologies, contributing to key projects and enhancing user experience.',
    icon: Briefcase,
  },
  {
    type: 'Education',
    date: '2024 - Present',
    title: 'MCA in AI & ML',
    company: 'Lovely Professional University',
    description: "Pursuing a Master's degree with a specialization in Artificial Intelligence and Machine Learning to deepen my expertise in cutting-edge technologies.",
    icon: GraduationCap,
  },
  {
    type: 'Education',
    date: '2021 - 2024',
    title: 'BCA',
    company: 'L.N. Mishra College of Business Management',
    description: "Completed my Bachelor's in Computer Applications, building a strong foundational knowledge in software development, database management, and computer science principles.",
    icon: GraduationCap,
  },
];

export const SKILLS_DATA: {
  category: string;
  skills: { name: string; icon: LucideIcon; proficiency: number }[];
}[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', icon: Atom, proficiency: 95 },
      { name: 'Next.js', icon: Triangle, proficiency: 90 },
      { name: 'JavaScript', icon: Code, proficiency: 95 },
      { name: 'TypeScript', icon: Code, proficiency: 90 },
      { name: 'HTML5', icon: Code, proficiency: 98 },
      { name: 'CSS3', icon: Code, proficiency: 95 },
      { name: 'Tailwind CSS', icon: Wind, proficiency: 95 },
      { name: 'Redux', icon: GitMerge, proficiency: 85 },
      { name: 'Framer Motion', icon: Move, proficiency: 80 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', icon: Server, proficiency: 90 },
      { name: 'Express.js', icon: Server, proficiency: 90 },
      { name: 'Python', icon: Code, proficiency: 75 },
      { name: 'C++', icon: Code, proficiency: 70 },
    ],
  },
  {
    category: 'Databases & Tools',
    skills: [
      { name: 'MongoDB', icon: Database, proficiency: 85 },
      { name: 'MySQL', icon: Database, proficiency: 80 },
      { name: 'Git', icon: GitMerge, proficiency: 95 },
      { name: 'GitHub', icon: GitMerge, proficiency: 95 },
      { name: 'Docker', icon: Container, proficiency: 70 },
      { name: 'AWS', icon: Cloud, proficiency: 65 },
      { name: 'Jupyter', icon: Cpu, proficiency: 80 },
      { name: 'Google Colab', icon: Cpu, proficiency: 85 },
      { name: 'Power BI', icon: TrendingUp, proficiency: 75 },
      { name: 'IBM Cognos', icon: TrendingUp, proficiency: 70 },
    ],
  },
];

export const PROJECTS_DATA = [
  {
    title: 'Axentrica - HR Consulting',
    description: 'A modern, streamlined HR consulting platform designed to connect businesses with top-tier HR professionals and solutions.',
    images: ['/Axentrica.png', 'https://picsum.photos/800/610', 'https://picsum.photos/800/611'],
    liveUrl: 'https://axentrica.digiidunia.com/',
    imageHint: 'HR consulting'
  },
  {
    title: 'Amreen',
    description: 'An e-commerce platform for selling raw meat, featuring a user-friendly interface and secure online transactions.',
    images: ['/amreen1.png', '/amreen2.png', '/amreen3.png'],
    liveUrl: '#',
    imageHint: 'raw meat ecommerce'
  },
  {
    title: 'Digiidunia',
    description: 'A comprehensive website for a digital marketing agency, providing various digital marketing services.',
    images: ['/Digiidunia.png', 'https://picsum.photos/800/604', 'https://picsum.photos/800/605'],
    liveUrl: 'https://www.digiidunia.com/',
    imageHint: 'digital marketing'
  },
];

export const FREELANCE_SERVICES_DATA = [
    {
        title: 'Website Development',
        description: 'Responsive, high-performance websites tailored to your business needs.',
        startingPrice: 500,
        icon: Globe,
        features: [
            'Custom Design & Development',
            'Mobile-First Responsive Design',
            'Content Management System (CMS)',
            'SEO Optimization',
            'Fast Loading Speeds',
        ],
    },
    {
        title: 'Mobile App Development',
        description: 'Cross-platform mobile applications for iOS and Android.',
        startingPrice: 1500,
        icon: Smartphone,
        features: [
            'iOS and Android Development',
            'User-Friendly Interface (UI/UX)',
            'Backend & API Integration',
            'Push Notifications',
            'App Store Submission',
        ],
    },
    {
        title: 'Digital Marketing',
        description: 'Strategies to grow your online presence and reach your target audience.',
        startingPrice: 300,
        icon: TrendingUp,
        features: [
            'Search Engine Optimization (SEO)',
            'Social Media Management',
            'Content Strategy',
            'Pay-Per-Click (PPC) Campaigns',
            'Analytics and Reporting',
        ],
    },
];


export const CERTIFICATES_DATA = [
  {
    title: 'Data Science',
    issuer: 'IBM',
    image: '/Certificates/IBM_Data_Science.png',
    credentialUrl: 'https://coursera.org/share/b58550151120a84c1723145a30628285',
  },
  {
    title: 'Cloud Computing',
    issuer: 'IBM',
    image: '/Certificates/IBM_Cloud_Computing.png',
    credentialUrl: 'https://coursera.org/share/2065355a2c2ff55020f5c8b21c2f0f7f',
  },
  {
    title: 'Full-Stack Development',
    issuer: 'IBM',
    image: '/Certificates/IBM_Full_Stack.png',
    credentialUrl: 'https://coursera.org/share/88950d2cf377bfac6728e530089a3f2d',
  },
  {
    title: 'AI Engineering',
    issuer: 'IBM',
    image: '/Certificates/IBM_AI_Engineering.png',
    credentialUrl: 'https://coursera.org/share/7336a537c3b28b5e985b8542c33c0428',
  },
  {
    title: 'Data Analyst',
    issuer: 'Google',
    image: '/Certificates/Google_Data_Analyst.png',
    credentialUrl: 'https://coursera.org/share/729f22312683e659b81d77292a4e402b',
  },
];
