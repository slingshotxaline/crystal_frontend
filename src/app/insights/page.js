// export const metadata = {
//   title: 'Insights',
//   description: 'Practical guidance for shipment, route and documentation decisions.',
// };

// const CATEGORIES = [
//   { title: 'Bangladesh gateway guidance', desc: 'What to know about moving cargo through Dhaka and Chattogram.' },
//   { title: 'Air and ocean market updates', desc: 'Capacity and schedule notes relevant to Bangladesh trade lanes.' },
//   { title: 'Multimodal route explainers', desc: 'When a combined route adds value over a single mode.' },
//   { title: 'Fashion and consolidation guidance', desc: 'Preparing GOH and buyer-consolidation shipments.' },
// ];

// export default function InsightsPage() {
//   return (
//     <section className="bg-cream-100 py-16 sm:py-20">
//       <div className="container-content">
//         <p className="text-xs font-semibold uppercase tracking-widest text-navy-400">Insights</p>
//         <h1 className="mt-3 max-w-xl text-3xl font-bold text-navy-900 sm:text-4xl">
//           Practical guidance for the next shipment decision.
//         </h1>
//         <p className="mt-4 max-w-xl text-navy-400">
//           Articles are drafted, dated and published from the CMS once editorial approval is granted. This page is
//           shown pending that first batch of content.
//         </p>

//         <div className="mt-10 grid gap-4 sm:grid-cols-2">
//           {CATEGORIES.map((cat) => (
//             <div key={cat.title} className="rounded-lg border border-navy-100 bg-white p-6">
//               <h2 className="font-bold text-navy-900">{cat.title}</h2>
//               <p className="mt-2 text-sm text-navy-400">{cat.desc}</p>
//               <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-crimson">
//                 Articles pending editorial approval
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
import "@/components/insights/insights.css";
import FeaturedSlider from "@/components/insights/FeaturedSlider";
import InsightsGrid from "@/components/insights/InsightsGrid";
import InsightsHero from "@/components/insights/InsightsHero";
import InsightsMarquee from "@/components/insights/InsightsMarquee";
import Reveal from "@/components/insights/Reveal";
import { insights, readingTime } from "@/data/insight";

export const metadata = {
  title: "Insights | Crystal Express Limited",
  description:
    "Practical logistics insights from Crystal Express Limited: multimodal routing, air freight preparation, consolidation, shipment visibility, Bangladesh imports and fashion launch planning.",
};

export default function InsightsPage() {
  const totalWords = insights.reduce((sum, i) => sum + i.words, 0);
  const totalMinutes = insights.reduce((sum, i) => sum + readingTime(i.words), 0);

  return (
    <main className="bg-slate-50">
      <InsightsHero articles={insights.length} words={totalWords} minutes={totalMinutes} />
      <InsightsMarquee items={insights} />

      {/* Featured auto-playing slider */}
      <section id="featured" className="mx-auto max-w-7xl scroll-mt-8 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest text-sky-600">Featured reads</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Start with what matters now
          </h2>
        </Reveal>
        <div className="mt-8">
          <FeaturedSlider items={insights} />
        </div>
      </section>

      {/* All insights */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-widest text-sky-600">Library</p>
          <h2 className="mb-8 mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            All insights
          </h2>
        </Reveal>
        <InsightsGrid items={insights} />
      </section>
    </main>
  );
}