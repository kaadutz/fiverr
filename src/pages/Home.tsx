import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-hidden"> {/* Mencegah scroll samping */}
      
      {/* 1. HERO SECTION DENGAN TRANSISI HALUS */}
      <section className="relative w-full h-[110vh] min-h-[700px] flex items-center justify-center">
        
        {/* Background Image Fixed (Parallax Effect) */}
        <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ backgroundImage: `url("/hero-bg.png")` }}
            ></div>
            {/* Overlay Gelap untuk Teks */}
            <div className="absolute inset-0 bg-black/30 mix-blend-multiply"></div>
            
            {/* VIGNETTE & GRADIENT FADE (KUNCI TRANSISI HALUS) */}
            {/* Gradasi dari tengah transparan ke pinggir gelap */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60 opacity-80"></div>
            {/* Gradasi bawah menyatu dengan warna background halaman berikutnya */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-cream-parchment dark:from-forest-deep via-cream-parchment/60 dark:via-forest-deep/60 to-transparent"></div>
        </div>

        {/* Konten Hero */}
        <div className="relative z-10 text-center max-w-5xl mx-auto p-6 mt-[-100px] animate-fade-in-up">
          <div className="mb-6 flex justify-center">
             <span className="backdrop-blur-md bg-white/10 border border-white/20 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.3em] text-gold-aged shadow-2xl">
               Est. 2025 • Authentic Taste
             </span>
          </div>
          
          <h1 className="text-white text-5xl sm:text-6xl lg:text-8xl font-display font-black leading-tight tracking-tight drop-shadow-2xl mb-8">
            Warisan Rasa <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-aged to-[#fcf6ba] italic pr-2">Bumi Gora</span>
          </h1>
          
          <p className="text-gray-100/90 text-lg sm:text-xl font-body leading-relaxed max-w-2xl mx-auto mb-12 drop-shadow-lg font-light">
            Perjalanan rasa otentik dari Nusa Tenggara Barat. 
            Menghadirkan <span className="font-bold text-white">Kelepon Kecerit</span> yang melegenda dan 
            <span className="font-bold text-white"> Es Poteng</span> yang menyegarkan jiwa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => navigate('/menu')} 
              className="group relative px-8 py-4 bg-primary text-white rounded-full font-bold text-lg shadow-[0_20px_50px_rgba(184,134,11,0.5)] overflow-hidden transition-all hover:scale-105"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
              <span className="relative flex items-center gap-2">
                Jelajahi Menu
                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </span>
            </button>
            <a href="#about" className="text-white/80 hover:text-gold-aged font-bold transition-colors flex items-center gap-2 text-sm uppercase tracking-widest border-b border-transparent hover:border-gold-aged pb-1">
              Tentang Kami
            </a>
          </div>
        </div>

        {/* ORNAMEN PEMBATAS (WAVE DIVIDER) */}
        {/* Ini yang bikin transisi tidak kotak/kasar. Bentuk gelombang organik. */}
        <div className="absolute bottom-[-1px] left-0 w-full leading-none z-20">
          <svg className="relative block w-full h-[80px] sm:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                className="fill-cream-parchment dark:fill-forest-deep transition-colors duration-500"
              ></path>
          </svg>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="relative px-4 lg:px-20 py-24 bg-cream-parchment dark:bg-forest-deep transition-colors duration-500" id="about">
        
        {/* Pattern Background Halus */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/batik-embossed.png')]"></div>

        <div className="container mx-auto max-w-[1000px] relative z-10">
          {/* Ornamen Garis Emas */}
          <div className="flex items-center justify-center mb-12 opacity-60">
             <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold-aged"></div>
             <span className="mx-4 text-gold-aged material-symbols-outlined">spa</span>
             <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold-aged"></div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-forest-deep dark:text-gold-aged mb-8 leading-tight">
              Mengangkat Kearifan Lokal <br/> ke Panggung Modern
            </h2>
            <p className="text-lg md:text-xl text-secondary/80 dark:text-gray-300 leading-loose font-body max-w-3xl mx-auto">
              Kami percaya bahwa kuliner adalah <span className="text-primary font-bold italic">identitas bangsa</span>. 
              Misi kami sederhana: memastikan cita rasa otentik NTB tidak hilang ditelan zaman, 
              dengan menyajikannya melalui kemasan dan pendekatan yang higienis, modern, namun tetap berjiwa tradisional.
            </p>
          </div>

          {/* Feature Grid dengan Kartu yang lebih Clean */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: 'eco', title: 'Bahan Alami', desc: 'Tanpa Pengawet' },
              { icon: 'handshake', title: 'Lokal', desc: 'Support Petani' },
              { icon: 'verified', title: 'Higienis', desc: 'Standar Bersih' },
              { icon: 'history_edu', title: 'Warisan', desc: 'Resep Asli' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/40 dark:bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-gold-aged/10 text-center hover:bg-white/80 dark:hover:bg-black/40 transition-all duration-300 hover:-translate-y-2 group">
                <span className="material-symbols-outlined text-4xl text-primary mb-4 group-hover:scale-110 transition-transform">{item.icon}</span>
                <h4 className="font-bold text-forest-deep dark:text-text-light font-display mb-1">{item.title}</h4>
                <p className="text-xs text-secondary/60 dark:text-gray-500 uppercase tracking-wider">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TESTIMONIALS SECTION DENGAN SEPARATOR */}
      <section className="py-24 px-4 lg:px-20 relative bg-white/50 dark:bg-[#052e21] transition-colors duration-500">
        {/* Wave Divider Atas (Membalik) */}
        <div className="absolute top-[-1px] left-0 w-full overflow-hidden leading-none z-10 rotate-180">
          <svg className="relative block w-full h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                className="fill-cream-parchment dark:fill-forest-deep"
              ></path>
          </svg>
        </div>

        <div className="container mx-auto max-w-[1000px] relative z-20">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">Ulasan Pelanggan</span>
            <h2 className="text-4xl font-display font-bold text-forest-deep dark:text-gold-aged">Kata Mereka</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Andi P.', text: 'Rasanya otentik banget! Mengingatkan saya pada kampung halaman.' },
              { name: 'Siti A.', text: 'Es Poteng-nya segar, manisnya pas dan nggak bikin eneg.' },
              { name: 'Budi S.', text: 'Salut sama anak muda yang melestarikan kuliner tradisional.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-cream-parchment dark:bg-forest-deep p-8 rounded-tl-3xl rounded-br-3xl shadow-lg border-l-4 border-primary hover:shadow-2xl transition-all">
                <div className="flex text-primary mb-4">
                  {[...Array(5)].map((_, i) => <span key={i} className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>star</span>)}
                </div>
                <p className="text-secondary dark:text-gray-300 italic mb-6">"{item.text}"</p>
                <h4 className="font-bold text-forest-deep dark:text-gold-aged font-display">— {item.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
