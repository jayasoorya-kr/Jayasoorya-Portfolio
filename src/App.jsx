import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
// Original Brand Icons for technical authenticity
import { 
  FaGithub, FaLinkedin, FaInstagram, FaPython, FaReact, FaAws, FaLinux, FaHtml5 
} from 'react-icons/fa';
import { 
  SiDjango, SiPostgresql, SiTailwindcss, SiJavascript, SiOpencv 
} from 'react-icons/si';

// --- Typing Effect Component ---
const Typewriter = ({ texts }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 50 : 100, parseInt(Math.random() * 200)));
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="text-purple-400 border-r-2 border-purple-400 pr-1">
      {texts[index].substring(0, subIndex)}
    </span>
  );
};

// --- Reusable Scroll Animation Wrapper (Repeats on every scroll) ---
const FadeInTitle = ({ children, className }) => (
  <motion.h2
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.h2>
);

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Scroll Progress Bar Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- Functional Formspree HandleSubmit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Using your actual Formspree endpoint: xojkypwj
    const response = await fetch('https://formspree.io/f/xojkypwj', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert("Oops! There was a problem sending your message. Please try again.");
    }
  };

  return (
    <div className="bg-[#0a0a0f] text-white font-sans min-h-screen relative overflow-x-hidden selection:bg-purple-500/30">
      
      {/* Dynamic Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Ambient Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-[10%] right-[0%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <nav className="fixed w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
              K R Jayasoorya
            </span>
            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">Ready to Innovate</span>
          </div>
          <div className="hidden md:flex space-x-10 text-sm font-semibold text-slate-400">
            {['Home', 'About', 'Portfolio', 'Contact'].map(item => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())} className="hover:text-white transition-colors">{item}</button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen grid-pattern flex flex-col justify-center max-w-6xl mx-auto px-6 pt-20">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-6xl md:text-8xl font-black mb-4 leading-[0.9]">
            Full Stack<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Developer</span>
          </h1>
          <div className="text-2xl md:text-3xl font-medium text-slate-300 mb-8 h-10">
            <Typewriter texts={["Python Full Stack Developer", "B.Tech Graduate in Electronics and Communication Engineering", "Tech Enthusiast"]} />
          </div>
          <p className="text-slate-400 text-lg max-w-xl mb-10 leading-relaxed">
            Enhancing digital experiences that are smooth, scalable, and made to impress. Specializing in Django and React.
          </p>
          <div className="space-y-10">
            <div className="flex flex-wrap gap-5">
              <button onClick={() => scrollTo('portfolio')} className="bg-[#0a0a0f] border border-white/10 px-10 py-4 rounded-2xl flex items-center gap-3 font-bold text-lg hover:border-purple-500/50 transition-all shadow-[0_0_30px_rgba(147,51,234,0.15)] hover:shadow-purple-500/40 group">
                <span>Projects</span><span className="text-xl group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </button>
              <button onClick={() => scrollTo('contact')} className="bg-[#0a0a0f] border border-white/10 px-10 py-4 rounded-2xl flex items-center gap-3 font-bold text-lg hover:border-purple-500/50 transition-all shadow-[0_0_30px_rgba(147,51,234,0.15)] hover:shadow-purple-500/40 group">
                <span>Contact</span><span className="text-xl group-hover:scale-110 transition-transform">✉</span>
              </button>
            </div>
            <div className="flex gap-5">
              {[{ name: 'GitHub', url: 'https://github.com/jayasoorya-kr', icon: <FaGithub /> }, { name: 'LinkedIn', url: 'https://linkedin.com/in/kr-jayasoorya', icon: <FaLinkedin /> }, { name: 'Instagram', url: 'https://www.instagram.com/_im.soorya_/', icon: <FaInstagram /> }].map((social) => (
                <a key={social.name} href={social.url} target="_blank" rel="noreferrer" className="w-16 h-16 bg-[#0a0a0f] border border-white/10 rounded-2xl flex items-center justify-center hover:border-purple-500/50 transition-all shadow-[0_0_30px_rgba(147,51,234,0.1)] hover:shadow-purple-500/40 group text-2xl text-slate-400 hover:text-white">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Section - cinematic scroll animation */}
      <section id="about" className="py-32 bg-white/2 backdrop-blur-3xl border-y border-white/5 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <FadeInTitle className="text-5xl font-bold mb-20 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-center">About Me</FadeInTitle>
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24 mb-24">
            {/* Description slides LEFT smoothly */}
            <motion.div initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 1.2, ease: "easeOut" }} className="flex-1 order-2 md:order-1 text-center md:text-left">
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
                Hello, I'm <span className="text-white font-bold">K R Jayasoorya</span>, a detail-oriented Python Developer with a B.Tech in Electronics & Communication Engineering. I build secure, scalable enterprise applications with Django and React, leveraging AI to accelerate delivery.
              </p>
            </motion.div>
            {/* Image enlarges and moves RIGHT slowly */}
            <motion.div initial={{ opacity: 0, x: 100, scale: 0.8 }} whileInView={{ opacity: 1, x: 0, scale: 1.25 }} viewport={{ once: false }} transition={{ duration: 1.2, ease: "easeOut" }} className="relative w-48 h-48 md:w-64 md:h-64 order-1 md:order-2 group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl opacity-40 group-hover:opacity-80 transition-opacity"></div>
              <img src="/profile.webp" alt="K R Jayasoorya" className="relative w-full h-full object-cover rounded-full border-4 border-[#0a0a0f] z-10 shadow-2xl" />
            </motion.div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[{ label: 'TOTAL PROJECTS', val: '3+', sub: 'Enterprise & AI' }, { label: 'CERTIFICATES', val: '1', sub: 'Full Stack Certified' }, { label: 'YEARS OF B.TECH', val: '4', sub: '2021-2025' }].map(stat => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-all text-center">
                <h4 className="text-5xl font-black mb-2">{stat.val}</h4>
                <p className="text-xs font-bold tracking-widest text-purple-400 mb-2 uppercase">{stat.label}</p>
                <p className="text-xs text-slate-500 uppercase">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Showcase Section */}
      <section id="portfolio" className="py-32 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <FadeInTitle className="text-6xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Portfolio Showcase</FadeInTitle>
          <p className="text-slate-400">Explore my technical journey through projects and skills.</p>
        </div>
        <div className="flex justify-center p-2 bg-white/5 rounded-2xl border border-white/5 w-fit mx-auto mb-16">
          {['projects', 'certificates', 'tech'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>{tab === 'tech' ? 'Tech Stack' : tab}</button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {activeTab === 'projects' && (
            <motion.div key="proj" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid md:grid-cols-3 gap-8">
              {[{ title: 'TechNexus IT Helpdesk', img: '/technexus.png', tags: ['Django 5', 'AWS'], github: 'https://github.com/jayasoorya-kr/TechNexus-Helpdesk', shortDesc: 'Enterprise ticketing system with RBAC and cloud deployment.', detailedDesc: 'Automated ticket workflows with priority logic, role-based dashboards, and AI virtual assistant support.' }, { title: 'VSCMS', img: '/vscms.png', tags: ['Django REST', 'React'], github: 'https://github.com/jayasoorya-kr/VSCMS_Project', shortDesc: 'Vendor & Service Contract Management System.', detailedDesc: 'Built secure RESTful APIs with JWT authentication. Implements contract lifecycle tracking and analytics.' }, { title: 'AI Sign Recognition', img: '/sign-language.png', tags: ['OpenCV', 'MediaPipe'], github: 'https://github.com/jayasoorya-kr', shortDesc: 'Real-time hand gesture recognition using computer vision.', detailedDesc: 'Processes hand landmark data with MediaPipe and maps gestures to text/speech output.' }].map((proj, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} className="group bg-[#13131f] border border-white/5 rounded-3xl overflow-hidden hover:border-purple-500/50 shadow-lg relative">
                  <div className="h-48 overflow-hidden border-b border-white/5 relative">
                    <img src={proj.img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" />
                    <div className="absolute inset-0 bg-[#0a0a0f]/95 flex items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-slate-300 text-center leading-relaxed font-medium">{proj.detailedDesc}</div>
                  </div>
                  <div className="p-8">
                    <h4 className="text-xl font-bold mb-2">{proj.title}</h4>
                    <p className="text-sm text-slate-500 mb-4 group-hover:opacity-20 transition-opacity">{proj.shortDesc}</p>
                    <div className="flex justify-between items-center"><div className="flex gap-2">{proj.tags.map(tag => <span key={tag} className="text-[10px] bg-purple-500/10 text-purple-400 px-2 py-1 rounded-md border border-purple-500/20 font-bold uppercase">{tag}</span>)}</div><a href={proj.github} target="_blank" rel="noreferrer" className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors">GitHub ↗</a></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          {activeTab === 'certificates' && (
            <motion.div key="cert" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} className="flex justify-center">
              <div className="group relative bg-[#13131f] border border-white/5 rounded-3xl overflow-hidden hover:border-purple-500/50 shadow-lg max-w-md w-full transition-all text-left">
                <div className="h-64 overflow-hidden relative"><img src="/python-cert-thumb.png" alt="Python Certificate" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-500" /><a href="/Python Developer Certificate.pdf" target="_blank" rel="noreferrer" className="absolute inset-0 bg-purple-600/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"><span className="font-bold uppercase tracking-widest text-sm">View Certificate</span></a></div>
                <div className="p-8"><h3 className="text-xl font-bold mb-1">Certified Python Fullstack Developer</h3><p className="text-sm text-purple-400 font-medium mb-4">SMEC Labs • ID: 114360</p><p className="text-sm text-slate-400 leading-relaxed mb-6">Six-month training (July 2025 – January 2026) covering full-stack development and enterprise-grade Python logic.</p><a href="/Python Developer Certificate.pdf" target="_blank" className="text-[10px] font-bold text-slate-500 border-t border-white/5 pt-4 block hover:text-purple-400 transition-colors">Download PDF ↗</a></div>
              </div>
            </motion.div>
          )}
          {activeTab === 'tech' && (
            <motion.div key="tech" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[{ name: 'Python', icon: <FaPython className="text-blue-400" /> }, { name: 'Django', icon: <SiDjango className="text-emerald-500" /> }, { name: 'React.js', icon: <FaReact className="text-cyan-400" /> }, { name: 'SQL', icon: <SiPostgresql className="text-blue-300" /> }, { name: 'Tailwind', icon: <SiTailwindcss className="text-sky-400" /> }, { name: 'AWS', icon: <FaAws className="text-orange-400" /> }, { name: 'Linux', icon: <FaLinux className="text-yellow-500" /> }, { name: 'OpenCV', icon: <SiOpencv className="text-green-500" /> }, { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" /> }, { name: 'HTML5', icon: <FaHtml5 className="text-orange-600" /> }].map((tech) => (
                <div key={tech.name} className="bg-white/5 border border-white/5 p-8 rounded-3xl flex flex-col items-center justify-center gap-4 hover:bg-purple-600/10 hover:border-purple-500/40 transition-all group">
                  <div className="text-4xl group-hover:scale-110 transition-transform">{tech.icon}</div><span className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-white">{tech.name}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16"><FadeInTitle className="text-6xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Contact Me</FadeInTitle><p className="text-slate-400 text-lg">Got a question? Send me a message, and I'll get back to you soon.</p></div>
        <div className="flex flex-col gap-12 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 backdrop-blur-2xl shadow-2xl relative group hover:border-purple-500/30 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Get in Touch</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <input type="text" placeholder="Your Name" required className="w-full bg-[#0a0a0f]/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500 transition-all text-white" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                <input type="email" placeholder="Your Email" required className="w-full bg-[#0a0a0f]/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500 transition-all text-white" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <textarea placeholder="Your Message" rows="5" required className="w-full bg-[#0a0a0f]/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-purple-500 transition-all text-white resize-none" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:scale-[1.01] transition-all">Send Message</button>
            </form>
          </motion.div>
          <div className="space-y-6">
            <div className="flex items-center gap-4"><div className="h-[2px] w-12 bg-purple-500"></div><h4 className="text-xl font-bold text-slate-300">Connect With Me</h4></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[{ label: "Let's Connect", sub: "on LinkedIn", url: "https://linkedin.com/in/kr-jayasoorya", icon: <FaLinkedin />, color: "group-hover:text-blue-500" }, { label: "Instagram", sub: "@_im.soorya_", url: "https://www.instagram.com/_im.soorya_/", icon: <FaInstagram />, color: "group-hover:text-pink-500" }, { label: "GitHub", sub: "@jayasoorya-kr", url: "https://github.com/jayasoorya-kr", icon: <FaGithub />, color: "group-hover:text-white" }].map((social, i) => (
                <motion.a key={i} href={social.url} target="_blank" rel="noreferrer" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ delay: i * 0.1 }} className="bg-white/5 border border-white/5 p-6 rounded-3xl flex items-center gap-5 transition-all group hover:bg-white/[0.07] hover:border-purple-500/50">
                  <div className={`w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-2xl text-slate-400 transition-colors ${social.color}`}>{social.icon}</div>
                  <div><h5 className="font-bold text-white group-hover:text-purple-400 transition-colors font-medium">{social.label}</h5><p className="text-xs text-slate-500">{social.sub}</p></div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-slate-500 text-xs border-t border-white/5 bg-[#0a0a0f]/50 backdrop-blur-md">
        © {new Date().getFullYear()} K R Jayasoorya. All rights reserved.
      </footer>
    </div>
  );
};

export default Portfolio;