"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";

const HostApplicationManagementFilter = () => {
    return (
        <div className="space-y-3 mb-6">
            <div className="flex flex-col md:flex-row justify-between md:gap-3">
                <div className="flex items-center gap-2">
                    <SearchFilter paramName="searchTerm" placeholder="Search by name, email..." />
                    <RefreshButton />
                </div>

                <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
                    <ClearFiltersButton />
                </div>
            </div>
        </div>
    );
};

export default HostApplicationManagementFilter;
