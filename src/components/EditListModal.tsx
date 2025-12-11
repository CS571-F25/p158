import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { List } from '../App';

interface EditListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (list: List) => void;
  list: List | null;
}

const colorOptions = [
  '#000000', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
  '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B500'
];

export function EditListModal({ isOpen, onClose, onUpdate, list }: EditListModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: '#000000',
  });

  useEffect(() => {
    if (list) {
      setFormData({
        name: list.name,
        description: list.description || '',
        color: list.color || '#000000',
      });
    }
  }, [list]);

  if (!isOpen || !list) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      ...list,
      name: formData.name,
      description: formData.description || undefined,
      color: formData.color,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl">Edit List</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm mb-2 text-gray-700">
              List Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="e.g., Winter Collection"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Description (optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
              placeholder="Add a description..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm mb-2 text-gray-700">
              Color
            </label>
            <div className="grid grid-cols-5 gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`w-12 h-12 rounded-lg transition-all ${
                    formData.color === color 
                      ? 'ring-2 ring-offset-2 ring-black' 
                      : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
