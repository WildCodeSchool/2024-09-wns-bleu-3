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
        <Card className="border border-white/10 bg-main-400/5 backdrop-blur-xl">
            <CardHeader>
                <CardTitle className="text-sm font-medium text-slate-400 w-full text-left">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full ${color}`}>
                        <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-2xl font-bold text-white">{value}</div>
                </div>
                <div className="mt-2 text-sm text-slate-400 w-full text-left">
                    {!tags || tags.length === 0 ? (
                        description
                    ) : (
                        <div className="flex flex-wrap gap-1">
                            {tags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="rounded-full bg-blue-400/20 px-2.5 py-1 text-xs font-medium text-blue-400"
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
