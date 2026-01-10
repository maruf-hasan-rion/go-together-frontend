import { Calendar, Users, UserSquare2, CheckCircle2, DollarSign, FileText } from 'lucide-react';


const features = [
    {
        title: 'Host Management',
        description: 'Manage and verify all host accounts and their activities.',
        icon: UserSquare2,
        color: '#db2777',
    },
    {
        title: 'User Management',
        description: 'View, edit, and manage all users on the platform.',
        icon: Users,
        color: '#2563eb',
    },
    {
        title: 'Host Application Management',
        description: 'Review, approve, or reject host applications efficiently.',
        icon: FileText,
        color: '#fbbf24',
    },
    {
        title: 'Event Application Management',
        description: 'Oversee, approve, or reject event applications.',
        icon: Calendar,
        color: '#6366f1',
    },
    {
        title: 'Payment Tracing',
        description: 'Track and manage all platform payments and transactions.',
        icon: DollarSign,
        color: '#10b981',
    },
    {
        title: 'View Analytics',
        description: 'Analyze platform performance and user engagement with detailed analytics.',
        icon: CheckCircle2,
        color: '#22c55e',
    },
];


const AdminFeatures = () => {
    return (
        <div className="mb-12 mt-10">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-[#45aaa2] mb-4">
                    Admin Features
                </h1>
                <p className="text-md md:text-lg  max-w-2xl mx-auto">
                    Your gateway to discovering, joining, and experiencing amazing events
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => (
                    <div key={feature.title} className="rounded-xl shadow-lg p-6 hover:shadow-xl border transition-transform duration-300 hover:scale-101">
                        <div className="w-12 h-12" style={{ backgroundColor: feature.color + '1A', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-muted-foreground text-sm md:text-md">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminFeatures;