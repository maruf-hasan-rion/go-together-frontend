"use client"

import EventCategories from '@/components/modules/Home/EventCategories';
import FeaturedEvents from '@/components/modules/Home/FeaturedEvents';
// import { Users } from 'lucide-react';
import Hero from '@/components/modules/Home/Hero';
import HowItWorks from '@/components/modules/Home/HowItWorks';
import NewsletterCTA from '@/components/modules/Home/NewsletterCTA';
import Testimonials from '@/components/modules/Home/Testimonials';
import TopRatedHosts from '@/components/modules/Home/TopRatedHosts';
import WhyChooseUs from '@/components/modules/Home/WhyChooseUs';
import Head from 'next/head';


const HomePage = () => {

  return (
    <>
     <Head>
        <title>GoTogether - Find Activity Companions | Events & Meetups Near You</title>
        <meta
          name="description"
          content="Join concerts, hiking trips, board game nights, and tech meetups. Connect with like-minded people in Dhaka, Chittagong, Sylhet and across Bangladesh."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/public/icon/users.svg" />
      </Head>
      <main>
       <Hero></Hero>
       <EventCategories></EventCategories>
       <FeaturedEvents></FeaturedEvents>
       <HowItWorks></HowItWorks>
       <WhyChooseUs></WhyChooseUs>
       <TopRatedHosts></TopRatedHosts>
       <Testimonials></Testimonials>
       <NewsletterCTA></NewsletterCTA>
      </main>

    </>
  );
};

export default HomePage;