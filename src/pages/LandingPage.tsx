import Header from '@/components/Header.tsx';
import Hero from '@/components/Hero.tsx';
import Features from '@/components/sections/Features.tsx';
import Footer from '@/components/sections/Footer.tsx';

const LandingPage = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Header />
    <main>
      <Hero />
      <Features />
    </main>
    <Footer />
  </div>
);

export default LandingPage;
