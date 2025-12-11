import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { List } from '../App';

interface ListCardProps {
  list: List;
  onEdit: (list: List) => void;
  onDelete: (id: string) => void;
  onView: (listId: string) => void;
}

export function ListCard({ list, onEdit, onDelete, onView }: ListCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div 
      onClick={() => onView(list.id)}
      className="relative bg-white border-2 border-[#cfcfcf] rounded-[15px] p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      {/* Header with menu */}
      <div className="flex items-center justify-between mb-6">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: list.color || '#000000' }}
        />
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="text-[rgba(0,0,0,0.39)] hover:text-black transition-colors"
          >
            <MoreHorizontal className="w-6 h-6" />
          </button>
          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[160px] z-20">
                <button
                  onClick={() => {
                    onEdit(list);
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700 w-full"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(list.id);
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors text-red-600 w-full"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* List Info */}
      <div>
        <h3 className="font-['Instrument_Sans:Black',sans-serif] text-[22px] text-black mb-2" style={{ fontVariationSettings: "'wdth' 100" }}>
          {list.name}
        </h3>
        {list.description && (
          <p className="font-['Instrument_Sans:Regular',sans-serif] text-[15px] text-gray-600 mb-4" style={{ fontVariationSettings: "'wdth' 100" }}>
            {list.description}
          </p>
        )}
        <p className="font-['Instrument_Sans:Medium',sans-serif] text-[17px] text-[rgba(0,0,0,0.6)]" style={{ fontVariationSettings: "'wdth' 100" }}>
          {list.itemCount} {list.itemCount === 1 ? 'item' : 'items'}
        </p>
      </div>
    </div>
  );
}