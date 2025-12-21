const HeroSection = () => {
  return <section className="relative pt-16 pb-8 sm:pt-24 sm:pb-12">
      <div className="container">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Hero text with subtle backdrop */}
          <div className="relative">
            {/* Glassmorphism backdrop for text readability */}
            <div className="absolute inset-0 -inset-x-8 -inset-y-4 rounded-2xl" />
            
            {/* Headline */}
            <h1 className="relative text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground leading-tight animate-fade-in-up z-10" style={{
            animationDelay: '0.1s'
          }}>
              Gelecekteki Kendine Bir{' '}
              <span className="text-primary">Yılbaşı Mesajı</span> Bırak{' '}
              <span className="inline-block">🎁</span>
            </h1>

            {/* Subheadline */}
            <p className="relative mt-4 text-lg sm:text-xl text-muted-foreground animate-fade-in-up z-10" style={{
            animationDelay: '0.2s'
          }}>
              Bu mesajı{' '}
              <span className="font-semibold text-secondary">1 Ocak 2027</span>'de alacaksın.
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;