import { useState } from 'react';

// Definisikan tipe data props yang diterima halaman Menu
interface MenuProps {
  products: any[];
  addToCart: (product: any) => void;
}

const Menu = ({ products, addToCart }: MenuProps) => {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  return (
    <section className="px-4 lg:px-20 py-24 min-h-screen relative pt-32 animate-fade-in-up">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-16">
          <h2 className="text-forest-deep dark:text-gold-aged text-5xl font-display font-extrabold mb-4">Daftar Menu</h2>
          <p className="text-secondary/80 dark:text-gray-400 max-w-xl mx-auto">
            Pilih hidangan favoritmu dari koleksi kuliner terbaik kami.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-[#0a2e25] rounded-2xl shadow-lg overflow-hidden border border-gold-aged/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full">
              <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-bold border border-white px-4 py-2 rounded-full backdrop-blur-sm">Lihat Detail</span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-display font-bold text-forest-deep dark:text-text-light cursor-pointer hover:text-primary" onClick={() => setSelectedProduct(product)}>{product.name}</h3>
                </div>
                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded w-fit mb-3">{product.category}</span>
                <p className="text-sm text-secondary/70 dark:text-gray-400 mb-6 line-clamp-2 flex-1">{product.description}</p>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-white/10 mt-auto">
                  <span className="text-lg font-bold text-primary">Rp {product.price.toLocaleString('id-ID')}</span>
                  <button onClick={() => addToCart(product)} className="bg-primary text-white p-2 rounded-full hover:bg-gold-aged transition-colors shadow-md active:scale-95">
                    <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP DETAIL PRODUK */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative bg-cream-parchment dark:bg-forest-deep rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full flex flex-col md:flex-row animate-fade-in-up max-h-[90vh]">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-200 relative">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
              <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2">{selectedProduct.category}</span>
              <h3 className="text-3xl font-display font-bold text-forest-deep dark:text-gold-aged mb-4">{selectedProduct.name}</h3>
              <p className="text-secondary dark:text-gray-300 leading-relaxed mb-6 flex-1 font-body">
                {selectedProduct.description}
              </p>
              <div className="border-t border-gold-aged/20 pt-6 mt-auto">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">Harga Satuan</span>
                  <span className="text-3xl font-bold text-primary">Rp {selectedProduct.price.toLocaleString('id-ID')}</span>
                </div>
                <button 
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                  className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg shadow-xl hover:bg-gold-aged transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                  Tambah ke Keranjang
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Menu;
