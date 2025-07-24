import React, { useState } from 'react';
import { Code, Server, Monitor, Database, Cloud, BarChart3, TestTube, Zap, Film, GitBranch } from 'lucide-react';

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const skills = [
    // Programming Languages
    {name: "C#", category: "programming" },
    { name: "Java", category: "programming" },
    { name: "Python", category: "programming" },
    { name: "JavaScript", category: "programming" },
    { name: "Go", category: "programming" },

    // Backend
    { name: ".Net", category: "backend" },
    { name: "Spring Boot", category: "backend" },
    { name: "Spring Cloud", category: "backend" },
    { name: "Node.js", category: "backend" },
    { name: "Nginx", category: "backend" },
    { name: "Netty", category: "backend" },
    { name: "Flask", category: "backend" },
    { name: "Fast API", category: "backend" },
    { name: "Django", category: "backend" },
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
    { name: "Entity Framework", category: "database" },
    { name: "ef core", category: "database" },
    { name: "MySQL", category: "database" },
    { name: "Oracle", category: "database" },
    { name: "PostgreSQL", category: "database" },
    { name: "Redis", category: "database" },
    { name: "MongoDB", category: "database" },
    { name: "Cassandra", category: "database" },

    // Cloud & DevOps
    { name: "Azure", category: "devops" },
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

  return (
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
  );
};

export default SkillsSection;