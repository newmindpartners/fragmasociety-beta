import { Plus, X, Users } from "lucide-react";

interface TeamTabProps {
  formData: any;
  updateFormData: (updates: any) => void;
}

const defaultTeamMember = {
  name: '',
  role: '',
  bio: '',
  credentials: [],
  image: '',
};

export const TeamTab = ({ formData, updateFormData }: TeamTabProps) => {
  const team = formData.team || [];

  const addTeamMember = () => {
    updateFormData({ team: [...team, { ...defaultTeamMember }] });
  };

  const updateTeamMember = (index: number, field: string, value: any) => {
    const newTeam = [...team];
    newTeam[index] = { ...newTeam[index], [field]: value };
    updateFormData({ team: newTeam });
  };

  const removeTeamMember = (index: number) => {
    const newTeam = team.filter((_: any, i: number) => i !== index);
    updateFormData({ team: newTeam });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Team Members</h3>
          <p className="text-sm text-muted-foreground">Add the team behind this deal</p>
        </div>
        <button
          type="button"
          onClick={addTeamMember}
          className="flex items-center gap-2 px-4 py-2 bg-foreground hover:bg-foreground/90 text-background rounded-lg transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      {team.length > 0 ? (
        <div className="space-y-4">
          {team.map((member: any, index: number) => (
            <div key={index} className="bg-card rounded-xl border border-border p-6 relative">
              <button
                type="button"
                onClick={() => removeTeamMember(index)}
                className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Name</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Role</label>
                  <input
                    type="text"
                    value={member.role}
                    onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Co-Founder & CEO"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-1">Bio</label>
                <textarea
                  value={member.bio}
                  onChange={(e) => updateTeamMember(index, 'bio', e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                  placeholder="Brief bio..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Image URL</label>
                  <input
                    type="url"
                    value={member.image}
                    onChange={(e) => updateTeamMember(index, 'image', e.target.value)}
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Credentials (comma-separated)</label>
                  <input
                    type="text"
                    value={member.credentials?.join(', ') || ''}
                    onChange={(e) => updateTeamMember(index, 'credentials', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
                    className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="MBA, CFA, 10+ years experience"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-dashed border-border p-12 text-center">
          <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-muted-foreground mb-2">No team members added</p>
          <p className="text-sm text-muted-foreground mb-4">
            Add the key people behind this investment opportunity
          </p>
          <button
            type="button"
            onClick={addTeamMember}
            className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-colors text-sm"
          >
            Add First Member
          </button>
        </div>
      )}
    </div>
  );
};
