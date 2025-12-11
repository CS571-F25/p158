import { useState } from 'react';
import { Plus } from 'lucide-react';
import { List, Product } from '../App';
import { ListCard } from './ListCard';
import { AddListModal } from './AddListModal';
import { EditListModal } from './EditListModal';

interface MyListsProps {
  lists: List[];
  onAddList: (list: Omit<List, 'id' | 'itemCount'>) => void;
  onUpdateList: (list: List) => void;
  onDeleteList: (id: string) => void;
  products: Product[];
  onViewList: (listId: string) => void;
}

export function MyLists({ lists, onAddList, onUpdateList, onDeleteList, products, onViewList }: MyListsProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingList, setEditingList] = useState<List | null>(null);

  const handleEditList = (list: List) => {
    setEditingList(list);
    setIsEditModalOpen(true);
  };

  // Calculate item count for each list
  const listsWithCount = lists.map(list => ({
    ...list,
    itemCount: products.filter(p => p.listId === list.id).length,
  }));

  return (
    <>
      <div className="flex items-center justify-between mb-12">
        <h1 className="font-['Instrument_Sans:Medium',sans-serif] text-[#1e1e1e] text-[42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          My Lists
        </h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create List
        </button>
      </div>

      {lists.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-gray-400 mb-4">
            <Plus className="w-16 h-16 mx-auto mb-4" />
          </div>
          <h2 className="text-2xl text-gray-600 mb-2">No lists yet</h2>
          <p className="text-gray-400 mb-6">Create lists to organize your items</p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Create Your First List
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listsWithCount.map((list) => (
            <ListCard 
              key={list.id} 
              list={list} 
              onEdit={handleEditList}
              onDelete={onDeleteList}
              onView={onViewList}
            />
          ))}
        </div>
      )}

      <AddListModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={onAddList}
      />

      <EditListModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingList(null);
        }}
        onUpdate={onUpdateList}
        list={editingList}
      />
    </>
  );
}