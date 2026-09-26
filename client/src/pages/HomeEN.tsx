/**
 * HOME (English) — Holiday rental management in Tenerife
 * Route: /en  (hreflang pair of /)
 * Keywords: holiday rental management Tenerife, Airbnb management Tenerife,
 * property management company Tenerife.
 */
import { ArrowRight, BarChart3, Globe2, LineChart, MessageCircle, MessagesSquare, ShieldCheck, Sparkles } from "lucide-react";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";
import IncomeCalculator from "@/components/IncomeCalculator";
import Layout from "@/components/Layout";
import PricingBlock from "@/components/PricingBlock";
import SectionHeading from "@/components/SectionHeading";
import ZoneCards from "@/components/ZoneCards";
import { HERO_IMAGES } from "@/data/images";
import { MANAGEMENT_FEE_PERCENT, whatsappUrl } from "@/lib/contact";
import { trackEvent } from "@/lib/tracking";

const WHATSAPP_EN = "Hi, I'd like to know more about holiday rental management for my property in Tenerife.";

const BENEFITS = [
  {
    icon: LineChart,
    title: "Higher nightly rates",
    text: "We adjust your price every day to the season, island events, booking window and competition, so you neither leave nights empty nor give them away in high season.",
  },
  {
    icon: Globe2,
    title: "More visibility, more bookings",
    text: "Your property is listed on Airbnb, Booking.com and Vrbo at the same time, with synced calendars, professional photos and listings in several languages.",
  },
  {
    icon: MessagesSquare,
    title: "No more late-night calls",
    text: "We answer every guest before, during and after their stay, in several languages. You don't have to keep an eye on your phone.",
  },
  {
    icon: Sparkles,
    title: "Looked after like a hotel",
    text: "Professional cleaning and laundry between stays, an inspection after every check-out and preventive maintenance.",
  },
  {
    icon: ShieldCheck,
    title: "Peace of mind with the law",
    text: "We help with the holiday rental licence (VV), guest registration and the Canary Islands rules, which changed with Law 6/2025.",
  },
  {
    icon: BarChart3,
    title: "Full transparency",
    text: "A monthly report with bookings, income and costs. Block dates whenever you want to enjoy your home.",
  },
];

const PROCESS = [
  { step: "01", title: "Free estimate", text: "Tell us about your property. We check its potential and licence situation and send you an income estimate, with no obligation." },
  { step: "02", title: "Set-up", text: "We review equipment and safety, organise the photo shoot, create your listings and set up pricing." },
  { step: "03", title: "Day-to-day", text: "Bookings, guests, check-ins, cleaning, laundry and maintenance: we take care of everything." },
  { step: "04", title: "You get paid", text: "Receive your income and a clear monthly report. Want to use your home? We block the dates." },
];

const FAQS = [
  {
    question: "How much does holiday rental management cost in Tenerife?",
    answer: `Our full management service costs from ${MANAGEMENT_FEE_PERCENT}% of each confirmed booking, with no fixed monthly fees or hidden costs. If your property earns nothing, you pay us nothing.`,
  },
  {
    question: "Do I need a licence to rent my property to tourists in Tenerife?",
    answer:
      "Yes. In the Canary Islands a holiday rental needs a responsible declaration filed with the Cabildo and a VV registration number. Since Law 6/2025, the tourist use must also be allowed by the town hall's planning rules. We help you check this before you start.",
  },
  {
    question: "I live abroad. Can you manage my property?",
    answer:
      "Yes. Our service is designed so that you don't need to be on the island: our local team takes care of everything in person, we keep you updated by WhatsApp or email and you receive a report every month.",
  },
  {
    question: "Which areas of Tenerife do you cover?",
    answer:
      "The whole island: Costa Adeje, Los Cristianos, Playa de las Américas, El Médano, Los Gigantes, Puerto de la Cruz, Santa Cruz and La Laguna, among others.",
  },
  {
    question: "Can I still use my property?",
    answer: "Of course. Let us know in advance and we will block the dates on every platform.",
  },
];

