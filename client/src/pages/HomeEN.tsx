/**
 * HOME (English) — Holiday rental management in Tenerife
 * Route: /en  (hreflang pair of /)
 * Keywords: holiday rental management Tenerife, Airbnb management Tenerife,
 * property management company Tenerife.
 */
import { BarChart3, Camera, ClipboardCheck, Globe2, KeyRound, LineChart, MessagesSquare, ScrollText, Sparkles } from "lucide-react";
import Comparison from "@/components/Comparison";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";
import IncomeCalculator from "@/components/IncomeCalculator";
import Layout from "@/components/Layout";
import PricingBlock from "@/components/PricingBlock";
import SectionHeading from "@/components/SectionHeading";
import Timeline from "@/components/Timeline";
import ZoneCards from "@/components/ZoneCards";
import { HERO_IMAGES } from "@/data/images";
import type { Benefit } from "@/data/service";
import { MANAGEMENT_FEE_PERCENT, whatsappUrl } from "@/lib/contact";
import { trackEvent } from "@/lib/tracking";

const WHATSAPP_EN = "Hi, I'd like to know more about holiday rental management for my property in Tenerife.";
const delay = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as React.CSSProperties;

const FACTS = [
  { value: `${MANAGEMENT_FEE_PERCENT}%`, label: "From, per confirmed booking" },
  { value: "€0", label: "Fixed monthly fees" },
  { value: "3", label: "Platforms: Airbnb, Booking, Vrbo" },
  { value: "Local", label: "Team on the island" },
];

const BENEFITS: Benefit[] = [
  {
    icon: LineChart,
    title: "A price that follows the island",
    usual: "A fixed nightly rate, or one reviewed by hand now and then.",
    ours: "Dynamic pricing reviewed every day for season, island events, booking window and competition.",
  },
  {
    icon: Globe2,
    title: "More visibility, more bookings",
    usual: "One listing on one platform, often in a single language.",
    ours: "Airbnb, Booking.com and Vrbo at once, with synced calendars, professional photos and multilingual listings.",
  },
  {
    icon: MessagesSquare,
    title: "Guests looked after, you at ease",
    usual: "Messages and calls at any hour, even on your own holidays.",
    ours: "We look after every guest before, during and after their stay, in several languages.",
  },
  {
    icon: Sparkles,
    title: "Cared for like a hotel",
    usual: "Finding cleaners and repairers, and checking everything is right.",
    ours: "Professional cleaning and laundry, an inspection after every check-out and incidents handled by our local team.",
  },
  {
    icon: ScrollText,
    title: "The rules, taken care of",
    usual: "Working through Law 6/2025, the VV licence and guest registration on your own.",
    ours: "We help with the holiday rental licence and handle guest registration for every stay.",
  },
  {
    icon: BarChart3,
    title: "Everything in view",
    usual: "Figures spread across platforms, statements and spreadsheets.",
    ours: "A monthly report with bookings, income and costs. Block dates to use your home whenever you like.",
  },
];

