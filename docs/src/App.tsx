import React, { useState } from 'react';
import { ProductGrid } from './components/ProductGrid';
import { Sidebar } from './components/Sidebar';
import { AddItemModal } from './components/AddItemModal';
import { EditItemModal } from './components/EditItemModal';
import { MyLists } from './components/MyLists';
import { Plus, ArrowLeft } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  imageUrl: string;
  sourceUrl?: string;
  listId?: string;
}

export interface List {
  id: string;
  name: string;
  description?: string;
  color?: string;
  itemCount: number;
}

type PageState = 'all-likes' | 'my-lists' | { type: 'list-view'; listId: string };

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageState>('all-likes');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Initialize state from localStorage or empty array
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('wishlist-items');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading products:', error);
      return [];
    }
  });
  
  const [lists, setLists] = useState<List[]>(() => {
    try {
      const saved = localStorage.getItem('wishlist-lists');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading lists:', error);
      return [];
    }
  });

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    try {
      localStorage.setItem('wishlist-items', JSON.stringify(updatedProducts));
    } catch (error) {
      console.error('Error saving products:', error);
    }
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updatedProducts);
    try {
      localStorage.setItem('wishlist-items', JSON.stringify(updatedProducts));
    } catch (error) {
      console.error('Error updating products:', error);
    }
  };

  const handleDeleteProduct = (id: string) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    try {
      localStorage.setItem('wishlist-items', JSON.stringify(updatedProducts));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleAddList = (list: Omit<List, 'id' | 'itemCount'>) => {
    const newList: List = {
      ...list,
      id: Date.now().toString(),
      itemCount: 0,
    };
    const updatedLists = [...lists, newList];
    setLists(updatedLists);
    try {
      localStorage.setItem('wishlist-lists', JSON.stringify(updatedLists));
    } catch (error) {
      console.error('Error saving lists:', error);
    }
  };

  const handleUpdateList = (updatedList: List) => {
    const updatedLists = lists.map(l => 
      l.id === updatedList.id ? updatedList : l
    );
    setLists(updatedLists);
    try {
      localStorage.setItem('wishlist-lists', JSON.stringify(updatedLists));
    } catch (error) {
      console.error('Error updating lists:', error);
    }
  };

  const handleDeleteList = (id: string) => {
    const updatedLists = lists.filter(l => l.id !== id);
    setLists(updatedLists);
    try {
      localStorage.setItem('wishlist-lists', JSON.stringify(updatedLists));
    } catch (error) {
      console.error('Error deleting list:', error);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      
      <div className="ml-[82px] p-8">
        {currentPage === 'all-likes' ? (
          <>
            <div className="flex items-center justify-between mb-12">
              <h1 className="font-['Instrument_Sans:Medium',sans-serif] text-[#1e1e1e] text-[42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                All Likes
              </h1>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Item
              </button>
            </div>

            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-gray-400 mb-4">
                  <Plus className="w-16 h-16 mx-auto mb-4" />
                </div>
                <h2 className="text-2xl text-gray-600 mb-2">No items yet</h2>
                <p className="text-gray-400 mb-6">Start adding items from your favorite websites</p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Add Your First Item
                </button>
              </div>
            ) : (
              <ProductGrid products={products} onDelete={handleDeleteProduct} onEdit={handleEditProduct} lists={lists} />
            )}
          </>
        ) : currentPage === 'my-lists' ? (
          <MyLists 
            lists={lists}
            onAddList={handleAddList}
            onUpdateList={handleUpdateList}
            onDeleteList={handleDeleteList}
            products={products}
            onViewList={(listId) => setCurrentPage({ type: 'list-view', listId })}
          />
        ) : typeof currentPage === 'object' && currentPage.type === 'list-view' ? (
          <>
            {(() => {
              const currentList = lists.find(l => l.id === currentPage.listId);
              const filteredProducts = products.filter(p => p.listId === currentPage.listId);
              
              return (
                <>
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setCurrentPage('my-lists')}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                      </button>
                      <h1 className="font-['Instrument_Sans:Medium',sans-serif] text-[#1e1e1e] text-[42px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                        {currentList?.name || 'List'}
                      </h1>
                    </div>
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                      Add Item
                    </button>
                  </div>

                  {filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="text-gray-400 mb-4">
                        <Plus className="w-16 h-16 mx-auto mb-4" />
                      </div>
                      <h2 className="text-2xl text-gray-600 mb-2">No items in this list</h2>
                      <p className="text-gray-400 mb-6">Start adding items to {currentList?.name || 'this list'}</p>
                      <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Add Your First Item
                      </button>
                    </div>
                  ) : (
                    <ProductGrid 
                      products={filteredProducts} 
                      onDelete={handleDeleteProduct} 
                      onEdit={handleEditProduct} 
                      lists={lists} 
                    />
                  )}
                </>
              );
            })()}
          </>
        ) : null}
      </div>

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProduct}
        lists={lists}
      />

      <EditItemModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingProduct(null);
        }}
        onUpdate={handleUpdateProduct}
        product={editingProduct}
        lists={lists}
      />
    </div>
  );
}