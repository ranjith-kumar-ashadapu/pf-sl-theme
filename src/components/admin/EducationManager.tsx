import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Save } from 'lucide-react';

interface Education {
  id: string;
  degree: string;
  institution: string;
  years: string;
  level_gain: number | null;
  order_index: number;
}

export default function EducationManager() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    const { data } = await supabase
      .from('education')
      .select('*')
      .order('order_index');

    if (data) {
      setEducation(data);
    }
    setLoading(false);
  };

  const handleAdd = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      degree: '',
      institution: '',
      years: '',
      level_gain: null,
      order_index: education.length + 1,
    };
    setEducation([...education, newEducation]);
  };

  const handleUpdate = (id: string, field: keyof Education, value: any) => {
    setEducation(education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const handleDelete = async (id: string) => {
    await supabase.from('education').delete().eq('id', id);
    setEducation(education.filter(edu => edu.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    const { error } = await supabase
      .from('education')
      .upsert(education.map(edu => ({
        ...edu,
        updated_at: new Date().toISOString(),
      })));

    if (error) {
      setMessage('Error saving education');
    } else {
      setMessage('Education saved successfully!');
      setTimeout(() => setMessage(''), 3000);
      fetchEducation();
    }

    setSaving(false);
  };

  if (loading) {
    return <div className="card-container">Loading...</div>;
  }

  return (
    <div className="card-container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title mb-0">Manage Education</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-400/20 border-2 border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400/30 transition-all"
        >
          <Plus size={20} />
          Add Education
        </button>
      </div>

      <div className="space-y-6">
        {education.map((edu) => (
          <div key={edu.id} className="p-4 bg-black/20 border border-gray-700 rounded-lg">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="form-label">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleUpdate(edu.id, 'degree', e.target.value)}
                  className="form-input"
                  placeholder="e.g., Bachelor of Technology in Computer Science"
                />
              </div>

              <div>
                <label className="form-label">Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleUpdate(edu.id, 'institution', e.target.value)}
                  className="form-input"
                  placeholder="e.g., Engineering College"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Years</label>
                  <input
                    type="text"
                    value={edu.years}
                    onChange={(e) => handleUpdate(edu.id, 'years', e.target.value)}
                    className="form-input"
                    placeholder="e.g., 2019 - 2023"
                  />
                </div>

                <div>
                  <label className="form-label">Level Gain (Optional)</label>
                  <input
                    type="number"
                    value={edu.level_gain || ''}
                    onChange={(e) => handleUpdate(edu.id, 'level_gain', e.target.value ? parseInt(e.target.value) : null)}
                    className="form-input"
                    placeholder="e.g., 15"
                  />
                </div>

                <div>
                  <label className="form-label">Order</label>
                  <input
                    type="number"
                    value={edu.order_index}
                    onChange={(e) => handleUpdate(edu.id, 'order_index', parseInt(e.target.value))}
                    className="form-input"
                  />
                </div>
              </div>

              <button
                onClick={() => handleDelete(edu.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500/30 transition-all w-fit"
              >
                <Trash2 size={20} />
                Delete
              </button>
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
