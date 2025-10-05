import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Save } from 'lucide-react';

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string | null;
  order_index: number;
}

export default function ExperienceManager() {
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    const { data } = await supabase
      .from('experience')
      .select('*')
      .order('order_index');

    if (data) {
      setExperience(data);
    }
    setLoading(false);
  };

  const handleAdd = () => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      title: '',
      company: '',
      period: '',
      description: null,
      order_index: experience.length + 1,
    };
    setExperience([...experience, newExperience]);
  };

  const handleUpdate = (id: string, field: keyof Experience, value: any) => {
    setExperience(experience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const handleDelete = async (id: string) => {
    await supabase.from('experience').delete().eq('id', id);
    setExperience(experience.filter(exp => exp.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    const { error } = await supabase
      .from('experience')
      .upsert(experience.map(exp => ({
        ...exp,
        updated_at: new Date().toISOString(),
      })));

    if (error) {
      setMessage('Error saving experience');
    } else {
      setMessage('Experience saved successfully!');
      setTimeout(() => setMessage(''), 3000);
      fetchExperience();
    }

    setSaving(false);
  };

  if (loading) {
    return <div className="card-container">Loading...</div>;
  }

  return (
    <div className="card-container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title mb-0">Manage Experience</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-400/20 border-2 border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400/30 transition-all"
        >
          <Plus size={20} />
          Add Experience
        </button>
      </div>

      <div className="space-y-6">
        {experience.map((exp) => (
          <div key={exp.id} className="p-4 bg-black/20 border border-gray-700 rounded-lg">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => handleUpdate(exp.id, 'title', e.target.value)}
                  className="form-input"
                  placeholder="e.g., Digital Marketing Associate"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)}
                    className="form-input"
                    placeholder="e.g., Tech Solutions Inc."
                  />
                </div>

                <div>
                  <label className="form-label">Period</label>
                  <input
                    type="text"
                    value={exp.period}
                    onChange={(e) => handleUpdate(exp.id, 'period', e.target.value)}
                    className="form-input"
                    placeholder="e.g., 2023 - Present"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Description (Optional)</label>
                <textarea
                  rows={3}
                  value={exp.description || ''}
                  onChange={(e) => handleUpdate(exp.id, 'description', e.target.value || null)}
                  className="form-input resize-none"
                  placeholder="Brief description of your role"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Order</label>
                  <input
                    type="number"
                    value={exp.order_index}
                    onChange={(e) => handleUpdate(exp.id, 'order_index', parseInt(e.target.value))}
                    className="form-input"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500/30 transition-all w-full justify-center"
                  >
                    <Trash2 size={20} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {message && (
        <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="submit-button mt-6"
      >
        <Save size={20} />
        {saving ? 'Saving...' : 'Save All Changes'}
      </button>
    </div>
  );
}
