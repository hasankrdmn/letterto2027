import HeroSection from '@/components/HeroSection';
import MessageForm from '@/components/MessageForm';
import Footer from '@/components/Footer';
import SnowParticles from '@/components/SnowParticles';
import FestiveBackground from '@/components/FestiveBackground';
import CursorSanta from '@/components/CursorSanta';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Unified festive background */}
      <FestiveBackground />
      
      {/* Cursor-following Santa + Reindeer */}
      <CursorSanta />
      
      {/* Multi-layer snow effect */}
      <SnowParticles />
      
      <main className="relative z-10">
        <HeroSection />
        
        <section className="py-4 sm:py-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="container">
            <MessageForm />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
