import { MoreHorizontal, ExternalLink, Trash2, Edit } from 'lucide-react';
import { useState } from 'react';
import { Product, List } from '../App';

interface ProductCardProps {
  product: Product;
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
  lists: List[];
}

export function ProductCard({ product, onDelete, onEdit, lists }: ProductCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleCardClick = () => {
    if (product.sourceUrl) {
      window.open(product.sourceUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const listName = product.listId 
    ? lists.find(list => list.id === product.listId)?.name 
    : null;

  return (
    <div 
      className={`relative bg-white border-2 border-[#cfcfcf] rounded-[15px] p-6 hover:shadow-lg transition-shadow ${product.sourceUrl ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
    >
      {/* List Badge and Menu */}
      <div className="flex items-center justify-between mt-[-10px] mr-[0px] mb-[10px] ml-[0px]">
        {listName ? (
          <span className="px-3 py-1 text-gray-400 rounded-full text-sm italic text-[16px] font-normal">
            {listName}
          </span>
        ) : (
          <div />
        )}
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
                    onEdit(product);
                    setShowMenu(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700 w-full"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                {product.sourceUrl && (
                  <a
                    href={product.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors text-gray-700"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Source
                  </a>
                )}
                <button
                  onClick={() => {
                    onDelete(product.id);
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

      {/* Product Image */}
      <div className="flex justify-center mb-6">
        <div className="w-64 h-40 flex items-center justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="text-center">
        <p className="font-['Instrument_Sans:Black',sans-serif] text-[22px] text-black mb-2" style={{ fontVariationSettings: "'wdth' 100" }}>
          {product.name}
        </p>
        <p className="font-['Instrument_Sans:Regular',sans-serif] text-[19px] text-black mb-3" style={{ fontVariationSettings: "'wdth' 100" }}>
          {product.brand}
        </p>
        <p className="font-['Instrument_Sans:Medium',sans-serif] text-[20px] text-black" style={{ fontVariationSettings: "'wdth' 100" }}>
          ${product.price}
        </p>
      </div>
    </div>
  );
}