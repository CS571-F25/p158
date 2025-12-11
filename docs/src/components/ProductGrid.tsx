import { ProductCard } from './ProductCard';
import { Product, List } from '../App';

interface ProductGridProps {
  products: Product[];
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
  lists: List[];
}

export function ProductGrid({ products, onDelete, onEdit, lists }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onDelete={onDelete} onEdit={onEdit} lists={lists} />
      ))}
    </div>
  );
}