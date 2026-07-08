import React from 'react';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { Solution } from './components/Solution';
import { SocialProof } from './components/SocialProof';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import content from './config/content.json';

function App() {
  const { market, pricing, language } = content;

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Top Banner / Countdown */}
      <div className="bg-red-600 text-white py-2 px-4 text-center text-sm font-bold animate-pulse">
        {language === 'en' ? '🔴 OFFER ENDS IN: 14:23:11 - Limited time promotional access.' : 
         language === 'es' ? '🔴 LA OFERTA TERMINA EN: 14:23:11 - Acceso promocional limitado.' :
         '🔴 OFERTA TERMINA EM: 14:23:11 - Acesso promocional disponível por tempo limitado.'}
      </div>

      <Hero data={content.hero} />
      <Problem data={content.problem} />
      <Solution data={content.solution} />
      <SocialProof data={content.social_proof} />
      <Pricing data={content.pricing_section} />
      <FAQ data={content.faq} />
      <Footer data={content.footer} />
    </div>
  );
}

export default App;
