import type { ZoneSlug } from "@/data/zones";
import type { CategorySlug } from "./categories";

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface PostFaq {
  q: string;
  a: string;
}

/** What listings need of a post (`<file>.md?card`). */
export interface PostCard {
  slug: string;
  title: string;
  description: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  updated?: string;
  category: CategorySlug;
  zone?: ZoneSlug;
  image: string;
  imageAlt: string;
  readingMinutes: number;
  /** Shown as the main article of the blog index (the newest featured post wins). */
  featured?: boolean;
  /** False while `date` is in the future (scheduled post). */
  published: boolean;
}

/** All the metadata of a post (`<file>.md?meta`), generated at build time from its Markdown file. */
export interface PostMeta extends PostCard {
  seoTitle?: string;
  keywords: string[];
  faq: PostFaq[];
  toc: TocEntry[];
  wordCount: number;
}

/** Metadata plus the article body (`<file>.md?full`). */
export interface PostFull extends PostMeta {
  html: string;
}
