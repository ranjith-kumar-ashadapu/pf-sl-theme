import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Save } from 'lucide-react';

interface Skill {
  id: string;
  name: string;
  level: number;
  order_index: number;
}

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order_index');

    if (data) {
      setSkills(data);
    }
    setLoading(false);
  };

  const handleAdd = () => {
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      name: '',
      level: 50,
      order_index: skills.length + 1,
    };
    setSkills([...skills, newSkill]);
  };

  const handleUpdate = (id: string, field: keyof Skill, value: string | number) => {
    setSkills(skills.map(skill =>
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const handleDelete = async (id: string) => {
    await supabase.from('skills').delete().eq('id', id);
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    const { error } = await supabase
      .from('skills')
      .upsert(skills.map(skill => ({
        ...skill,
        updated_at: new Date().toISOString(),
      })));

    if (error) {
      setMessage('Error saving skills');
    } else {
      setMessage('Skills saved successfully!');
      setTimeout(() => setMessage(''), 3000);
      fetchSkills();
    }

    setSaving(false);
  };

  if (loading) {
    return <div className="card-container">Loading...</div>;
  }

  return (
    <div className="card-container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title mb-0">Manage Skills</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-400/20 border-2 border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400/30 transition-all"
        >
          <Plus size={20} />
          Add Skill
        </button>
      </div>

      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-black/20 border border-gray-700 rounded-lg">
            <div className="md:col-span-6">
              <label className="form-label">Skill Name</label>
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleUpdate(skill.id, 'name', e.target.value)}
                className="form-input"
                placeholder="e.g., SEO Optimization"
              />
            </div>

            <div className="md:col-span-3">
              <label className="form-label">Level (0-100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={skill.level}
                onChange={(e) => handleUpdate(skill.id, 'level', parseInt(e.target.value))}
                className="form-input"
              />
            </div>

            <div className="md:col-span-2">
              <label className="form-label">Order</label>
              <input
                type="number"
                value={skill.order_index}
                onChange={(e) => handleUpdate(skill.id, 'order_index', parseInt(e.target.value))}
                className="form-input"
              />
            </div>

            <div className="md:col-span-1 flex items-end">
              <button
                onClick={() => handleDelete(skill.id)}
                className="w-full px-3 py-2 bg-red-500/20 border-2 border-red-500 text-red-500 rounded-lg hover:bg-red-500/30 transition-all"
              >
                <Trash2 size={20} />
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
