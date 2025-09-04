import React, { useState } from 'react';
import { Github, ExternalLink, Eye } from 'lucide-react';
import ImageCarousel from './ImageCarousel';
import ProjectDetailModal from './ProjectDetailModal';
import { useLanguage } from '../contexts/LanguageContext';

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const projects = [
    {
      id: 0,
      images: ["/calculator0.png","/calculator1.png"],
      tech: ["Node.js", "Next.js", "PostgreSQL", "GCP Lambda", "GitHub Actions"],
      demo: "https://frogs.actionhq.dev/",
      category: "web",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 1,
      images: ["/easePoint0.png","/easePoint1.png"],
      tech: ["C#", "ASP.NET", "Entity Core", "SQL Server", "Azure(APP Service, AI Search)", "Cloudflare", "Next.js", "Tailwind CSS" ,"GraphQL", "React Native"],
      github: ["https://github.com/ipyton/appointments","https://github.com/ipyton/Appointment-System"],
      demo: "https://appointments.czh1278341834.workers.dev",
      category: "web/mobile",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      images: ["/vydeo1.png","/vydeo2.png","/vydeo3.png","/vydeo4.png"],
      tech: ["Python", "Flask", "Spring Boot", "Node.js", "React.js", "WebSocket", "Apache Kafka", "ScyllaDB", "Redis", "Nginx", "Aria2",
        "FFmpeg", "MinIO", "Fluent Bit", "Prometheus", "Grafana", "Elasticsearch", "GitHub Actions"],
      github: ["https://github.com/ipyton/vydeos"],
      demo: "https://vydeo.xyz",
      category: "web",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 3,
      images: ["https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop"],
      tech: ["React", "MySql", "Redux", "Oracle Cloud", "Gemini", "Flask"],
      documents: ["https://eportfolio.monash.edu/view/view.php?t=5b0e8302c18181971f0e"],
      demo: "https://dunderdebúnk.pages.dev/",
      category: "ai",
      color: "from-green-500 to-teal-600"
    },
    {
      id: 4,
      images: ["https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop"],
      tech: ["React", "Python","DynamoDB", "API Gateway", "lambda","Cognito"],
      github: ["https://github.com/ipyton/picdetection/settings"],
      demo: "#",
      category: "ai",
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: 5,
      images: ["https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop"],
      tech: ["Next.js", "Node.js", "Tailwind CSS", "Google Cloud Functions", ""],
      github: ["https://github.com/ipyton/ipyton.github.io"],
      demo: "https://ipyton.github.io/",
      category: "web",
      color: "from-amber-500 to-orange-600"
    },
    // {
    //   id: 6,
    //   title: "Blog Page",
    //   description: "A Technology Blog",
    //   images: ["https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop"],
    //   tech: ["WordPress"],
    //   github: ["#"],
    //   demo: "https://blog.vydeo.xyz/",
    //   category: "web/mobile",
    //   color: "from-violet-500 to-fuchsia-600"
    // }
  ];

  return (
    <section id="projects" className="py-24 bg-gradient-to-br from-indigo-600/5 via-purple-500/10 to-pink-500/5 relative">
      {/* Enhanced flowing background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl flow-bg-1"></div>
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-tr from-purple-500/15 to-pink-500/15 rounded-full blur-3xl flow-bg-2"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 rounded-full blur-3xl flow-bg-3"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gradient-to-bl from-pink-500/15 to-blue-500/15 rounded-full blur-3xl flow-bg-4"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <div className="inline-block">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
              {t('projects.title')}
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mx-auto rounded-full"></div>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mt-2 rounded-full"></div>
          </div>
          <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto">
            {t('projects.subtitle')}
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
                <ImageCarousel images={project.images} alt={t(`projects.items.${project.id}.title`)} color={project.color} />

                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {t(`projects.items.${project.id}.title`)}
                    </h3>
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.color} animate-pulse`}></div>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {t(`projects.items.${project.id}.description`)}
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
                  
                  {project.documents && project.documents.length > 0 && 
                    project.documents.map((doc, docIndex) => (
                      <a
                        key={docIndex}
                        href={doc}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-300 font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Documentation
                      </a>
                    ))
                  }

                  <div className="flex flex-wrap gap-4">
                    {/* View Details Button */}
                    <button
                      onClick={() => handleViewDetails(project)}
                      className="group/link flex items-center gap-3 text-gray-600 hover:text-green-600 transition-all duration-300 font-medium"
                    >
                      <div className="p-2 rounded-full bg-gray-100 group-hover/link:bg-green-100 group-hover/link:scale-110 transition-all duration-300">
                        <Eye size={18} />
                      </div>
                      <span className="group-hover/link:translate-x-1 transition-transform duration-300">{t('projectDetails.viewDetails')}</span>
                    </button>

                    {project.github && project.github.length > 0 && project.github.map((githubLink, index) => (
                      <a
                        key={index}
                        href={githubLink}
                        className="group/link flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="p-2 rounded-full bg-gray-100 group-hover/link:bg-blue-100 group-hover/link:scale-110 transition-all duration-300">
                          <Github size={18} />
                        </div>
                        <span className="group-hover/link:translate-x-1 transition-transform duration-300">Code</span>
                      </a>
                    ))}

                    <a
                      href={project.demo}
                      className="group/link flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-all duration-300 font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="p-2 rounded-full bg-gray-100 group-hover/link:bg-purple-100 group-hover/link:scale-110 transition-all duration-300">
                        <ExternalLink size={18} />
                      </div>
                      <span className="group-hover/link:translate-x-1 transition-transform duration-300">Production</span>
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

      {/* Project Detail Modal */}
      <ProjectDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </section>
  );
};

export default ProjectsSection; 