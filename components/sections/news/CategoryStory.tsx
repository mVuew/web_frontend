type CategoryType = {
  id: string | number;
  name: string;
  slug: string;
};

type CategoryStoryProps = {
  categorySlug: string | null;
  categories: CategoryType[];
};

const categoryCopy: Record<
  string,
  {
    headline: string;
    summary: string;
    points: string[];
  }
> = {
  technology: {
    headline: "Technology Briefing",
    summary:
      "Track product launches, AI shifts, regulation moves, and platform competition with context that matters.",
    points: [
      "New product and platform updates with practical impact.",
      "AI policy and safety developments explained clearly.",
      "Funding, mergers, and market pressure signals to watch.",
    ],
  },
  health: {
    headline: "Health Briefing",
    summary:
      "Follow public health updates, medical research, and healthcare policy with balanced evidence-first reporting.",
    points: [
      "Clinical and research headlines translated into plain language.",
      "Policy and insurance changes that affect people directly.",
      "Global health alerts with verified sources and timelines.",
    ],
  },
  business: {
    headline: "Business Briefing",
    summary:
      "Understand market movement, earnings narratives, and leadership decisions shaping the business landscape.",
    points: [
      "Earnings and growth signals beyond the headline numbers.",
      "Strategy changes and leadership decisions with context.",
      "Macro events affecting startups, SMBs, and enterprise.",
    ],
  },
  sports: {
    headline: "Sports Briefing",
    summary:
      "Stay updated with match-defining moments, athlete stories, and league-level developments across major sports.",
    points: [
      "Match and tournament updates with tactical highlights.",
      "Athlete form, transfers, and milestone watch.",
      "League governance and business-side sports stories.",
    ],
  },
  entertainment: {
    headline: "Entertainment Briefing",
    summary:
      "From streaming trends to industry shifts, get entertainment news with creator and audience perspectives.",
    points: [
      "Film, series, and music launches with reception trends.",
      "Streaming strategy and audience behavior changes.",
      "Creator economy stories with business implications.",
    ],
  },
  science: {
    headline: "Science Briefing",
    summary:
      "Explore scientific discoveries, space missions, and innovation breakthroughs through trusted reporting.",
    points: [
      "Research breakthroughs and peer-reviewed developments.",
      "Space and climate updates with measurable outcomes.",
      "Innovation pipelines from lab to real-world adoption.",
    ],
  },
  politics: {
    headline: "Politics Briefing",
    summary:
      "Decode policy moves, election narratives, and governance decisions with neutral, fact-based summaries.",
    points: [
      "Legislation and policy updates with likely impact.",
      "Election developments and narrative shifts.",
      "Government decisions analyzed through verified sources.",
    ],
  },
  education: {
    headline: "Education Briefing",
    summary:
      "Follow policy updates, learning innovation, and institution trends that shape education outcomes.",
    points: [
      "School and higher-ed policy changes in one view.",
      "Learning technology and classroom model evolution.",
      "Student outcomes, access, and funding developments.",
    ],
  },
  travel: {
    headline: "Travel Briefing",
    summary:
      "Stay informed on travel advisories, route changes, and destination trends with practical guidance.",
    points: [
      "Advisories and disruptions affecting travel plans.",
      "Airline, rail, and hospitality updates worth noting.",
      "Destination insights and seasonal trend snapshots.",
    ],
  },
  food: {
    headline: "Food Briefing",
    summary:
      "Get food industry stories, nutrition conversations, and consumer trend insights in one place.",
    points: [
      "Food business trends from supply chain to retail.",
      "Nutrition research and health discussion updates.",
      "Consumer behavior shifts in products and dining.",
    ],
  },
};

export default function CategoryStory({
  categorySlug,
  categories,
}: CategoryStoryProps) {
  const selectedCategory = categories.find(
    (item) => item.slug === categorySlug,
  );
  const content = categorySlug ? categoryCopy[categorySlug] : undefined;

  if (!selectedCategory || !content) {
    return (
      <section className="mt-6 rounded-xl border border-border bg-surface p-6 sm:p-8">
        <p className="text-muted-foreground text-sm uppercase tracking-[0.14em]">
          Category Overview
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
          Select a category to view focused news context
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
          Choose a category above to see a customized summary and key focus
          points.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-6 rounded-xl border border-border bg-surface p-6 sm:p-8">
      <p className="text-muted-foreground text-sm uppercase tracking-[0.14em]">
        {selectedCategory.name}
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
        {content.headline}
      </h2>
      <p className="text-muted-foreground mt-3 max-w-3xl leading-relaxed">
        {content.summary}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {content.points.map((point) => (
          <div
            key={point}
            className="rounded-lg border border-border bg-background p-4"
          >
            <p className="text-sm leading-relaxed text-foreground">{point}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
