import Link from "next/link";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/formatters";

export type TopHost = {
  id: string;
  fullName?: string;
  profilePhoto?: string | null;
  location?: string | null;
  averageRating?: number | null;
  totalReviews?: number | null;
};

export default function TopRatedHosts({ hosts = [] }: { hosts?: TopHost[] }) {
  if (hosts.length === 0) return null;

  return (
    <div className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Top-Rated Hosts</h2>
          <p className="text-xl text-gray-600">
            Connect with our most trusted event organizers
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {hosts.slice(0, 6).map((host) => (
            <div
              key={host.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16">
                  {host.profilePhoto ? (
                    <AvatarImage src={host.profilePhoto} alt={host.fullName ?? "Host"} />
                  ) : null}
                  <AvatarFallback>{getInitials(host.fullName ?? "Host")}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {host.fullName ?? "GoTogether Host"}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-gray-900">
                      {Number(host.averageRating ?? 0).toFixed(1)}
                    </span>
                    <span className="text-gray-500 text-sm">
                      ({host.totalReviews ?? 0} reviews)
                    </span>
                  </div>
                </div>
              </div>
              {host.location && <p className="text-gray-600 mb-4">{host.location}</p>}
              <Link
                href={`/users/${host.id}`}
                className="block w-full border-2 border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-center"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
