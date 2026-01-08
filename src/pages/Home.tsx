{/* TESTIMONIALS SECTION - FITUR BARU */}
      <section className="py-24 px-4 lg:px-20 relative overflow-hidden">
        <div className="container mx-auto max-w-[1000px]">
          {/* Section Header */}
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

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Andi Pratama', 
                role: 'Mahasiswa', 
                text: 'Rasanya otentik banget! Mengingatkan saya pada kampung halaman di Lombok. Keleponnya pecah di mulut!' 
              },
              { 
                name: 'Siti Aminah', 
                role: 'Ibu Rumah Tangga', 
                text: 'Es Poteng-nya segar, manisnya pas dan nggak bikin eneg. Anak-anak saya di rumah juga pada suka.' 
              },
              { 
                name: 'Budi Santoso', 
                role: 'Food Vlogger', 
                text: 'Salut sama anak muda yang melestarikan kuliner tradisional. Kemasannya juga modern dan higienis. Mantap!' 
              },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-[#052e21] p-8 rounded-3xl shadow-xl border border-gold-aged/10 hover:-translate-y-2 transition-transform duration-300 flex flex-col"
              >
                {/* Stars */}
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
                
                {/* Quote */}
                <p className="text-secondary dark:text-gray-300 font-body mb-8 italic leading-relaxed flex-1">
                  "{item.text}"
                </p>
                
                {/* Profile */}
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
