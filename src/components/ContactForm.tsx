import { useState } from 'react';
import { Mail, Send } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/xanyrdvj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _subject: `Portfolio Contact: ${formData.subject}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className="card-container">
      <h2 className="section-title">
        <Mail className="inline-block mr-2" size={24} />
        SEND MESSAGE // CONTACT
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-input"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label className="form-label">Subject</label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="form-input"
            placeholder="Message subject"
          />
        </div>

        <div>
          <label className="form-label">Message</label>
          <textarea
            required
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="form-input resize-none"
            placeholder="Your message..."
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="submit-button"
        >
          <Send size={20} />
          {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent!' : status === 'error' ? 'Failed - Retry' : 'Send Message'}
        </button>

        {status === 'success' && (
          <div className="success-message">
            Message sent successfully! I'll get back to you soon.
          </div>
        )}

        {status === 'error' && (
          <div className="error-message">
            Failed to send message. Please try again or contact directly at ashadapurk@gmail.com
          </div>
        )}
      </form>
    </div>
  );
}
