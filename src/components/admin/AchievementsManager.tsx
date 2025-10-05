import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Save } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  order_index: number;
}

export default function AchievementsManager() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    const { data } = await supabase
      .from('achievements')
      .select('*')
      .order('order_index');

    if (data) {
      setAchievements(data);
    }
    setLoading(false);
  };

  const handleAdd = () => {
    const newAchievement: Achievement = {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      order_index: achievements.length + 1,
    };
    setAchievements([...achievements, newAchievement]);
  };

  const handleUpdate = (id: string, field: keyof Achievement, value: any) => {
    setAchievements(achievements.map(ach =>
      ach.id === id ? { ...ach, [field]: value } : ach
    ));
  };

  const handleDelete = async (id: string) => {
    await supabase.from('achievements').delete().eq('id', id);
    setAchievements(achievements.filter(ach => ach.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    const { error } = await supabase
      .from('achievements')
      .upsert(achievements.map(ach => ({
        ...ach,
        updated_at: new Date().toISOString(),
      })));

    if (error) {
      setMessage('Error saving achievements');
    } else {
      setMessage('Achievements saved successfully!');
      setTimeout(() => setMessage(''), 3000);
      fetchAchievements();
    }

    setSaving(false);
  };

  if (loading) {
    return <div className="card-container">Loading...</div>;
  }

  return (
    <div className="card-container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title mb-0">Manage Achievements</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-400/20 border-2 border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400/30 transition-all"
        >
          <Plus size={20} />
          Add Achievement
        </button>
      </div>

      <div className="space-y-6">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="p-4 bg-black/20 border border-gray-700 rounded-lg">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="form-label">Title (use brackets for title format)</label>
                <input
                  type="text"
                  value={achievement.title}
                  onChange={(e) => handleUpdate(achievement.id, 'title', e.target.value)}
                  className="form-input"
                  placeholder="e.g., [Google Analytics Master]"
                />
              </div>

              <div>
                <label className="form-label">Description</label>
                <textarea
                  rows={2}
                  value={achievement.description}
                  onChange={(e) => handleUpdate(achievement.id, 'description', e.target.value)}
                  className="form-input resize-none"
                  placeholder="Brief description of the achievement"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Order</label>
                  <input
                    type="number"
                    value={achievement.order_index}
                    onChange={(e) => handleUpdate(achievement.id, 'order_index', parseInt(e.target.value))}
                    className="form-input"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => handleDelete(achievement.id)}
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
