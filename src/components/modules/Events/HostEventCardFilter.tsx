"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import DateFilter from "@/components/shared/DateFilter";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";

const HostEventCardFilter = () => {
    return (
        <div className="space-y-3 mb-6">
            <div className="flex flex-col lg:flex-row justify-between gap-3">
                <div className="flex items-center gap-2 ">
                    <SearchFilter paramName="searchTerm" placeholder="Search by title, location..." />
                    <RefreshButton />
                </div>

                <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
                    <SelectFilter
                        paramName="status"
                        placeholder="Event Status"
                        // defaultValue="All Status"
                        options={[
                            { label: "Open", value: "OPEN" },
                            { label: "Full", value: "FULL" },
                            { label: "Completed", value: "COMPLETED" },
                            { label: "Cancelled", value: "CANCELLED" },
                            { label: "Pending", value: "PENDING" },
                            { label: "Rejected", value: "REJECTED" },
                        ]}
                    />
                    <SelectFilter
                        paramName="category"
                        placeholder="Choose Category"
                        // defaultValue="All Category"
                        options={[
                            { label: "Music", value: "MUSIC" },
                            { label: "Movie", value: "MOVIE" },
                            { label: "Theater", value: "THEATER" },
                            { label: "Comedy", value: "COMEDY" },
                            { label: "Party", value: "PARTY" },
                            { label: "Nightlife", value: "NIGHTLIFE" },
                            { label: "Concert", value: "CONCERT" },
                            { label: "Festival", value: "FESTIVAL" },
                            { label: "Sports", value: "SPORTS" },
                            { label: "Hiking", value: "HIKING" },
                            { label: "Cycling", value: "CYCLING" },
                            { label: "Running", value: "RUNNING" },
                            { label: "Fitness", value: "FITNESS" },
                            { label: "Camping", value: "CAMPING" },
                            { label: "Outdoor", value: "OUTDOOR" },
                            { label: "Adventure", value: "ADVENTURE" },
                            { label: "Social", value: "SOCIAL" },
                            { label: "Networking", value: "NETWORKING" },
                            { label: "Meetup", value: "MEETUP" },
                            { label: "Community", value: "COMMUNITY" },
                            { label: "Volunteering", value: "VOLUNTEERING" },
                            { label: "Culture", value: "CULTURE" },
                            { label: "Religion", value: "RELIGION" },
                            { label: "Food", value: "FOOD" },
                            { label: "Dinner", value: "DINNER" },
                            { label: "Cooking", value: "COOKING" },
                            { label: "Tasting", value: "TASTING" },
                            { label: "Cafe", value: "CAFE" },
                            { label: "Restaurant", value: "RESTAURANT" },
                            { label: "Tech", value: "TECH" },
                            { label: "Workshop", value: "WORKSHOP" },
                            { label: "Seminar", value: "SEMINAR" },
                            { label: "Conference", value: "CONFERENCE" },
                            { label: "Education", value: "EDUCATION" },
                            { label: "Language", value: "LANGUAGE" },
                            { label: "Business", value: "BUSINESS" },
                            { label: "Finance", value: "FINANCE" },
                            { label: "Art", value: "ART" },
                            { label: "Craft", value: "CRAFT" },
                            { label: "Photography", value: "PHOTOGRAPHY" },
                            { label: "Painting", value: "PAINTING" },
                            { label: "Writing", value: "WRITING" },
                            { label: "Dance", value: "DANCE" },
                            { label: "Gaming", value: "GAMING" },
                            { label: "Esports", value: "ESPORTS" },
                            { label: "Online Event", value: "ONLINE_EVENT" },
                            { label: "Travel", value: "TRAVEL" },
                            { label: "Tour", value: "TOUR" },
                            { label: "Roadtrip", value: "ROADTRIP" },
                        ]}
                    />
                    <DateFilter paramName="date" placeholder="Select Date" />
                    <ClearFiltersButton />
                </div>
            </div>
        </div>
    );
};

export default HostEventCardFilter;