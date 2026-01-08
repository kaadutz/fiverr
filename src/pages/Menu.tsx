import { useState } from 'react';

// Definisikan tipe data props yang diterima halaman Menu
interface MenuProps {
  products: any[];
  addToCart: (product: any) => void;
}

const Menu = ({ products, addToCart }: MenuProps) => {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  // Ambil daftar kategori unik dari produk
  const categories = ['Semua', ...Array.from(new Set(products.map(p => p.category)))];

  // Filter produk berdasarkan kategori aktif
  const filteredProducts = activeCategory === 'Semua' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <section className="px-4 lg:px-20 py-24 min-h-screen relative pt-32">
      <div className="container mx-auto max-w-[1200px]">
        {/* Header Menu */}
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">
            Pilihan Rasa
          </span>
          <h2 className="text-forest-deep dark:text-gold-aged text-4xl sm:text-5xl font-display font-extrabold mb-6">
            Daftar Menu
          </h2>
          <p className="text-secondary/80 dark:text-gray-400 max-w-xl mx-auto font-body">
            Jelajahi kelezatan kuliner warisan Bumi Gora yang kami sajikan dengan sentuhan modern.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-primary border-primary text-white shadow-lg scale-105'
                  : 'bg-transparent border-gold-aged/30 text-forest-deep dark:text-gold-aged hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white dark:bg-[#0a2e25] rounded-[2rem] shadow-xl overflow-hidden border border-gold-aged/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full">
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                {/* Overlay Badge */}
                <div className="absolute top-4 left-4 z-20">
                   <span className="bg-white/90 dark:bg-black/60 backdrop-blur-md text-forest-deep dark:text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-gold-aged/20">
                     {product.category}
                   </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8 flex flex-col flex-1 relative">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-[3rem]"></div>

                <div className="mb-4">
                  <h3 
                    className="text-2xl font-display font-bold text-forest-deep dark:text-gold-aged cursor-pointer hover:text-primary transition-colors mb-2" 
                    onClick={() => setSelectedProduct(product)}
                  >
                    {product.name}
                  </h3>
                  <p className="text-sm text-secondary/70 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
                
                <div className="flex justify-between items-center pt-6 border-t border-dashed border-gray-200 dark:border-white/10 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 dark:text-gray-500 uppercase font-bold">Harga</span>
                    <span className="text-xl font-bold text-primary">Rp {product.price.toLocaleString('id-ID')}</span>
                  </div>
                  <button 
                    onClick={() => addToCart(product)} 
                    className="size-12 rounded-full bg-forest-deep dark:bg-gold-aged text-white dark:text-forest-deep flex items-center justify-center shadow-lg hover:scale-110 hover:rotate-12 transition-all duration-300"
                    title="Tambah ke Keranjang"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State jika tidak ada produk */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-400 animate-fade-in-up">
            <span className="material-symbols-outlined text-4xl mb-4 block">restaurant_menu</span>
            <p>Menu untuk kategori ini belum tersedia.</p>
          </div>
        )}
      </div>

      {/* POPUP DETAIL PRODUK (Modal) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative bg-cream-parchment dark:bg-forest-deep rounded-[2.5rem] overflow-hidden shadow-2xl max-w-4xl w-full flex flex-col md:flex-row animate-fade-in-up max-h-[85vh] border border-gold-aged/20">
            
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-red-500 text-white p-2 rounded-full transition-all backdrop-blur-md border border-white/20">
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {/* Modal Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-200 relative group">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                 <span className="bg-primary px-3 py-1 rounded text-xs font-bold uppercase mb-2 inline-block shadow-lg">Best Seller</span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
              <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-3 block">{selectedProduct.category}</span>
              <h3 className="text-4xl font-display font-bold text-forest-deep dark:text-gold-aged mb-6 leading-tight">{selectedProduct.name}</h3>
              
              <div className="flex gap-4 mb-8">
                 <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 bg-black/5 dark:bg-white/5 px-3 py-2 rounded-lg">
                    <span className="material-symbols-outlined text-sm">schedule</span> 15 Menit
                 </div>
                 <div className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-400 bg-black/5 dark:bg-white/5 px-3 py-2 rounded-lg">
                    <span className="material-symbols-outlined text-sm">local_fire_department</span> 250 Kalori
                 </div>
              </div>

              <p className="text-secondary dark:text-gray-300 leading-loose mb-8 flex-1 font-body text-lg">
                {selectedProduct.description}
              </p>

              <div className="border-t border-gold-aged/20 pt-8 mt-auto flex items-center justify-between gap-6">
                <div>
                  <span className="block text-xs text-gray-400 font-bold uppercase mb-1">Total Harga</span>
                  <span className="text-3xl font-bold text-primary">Rp {selectedProduct.price.toLocaleString('id-ID')}</span>
                </div>
                <button 
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                  className="px-8 py-4 rounded-xl bg-primary text-white font-bold text-sm shadow-xl shadow-primary/30 hover:bg-gold-aged hover:-translate-y-1 transition-all flex items-center gap-3"
                >
                  <span>Pesan Sekarang</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
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