const PROCESS = [
  { step: "01", icon: ClipboardCheck, title: "Free estimate", text: "Tell us about your property. We check its potential and licence situation and send you an income estimate, with no obligation." },
  { step: "02", icon: Camera, title: "Set-up", text: "We review equipment and safety, organise the photo shoot, create your listings and set up pricing." },
  { step: "03", icon: KeyRound, title: "Day-to-day", text: "Bookings, guests, check-ins, cleaning, laundry and maintenance: we take care of everything." },
  { step: "04", icon: BarChart3, title: "You get paid", text: "Receive your income and a clear monthly report. Want to use your home? We block the dates." },
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
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ivory">
        <picture>
          <source media="(max-width: 767px)" srcSet={HERO_IMAGES.mobile} type="image/webp" />
          <img
            src={HERO_IMAGES.desktop}
            alt={HERO_IMAGES.altEn}
            fetchPriority="high"
            decoding="async"
            width={2400}
            height={1358}
            className="drift absolute inset-0 -z-10 h-full w-full object-cover object-[70%_50%]"
          />
        </picture>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ivory/95 via-ivory/75 to-ivory/10 md:bg-gradient-to-r md:from-ivory md:via-ivory/70 md:to-ivory/0" />
        <div aria-hidden className="absolute inset-0 -z-10 hidden bg-gradient-to-b from-ivory/60 via-transparent to-ivory/40 md:block" />

        <div className="container flex flex-1 flex-col justify-center pb-12 pt-[calc(var(--header-height)+2.5rem)] sm:pb-16 sm:pt-[calc(var(--header-height)+4rem)]">
          <div className="max-w-3xl">
            <h1>
              <span className="eyebrow rise" style={delay(150)}>
                Holiday rental management · Tenerife
              </span>
              <span className="display rise mt-7 block text-[2.55rem] leading-[1.02] sm:mt-9 sm:text-6xl lg:text-[5.4rem]" style={delay(300)}>
                <span className="block">Your Tenerife home,</span>
                <span className="block italic text-sea">in the best hands.</span>
              </span>
            </h1>
            <p className="rise mt-7 max-w-xl text-[1.02rem] leading-[1.75] text-ink-700 sm:mt-9 sm:text-[1.1rem]" style={delay(500)}>
              Airbnb and holiday rental management on the island: listings, guests, cleaning, maintenance, licensing and pricing. We take care of everything.
              You simply receive the income.
            </p>
            <div className="rise mt-9 flex flex-col gap-3 sm:mt-11 sm:flex-row sm:items-center" style={delay(650)}>
              <a href="#calculator" className="btn btn-ink">
                Estimate your income
              </a>
              <a
                href={whatsappUrl(WHATSAPP_EN)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("Lead", { content_name: "WhatsApp Hero EN" })}
                className="btn btn-outline bg-ivory/40 backdrop-blur-sm"
              >
                Chat with us on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="rise border-t border-ink/10 bg-ivory/75 backdrop-blur-md" style={delay(850)}>
          <dl className="container grid grid-cols-2 lg:grid-cols-4">
            {FACTS.map((fact, i) => (
              <div
                key={fact.label}
                className={`flex flex-col gap-1.5 py-5 sm:gap-2 sm:py-6 lg:py-8 ${i % 2 === 0 ? "pr-5" : "border-l border-ink/10 pl-5 sm:pl-8"} ${
                  i >= 2 ? "border-t border-ink/10 lg:border-t-0" : ""
                } ${i === 2 ? "lg:border-l lg:pl-8" : ""}`}
              >
                <dt className="label order-2 leading-snug text-ink-500">{fact.label}</dt>
                <dd className="order-1 font-display text-[1.75rem] font-normal text-ink sm:text-3xl lg:text-4xl">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="benefits" className="section bg-mist">
        <div className="container">
          <SectionHeading eyebrow="Why us" size="xl" title="The benefits of letting us manage your home." />
          <div className="mt-12 sm:mt-16 lg:mt-20">
            <Comparison items={BENEFITS} usualLabel="If you manage it yourself" oursLabel="With Dialez Holidays" />
          </div>
        </div>
      </section>

      <section id="pricing" className="section bg-ivory-50">
        <div className="container">
          <PricingBlock lang="en" />
        </div>
      </section>

      <section id="calculator" className="section border-y border-ink/10 bg-sand-100">
        <div className="container grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Calculator"
              title="How much could your Tenerife property earn?"
              intro="Move the nightly rate and occupancy to see what you would keep after our fee. For a figure tailored to your home, ask us for a free estimate."
            />
          </div>
          <div className="reveal lg:col-span-7">
            <IncomeCalculator lang="en" />
          </div>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container">
          <SectionHeading eyebrow="How it works" size="xl" title="From your keys to your first booking." />
          <div className="mt-14 lg:mt-24">
            <Timeline steps={PROCESS} />
          </div>
        </div>
      </section>

      <section id="areas" className="section bg-mist">
        <div className="container">
          <SectionHeading
            eyebrow="The whole island"
            title="Holiday rental management across Tenerife."
            intro="From the luxury of Costa Adeje to the charm of Puerto de la Cruz: every area has its own guests, season and rules. We know them."
          />
          <div className="mt-14 sm:mt-20">
            <ZoneCards lang="en" />
          </div>
        </div>
      </section>

      <FaqSection faqs={FAQS} className="bg-ivory" eyebrow="Questions" title="Frequently asked questions." id="faq" />

      <FinalCta lang="en" id="contact" />
    </Layout>
  );
}
