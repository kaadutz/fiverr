import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-cream-parchment dark:bg-forest-deep">
        
        {/* Background Image Container */}
        <div className="absolute inset-0 w-full h-full">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: `url("/hero-bg.png")` }}
          ></div>

          {/* Overlay Gelap Tipis (biar teks terbaca dikit) */}
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
          
          {/* --- FOGGY EFFECT (TIPIS & HALUS) --- */}
          {/* Layer 1: Gradasi bawah (Pendek saja h-64) */}
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t 
            from-cream-parchment via-cream-parchment/80 to-transparent
            dark:from-forest-deep dark:via-forest-deep/80 dark:to-transparent">
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto p-6 animate-fade-in-up mt-12">
          <span className="rounded-full px-6 py-2 text-xs font-display font-bold uppercase tracking-[0.2em] mb-6 inline-block shadow-xl backdrop-blur-md
            bg-gold-aged/10 text-gold-aged border border-gold-aged/50
            transition-colors duration-500">
            Perkenalan
          </span>
          <h1 className="text-white text-5xl md:text-7xl font-display font-extrabold leading-tight tracking-tight drop-shadow-2xl mb-6">
            Merawat Tradisi, <br/>
            <span className="text-primary italic">Menyajikan Rasa</span>
          </h1>
          <p className="text-gray-100 text-lg sm:text-xl font-body font-light leading-relaxed max-w-2xl mx-auto mb-10 drop-shadow-lg">
            Perjalanan kami dalam menggali kembali harta karun kuliner Bumi Gora. Dedikasi untuk melestarikan Kelepon Kecerit dan Es Poteng bagi generasi masa depan.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button onClick={() => navigate('/menu')} className="h-14 min-w-[180px] rounded-full bg-primary px-8 text-white text-lg font-display font-bold shadow-xl shadow-primary/40 transition-all hover:scale-105 hover:bg-gold-aged">
              Jelajahi Rasa
            </button>
          </div>
        </div>
      </section>

      {/* 2. VISI MISI */}
      <section className="px-4 lg:px-20 py-20 bg-cream-parchment dark:bg-forest-deep relative z-20">
        <div className="container mx-auto max-w-[900px]">
          <div className="bg-white/50 dark:bg-black/20 border border-gold-aged/20 rounded-[2rem] p-10 md:p-16 text-center shadow-lg relative backdrop-blur-sm">
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">Visi & Misi</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-forest-deep dark:text-gold-aged mb-6 leading-snug">
              Mengangkat Kearifan Lokal ke <br/> Panggung Modern
            </h2>
            <p className="text-secondary dark:text-gray-300 font-body leading-loose mb-8 text-lg">
              Kami percaya bahwa kuliner adalah identitas bangsa. Misi kami sederhana: 
              memastikan cita rasa otentik NTB tidak hilang ditelan zaman, dengan menyajikannya 
              melalui kemasan dan pendekatan yang higienis, modern, namun tetap berjiwa tradisional.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['#LokalPride', '#WarisanNTB', '#PKKWU'].map((tag) => (
                <span key={tag} className="px-5 py-2 bg-gold-aged/10 text-forest-deep dark:text-gold-aged rounded-full text-xs font-bold uppercase tracking-wider border border-gold-aged/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FILOSOFI KELEPON (No Border, Tilt Animation) */}
      <section className="py-20 px-6 lg:px-20 bg-cream-parchment dark:bg-forest-deep">
        <div className="container mx-auto max-w-[1100px]">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            
            {/* Text Side */}
            <div className="flex-1 order-2 md:order-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-primary"></span>
                <span className="text-primary text-xs font-bold uppercase tracking-widest">Sinah Produk</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-forest-deep dark:text-text-light mb-8 leading-tight">
                Filosofi Kelepon <br/> <span className="italic text-primary">Kecerit</span>
              </h2>
              <p className="text-secondary dark:text-gray-300 font-body leading-relaxed mb-6 text-lg">
                Nama "Kecerit" bukan sekadar label, melainkan pengalaman. Dalam bahasa Sasak, 
                ini menggambarkan sensasi <span className="font-bold text-primary">meletus</span>-nya gula aren cair saat gigitan pertama.
              </p>
              
              <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-r-xl mt-8">
                <p className="italic text-forest-deep dark:text-gold-aged font-serif text-lg leading-relaxed">
                  "Setiap butir kelepon dibuat dengan ketelitian, memastikan gula aren di dalamnya matang sempurna."
                </p>
                <div className="mt-4 text-xs font-bold text-primary uppercase tracking-widest">— Bahan Alami</div>
              </div>
            </div>

            {/* Image Side */}
            <div className="flex-1 order-1 md:order-2">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 h-[400px] md:h-[500px] group">
                <img 
                  src="/kelepon.png" 
                  alt="Filosofi Kelepon" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SEJARAH ES POTENG (No Border, Tilt Animation) */}
      <section className="py-20 px-6 lg:px-20 bg-gold-aged/5 dark:bg-black/10">
        <div className="container mx-auto max-w-[1100px]">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            
            {/* Image Side */}
            <div className="flex-1">
               <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500 h-[400px] md:h-[500px] group">
                <img 
                  src="/es-poteng.png" 
                  alt="Sejarah Es Poteng" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Text Side */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-primary"></span>
                <span className="text-primary text-xs font-bold uppercase tracking-widest">Warisan Leluhur</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-forest-deep dark:text-text-light mb-8 leading-tight">
                Jejak Sejarah <br/> Es Poteng
              </h2>
              <p className="text-secondary dark:text-gray-300 font-body leading-relaxed mb-8 text-lg">
                Es Poteng adalah bukti kearifan lokal dalam teknik fermentasi. Berawal dari singkong pilihan yang diolah menjadi tape (poteng), hidangan ini telah menjadi penyegar dahaga masyarakat Sasak selama berabad-abad.
              </p>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="flex gap-4 items-center bg-white dark:bg-white/5 p-4 rounded-xl shadow-sm border border-gold-aged/10">
                  <div className="bg-forest-deep text-gold-aged w-12 h-12 flex items-center justify-center rounded-full shrink-0">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-forest-deep dark:text-gold-aged font-display text-lg">Fermentasi 3 Hari</h5>
                    <p className="text-xs text-secondary/70 dark:text-gray-400 uppercase tracking-wider">Waktu Optimal Kematangan</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center bg-white dark:bg-white/5 p-4 rounded-xl shadow-sm border border-gold-aged/10">
                  <div className="bg-forest-deep text-gold-aged w-12 h-12 flex items-center justify-center rounded-full shrink-0">
                    <span className="material-symbols-outlined">water_drop</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-forest-deep dark:text-gold-aged font-display text-lg">Air Sumber Alami</h5>
                    <p className="text-xs text-secondary/70 dark:text-gray-400 uppercase tracking-wider">Kualitas Terbaik</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. KOMITMEN KAMI */}
      <section className="py-24 px-6 bg-cream-parchment dark:bg-forest-deep">
        <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-forest-deep text-gold-aged rounded-full mb-8 shadow-xl">
               <span className="material-symbols-outlined text-3xl">handshake</span>
            </div>
            
            <h2 className="text-4xl font-display font-bold text-forest-deep dark:text-gold-aged mb-6">
              Komitmen Kami
            </h2>
            <p className="text-secondary dark:text-gray-300 font-body leading-loose mb-12 text-lg max-w-2xl mx-auto">
              Kami bukan sekadar penjual makanan. Kami adalah penjaga cerita. 
              Setiap porsi yang Anda nikmati adalah dukungan langsung bagi keberlanjutan budaya 
              kuliner Nusa Tenggara Barat.
            </p>

            <div className="grid grid-cols-3 gap-8 border-t border-gold-aged/20 pt-10">
              <div className="flex flex-col items-center gap-2">
                <h3 className="text-4xl font-display font-bold text-forest-deep dark:text-text-light">100%</h3>
                <span className="text-[10px] md:text-xs font-bold text-gold-aged uppercase tracking-widest">Bahan Lokal</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <h3 className="text-4xl font-display font-bold text-forest-deep dark:text-text-light">5</h3>
                <span className="text-[10px] md:text-xs font-bold text-gold-aged uppercase tracking-widest">Anggota Tim</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <h3 className="text-4xl font-display font-bold text-forest-deep dark:text-text-light">∞</h3>
                <span className="text-[10px] md:text-xs font-bold text-gold-aged uppercase tracking-widest">Cerita Budaya</span>
              </div>
            </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-24 px-4 lg:px-20 relative overflow-hidden bg-white/50 dark:bg-[#052e21]">
        <div className="container mx-auto max-w-[1000px]">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-2 block">
              Kata Mereka
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-forest-deep dark:text-gold-aged mb-6">
              Cerita Pelanggan
            </h2>
            <p className="text-secondary/80 dark:text-gray-400 max-w-xl mx-auto font-body">
              Kepuasan pelanggan adalah prioritas kami. Inilah apa yang mereka rasakan setelah mencicipi kuliner warisan Bumi Gora.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Bramasta Raditya Rochim', 
                role: 'Pelajar', 
                text: 'Rasanya otentik banget! Mengingatkan saya pada kampung halaman di Lombok. Keleponnya pecah di mulut!' 
              },
              { 
                name: 'Mega', 
                role: 'Ibu Rumah Tangga', 
                text: 'Es Poteng-nya segar, manisnya pas dan nggak bikin eneg. Anak-anak saya di rumah juga pada suka.' 
              },
              { 
                name: 'Murintow', 
                role: 'Food Vlogger', 
                text: 'Salut sama anak muda yang melestarikan kuliner tradisional. Kemasannya juga modern dan higienis. Mantap!' 
              },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-[#052e21] p-8 rounded-3xl shadow-xl border border-gold-aged/10 hover:-translate-y-2 transition-transform duration-300 flex flex-col"
              >
                <div className="flex gap-1 text-primary mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star} 
                      className="material-symbols-outlined text-xl" 
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                
                <p className="text-secondary dark:text-gray-300 font-body mb-8 italic leading-relaxed flex-1">
                  "{item.text}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto border-t border-gray-100 dark:border-white/10 pt-6">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-forest-deep dark:text-gold-aged leading-none mb-1">
                      {item.name}
                    </h4>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      {item.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
