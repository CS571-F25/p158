import React, { useState } from 'react';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';

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

/* ----------------------------------------------------------
   PAGE COMPONENTS
---------------------------------------------------------- */

// ALL LIKES PAGE
function AllLikesPage({ products, lists, onAddClick, onEdit, onDelete }: any) {
  return (
    <>
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-[42px] font-['Instrument_Sans:Medium',sans-serif]">All Likes</h1>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Add Item
        </button>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Plus className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-2xl text-gray-600 mb-2">No items yet</h2>
          <button
            onClick={onAddClick}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800"
          >
            Add Your First Item
          </button>
        </div>
      ) : (
        <ProductGrid
          products={products}
          lists={lists}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </>
  );
}

// LIST VIEW PAGE (/lists/:id)
function ListViewPage({ products, lists, onAddClick, onEdit, onDelete }: any) {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentList = lists.find((l: any) => l.id === id);
  const filteredProducts = products.filter((p: any) => p.listId === id);

  return (
    <>
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/lists')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-[42px] font-['Instrument_Sans:Medium',sans-serif]">
            {currentList?.name ?? 'List'}
          </h1>
        </div>

        <button
          onClick={onAddClick}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Add Item
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Plus className="w-16 h-16 text-gray-400 mb-4" />
          <h2 className="text-2xl text-gray-600 mb-2">No items in this list</h2>
          <button
            onClick={onAddClick}
            className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800"
          >
            Add Your First Item
          </button>
        </div>
      ) : (
        <ProductGrid
          products={filteredProducts}
          lists={lists}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </>
  );
}

/* ----------------------------------------------------------
   MAIN APP
---------------------------------------------------------- */

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // detect active route for sidebar
  const currentPage =
    location.pathname === '/'
      ? 'all-likes'
      : location.pathname.startsWith('/lists') &&
        !location.pathname.includes('/lists/')
      ? 'my-lists'
      : location.pathname.startsWith('/lists/')
      ? { type: 'list-view', listId: location.pathname.split('/')[2] }
      : 'all-likes';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Load saved
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('wishlist-items');
    return saved ? JSON.parse(saved) : [];
  });

  const [lists, setLists] = useState<List[]>(() => {
    const saved = localStorage.getItem('wishlist-lists');
    return saved ? JSON.parse(saved) : [];
  });

  /* ---------------- PRODUCT CRUD ---------------- */

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = { ...product, id: Date.now().toString() };
    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem('wishlist-items', JSON.stringify(updated));
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    const updated = products.map(p =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updated);
    localStorage.setItem('wishlist-items', JSON.stringify(updated));
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('wishlist-items', JSON.stringify(updated));
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  /* ---------------- LIST CRUD ---------------- */

  const handleAddList = (list: Omit<List, 'id' | 'itemCount'>) => {
    const newList: List = { ...list, id: Date.now().toString(), itemCount: 0 };
    const updated = [...lists, newList];
    setLists(updated);
    localStorage.setItem('wishlist-lists', JSON.stringify(updated));
  };

  const handleUpdateList = (updatedList: List) => {
    const updated = lists.map(l => (l.id === updatedList.id ? updatedList : l));
    setLists(updated);
    localStorage.setItem('wishlist-lists', JSON.stringify(updated));
  };

  const handleDeleteList = (id: string) => {
    const updated = lists.filter(l => l.id !== id);
    setLists(updated);
    localStorage.setItem('wishlist-lists', JSON.stringify(updated));
  };

  /* ----------------------------------------------------------
     RENDER
  ---------------------------------------------------------- */

  return (
    <div className="bg-white min-h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        currentPage={currentPage as any}
        onPageChange={page => {
          if (page === 'all-likes') navigate('/');
          if (page === 'my-lists') navigate('/lists');
        }}
      />

      <div className="ml-[82px] p-8">
        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <AllLikesPage
                products={products}
                lists={lists}
                onAddClick={() => setIsAddModalOpen(true)}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            }
          />

          {/* MY LISTS */}
          <Route
            path="/lists"
            element={
              <MyLists
                lists={lists}
                products={products}
                onAddList={handleAddList}
                onUpdateList={handleUpdateList}
                onDeleteList={handleDeleteList}
                onViewList={id => navigate(`/lists/${id}`)}
              />
            }
          />

          {/* LIST VIEW */}
          <Route
            path="/lists/:id"
            element={
              <ListViewPage
                products={products}
                lists={lists}
                onAddClick={() => setIsAddModalOpen(true)}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            }
          />
        </Routes>
      </div>

      {/* GLOBAL MODALS */}
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
