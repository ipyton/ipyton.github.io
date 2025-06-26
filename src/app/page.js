"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDown, Linkedin, Mail, Code, Palette, Smartphone, Globe, ArrowRight, Menu, X } from 'lucide-react';
import { Database, Cloud, Monitor, TestTube, Zap, Film, Server, GitBranch, BarChart3 } from 'lucide-react';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';



const navBarStyles = {
  // Enhanced scrolled state with stronger gaussian blur
  scrolled: 'bg-white/60 backdrop-blur-3xl backdrop-saturate-200 shadow-2xl border-b border-gray-200/60',

  // Enhanced initial state with stronger gaussian blur  
  initial: 'bg-black/15 backdrop-blur-3xl backdrop-saturate-200 shadow-2xl',

  // Logo styles remain the same
  logoScrolled: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-3xl font-bold',
  logoInitial: 'text-white drop-shadow-lg text-3xl font-bold',

  // Enhanced navigation item styles with blur
  navItemActive: {
    scrolled: 'text-blue-700 bg-blue-100/80 backdrop-blur-sm shadow-md border border-blue-200 font-semibold',
    initial: 'text-white bg-white/20 backdrop-blur-md shadow-lg border border-white/40 font-semibold'
  },
  navItemInactive: {
    scrolled: 'text-gray-800 hover:text-blue-700 hover:bg-blue-50/80 backdrop-blur-sm border border-transparent hover:border-blue-200 font-medium',
    initial: 'text-white/95 hover:text-white hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 font-medium'
  }
};

// Updated Skills Section with better visibility
const skillsSectionStyles = {
  // Main container with stronger background
  container: 'py-24 bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 relative',

  // Category buttons with better contrast
  categoryButton: {
    active: 'flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white shadow-xl transform scale-105 border-2 border-white/50',
    inactive: 'flex items-center gap-2 px-6 py-3 rounded-full font-medium bg-white/90 text-gray-800 hover:bg-white border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl hover:scale-105'
  },

  // Skill cards with enhanced visibility
  skillCard: 'p-6 rounded-2xl text-white font-semibold text-center shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-white/30',

  // Category sections with better backgrounds
  categorySection: 'bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border-2 border-gray-100 hover:shadow-3xl transition-all duration-300'
};

