
// import { Bell, Settings, BarChart4, CheckCircle, AlertTriangle } from "lucide-react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useGetUserDashboardDataQuery } from "@/generated/graphql-types";

// const DashboardPage = () => {

//     const { data, loading, error } = useGetUserDashboardDataQuery()

//     if (loading) return <p>Loading...</p>
//     if (error) return <p>Error</p>

//     const user = data?.getUserDashboardData.user?.username
//     console.log("user", user)


//     return (
//         <div className="container p-8">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
//                 <div>
//                     <h1 className="text-3xl font-bold text-gray-800">Welcome, {user} </h1>
//                     <p className="text-gray-600">Here's an overview of your URL monitoring</p>
//                 </div>

//                 <div className="flex gap-2">
//                     <Button variant="outline" className="gap-2">
//                         <Bell className="h-4 w-4" />
//                         <span className="hidden md:inline">Notifications</span>
//                     </Button>
//                     <Button variant="outline" className="gap-2">
//                         <Settings className="h-4 w-4" />
//                         <span className="hidden md:inline">Settings</span>
//                     </Button>
//                     {/* <Button variant="outline" className="gap-2">
//                         <User className="h-4 w-4" />
//                         <span className="hidden md:inline">Profile</span>
//                     </Button> */}
//                 </div>
//             </div>

//             {/* Stats cards */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//                 <Card>
//                     <CardHeader className="pb-2">
//                         <CardTitle className="text-sm font-medium text-gray-500">Total Scans</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="flex items-center gap-2">
//                             <BarChart4 className="h-5 w-5 text-blue-500" />
//                             <div className="text-2xl font-bold">{ }</div>
//                         </div>
//                         <div className="mt-2 text-sm text-gray-500">
//                             {/* <Badge variant="outline" className="bg-blue-50">
//                                 Free Plan 
//                             </Badge> */}
//                         </div>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader className="pb-2">
//                         <CardTitle className="text-sm font-medium text-gray-500">Active Scans</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="flex items-center gap-2">
//                             <CheckCircle className="h-5 w-5 text-green-500" />
//                             <div className="text-2xl font-bold">{ }</div>
//                         </div>
//                         <div className="mt-2 text-sm text-gray-500">
//                             <span className="text-green-600">
//                                 {/* {Math.round((activeScans / totalScans) * 100)}% healthy */}
//                             </span>
//                         </div>
//                     </CardContent>
//                 </Card>

//                 <Card>
//                     <CardHeader className="pb-2">
//                         <CardTitle className="text-sm font-medium text-gray-500">Issues</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                         <div className="flex items-center gap-2">
//                             <AlertTriangle className="h-5 w-5 text-yellow-500" />
//                             <div className="text-2xl font-bold">{ }</div>
//                         </div>
//                         {/* <div className="mt-2 text-sm text-gray-500">
//                             <span className="text-yellow-600">Needs attention</span>
//                         </div> */}
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// };

// export default DashboardPage;
