import Header from '@/components/Header.tsx';
import Hero from '@/components/Hero.tsx';
import Games from '@/components/sections/Games.tsx';
import Features from '@/components/sections/Features.tsx';
import Footer from '@/components/sections/Footer.tsx';

const LandingPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Header />
    <main>
      <Hero />
      <Games />
      <Features />
    </main>
    <Footer />
  </div>
);

export default LandingPage;
