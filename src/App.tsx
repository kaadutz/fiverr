import { useState } from 'react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // =========================================
  // BAGIAN INI UNTUK MENGGANTI GAMBAR
  // =========================================
  // Catatan: Link ini mengambil langsung dari website berita (hotlinking).
  // Jika suatu saat gambar hilang, artinya website pemilik gambar memblokir aksesnya.
  // Cara terbaik: Download gambar Anda sendiri, masukkan ke folder 'public', lalu ganti linknya menjadi "/nama-gambar.jpg"
  
  // Gambar Hero (Background utama) - Saya pakai placeholder pemandangan NTB/Lombok
  const heroImage = "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1974&auto=format&fit=crop"; 
  
  // Gambar Signature Creations (Piring besar) - Saya pakai placeholder makanan traditional
  const signatureImage = "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1000&auto=format&fit=crop";
  
  // Gambar Kelepon (Mengambil dari sumber IDNTimes yang relevan dengan link asli)
  const keleponImage = "https://cdn.idntimes.com/content-images/community/2021/11/20211116-104936-e970a0928256a6a127f5c0936e76159c-0975877c3e38167f677587d498144b61.jpg"; 
  
  // Gambar Es Poteng (Mengambil dari sumber Kompas yang relevan dengan link asli)
  const esPotengImage = "https://asset.kompas.com/crops/O3fJqV9_C8pZkKzX-C5gW_J7C-k=/0x0:1000x667/750x500/data/photo/2023/03/10/640ad7a3a8301.jpg";
  // =========================================


  return (
    <div className="bg-cream-parchment dark:bg-forest-deep font-body text-secondary dark:text-text-light antialiased min-h-screen">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        
        {/* Header */}
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-gold-aged/30 bg-cream-parchment/95 backdrop-blur-sm px-6 py-4 lg:px-20 dark:bg-forest-deep/95 dark:border-gold-aged/50">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-2xl">auto_stories</span>
            </div>
            <h2 className="text-forest-deep dark:text-gold-aged text-lg font-display font-bold leading-tight tracking-[-0.015em]">
              Symphony of Flavors
            </h2>
          </div>
          
          <div className="hidden lg:flex flex-1 justify-end gap-8 items-center">
            <nav className="flex items-center gap-9">
              <a className="text-forest-deep dark:text-text-light text-sm font-body font-medium hover:text-primary transition-colors" href="#">Home</a>
              <a className="text-forest-deep dark:text-text-light text-sm font-body font-medium hover:text-primary transition-colors" href="#menu">Creations</a>
              <a className="text-forest-deep dark:text-text-light text-sm font-body font-medium hover:text-primary transition-colors" href="#about">Our Story</a>
              <a className="text-forest-deep dark:text-text-light text-sm font-body font-medium hover:text-primary transition-colors" href="#contact">Connect</a>
            </nav>
            <button className="flex h-10 cursor-pointer items-center justify-center rounded-lg bg-primary px-6 text-white transition-colors hover:bg-gold-aged/90 text-sm font-body font-bold shadow-md shadow-primary/20">
              <span className="truncate">Indulge Now</span>
            </button>
          </div>

          <button 
            className="lg:hidden p-2 text-forest-deep dark:text-text-light"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </header>

        {/* Decorative pattern bar */}
        <div className="h-2 w-full bg-heritage-pattern opacity-50 dark:opacity-30"></div>

        {/* Hero Section */}
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center image-sensory-filter" 
            style={{ backgroundImage: `linear-gradient(rgba(10, 58, 42, 0.5), rgba(10, 58, 42, 0.8)), url("${heroImage}")` }}
          ></div>
          <div className="relative z-10 text-center max-w-5xl mx-auto p-8 lg:p-12">
            <span className="rounded-full bg-white/20 backdrop-blur-sm px-4 py-1 text-xs font-body font-bold uppercase tracking-wider text-white border border-white/30 mb-4 inline-block">
              A Culinary Odyssey
            </span>
            <h1 className="text-white text-5xl font-display font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl drop-shadow-xl mb-6">
              Where Taste Unfolds <br /><span className="text-primary">A Story on Every Plate</span>
            </h1>
            <p className="text-gray-200 text-lg font-body font-light leading-relaxed sm:text-xl max-w-3xl mx-auto mb-8">
              Embark on a sensory journey through the heart of Nusa Tenggara Barat. Discover enchanting traditions and flavors meticulously crafted for the discerning palate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex h-14 min-w-[180px] cursor-pointer items-center justify-center rounded-xl bg-primary px-10 text-white text-lg font-display font-bold shadow-xl shadow-primary/40 transition-transform hover:scale-105">
                <span className="truncate">Explore Creations</span>
              </button>
              <button className="flex h-14 min-w-[180px] cursor-pointer items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 px-10 text-white text-lg font-display font-bold transition-colors hover:bg-white/20">
                <span className="truncate">Our Philosophy</span>
              </button>
            </div>
          </div>
        </section>

        {/* Signature Section */}
        <section className="px-4 lg:px-20 py-16 bg-cream-parchment dark:bg-forest-deep relative overflow-hidden" id="menu">
          <div className="container mx-auto max-w-[1400px]">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24 relative z-10">
              <div className="lg:w-1/2 relative">
                <div 
                  className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl image-sensory-filter"
                  style={{ backgroundImage: `url("${signatureImage}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 to-transparent"></div>
                </div>
              </div>
              <div className="lg:w-1/2 flex flex-col gap-6 text-center lg:text-left">
                <div className="flex items-center gap-4 justify-center lg:justify-start text-primary font-display font-bold tracking-widest uppercase text-sm">
                  <span className="w-16 h-[2px] bg-primary"></span>
                  Culinary Masterpieces
                  <span className="w-16 h-[2px] bg-primary"></span>
                </div>
                <h2 className="text-forest-deep dark:text-gold-aged tracking-tight text-5xl lg:text-6xl font-display font-extrabold leading-tight">
                  Our Signature <br />Creations Unveiled
                </h2>
                <p className="text-secondary dark:text-gray-400 max-w-xl mx-auto lg:mx-0 font-body text-lg leading-relaxed">
                  Each dish is a testament to heritage, a whisper of ancient flavors reimagined with contemporary artistry. A symphony of tastes awaiting your discovery.
                </p>
                <button className="mt-4 flex h-14 w-fit mx-auto lg:mx-0 items-center justify-center rounded-xl bg-emerald-dark px-10 text-white text-lg font-display font-bold shadow-xl shadow-emerald-dark/40 hover:bg-emerald-dark/90 transition-all">
                  <span className="truncate">Discover the Full Menu</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Kelepon Section */}
        <section className="relative px-4 lg:px-20 py-20 bg-emerald-dark/5 dark:bg-forest-deep/50 overflow-hidden">
          <div className="container mx-auto max-w-[1400px]">
            <div className="grid lg:grid-cols-2 gap-12 items-center relative">
              <div className="relative -ml-8 lg:-ml-24 z-10">
                <div 
                  className="w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl image-sensory-filter"
                  style={{ backgroundImage: `url("${keleponImage}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>
              <div className="flex flex-col gap-8 lg:p-8 lg:-ml-24 relative z-20 bg-cream-parchment/90 dark:bg-forest-deep/90 rounded-2xl p-6 shadow-xl border border-gold-aged/20 dark:border-emerald-dark/20 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="bg-primary/20 text-primary p-3 rounded-full">
                    <span className="material-symbols-outlined text-xl">spark</span>
                  </span>
                  <span className="text-primary font-display font-bold text-base uppercase tracking-wider">A Sweet Revelation</span>
                </div>
                <h3 className="text-forest-deep dark:text-gold-aged text-4xl lg:text-5xl font-display font-black leading-tight">
                  The Whisper of <br />Kelepon Kecerit
                </h3>
                <p className="text-secondary dark:text-gray-300 text-lg leading-relaxed font-body">
                  Experience the delicate explosion of liquid palm sugar, a sweet secret encased in tender pandan-infused spheres, crowned with freshly grated coconut. Each bite is a journey to ancestral kitchens, a comforting embrace of cherished memories.
                </p>
                <div className="text-4xl font-display font-bold text-forest-deep dark:text-gold-aged mt-2">
                  Rp 15.000 <span className="text-base text-secondary/70 dark:text-gray-400 font-body font-normal">/ enchanting bite</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
                  <div className="flex flex-col items-center text-center sm:items-start sm:text-left gap-2 rounded-xl border border-gold-aged/30 bg-emerald-dark/5 dark:bg-emerald-dark/20 p-5 shadow-sm transition-shadow hover:shadow-md">
                    <span className="material-symbols-outlined text-primary text-3xl">local_florist</span>
                    <div>
                      <h4 className="text-forest-deep dark:text-text-light font-body font-bold text-sm">Sacred Syrup</h4>
                      <p className="text-secondary/80 dark:text-gray-400 text-xs mt-1 font-body">Authentic palm sugar, melting bliss.</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-center sm:items-start sm:text-left gap-2 rounded-xl border border-gold-aged/30 bg-emerald-dark/5 dark:bg-emerald-dark/20 p-5 shadow-sm transition-shadow hover:shadow-md">
                    <span className="material-symbols-outlined text-green-700 text-3xl">nature</span>
                    <div>
                      <h4 className="text-forest-deep dark:text-text-light font-body font-bold text-sm">Purity Uncompromised</h4>
                      <p className="text-secondary/80 dark:text-gray-400 text-xs mt-1 font-body">Naturally crafted, fresh daily.</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center text-center sm:items-start sm:text-left gap-2 rounded-xl border border-gold-aged/30 bg-emerald-dark/5 dark:bg-emerald-dark/20 p-5 shadow-sm transition-shadow hover:shadow-md">
                    <span className="material-symbols-outlined text-gold-aged text-3xl">palette</span>
                    <div>
                      <h4 className="text-forest-deep dark:text-text-light font-body font-bold text-sm">Artisanal Legacy</h4>
                      <p className="text-secondary/80 dark:text-gray-400 text-xs mt-1 font-body">A timeless Sasak recipe, perfected.</p>
                    </div>
                  </div>
                </div>
                <button className="mt-6 flex h-14 w-fit items-center justify-center rounded-xl bg-primary px-10 text-white font-display font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all">
                  Indulge in Kelepon
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Es Poteng Section */}
        <section className="relative px-4 lg:px-20 py-20 bg-cream-parchment dark:bg-forest-deep overflow-hidden">
          <div className="container mx-auto max-w-[1400px]">
            <div className="grid lg:grid-cols-2 gap-12 items-center relative">
              <div className="flex flex-col gap-8 lg:p-8 lg:-mr-24 relative z-20 bg-cream-parchment/90 dark:bg-forest-deep/90 rounded-2xl p-6 shadow-xl border border-gold-aged/20 dark:border-emerald-dark/20 backdrop-blur-sm">
                <h3 className="text-forest-deep dark:text-gold-aged text-4xl lg:text-5xl font-display font-black leading-tight">
                  Es Poteng: <br />An Elixir of Coolness
                </h3>
                <p className="text-secondary dark:text-gray-300 text-lg leading-relaxed font-body">
                  Savor the serene sweetness of fermented cassava, a creamy, chilled indulgence that dances on the palate. A legendary dessert, meticulously crafted to refresh and delight, a true oasis of flavor on a warm day.
                </p>
                <div className="text-4xl font-display font-bold text-forest-deep dark:text-gold-aged mt-2">
                  Rp 12.000 <span className="text-base text-secondary/70 dark:text-gray-400 font-body font-normal">/ refreshing bowl</span>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4 items-start p-4 rounded-lg hover:bg-gold-aged/5 dark:hover:bg-text-light/5 transition-colors border border-gold-aged/10 dark:border-emerald-dark/10">
                    <div className="bg-blue-200/50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 p-3 rounded-lg shrink-0">
                      <span className="material-symbols-outlined">lightbulb</span>
                    </div>
                    <div>
                      <p className="text-forest-deep dark:text-text-light text-base font-body font-bold">Art of Fermentation</p>
                      <p className="text-secondary/80 dark:text-gray-400 text-sm font-body">Premium cassava, transformed with patient artistry.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 rounded-lg hover:bg-gold-aged/5 dark:hover:bg-text-light/5 transition-colors border border-gold-aged/10 dark:border-emerald-dark/10">
                    <div className="bg-teal-200/50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 p-3 rounded-lg shrink-0">
                      <span className="material-symbols-outlined">filter_drama</span>
                    </div>
                    <div>
                      <p className="text-forest-deep dark:text-text-light text-base font-body font-bold">Pure & Revitalizing</p>
                      <p className="text-secondary/80 dark:text-gray-400 text-sm font-body">Untouched by artifice, a symphony of natural sweetness.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 rounded-lg hover:bg-gold-aged/5 dark:hover:bg-text-light/5 transition-colors border border-gold-aged/10 dark:border-emerald-dark/10">
                    <div className="bg-orange-200/50 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 p-3 rounded-lg shrink-0">
                      <span className="material-symbols-outlined">landscape</span>
                    </div>
                    <div>
                      <p className="text-forest-deep dark:text-text-light text-base font-body font-bold">Soul of Sasak</p>
                      <p className="text-secondary/80 dark:text-gray-400 text-sm font-body">A dessert woven into the fabric of local legend.</p>
                    </div>
                  </div>
                </div>
                <button className="mt-4 flex h-14 w-fit items-center justify-center rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 font-display font-bold transition-all">
                  Savor Es Poteng
                </button>
              </div>
              <div className="relative -mr-8 lg:-mr-24 z-10 order-first lg:order-last">
                <div 
                  className="w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl image-sensory-filter"
                  style={{ backgroundImage: `url("${esPotengImage}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-forest-deep text-text-light py-16 px-4 lg:px-20 bg-emerald-dark/20 dark:bg-forest-deep" id="contact">
          <div className="container mx-auto max-w-[1200px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-display font-bold flex items-center gap-2 text-gold-aged">
                  <span className="material-symbols-outlined text-gold-aged">auto_stories</span>
                  Symphony of Flavors
                </h3>
                <p className="text-gray-400 text-sm font-body leading-relaxed">
                  Preserving the soul of Nusantara, weaving the warmth of Nusa Tenggara Barat into your culinary narrative.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="font-display font-bold text-lg text-gold-aged">Our Chapters</h4>
                <ul className="flex flex-col gap-2 text-gray-400 text-sm font-body">
                  <li><a className="hover:text-primary transition-colors" href="#">Kelepon's Embrace</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Es Poteng's Refresh</a></li>
                  <li><a className="hover:text-primary transition-colors" href="#">Curated Journeys</a></li>
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="font-display font-bold text-lg text-gold-aged">Connect with Us</h4>
                <ul className="flex flex-col gap-2 text-gray-400 text-sm font-body">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xs">call</span> +62 812-3456-7890
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xs">mail</span> experience@symphonyofflavors.id
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xs">location_on</span> Mataram, NTB, Indonesia
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="font-display font-bold text-lg text-gold-aged">Follow Our Story</h4>
                <div className="flex gap-4">
                  <a className="bg-white/10 hover:bg-primary size-10 flex items-center justify-center rounded-full transition-colors text-white" href="#">
                    <span className="font-body font-bold text-sm">IG</span>
                  </a>
                  <a className="bg-white/10 hover:bg-primary size-10 flex items-center justify-center rounded-full transition-colors text-white" href="#">
                    <span className="font-body font-bold text-sm">FB</span>
                  </a>
                  <a className="bg-white/10 hover:bg-primary size-10 flex items-center justify-center rounded-full transition-colors text-white" href="#">
                    <span className="font-body font-bold text-sm">WA</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4 font-body">
              <p>© 2024 Symphony of Flavors. All rights reserved.</p>
              <div className="flex gap-6">
                <a className="hover:text-white" href="#">Privacy Narratives</a>
                <a className="hover:text-white" href="#">Terms of Engagement</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
