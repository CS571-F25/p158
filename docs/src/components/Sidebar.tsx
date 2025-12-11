import { Menu, Heart, List } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentPage: 'all-likes' | 'my-lists' | { type: 'list-view'; listId: string };
  onPageChange: (page: 'all-likes' | 'my-lists') => void;
}

export function Sidebar({ isOpen, onToggle, currentPage, onPageChange }: SidebarProps) {
  const isAllLikesActive = currentPage === 'all-likes';
  const isMyListsActive = currentPage === 'my-lists' || (typeof currentPage === 'object' && currentPage.type === 'list-view');
  
  return (
    <>
      {/* Overlay when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-0 z-40"
          onClick={onToggle}
        />
      )}
      
      <div 
        className={`fixed left-0 top-0 h-screen bg-white shadow-[2px_0px_4px_0px_rgba(0,0,0,0.25)] flex flex-col items-start pt-8 z-50 transition-all duration-300 ${
          isOpen ? 'w-[240px]' : 'w-[82px]'
        }`}
      >
        <button
          onClick={onToggle}
          className={`p-3 hover:bg-gray-100 rounded-lg transition-colors mb-8 ${isOpen ? 'ml-4' : 'ml-[13px]'}`}
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        <nav className={`flex flex-col gap-4 w-full ${isOpen ? 'px-4' : 'items-center'}`}>
          {isOpen && (
            <>
              <button
                onClick={() => onPageChange('all-likes')}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isAllLikesActive
                    ? 'bg-black text-white' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                aria-label="All Likes"
              >
                <Heart className="w-6 h-6 flex-shrink-0" />
                <span className="text-base whitespace-nowrap">All Likes</span>
              </button>

              <button
                onClick={() => onPageChange('my-lists')}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isMyListsActive
                    ? 'bg-black text-white' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                aria-label="My Lists"
              >
                <List className="w-6 h-6 flex-shrink-0" />
                <span className="text-base whitespace-nowrap">My Lists</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </>
  );
}