import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save } from 'lucide-react';

interface Profile {
  id: string;
  name: string;
  title: string;
  level: number;
  hp: number;
  max_hp: number;
  avatar: string;
  about: string;
}

export default function ProfileManager() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .maybeSingle();

    if (data) {
      setProfile(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!profile) return;

    setSaving(true);
    setMessage('');

    const { error } = await supabase
      .from('profile')
      .upsert({
        id: profile.id,
        name: profile.name,
        title: profile.title,
        level: profile.level,
        hp: profile.hp,
        max_hp: profile.max_hp,
        avatar: profile.avatar,
        about: profile.about,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      setMessage('Error saving profile');
    } else {
      setMessage('Profile saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    }

    setSaving(false);
  };

  if (loading) {
    return <div className="card-container">Loading...</div>;
  }

  if (!profile) {
    return <div className="card-container">No profile found</div>;
  }

  return (
    <div className="card-container">
      <h2 className="section-title mb-6">Manage Profile</h2>

      <div className="space-y-4">
        <div>
          <label className="form-label">Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="form-input"
          />
        </div>

        <div>
          <label className="form-label">Title</label>
          <input
            type="text"
            value={profile.title}
            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
            className="form-input"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="form-label">Level</label>
            <input
              type="number"
              value={profile.level}
              onChange={(e) => setProfile({ ...profile, level: parseInt(e.target.value) })}
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">HP</label>
            <input
              type="number"
              value={profile.hp}
              onChange={(e) => setProfile({ ...profile, hp: parseInt(e.target.value) })}
              className="form-input"
            />
          </div>

          <div>
            <label className="form-label">Max HP</label>
            <input
              type="number"
              value={profile.max_hp}
              onChange={(e) => setProfile({ ...profile, max_hp: parseInt(e.target.value) })}
              className="form-input"
            />
          </div>
        </div>

        <div>
          <label className="form-label">Avatar URL</label>
          <input
            type="text"
            value={profile.avatar}
            onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
            className="form-input"
          />
        </div>

        <div>
          <label className="form-label">About</label>
          <textarea
            rows={5}
            value={profile.about}
            onChange={(e) => setProfile({ ...profile, about: e.target.value })}
            className="form-input resize-none"
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
