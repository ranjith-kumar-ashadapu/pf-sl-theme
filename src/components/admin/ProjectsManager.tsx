import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Save, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  status: string;
  progress: number;
  role: string | null;
  order_index: number;
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('order_index');

    if (data) {
      setProjects(data);
    }
    setLoading(false);
  };

  const handleAdd = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      tech_stack: [],
      status: 'Ongoing',
      progress: 0,
      role: null,
      order_index: projects.length + 1,
    };
    setProjects([...projects, newProject]);
  };

  const handleUpdate = (id: string, field: keyof Project, value: any) => {
    setProjects(projects.map(proj =>
      proj.id === id ? { ...proj, [field]: value } : proj
    ));
  };

  const handleAddTech = (id: string, tech: string) => {
    if (!tech.trim()) return;
    setProjects(projects.map(proj =>
      proj.id === id ? { ...proj, tech_stack: [...proj.tech_stack, tech.trim()] } : proj
    ));
  };

  const handleRemoveTech = (id: string, index: number) => {
    setProjects(projects.map(proj =>
      proj.id === id ? { ...proj, tech_stack: proj.tech_stack.filter((_, i) => i !== index) } : proj
    ));
  };

  const handleDelete = async (id: string) => {
    await supabase.from('projects').delete().eq('id', id);
    setProjects(projects.filter(proj => proj.id !== id));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    const { error } = await supabase
      .from('projects')
      .upsert(projects.map(proj => ({
        ...proj,
        updated_at: new Date().toISOString(),
      })));

    if (error) {
      setMessage('Error saving projects');
    } else {
      setMessage('Projects saved successfully!');
      setTimeout(() => setMessage(''), 3000);
      fetchProjects();
    }

    setSaving(false);
  };

  if (loading) {
    return <div className="card-container">Loading...</div>;
  }

  return (
    <div className="card-container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="section-title mb-0">Manage Projects</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-400/20 border-2 border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400/30 transition-all"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>

      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="p-4 bg-black/20 border border-gray-700 rounded-lg">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="form-label">Project Title</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => handleUpdate(project.id, 'title', e.target.value)}
                  className="form-input"
                  placeholder="e.g., BLOCKCHAIN IOT SECURITY"
                />
              </div>

              <div>
                <label className="form-label">Description</label>
                <textarea
                  rows={3}
                  value={project.description}
                  onChange={(e) => handleUpdate(project.id, 'description', e.target.value)}
                  className="form-input resize-none"
                  placeholder="Project description"
                />
              </div>

              <div>
                <label className="form-label">Role (Optional)</label>
                <input
                  type="text"
                  value={project.role || ''}
                  onChange={(e) => handleUpdate(project.id, 'role', e.target.value || null)}
                  className="form-input"
                  placeholder="e.g., Lead Developer"
                />
              </div>

              <div>
                <label className="form-label">Tech Stack</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tech_stack.map((tech, index) => (
                    <span
                      key={index}
                      className="tech-badge flex items-center gap-1"
                    >
                      {tech}
                      <button
                        onClick={() => handleRemoveTech(project.id, index)}
                        className="hover:text-red-500"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id={`tech-${project.id}`}
                    className="form-input flex-1"
                    placeholder="Add technology"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTech(project.id, e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById(`tech-${project.id}`) as HTMLInputElement;
                      handleAddTech(project.id, input.value);
                      input.value = '';
                    }}
                    className="px-4 py-2 bg-cyan-400/20 border-2 border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400/30 transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Status</label>
                  <select
                    value={project.status}
                    onChange={(e) => handleUpdate(project.id, 'status', e.target.value)}
                    className="form-input"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Ongoing">Ongoing</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">Progress (0-100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={project.progress}
                    onChange={(e) => handleUpdate(project.id, 'progress', parseInt(e.target.value))}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Order</label>
                  <input
                    type="number"
                    value={project.order_index}
                    onChange={(e) => handleUpdate(project.id, 'order_index', parseInt(e.target.value))}
                    className="form-input"
                  />
                </div>
              </div>

              <button
                onClick={() => handleDelete(project.id)}
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