const ImageCarousel = ({ images, alt, color }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, isAutoPlaying]);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  if (images.length === 1) {
    return (
      <div className="relative w-full h-64 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20`}></div>
        <img
          src={images[0]}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 overflow-hidden group">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20`}></div>

      {/* Main image */}
      <div className="relative w-full h-full">
        <img
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15"></div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 hover:scale-110 shadow-lg"
        aria-label="Previous image"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 hover:scale-110 shadow-lg"
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>

      {/* Auto-play toggle */}
      <button
        onClick={toggleAutoPlay}
        className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30 hover:scale-110 shadow-lg"
        aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>

      {/* Image indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`relative w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
              ? 'bg-white scale-125 shadow-lg'
              : 'bg-white/50 hover:bg-white/75 hover:scale-110'
              }`}
            aria-label={`Go to image ${index + 1}`}
          >
            {index === currentIndex && (
              <div className="absolute inset-0 rounded-full bg-white animate-ping"></div>
            )}
          </button>
        ))}
      </div>

      {/* Image counter */}
      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md text-white text-sm px-3 py-1 rounded-full font-medium">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Progress bar */}
      {isAutoPlaying && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <div
            className="h-full bg-gradient-to-r from-white to-white/80 transition-all duration-75 ease-linear"
            style={{
              width: `${((currentIndex + 1) / images.length) * 100}%`
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Add scroll-based section detection
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Movie Enthusiasts' Community",
      description: "A Community let you watch movies and share ideas.",
      images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"],
      tech: ["Python", "Flask", "Spring Boot", "React.js", "WebSocket", "Apache Kafka", "ScyllaDB", "Redis", "Nginx", "Aria2",
        "FFmpeg", "MinIO", "Fluent Bit", "Prometheus", "Grafana", "Elasticsearch", "GitHub Actions"],
      github: "https://github.com/ipyton/vydeos",
      demo: "https://vydeo.xyz",
      category: "web"
    },
    {
      id: 2,
      title: "Dunder Debunk(password:$mallAmber19)",
      description: "React Native mobile app with real-time synchronization and offline support",
      images: ["https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop"],
      tech: ["React", "MySql", "Redux", "Oracle Cloud", "Gemini", "Flask"],
      github: "#",
      demo: "https://dunderdebunk.pages.dev/",
      category: "ai"
    },
    {
      id: 3,
      title: "Image Detection Service",
      description: "Modern chat interface with AI integration and real-time messaging",
      images: ["https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"],
      tech: ["React", "Python","DynamoDB", "API Gateway", "lambda","Cognito"],
      github: "#",
      demo: "#",
      category: "ai"
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Responsive portfolio website with modern animations and dark mode",
      images: ["https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop"],
      tech: ["Next.js", "Node.js", "Tailwind CSS", "Google Cloud Functions", ""],
      github: "#",
      demo: "#",
      category: "web"
    },
    {
      id: 5,
      title: "Book Management Platform",
      description: "A cross-platform application",
      images: ["https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop"],
      tech: ["Next.js", "Tailwind CSS", "GraphQL", "React Native"],
      github: "#",
      demo: "#",
      category: "web/mobile"
    },
    {
      id: 6,
      title: "Blog Page",
      description: "A Technology Blog",
      images: ["https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop"],
      tech: ["WordPress"],
      github: "#",
      demo: "#",
      category: "web/mobile"
    }

  ];

  const skills = [
    // Programming Languages
    { name: "Java", category: "programming" },
    { name: "Python", category: "programming" },
    { name: "JavaScript", category: "programming" },
    { name: "Go", category: "programming" },

    // Backend
    { name: "Spring Boot", category: "backend" },
    { name: "Spring Cloud", category: "backend" },
    { name: "Node.js", category: "backend" },
    { name: "Nginx", category: "backend" },
    { name: "Netty", category: "backend" },
    { name: "RESTful APIs", category: "backend" },
    { name: "Microservices", category: "backend" },

    // Frontend
    { name: "React.js", category: "frontend" },
    { name: "Vue.js", category: "frontend" },
    { name: "TypeScript", category: "frontend" },
    { name: "HTML5", category: "frontend" },
    { name: "CSS3", category: "frontend" },
    { name: "Responsive Design", category: "frontend" },

    // Databases
    { name: "MySQL", category: "database" },
    { name: "Oracle", category: "database" },
    { name: "PostgreSQL", category: "database" },
    { name: "Redis", category: "database" },
    { name: "MongoDB", category: "database" },
    { name: "Cassandra", category: "database" },

    // Cloud & DevOps
    { name: "AWS", category: "devops" },
    { name: "GCP", category: "devops" },
    { name: "Docker", category: "devops" },
    { name: "Kubernetes", category: "devops" },
    { name: "Jenkins", category: "devops" },
    { name: "GitHub Actions", category: "devops" },
    { name: "Maven", category: "devops" },
    { name: "Git", category: "devops" },

    // Big Data
    { name: "Apache Spark", category: "bigdata" },
    { name: "Apache Flink", category: "bigdata" },
    { name: "Kafka", category: "bigdata" },
    { name: "ETL Pipelines", category: "bigdata" },

    // Monitoring
    { name: "Prometheus", category: "monitoring" },
    { name: "Grafana", category: "monitoring" },
    { name: "Kibana", category: "monitoring" },

    // Testing
    { name: "TDD", category: "testing" },
    { name: "JMeter", category: "testing" },
    { name: "Locust", category: "testing" },
    { name: "Pytest", category: "testing" },

    // Performance
    { name: "JVM Fine-Tuning", category: "performance" },
    { name: "Database Optimization", category: "performance" },
    { name: "Distributed Systems", category: "performance" },
    { name: "Linux I/O", category: "performance" },
    { name: "TCP Stack Finetuning", category: "performance" },

    // Media Processing
    { name: "FFmpeg", category: "media" },
    { name: "H.264", category: "media" },
    { name: "RTMP", category: "media" },
    { name: "HLS", category: "media" },
    { name: "Video Transcoding", category: "media" },

    // Systems
    { name: "Unix/Linux Administration", category: "systems" },
    { name: "Serverless Architecture", category: "systems" },
    { name: "CI/CD", category: "systems" }
  ]


  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];
  const categories = [
    { id: 'all', name: 'All Skills', icon: Code, color: 'from-purple-500 to-pink-500' },
    { id: 'programming', name: 'Programming', icon: Code, color: 'from-blue-500 to-cyan-500' },
    { id: 'backend', name: 'Backend', icon: Server, color: 'from-green-500 to-emerald-500' },
    { id: 'frontend', name: 'Frontend', icon: Monitor, color: 'from-orange-500 to-red-500' },
    { id: 'database', name: 'Database', icon: Database, color: 'from-indigo-500 to-purple-500' },
    { id: 'devops', name: 'DevOps', icon: Cloud, color: 'from-teal-500 to-blue-500' },
    { id: 'bigdata', name: 'Big Data', icon: BarChart3, color: 'from-yellow-500 to-orange-500' },
    { id: 'monitoring', name: 'Monitoring', icon: Monitor, color: 'from-pink-500 to-rose-500' },
    { id: 'testing', name: 'Testing', icon: TestTube, color: 'from-cyan-500 to-blue-500' },
    { id: 'performance', name: 'Performance', icon: Zap, color: 'from-amber-500 to-yellow-500' },
    { id: 'media', name: 'Media', icon: Film, color: 'from-violet-500 to-purple-500' },
    { id: 'systems', name: 'Systems', icon: GitBranch, color: 'from-emerald-500 to-teal-500' }
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  const groupedSkills = categories.reduce((acc, category) => {
    if (category.id !== 'all') {
      acc[category.id] = skills.filter(skill => skill.category === category.id);
    }
    return acc;
  }, {});

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // 发送状态
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Firebase Functions URL - 请替换为你的实际URL
  const FUNCTIONS_BASE_URL = 'https://YOUR_REGION-YOUR_PROJECT_ID.cloudfunctions.net';

  // 处理输入变化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // 清除错误信息
    if (error) setError('');
    if (success) setSuccess(false);
  };

  // 表单验证
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('please input your name');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Please input your email');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please input a valid mail address');
      return false;
    }
    if (!formData.message.trim()) {
      setError('Please input your message');
      return false;
    }
    return true;
  };

  // 发送邮件函数
  const sendEmail = async (emailData) => {
    const response = await fetch(`https://sendemailwithtemplate-3p67nbl3dq-ts.a.run.app`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Sended Error');
    }

    return result;
  };

  // 处理表单提交
  const handleSubmit = async () => {
    // 验证表单
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // 准备邮件数据
      const emailData = {
        sender: formData.name,
        content: formData.message,
        email: formData.email,
      };

      // 发送邮件
      const result = await sendEmail(emailData);

      console.log('Successful:', result);

      // 显示成功消息
      setSuccess(true);

      // 清空表单
      setFormData({
        name: '',
        email: '',
        message: ''
      });

    } catch (err) {
      console.error('Sent Error:', err);
      setError(err.message || 'Sent Error, try again later');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
        ? navBarStyles.scrolled
        : navBarStyles.initial
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className={`transition-all duration-300 ${isScrolled
              ? 'text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
              : 'text-3xl font-bold text-white drop-shadow-lg'
              }`}>
              Noah's Portfolio
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href.slice(1))}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border-2 ${activeSection === item.href.slice(1)
                    ? isScrolled
                      ? 'text-blue-700 bg-blue-100 shadow-md border-blue-200 font-semibold'
                      : 'text-white bg-white/25 backdrop-blur-sm shadow-lg border-white/30 font-semibold'
                    : isScrolled
                      ? 'text-gray-800 hover:text-blue-700 hover:bg-blue-50 border-transparent hover:border-blue-200 font-medium'
                      : 'text-white/95 hover:text-white hover:bg-white/25 backdrop-blur-sm border-white/20 hover:border-white/40 font-medium'
                    }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className={`md:hidden p-3 rounded-lg transition-all duration-300 ${isScrolled
                ? 'text-gray-800 hover:bg-gray-100 border-2 border-gray-200'
                : 'text-white hover:bg-white/25 backdrop-blur-sm border-2 border-white/30'
                }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="bg-white/98 backdrop-blur-lg border-t-2 border-gray-200 rounded-b-2xl mx-2 mb-4 shadow-2xl">
                <div className="px-6 py-4 space-y-3">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        scrollToSection(item.href.slice(1));
                        setIsMenuOpen(false);
                      }}
                      className={`block w-full text-left px-6 py-4 rounded-xl font-medium transition-all duration-200 border-2 ${activeSection === item.href.slice(1)
                        ? 'text-blue-700 bg-blue-100 shadow-md border-blue-200 font-semibold'
                        : 'text-gray-800 hover:text-blue-700 hover:bg-blue-50 border-transparent hover:border-blue-200'
                        }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>


      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-pulse">
            Hi, I'm <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">Noah</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Full Stack Developer & UI/UX Designer
          </p>
          <p className="text-lg md:text-xl font-medium mb-8 opacity-85 tracking-wide">
            <span className="inline-block mx-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
              Versatile
            </span>
            <span className="inline-block mx-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
              Responsible
            </span>
            <span className="inline-block mx-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
              Communicative
            </span>
          </p>
          <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto">
            I create exceptional digital experiences that combine beautiful design with powerful functionality.
            Let's build something amazing together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              View My Work <ArrowRight size={20} />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-white" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://i.imgur.com/W0tBPKw.jpeg"
                alt="Profile"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              />
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                Passionate Developer & Creative Problem Solver
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                With over 2 years of experience in web development, I specialize in creating
                modern, responsive applications using the latest technologies. I love turning
                complex problems into simple, beautiful solutions.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing
                to open-source projects, or sharing knowledge with the developer community.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">5</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">2+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}

      <section id="skills" className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Skills & Technologies</h2>
            <div className="w-24 h-2 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
              A comprehensive toolkit spanning full-stack development, cloud infrastructure, and performance optimization
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300 border-2 ${activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-xl transform scale-105 border-white/50 font-semibold`
                    : 'bg-white text-gray-800 hover:bg-white border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl hover:scale-105'
                    }`}
                >
                  <IconComponent size={18} />
                  <span className="font-medium">{category.name}</span>
                  {category.id !== 'all' && (
                    <span className={`text-xs px-2 py-1 rounded-full ${activeCategory === category.id
                      ? 'bg-white/25 text-white'
                      : 'bg-gray-200 text-gray-700'
                      }`}>
                      {groupedSkills[category.id]?.length || 0}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Skills Display */}
          {activeCategory === 'all' ? (
            // Grouped view for "All Skills"
            <div className="space-y-16">
              {categories.slice(1).map((category) => {
                const categorySkills = groupedSkills[category.id];
                if (!categorySkills || categorySkills.length === 0) return null;

                const IconComponent = category.icon;
                return (
                  <div key={category.id} className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border-2 border-gray-100 hover:shadow-3xl transition-all duration-300">
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`p-4 rounded-2xl bg-gradient-to-r ${category.color} text-white shadow-lg`}>
                        <IconComponent size={28} />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900">{category.name}</h3>
                        <p className="text-gray-600 font-medium">{categorySkills.length} technologies</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {categorySkills.map((skill, index) => (
                        <div
                          key={index}
                          className={`p-6 rounded-2xl bg-gradient-to-r ${category.color} text-white font-semibold text-center shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-white/30`}
                        >
                          {skill.name}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Filtered view for specific category
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredSkills.map((skill, index) => {
                const category = categories.find(cat => cat.id === skill.category);
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl bg-gradient-to-r ${category?.color || 'from-gray-500 to-gray-600'} text-white font-semibold text-center shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 border-2 border-white/60`}
                  >
                    {skill.name}
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>
      {/* Projects Section */}
      <section id="projects" className="py-24 bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-block">
              <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
                Featured Projects
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-auto rounded-full"></div>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-2 rounded-full"></div>
            </div>
            <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto">
              Discover some of my most exciting projects, crafted with passion and cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-card group relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/80"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  animationDelay: `${index * 200}ms`
                }}
              >
                {/* Glowing border effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}></div>
                <div className="absolute inset-0.5 bg-white rounded-2xl"></div>

                <div className="relative">
                  <ImageCarousel images={project.images} alt={project.title} color={project.color} />

                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                        {project.title}
                      </h3>
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.color} animate-pulse`}></div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-8">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="tech-tag group/tech relative px-4 py-2 text-gray-800 text-sm rounded-full font-medium border border-gray-300 backdrop-blur-sm hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default overflow-hidden bg-white"

                          style={{
                            animationDelay: `${techIndex * 100}ms`
                          }}
                        >
                          {/* Dynamic gradient background */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover/tech:opacity-15 transition-opacity duration-300`}
                          ></div>

                          {/* Tech name */}
                          <span className="relative z-10">{tech}</span>

                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/tech:translate-x-full transition-transform duration-700"></div>
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-6">
                      <a
                        href={project.github}
                        className="group/link flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium"
                      >
                        <div className="p-2 rounded-full bg-gray-100 group-hover/link:bg-blue-100 group-hover/link:scale-110 transition-all duration-300">
                          <Github size={18} />
                        </div>
                        <span className="group-hover/link:translate-x-1 transition-transform duration-300">Code</span>
                      </a>
                      <a
                        href={project.demo}
                        className="group/link flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-all duration-300 font-medium"
                      >
                        <div className="p-2 rounded-full bg-gray-100 group-hover/link:bg-purple-100 group-hover/link:scale-110 transition-all duration-300">
                          <ExternalLink size={18} />
                        </div>
                        <span className="group-hover/link:translate-x-1 transition-transform duration-300">Demo</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                {hoveredProject === project.id && (
                  <div className="absolute top-4 left-4">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce absolute -top-2 -right-2" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects.
              Let's discuss how we can bring your ideas to life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="text-blue-400" size={24} />
                  <span>noahchenfinalfantasy@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <Github className="text-purple-400" size={24} />
                  <a href="https://github.com/ipyton" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">
                    github.com/ipyton
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <Linkedin className="text-blue-400" size={24} />
                  <a href="https://www.linkedin.com/in/noah-zhiheng-chen-98a841293/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
                    https://www.linkedin.com/in/noah-zhiheng-chen-98a841293/
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* 成功消息 */}
              {success && (
                <div className="p-4 bg-green-900/50 border border-green-500 rounded-lg text-green-400">
                  ✅ Successful, I will connect you as soon as possible.
                </div>
              )}

              {/* 错误消息 */}
              {error && (
                <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-400">
                  ❌ {error}
                </div>
              )}

              {/* 姓名输入 */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* 邮箱输入 */}
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* 消息输入 */}
              <div>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* 提交按钮 */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`w-full px-8 py-4 rounded-lg font-semibold transform transition-all duration-300 ${isLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105'
                  }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Noah Chen. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;