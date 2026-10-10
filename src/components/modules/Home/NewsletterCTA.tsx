"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function NewsletterCTA() {
	const [email, setEmail] = useState("");
	return (
		<div className="py-20 px-4 bg-linear-to-r from-blue-600 to-indigo-600">
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
				<p className="text-xl text-white/90 mb-8">
					Get notified about new events and activities in your area
				</p>
				<div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
					<input
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
					/>
					<button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center justify-center gap-2">
						Subscribe
						<ArrowRight className="w-5 h-5" />
					</button>
				</div>
			</div>
		</div>
	);
}
