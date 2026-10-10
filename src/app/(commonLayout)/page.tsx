import EventCategories from "@/components/modules/Home/EventCategories";
import FeaturedEvents from "@/components/modules/Home/FeaturedEvents";
import Hero from "@/components/modules/Home/Hero";
import HowItWorks from "@/components/modules/Home/HowItWorks";
import NewsletterCTA from "@/components/modules/Home/NewsletterCTA";
import Testimonials from "@/components/modules/Home/Testimonials";
import TopRatedHosts from "@/components/modules/Home/TopRatedHosts";
import WhyChooseUs from "@/components/modules/Home/WhyChooseUs";
import { getRecentEvents } from "@/services/events/events";
import { getPublicTestimonials } from "@/services/reviews/reviews";
import { getLandingStats, getTopHosts } from "@/services/home/home";
import { Event } from "@/types/event.interface";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "GoTogether — Find Activity Companions | Events & Meetups Near You",
	description:
		"Join concerts, hiking trips, board game nights, and tech meetups. Connect with like-minded people across Bangladesh.",
};

const HomePage = async () => {
	const [recentRes, testimonialsRes, statsRes, hostsRes] = await Promise.all([
		getRecentEvents(),
		getPublicTestimonials(),
		getLandingStats(),
		getTopHosts(),
	]);

	const events = (recentRes?.data ?? []) as Event[];

	const landing = statsRes?.data ?? null;
	const heroStats = [
		{ number: String(landing?.totalClients ?? 0), label: "Members" },
		{ number: String(landing?.totalHosts ?? 0), label: "Hosts" },
		{ number: String(landing?.totalEvents ?? 0), label: "Live events" },
		{
			number: `${Number(landing?.averageHostRating ?? 0).toFixed(1)}★`,
			label: "Avg rating",
		},
	];

	const hosts = Array.isArray(hostsRes?.data) ? hostsRes.data : [];

  const testimonials = (testimonialsRes?.data ?? []).map(
    (review: {
      id?: string;
      comment?: string | null;
      rating?: number;
      user?: { fullName?: string } | null;
    }) => ({
      id: review.id,
      name: review.user?.fullName ?? "GoTogether member",
      text: review.comment ?? "",
      rating: review.rating ?? 5,
    }),
  );

	return (
		<main>
			<Hero stats={heroStats} />
			<EventCategories />
			<FeaturedEvents events={events} />
			<HowItWorks />
			<WhyChooseUs />
			<TopRatedHosts hosts={hosts} />
			<Testimonials testimonials={testimonials} />
			<NewsletterCTA />
		</main>
	);
};

export default HomePage;
