import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save } from 'lucide-react';

interface SocialLinks {
  id: string;
  linkedin: string;
  github: string;
  email: string;
}

export default function SocialLinksManager() {
  const [socialLinks, setSocialLinks] = useState<SocialLinks | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    const { data } = await supabase
      .from('social_links')
      .select('*')
      .maybeSingle();

    if (data) {
      setSocialLinks(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!socialLinks) return;

    setSaving(true);
    setMessage('');

    const { error } = await supabase
      .from('social_links')
      .upsert({
        id: socialLinks.id,
        linkedin: socialLinks.linkedin,
        github: socialLinks.github,
        email: socialLinks.email,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      setMessage('Error saving social links');
    } else {
      setMessage('Social links saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    }

    setSaving(false);
  };

  if (loading) {
    return <div className="card-container">Loading...</div>;
  }

  if (!socialLinks) {
    return <div className="card-container">No social links found</div>;
  }

  return (
    <div className="card-container">
      <h2 className="section-title mb-6">Manage Social Links</h2>

      <div className="space-y-4">
        <div>
          <label className="form-label">LinkedIn URL</label>
          <input
            type="url"
            value={socialLinks.linkedin}
            onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
            className="form-input"
            placeholder="https://www.linkedin.com/in/your-profile"
          />
        </div>

        <div>
          <label className="form-label">GitHub URL</label>
          <input
            type="url"
            value={socialLinks.github}
            onChange={(e) => setSocialLinks({ ...socialLinks, github: e.target.value })}
            className="form-input"
            placeholder="https://github.com/your-username"
          />
        </div>

        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            value={socialLinks.email}
            onChange={(e) => setSocialLinks({ ...socialLinks, email: e.target.value })}
            className="form-input"
            placeholder="your.email@example.com"
          />
        </div>

        {message && (
          <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
            {message}
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={saving}
          className="submit-button"
        >
          <Save size={20} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
