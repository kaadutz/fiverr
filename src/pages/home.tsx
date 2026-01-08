import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("/hero-bg.png")` }}>
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-cream-parchment dark:from-forest-deep via-transparent to-transparent opacity-100 h-full"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto p-6 animate-fade-in-up">
          <span className="rounded-full bg-white/10 backdrop-blur-md px-6 py-2 text-xs font-display font-bold uppercase tracking-[0.2em] text-gold-aged border border-gold-aged/50 mb-6 inline-block shadow-xl">
            Kualitas Rasa Bumi Gora
          </span>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-display font-extrabold leading-tight tracking-tight drop-shadow-2xl mb-6">
            Cita Rasa Asli Nusantara <br/>
            <span className="text-primary italic">dari Nusa Tenggara Barat</span>
          </h1>
          <p className="text-gray-100 text-lg sm:text-xl font-body font-light leading-relaxed max-w-2xl mx-auto mb-10 drop-shadow-md">
            Nikmati kelezatan tradisional Kelepon Kecerit dan segarnya Es Poteng, persembahan istimewa dari kelompok PKKWU.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button onClick={() => navigate('/menu')} className="h-14 min-w-[180px] rounded-full bg-primary px-8 text-white text-lg font-display font-bold shadow-xl shadow-primary/40 transition-all hover:scale-105 hover:bg-gold-aged">
              Jelajahi Menu
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="px-4 lg:px-20 py-24 bg-gold-aged/5 dark:bg-black/20 backdrop-blur-sm" id="about">
        <div className="container mx-auto max-w-[900px]">
          <div className="bg-cream-parchment dark:bg-[#052e21] border border-gold-aged/20 rounded-[3rem] p-12 lg:p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl font-display font-bold text-forest-deep dark:text-gold-aged mb-6 leading-tight">
                Tentang Kami
              </h2>
              <p className="text-lg text-secondary dark:text-gray-300 leading-relaxed mb-12 font-body">
                Kami berdedikasi untuk melestarikan kuliner tradisional Nusantara. Melalui <span className="font-bold text-primary">Beranda Kuliner NTB</span>, kami memperkenalkan kekayaan rasa Bumi Gora kepada dunia.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-gold-aged/20 pt-10">
                {[
                  { icon: 'agriculture', title: 'Bahan Baku', desc: '100% Organik Lokal' },
                  { icon: 'recycling', title: 'Ramah Lingkungan', desc: 'Minim Limbah' },
                  { icon: 'package_2', title: 'Eco Packaging', desc: 'Kemasan Aman' },
                  { icon: 'history_edu', title: 'Resep Warisan', desc: 'Cita Rasa Asli' },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-3 p-4 hover:bg-white/5 rounded-xl transition-colors">
                    <div className="p-3 rounded-full bg-primary/10 text-primary mb-2">
                      <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                    </div>
                    <h4 className="text-xl font-bold text-forest-deep dark:text-gold-aged font-display">{item.title}</h4>
                    <p className="text-sm text-secondary/70 dark:text-gray-400 font-body">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
