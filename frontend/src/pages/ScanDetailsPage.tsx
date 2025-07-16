import ScanDetailsCards from "@/components/scan-details/ScanDetailsCards"
import { ScanDetailsChart } from "@/components/scan-details/ScanDetailsChart"
import { Button } from "@/components/ui/button"
import { useGetScanByIdQuery } from "@/generated/graphql-types"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router"



const ScanDetailsPage = () => {
    const { id } = useParams();
    const scanId = id ? parseInt(id) : 0;

    const [isFavorite, setIsFavorite] = useState(false);
    const [isPause, setIsPause] = useState(false);

    const { data, loading, error } = useGetScanByIdQuery({ variables: { getScanByIdId: Number(id) } })
    const { data: historyData, loading: historyLoading } = useGetScanHistoryQuery({
        variables: { scanId: Number(id) },
    });

    const { data: frequencyData } = useGetAllFrequencesQuery()
    const { data: tagsData } = useGetAllTagsQuery()

    const [editedTitle, setEditedTitle] = useState("");
    const [editedFrequency, setEditedFrequency] = useState("");
    const [editedTags, setEditedTags] = useState<string>("")

    console.log("scanDetails ==>", data?.getScanById)

    
    if (loading) return <p>Loading...</p>
    if (error) return <p>There is an error: {error.message}</p>

    return (
        <>
            <div className="flex min-h-screen flex-col">
                <main className="flex-1 bg-gray-50">
                    <div className=" py-8 px-6">
                        {/* back to dashboard */}
                        <div className="flex items-center mb-6">
                            <Button variant="ghost" size="sm" asChild>
                                <Link to="/dashboard">
                                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Scans
                                </Link>
                            </Button>
                        </div>

                        {/* Scan details header */}
                        <div className="flex space-around bg-white rounded-xl p-6 mb-6">
                            <div className="text-left flex-1">
                                <h1 className="text-3xl font-bold text-gray-800">{scan.title}</h1>
                                <p className="text-gray-600">{scan.url}</p>
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
                                                />
                                            </div>

                                            <div className="grid gap-3">
                                                <Label htmlFor="scan-frequency">Check Frequency</Label>
                                                <Select value={editedFrequency} onValueChange={(value: SetStateAction<string>) => setEditedFrequency(value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select frequency" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Frequency Options</SelectLabel>
                                                            {frequencyData?.getAllFrequences?.map((frequency) => (
                                                                <SelectItem key={frequency.id} value={frequency.id.toString()}>
                                                                    {frequency.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid gap-3">
                                                <Label htmlFor="scan-tags">Tag</Label>
                                                <Select value={editedTags} onValueChange={(value: SetStateAction<string>) => setEditedTags(value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select tags" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Available Tags</SelectLabel>
                                                            {tagsData?.getAllTags?.map((tag) => (
                                                                <SelectItem key={tag.id} value={tag.id.toString()}>
                                                                    {tag.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <SheetFooter>
                                            <Button
                                                onClick={() => {
                                                    updateScan({
                                                        variables: {
                                                            data: {
                                                                id: scan.id,
                                                                title: editedTitle,
                                                                frequencyId: editedFrequency ? parseInt(editedFrequency) : null,
                                                            },
                                                        },
                                                    });
                                                }}
                                                disabled={!editedTitle.trim()}
                                            >
                                                Save changes
                                            </Button>
                                            <SheetClose asChild>
                                                <Button variant="outline">Close</Button>
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
                        <ScanDetailsCards />
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
                                    <TabsTrigger className="cursor-pointer" value="settings">Settings</TabsTrigger>
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

                                <TabsContent value="settings">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-medium mb-4">Settings</h3>
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-gray-600 text-center">
                                                Notification settings are not yet implemented.
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