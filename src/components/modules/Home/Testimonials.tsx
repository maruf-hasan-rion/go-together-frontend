import { Star } from "lucide-react";

type Testimonial = {
	id?: string;
	name: string;
	text: string;
	rating: number;
};

export default function Testimonials({
	testimonials = [],
}: {
	testimonials?: Testimonial[];
}) {
	if (testimonials.length === 0) {
		return null;
	}

	return (
		<section className="py-20 px-4 bg-white">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-gray-900 mb-4">
						What Our Users Say
					</h2>
					<p className="text-xl text-gray-600">
						Real stories from our community
					</p>
				</div>
				<div className="grid md:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<div
							key={testimonial.id ?? index}
							className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
						>
							<div className="flex gap-1 mb-4">
								{[...Array(Math.max(0, Math.min(5, testimonial.rating)))].map(
									(_, i) => (
										<Star
											key={i}
											className="w-5 h-5 text-yellow-400 fill-yellow-400"
										/>
									),
								)}
							</div>
							{testimonial.text && (
								<p className="text-gray-700 mb-6 italic">{testimonial.text}</p>
							)}
							<div className="font-semibold text-gray-900">
								{testimonial.name}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
