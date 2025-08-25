import React, { useState } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { t } = useLanguage();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error messages
    if (error) setError('');
    if (success) setSuccess(false);
  };

  // Form validation
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError(t('form.errors.nameRequired'));
      return false;
    }
    if (!formData.email.trim()) {
      setError(t('form.errors.emailRequired'));
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError(t('form.errors.invalidEmail'));
      return false;
    }
    if (!formData.message.trim()) {
      setError(t('form.errors.messageRequired'));
      return false;
    }
    return true;
  };

  // Send email function
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

  // Handle form submission
  const handleSubmit = async () => {
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Prepare email data
      const emailData = {
        sender: formData.name,
        content: formData.message,
        email: formData.email,
      };

      // Send email
      const result = await sendEmail(emailData);

      console.log('Successful:', result);

      // Show success message
      setSuccess(true);

      // Clear form
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
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t('contact.title')}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('contact.subtitle')}
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
            {/* Success message */}
            {success && (
              <div className="p-4 bg-green-900/50 border border-green-500 rounded-lg text-green-400">
                ✅ {t('form.success')}
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-400">
                ❌ {error}
              </div>
            )}

            {/* Name input */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('form.name')}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Email input */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('form.email')}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Message input */}
            <div>
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('form.message')}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Submit button */}
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
                  {t('form.sending')}
                </span>
              ) : (
                t('form.sendMessage')
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 