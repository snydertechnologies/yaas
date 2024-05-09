import { CTASection } from '@/components/CTA';
import { Features } from '@/components/Features';
import Footer from '@/components/Footer';
import Intro from '@/components/Intro';
import { Showcase } from '@/components/Showcase';
import ReactWOW from 'react-wow';

export default function Home() {
  return (
    <main className="">
      <Intro />
      <Showcase />
      <Features />
      <CTASection />
    </main>
  );
}
