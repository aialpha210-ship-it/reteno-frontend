import { MarketingLayout } from "@/components/marketing/site-chrome";
import { SectionIntro } from "@/components/marketing/content";
import { faqs } from "@/lib/mock-data";
export const metadata={title:"FAQ | Reteno",description:"Answers about the Reteno personal learning system."};
export default function FAQ(){return <MarketingLayout><section className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24"><SectionIntro eyebrow="FAQ" title="A few useful answers." copy="An honest look at the intended Reteno experience and what this early product preview includes."/><div className="mt-12 divide-y divide-line border-y border-line">{faqs.map(([q,a])=><details key={q} className="group py-5"><summary className="flex cursor-pointer list-none justify-between gap-6 font-medium">{q}<span className="text-accent group-open:rotate-45">+</span></summary><p className="mt-3 max-w-2xl leading-7 text-muted">{a}</p></details>)}</div></section></MarketingLayout>}
