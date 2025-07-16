
import { HealthWidgetProps } from '@/@types/sidebar';
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from './ui/sidebar';



function HealthWidget({ totalScans, activeScans, issueScans }: HealthWidgetProps) {
    // Calculate health percentage based on active vs total scans
    const healthPercentage = totalScans > 0 ? Math.round((activeScans / totalScans) * 100) : 0;

    // Calculate circle stroke properties for the progress circle
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - healthPercentage / 100);

    // Dynamic ring color based on health percentage
    const getRingColor = () => {
        if (healthPercentage >= 100) return 'text-blue-400';
        if (healthPercentage >= 80) return 'text-emerald-400';
        if (healthPercentage >= 60) return 'text-yellow-400';
        if (healthPercentage >= 40) return 'text-orange-400';
        return 'text-red-400';
    };

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden pt-5">
            <SidebarGroupLabel className="text-dark-blue-300 text-xs font-light tracking-wider flex items-center gap-2 text-left">
                SYSTEM STATUS
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <div className="border border-dark-blue-700/50 bg-dark-blue-950/50 backdrop-blur-sm p-6 rounded-lg">
                    {/* Health Circle */}
                    <div className="flex items-center justify-center mb-6">
                        <div className="relative w-32 h-32">
                            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                    className="text-dark-blue-800"
                                />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={strokeDashoffset}
                                    className={`${getRingColor()} transition-all duration-1000`}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-white">{healthPercentage}%</span>
                                <span className="text-xs text-dark-blue-400 tracking-wider">HEALTH</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mb-6">
                        <div className="text-dark-blue-400 text-xs mb-1 tracking-wider">OVERALL STATUS</div>
                        <div className={`text-lg font-bold tracking-wider ${getRingColor()}`}>
                            {healthPercentage >= 80 ? 'OPERATIONAL' :
                                healthPercentage >= 60 ? 'DEGRADED' : 'CRITICAL'}
                        </div>
                    </div>

                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-dark-blue-400">TOTAL MONITORS</span>
                            <span className="text-white font-mono bg-dark-blue-800/50 px-2 py-1 rounded text-xs">
                                {totalScans}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-dark-blue-400">HEALTHY</span>
                            <span className="text-emerald-400 font-mono bg-emerald-500/10 px-2 py-1 rounded text-xs">
                                {activeScans}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-dark-blue-400">ISSUES</span>
                            <span className="text-red-400 font-mono bg-red-500/10 px-2 py-1 rounded text-xs">
                                {issueScans}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-dark-blue-400">UPTIME</span>
                            <span className="text-white font-mono bg-dark-blue-800/50 px-2 py-1 rounded text-xs">98.7%</span>
                        </div>
                    </div>
                </div>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

export default HealthWidget;