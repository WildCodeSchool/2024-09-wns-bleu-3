import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const Faq = () => {
    return (
        <section className=" py-12 md:py-16 bg-white mt-8 px-6">
            <h2 className="text-2xl font-bold mb-8 text-gray-800 text-left">FAQs</h2>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>How does scanning work?</AccordionTrigger>
                    <AccordionContent>
                        Our system sends HTTP requests to your specified URL at the frequency you choose. We check the response
                        status, time, and content to ensure your website or API is functioning correctly. You'll receive
                        notifications if we detect any issues.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Is it reliable?</AccordionTrigger>
                    <AccordionContent>
                        Yes, our scanning service runs on distributed servers across multiple regions to ensure high
                        availability and accurate results. We use redundant checks to minimize false positives and provide you
                        with reliable monitoring data.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>What status codes are tracked?</AccordionTrigger>
                    <AccordionContent>
                        We track all standard HTTP status codes including 2xx (success), 3xx (redirection), 4xx (client errors),
                        and 5xx (server errors). You can filter and set up custom alerts based on specific status codes that
                        matter to your application.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>How do I get notified?</AccordionTrigger>
                    <AccordionContent>
                        You can configure notifications via email, SMS, Slack, or webhook. Premium plans include additional
                        notification channels like phone calls for critical alerts and integrations with popular incident
                        management platforms.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>What APIs are supported?</AccordionTrigger>
                    <AccordionContent>
                        Our service supports monitoring of any HTTP/HTTPS endpoint, including REST APIs, GraphQL, SOAP, and
                        custom API implementations. You can configure custom headers, request bodies, and authentication for API
                        monitoring.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    );
};

export default Faq;