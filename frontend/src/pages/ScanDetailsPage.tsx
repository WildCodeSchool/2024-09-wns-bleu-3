import ScanDetailsCards from "@/components/scan-details/ScanDetailsCards"
import { ScanDetailsChart } from "@/components/scan-details/ScanDetailsChart"
import { Button } from "@/components/ui/button"
import { GetScanByIdQuery, useGetScanByIdQuery } from "@/generated/graphql-types"
import { useGetScanHistoryQuery } from "@/generated/graphql-types"
import { ArrowLeft, Copy } from "lucide-react"
import { Link, useParams } from "react-router"

export type IScanDetails = GetScanByIdQuery["getScanById"]; import { SetStateAction, useEffect, useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    BarChart4,
    Clock,
    CheckCircle,
    XCircle,
    Activity,
    Zap,
    Trash2,
    RefreshCw,
    Settings,
    Star,
    Pause,
    Play,
    Monitor,
    Link2
} from "lucide-react"
import { useDeleteScanMutation, usePauseOrRestartScanMutation, useUpdateScanMutation, useGetAllFrequencesQuery, useGetAllTagsQuery } from '../generated/graphql-types'

import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'

function ScanDetailsPage() {
    const { id } = useParams();
    const scanId = id ? parseInt(id) : 0;

    const [isFavorite, setIsFavorite] = useState(false);
    const [isPause, setIsPause] = useState(false);

    const { data, loading, error, refetch } = useGetScanByIdQuery({ variables: { getScanByIdId: Number(id) } })
    const { data: historyData, loading: historyLoading } = useGetScanHistoryQuery({
        variables: { scanId: Number(id) },
    });

    const { data: frequencyData } = useGetAllFrequencesQuery()
    const { data: tagsData } = useGetAllTagsQuery()

    const [editedTitle, setEditedTitle] = useState("");
    const [editedFrequency, setEditedFrequency] = useState("");
    const [editedTags, setEditedTags] = useState<number[]>([]);

    console.log("scanDetails ==>", data?.getScanById)

    // Initialize states from backend data
    useEffect(() => {
        if (data?.getScanById) {
            const scan = data.getScanById;
            setEditedTitle(scan.title);
            setEditedFrequency(scan.frequency?.id.toString() || "");
            setEditedTags(scan.tags.map(tag => tag.id));
            setIsPause(scan.isPause);
        }
    }, [data?.getScanById]);

    // Update scan
    const [updateScan] = useUpdateScanMutation({
        onCompleted: () => {
            toast.success("Scan updated successfully");
            refetch();
        },
        onError: (error) => {
            console.error("Error updating scan:", error);
            toast.error("Failed to update scan");
        }
    })

    // Delete scan 
    const [deleteScan, { loading: deleteLoading }] = useDeleteScanMutation({
        variables: { deleteScanId: scanId },
        onCompleted: () => {
            toast.success("Scan deleted successfully");
        },
        onError: (error) => {
            console.error("Error deleting scan:", error);
            toast.error("Failed to delete scan");
        }
    });

    // Pause/Resume scan
    const [pauseOrRestartScan] = usePauseOrRestartScanMutation({
        variables: { id: scanId },
        onCompleted: (data) => {
            setIsPause(data.pauseOrRestartScan.isPause);
            toast.success(`Scan ${data.pauseOrRestartScan.isPause ? 'paused' : 'resumed'} successfully`);
        },
        onError: (error) => {
            console.error("Error pausing/resuming scan:", error);
            toast.error("Failed to pause/resume scan");
        }
    });

    if (loading) return <p>Loading...</p>
    if (error) return <p>There is an error: {error.message}</p>

    const scanHistory = historyData?.getScanHistory || [];
    const scan = data?.getScanById;

    if (!scan) {
        return (
            <div className="p-4">
                <Alert>
                    <Activity className="h-4 w-4" />
                    <AlertDescription>
                        Scan not found
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Determine status icon and color based on scan results
    const getStatusIcon = (isOnline: boolean) => {
        return isOnline ? CheckCircle : XCircle;
    };

    const getStatusColor = (isOnline: boolean) => {
        return isOnline ? 'text-green-600' : 'text-red-600';
    };

    // Handle favorite toggle
    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
    };

    // Handle URL copy
    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(scan.url);
            toast.success("URL copied to clipboard!");
        } catch (err) {
            console.error('Failed to copy URL:', err);
            toast.error("Failed to copy URL");
        }
    };

    // if (!data?.getScanById) return null;

    return (
        <>
            <div className="flex min-h-screen flex-col">
                <main className="flex-1 bg-gray-50">
                    <div className=" py-8 px-6">
                        {/* back to dashboard */}
                        <div className="flex items-center mb-6">
                            <Button variant="lightBlue" size="sm" asChild>
                                <Link to="/dashboard">
                                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Scans
                                </Link>
                            </Button>
                        </div>

                        {/* Scan details header */}
                        <div className="flex space-around rounded-xl p-6 mb-6">
                            <div className="text-left flex-1">
                                <div className="flex items-center gap-3">
                                    {(() => {
                                        const StatusIcon = getStatusIcon(scan.isOnline);
                                        const statusColor = getStatusColor(scan.isOnline);
                                        const bgColor = scan.isOnline ? 'bg-green-100' : 'bg-red-100';
                                        return (
                                            <div className={`p-2 rounded-full ${bgColor}`}>
                                                <StatusIcon className={`h-5 w-5 ${statusColor}`} />
                                            </div>
                                        );
                                    })()}
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-3xl font-bold text-gray-800 leading-none">{scan.title}</h1>
                                        <div className="flex items-center gap-2">
                                            <a
                                                href={scan.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-600 hover:underline leading-none cursor-pointer"
                                            >
                                                {scan.url}
                                            </a>
                                            <Copy
                                                className="h-3 w-3 text-gray-500 cursor-pointer hover:text-gray-400 transition-colors flex-shrink-0"
                                                onClick={handleCopyUrl}
                                                title="Cliquer pour copier l'URL"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className={`gap-2 border-gray-200 cursor-pointer hover:text-yellow-600 ${isFavorite ? 'text-yellow-600 bg-yellow-50 border-yellow-200 hover:bg-yellow-100' : ''}`}
                                    onClick={handleFavoriteClick}
                                >
                                    <Star className={`h-4 w-4 ${isFavorite ? 'fill-yellow-600' : ''}`} />
                                    {isFavorite ? 'Favorited' : 'Favorite'}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => pauseOrRestartScan()}
                                    className={`gap-2 border-gray-200 cursor-pointer hover:text-blue-700 ${isPause ? 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100' : ''
                                        }`}
                                >
                                    {isPause ? (
                                        <>
                                            <Play className="h-4 w-4 fill-blue-500" />
                                            <span>Resume</span>
                                        </>
                                    ) : (
                                        <>
                                            <Pause className="h-4 w-4" />
                                            <span>Pause</span>
                                        </>
                                    )}
                                </Button>
                                <Button variant="outline" className="gap-2 border-gray-200 cursor-pointer">
                                    <RefreshCw className="h-4 w-4" /> Refresh Now
                                </Button>

                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" className="gap-2 border-gray-200 cursor-pointer">
                                            <Settings className="h-4 w-4" /> Edit
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle>Edit your Scan</SheetTitle>
                                            <SheetDescription>
                                                Make changes to your scan here. Click save when you&apos;re done.
                                            </SheetDescription>
                                        </SheetHeader>
                                        <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="scan-title">Title</Label>
                                                <Input
                                                    id="scan-title"
                                                    value={editedTitle}
                                                    onChange={(e) => setEditedTitle(e.target.value)}
                                                    className="bg-gray-50 border-gray-200 focus:bg-blue-50 focus:border-blue-400 focus:ring-blue-400"
                                                />
                                            </div>

                                            <div className="grid gap-3">
                                                <Label htmlFor="scan-frequency">Check Frequency</Label>
                                                <Select value={editedFrequency} onValueChange={(value: SetStateAction<string>) => setEditedFrequency(value)}>
                                                    <SelectTrigger className="cursor-pointer">
                                                        <SelectValue placeholder="Select frequency" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Frequency Options</SelectLabel>
                                                            {frequencyData?.getAllFrequences?.map((frequency) => (
                                                                <SelectItem className="cursor-pointer" key={frequency.id} value={frequency.id.toString()}>
                                                                    {frequency.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid gap-3">
                                                <Label htmlFor="scan-tags">Tags</Label>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {tagsData?.getAllTags?.map((tag) => (
                                                        <div key={tag.id} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`tag-${tag.id}`}
                                                                checked={editedTags.includes(tag.id)}
                                                                onCheckedChange={(checked) => {
                                                                    if (checked) {
                                                                        setEditedTags([...editedTags, tag.id]);
                                                                    } else {
                                                                        setEditedTags(editedTags.filter(id => id !== tag.id));
                                                                    }
                                                                }}
                                                                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer"
                                                            />
                                                            <Label
                                                                htmlFor={`tag-${tag.id}`}
                                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                            >
                                                                {tag.name}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <SheetFooter>
                                            <Button
                                                className="cursor-pointer"
                                                variant="lightBlue"
                                                onClick={() => {
                                                    updateScan({
                                                        variables: {
                                                            data: {
                                                                id: scan.id,
                                                                title: editedTitle,
                                                                frequencyId: editedFrequency ? parseInt(editedFrequency) : null,
                                                                tagIds: editedTags,
                                                            },
                                                        },
                                                    });
                                                }}
                                                disabled={!editedTitle.trim()}
                                            >
                                                Save changes
                                            </Button>
                                            <SheetClose asChild>
                                                <Button
                                                    variant="outline"
                                                    className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 cursor-pointer"
                                                >
                                                    Close
                                                </Button>
                                            </SheetClose>
                                        </SheetFooter>
                                    </SheetContent>
                                </Sheet>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="outline" className="gap-2 border-gray-200 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50">
                                            <Trash2 className="h-4 w-4" /> Delete
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your
                                                scan and remove your data from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="border border-gray-200 text-gray-600 bg-white hover:bg-gray-100 hover:text-gray-800 transition-colors cursor-pointer px-4 py-2 rounded-md">Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => deleteScan()}
                                                disabled={deleteLoading} className="bg-red-600 text-white hover:bg-red-700 cursor-pointer">
                                                {deleteLoading ? "Deleting..." : "Continue"}</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>

                        {/*** HC-51 ***/}
                        {/*** HC-50 ***/}
                        <ScanDetailsCards scan={scan} />
                        {/*** HC-53 ***/}
                        <h2 className=" mb-6 text-2xl text-black text-left font-bold">Scan History</h2>
                        {historyLoading ? <p>Loading...</p> :
                            <ScanDetailsChart history={scanHistory} />}

                        {/*** HC-52 ***/}
                        {/* Tabs for additional details */}
                        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
                            <Tabs defaultValue="history">
                                <TabsList className="mb-4 cursor-pointer">
                                    <TabsTrigger className="cursor-pointer" value="history">Detailed History</TabsTrigger>
                                    <TabsTrigger className="cursor-pointer" value="notifications">Notifications</TabsTrigger>
                                </TabsList>

                                <TabsContent value="history">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-medium">Recent Checks</h3>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="gap-1">
                                                    <BarChart4 className="h-3.5 w-3.5" />
                                                    {scanHistory.length === 10 ? 'Last 10 checks' : `${scanHistory.length} ${scanHistory.length === 1 ? 'check' : 'checks'}`}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="overflow-x-auto">
                                            <table className="w-full border-collapse">
                                                <thead>
                                                    <tr className="border-b border-gray-200">
                                                        <th className="py-2 px-4 text-left font-medium text-gray-500">Time</th>
                                                        <th className="py-2 px-4 text-center font-medium text-gray-500">Status</th>
                                                        <th className="py-2 px-4 text-center font-medium text-gray-500">Status Code</th>
                                                        <th className="py-2 px-4 text-center font-medium text-gray-500">Response Time</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {scanHistory.map((entry) => {
                                                        const StatusIcon = getStatusIcon(entry.isOnline);
                                                        const statusColor = getStatusColor(entry.isOnline);

                                                        return (
                                                            <tr key={entry.id} className="border-b border-gray-200 hover:bg-gray-50">
                                                                <td className="py-3 px-4 text-sm">
                                                                    <div className="flex items-center gap-2">
                                                                        <Clock className="h-4 w-4 text-gray-400" />
                                                                        {formatDate(entry.createdAt)}
                                                                    </div>
                                                                </td>
                                                                <td className="py-3 px-4 text-center">
                                                                    <div className="flex items-center justify-center gap-2">
                                                                        <StatusIcon className={`h-4 w-4 ${statusColor}`} />
                                                                        <span className={`text-sm font-medium ${statusColor}`}>
                                                                            {entry.isOnline ? 'Online' : 'Offline'}
                                                                        </span>
                                                                    </div>
                                                                </td>
                                                                <td className="py-3 px-4 text-center">
                                                                    <div className="flex items-center justify-center gap-2">
                                                                        <span className="text-sm font-medium">{entry.statusCode}</span>
                                                                        <span className="text-xs text-gray-500">{entry.statusMessage}</span>
                                                                    </div>
                                                                </td>
                                                                <td className="py-3 px-4 text-center">
                                                                    <div className="flex items-center justify-center gap-1">
                                                                        <Zap className="h-3 w-3 text-blue-500" />
                                                                        <span className="text-sm font-medium">{entry.responseTime}ms</span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                    {scanHistory.length === 0 && (
                                                        <tr>
                                                            <td colSpan={4} className="py-8 text-center text-gray-500">
                                                                No scan history available
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="notifications">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium mb-4">Notifications</h3>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-gray-600 text-center">
                                                Notifications are not yet implemented.
                                            </p>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default ScanDetailsPage