import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Help = () => {
    return (
        <section className="py-12 md:py-16 bg-[#051525] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-xl border border-[#0c2d4d] bg-[#0a2540] p-8 md:p-10 shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-white">Still have questions?</h2>
                    <p className="text-gray-300 mb-6">
                        Contact our support team and we'll get back to you as soon as possible.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Input placeholder="Enter your email" className="sm:flex-1 bg-[#0c2d4d] border-[#0e3359] text-white" />
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Contact Support</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Help;