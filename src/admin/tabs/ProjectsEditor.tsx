import React, { useState } from 'react';
import { FolderGit2, Plus, Trash2, Edit3, Star } from 'lucide-react';
import { Project } from '../../types/portfolio';

interface ProjectsEditorProps {
  projects: Project[];
  onAddProject: (project: Omit<Project, 'id'>) => void;
  onUpdateProject: (id: string, updated: Partial<Project>) => void;
  onDeleteProject: (id: string) => void;
}

export const ProjectsEditor: React.FC<ProjectsEditorProps> = ({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    tagline: '',
    description: '',
    tags: 'React, TypeScript',
    category: 'Full Stack',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    demoUrl: '',
    githubUrl: '',
    featured: true
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;

    onAddProject({
      title: newProject.title,
      tagline: newProject.tagline,
      description: newProject.description,
      tags: newProject.tags.split(',').map((t) => t.trim()).filter(Boolean),
      category: newProject.category,
      image: newProject.image,
      demoUrl: newProject.demoUrl || undefined,
      githubUrl: newProject.githubUrl || undefined,
      featured: newProject.featured
    });

    setNewProject({
      title: '',
      tagline: '',
      description: '',
      tags: 'React, TypeScript',
      category: 'Full Stack',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
      demoUrl: '',
      githubUrl: '',
      featured: false
    });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FolderGit2 size={20} className="text-indigo-400" />
            <span>Projects Manager</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Add, update, or remove portfolio showcase projects.
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
        >
          <Plus size={14} />
          <span>{showAddForm ? 'Cancel' : 'Add Project'}</span>
        </button>
      </div>

      {/* Add New Project Modal / Form */}
      {showAddForm && (
        <form onSubmit={handleCreate} className="glass-panel p-5 rounded-2xl border border-indigo-500/30 space-y-4">
          <h4 className="text-sm font-bold text-indigo-300">Create New Project</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title</label>
              <input
                type="text"
                required
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                placeholder="e.g. HyperDrive Engine"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <input
                type="text"
                value={newProject.category}
                onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                placeholder="e.g. Full Stack, AI, Web3"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Short Tagline</label>
              <input
                type="text"
                value={newProject.tagline}
                onChange={(e) => setNewProject({ ...newProject, tagline: e.target.value })}
                placeholder="Brief one-line summary"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Description</label>
              <textarea
                rows={2}
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                placeholder="Detailed breakdown of what you built and the impact..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={newProject.tags}
                onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                placeholder="React, TypeScript, Go"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL</label>
              <input
                type="text"
                value={newProject.image}
                onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub Repo URL (Optional)</label>
              <input
                type="text"
                value={newProject.githubUrl}
                onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Live Demo URL (Optional)</label>
              <input
                type="text"
                value={newProject.demoUrl}
                onChange={(e) => setNewProject({ ...newProject, demoUrl: e.target.value })}
                placeholder="https://example.com"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
              />
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={newProject.featured}
                onChange={(e) => setNewProject({ ...newProject, featured: e.target.checked })}
                className="rounded text-indigo-600"
              />
              <span>Mark as Featured Project</span>
            </label>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
            >
              Save New Project
            </button>
          </div>
        </form>
      )}

      {/* Projects List */}
      <div className="space-y-3">
        {projects.map((project) => {
          const isEditing = editingId === project.id;

          return (
            <div
              key={project.id}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-950 shrink-0">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{project.title}</span>
                      {project.featured && <Star size={13} className="text-amber-400 fill-amber-400" />}
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">{project.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingId(isEditing ? null : project.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1"
                  >
                    <Edit3 size={13} />
                    <span>{isEditing ? 'Close' : 'Edit'}</span>
                  </button>
                  <button
                    onClick={() => onDeleteProject(project.id)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 text-xs"
                    title="Delete Project"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* Edit Drawer */}
              {isEditing && (
                <div className="pt-3 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Title</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => onUpdateProject(project.id, { title: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Category</label>
                    <input
                      type="text"
                      value={project.category}
                      onChange={(e) => onUpdateProject(project.id, { category: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={project.tagline}
                      onChange={(e) => onUpdateProject(project.id, { tagline: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-400 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={project.description}
                      onChange={(e) => onUpdateProject(project.id, { description: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Demo URL</label>
                    <input
                      type="text"
                      value={project.demoUrl || ''}
                      onChange={(e) => onUpdateProject(project.id, { demoUrl: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">GitHub URL</label>
                    <input
                      type="text"
                      value={project.githubUrl || ''}
                      onChange={(e) => onUpdateProject(project.id, { githubUrl: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