export default function HomeEN() {
  return (
    <Layout overlay lang="en" whatsappText={WHATSAPP_EN}>
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ocean-deep text-white">
        <picture>
          <source media="(max-width: 767px)" srcSet={HERO_IMAGES.mobile} type="image/webp" />
          <img
            src={HERO_IMAGES.desktop}
            alt={HERO_IMAGES.altEn}
            fetchPriority="high"
            decoding="async"
            width={2400}
            height={1358}
            className="animate-slow-zoom absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/85 via-ocean-deep/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/90 via-transparent to-ocean-deep/40" />
        <div className="absolute inset-0 bg-ocean-deep/25 md:hidden" />
        <div className="container relative pb-14 pt-36 md:pb-20">
          <div className="max-w-3xl">
            <h1>
              <span className="eyebrow eyebrow-light animate-fade-up">Holiday rental management in Tenerife</span>
              <span className="animate-fade-up delay-1 mt-6 block font-display text-[2.9rem] font-medium leading-[1.02] sm:text-6xl lg:text-[4.6rem] xl:text-[5rem]">
                Your Tenerife home, earning for you. <em className="font-normal text-gold">We take care of everything.</em>
              </span>
            </h1>
            <p className="animate-fade-up delay-2 mt-7 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
              Airbnb and holiday rental management on the island: listings on Airbnb, Booking.com and Vrbo, guests, cleaning, maintenance, licensing and
              dynamic pricing. From {MANAGEMENT_FEE_PERCENT}% per booking, with no fixed fees.
            </p>
            <div className="animate-fade-up delay-3 mt-9 flex flex-wrap gap-4">
              <a href="#calculator" className="btn btn-gold">
                Estimate your income <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={whatsappUrl(WHATSAPP_EN)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("Lead", { content_name: "WhatsApp Hero EN" })}
                className="btn btn-ghost-light"
              >
                <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="section scroll-mt-16">
        <div className="container">
          <SectionHeading
            eyebrow="Why us"
            title="The benefits of letting us manage your holiday home"
            intro="A well-managed holiday rental is not the one with the most bookings, but the one that earns the most with the fewest worries for its owner."
          />
          <ol className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit, i) => (
              <li key={benefit.title} className="reveal">
                <div className="flex items-center gap-4">
                  <span className="font-display text-lg text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px flex-1 bg-border" />
                  <benefit.icon className="h-6 w-6 text-ocean" strokeWidth={1.4} />
                </div>
                <h3 className="mt-6 text-[1.9rem] font-medium leading-tight text-ocean">{benefit.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{benefit.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="pricing" className="section scroll-mt-16 bg-sand">
        <div className="container">
          <SectionHeading center eyebrow="Our fee" title="One clear fee: we only earn when you do" />
          <div className="mt-16">
            <PricingBlock lang="en" />
          </div>
        </div>
      </section>

      <section id="calculator" className="relative scroll-mt-16 overflow-hidden bg-ocean text-white">
        <div className="container grid items-center gap-14 py-24 md:py-32 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading
            light
            eyebrow="Calculator"
            title="How much could your Tenerife property earn?"
            intro="Move the nightly rate and occupancy to see what you would keep after our fee. For a figure tailored to your home, ask us for a free estimate."
          />
          <div className="reveal">
            <IncomeCalculator lang="en" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="How it works" title="From your keys to your first booking in four steps" />
          <ol className="relative mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <span aria-hidden className="absolute left-0 right-0 top-[1.9rem] hidden h-px bg-gradient-to-r from-gold via-gold/40 to-transparent lg:block" />
            {PROCESS.map(step => (
              <li key={step.step} className="reveal relative">
                <span className="relative flex h-[3.8rem] w-[3.8rem] items-center justify-center rounded-full border border-gold bg-background font-display text-2xl text-gold-ink">
                  {step.step}
                </span>
                <h3 className="mt-7 text-3xl font-medium text-ocean">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="areas" className="section scroll-mt-16 bg-sand">
        <div className="container">
          <SectionHeading
            eyebrow="The whole island"
            title="Holiday rental management across Tenerife"
            intro="From the luxury of Costa Adeje to the charm of Puerto de la Cruz: every area has its own guests, season and rules. We know them."
          />
          <div className="mt-14">
            <ZoneCards lang="en" />
          </div>
        </div>
      </section>

      <FaqSection faqs={FAQS} eyebrow="Questions" title="Frequently asked questions" id="faq" />

      <FinalCta lang="en" id="contact" />
    </Layout>
  );
}
