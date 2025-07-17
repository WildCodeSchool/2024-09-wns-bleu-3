import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

type IScanDetailsOptions = {
    title: string;
    value: string;
    description: string;
    color: string;
    icon: LucideIcon;
    tags?: { id: number, name: string }[]

};

const CardDetail = ({ title, value, icon: Icon, color, description, tags }: IScanDetailsOptions) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-500 w-full text-left">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${color}`}>
                        <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-bold">{value}</div>
                </div>
                <div className="mt-2 text-sm text-gray-500 w-full text-left">
                    {!tags || tags.length === 0 ? (
                        description
                    ) : (
                        <div className="flex flex-wrap gap-1">
                            {tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800"
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

            </CardContent>
        </Card>
    );
};

export default CardDetail;
