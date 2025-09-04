import React, { useEffect } from 'react';
import { X, Github, ExternalLink, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ProjectDetailModal = ({ isOpen, onClose, project }) => {
  const { t } = useLanguage();

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
          >
            <X size={24} />
          </button>
          
          <div className="pr-12">
            <h2 className="text-3xl font-bold mb-2">
              {t(`projects.items.${project.id}.title`)}
            </h2>
            <p className="text-blue-100 text-lg">
              {t(`projects.items.${project.id}.description`)}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Project Images */}
          {project.images && project.images.length > 0 && (
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.images.slice(0, 4).map((image, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-xl">
                    <img
                      src={image}
                      alt={`${t(`projects.items.${project.id}.title`)} - Image ${index + 1}`}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Description */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <FileText className="text-blue-600" size={24} />
              {t('projectDetails.features')}
            </h3>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {t(`projects.items.${project.id}.details`)}
              </p>
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t('projectDetails.technologies')}
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-800 rounded-full font-medium border border-blue-200 hover:shadow-md transition-all duration-300 hover:scale-105"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Project Links */}
          <div className="flex flex-wrap gap-4">
            {project.github && project.github.length > 0 && project.github.map((githubLink, index) => (
              <a
                key={index}
                href={githubLink}
                className="group flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
                <span className="font-medium">View Code</span>
              </a>
            ))}

            {project.demo && project.demo !== '#' && (
              <a
                href={project.demo}
                className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={20} />
                <span className="font-medium">Live Demo</span>
              </a>
            )}

            {project.documents && project.documents.length > 0 && project.documents.map((doc, index) => (
              <a
                key={index}
                href={doc}
                className="group flex items-center gap-3 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText size={20} />
                <span className="font-medium">Documentation</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Category:</span> {project.category}
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
            >
              {t('projectDetails.close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;
