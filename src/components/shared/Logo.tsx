import { Calendar } from "lucide-react";
import Link from "next/link";


export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
         <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary-foreground" />
            </div>
          <span className="text-2xl font-bold">
            GoTogether
          </span>
        </Link>

  )
}
