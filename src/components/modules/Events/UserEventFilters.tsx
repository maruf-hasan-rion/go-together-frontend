"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton"; import DateFilter from "@/components/shared/DateFilter";
import RefreshButton from "@/components/shared/RefreshButton";
;
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";

const UserEventsFilter = () => {
    return (
        <div className="space-y-3 mb-6">
            <div className="flex flex-col md:flex-row justify-between gap-3">

                <div className="flex items-center gap-2 ">
                    <SearchFilter paramName="searchTerm" placeholder="Title Search...." />

                    <SearchFilter paramName="searchTerm" placeholder="Location Search...." />

                    <RefreshButton/>
                </div>

                <div className="flex flex-col md:flex-row mt-4 md:mt-0 md:space-x-1 space-y-2">
                    <SelectFilter
                        paramName="participantStatus"
                        placeholder="Booking Status"
                        // defaultValue="All Booking Statuses"
                        options={[
                            { label: "Left", value: "LEFT" },
                            { label: "Confirmed", value: "CONFIRMED" },
                            { label: "Pending", value: "PENDING" },
                        ]}
                    />
                    <DateFilter paramName="date" placeholder="Select Date...." />

                    <ClearFiltersButton />
                </div>
            </div>
        </div>
    );
};

export default UserEventsFilter;
