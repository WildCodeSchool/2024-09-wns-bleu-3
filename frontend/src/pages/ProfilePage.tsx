"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Edit2, Trash2, X, Save } from "lucide-react"
import { useEffect, useState } from "react"
import Avatar from "boring-avatars"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDeleteUserMutation, useGetUserInfoQuery, useUpdateUserMutation } from "@/generated/graphql-types"
import { GET_USER_INFO } from "@/graphql/queries"
import { toast } from "sonner"
import { useNavigate } from "react-router"

export default function ProfilePage() {
    const navigate = useNavigate()

    const { data, error } = useGetUserInfoQuery()
    const email = data?.getUserInfo?.email
    const username = data?.getUserInfo?.username
    const userId = data?.getUserInfo?.id

    // States for editing username
    const [isEditingUsername, setIsEditingUsername] = useState(false)
    const [newUsername, setNewUsername] = useState(username || "")

    const [deleteUser] = useDeleteUserMutation({
        refetchQueries: [{ query: GET_USER_INFO }],
        onCompleted: () => {
            toast.success("Your account has been successfully deleted!")
            setTimeout(() => navigate("/"), 1000)
        },
        onError: (error) => {
            toast.error(`Error deleting account: ${error.message}`)
        },
    })

    const [updateUser] = useUpdateUserMutation({
        refetchQueries: [{ query: GET_USER_INFO }],
        onCompleted: () => {
            toast.success("Your username has been successfully updated!")
            setIsEditingUsername(false)
        },
        onError: (error) => {
            toast.error(`Error updating username: ${error.message}`)
        },
    })

    const saveUsername = () => {
        if (!newUsername.trim() || newUsername === username) {
            toast.error("Please enter a new username")
            return
        }

        if (userId) {
            updateUser({
                variables: {
                    updateUserId: userId,
                    data: { username: newUsername },
                },
            })
        } else {
            toast.error("User ID is missing")
        }
    }


    // Added explicit type annotations
    const [selectedAvatar, setSelectedAvatar] = useState<number>(0);
    const [tempSelectedAvatar, setTempSelectedAvatar] = useState<number>(0);
    const [avatarChanged, setAvatarChanged] = useState(false);

    useEffect(() => {
        const savedAvatar = localStorage.getItem("selectedAvatar");
        if (savedAvatar !== null) {
            const parsedAvatar = parseInt(savedAvatar, 10);
            setSelectedAvatar(parsedAvatar);
            setTempSelectedAvatar(parsedAvatar);
        }
    }, []);

    const avatars = [
        "Mary Baker",
        "Zora Neale",
        "Abigail Adams",
        "Sarah Winnemucca",
        "Margaret Brent",
        "Carrie Chapman"
    ];

    const handleAvatarSelect = (index: number) => {
        setTempSelectedAvatar(index);
        setAvatarChanged(true);
    };

    const saveAvatar = () => {
        localStorage.setItem("selectedAvatar", tempSelectedAvatar.toString());
        setSelectedAvatar(tempSelectedAvatar);
        setAvatarChanged(false);
        toast.success("Avatar updated successfully!");
    };

    const bluePalette = ["#0087ff", "#66b7ff", "#99cfff", "#cce7ff", "#005199"]


    const cancelEditing = () => {
        setNewUsername(username || "")
        setIsEditingUsername(false)
    }

    if (error) {
        return (
            <div className="bg-gray-100 flex justify-center items-center p-6">
                <div className="bg-white shadow rounded-lg p-6">
                    <p className="text-red-500">Error loading profile: {error.message}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-dark-blue-950 text-left flex flex-col items-center p-6">
            <div className="w-full max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Profile Information Card */}
                        <div className="border border-white/10 bg-main-400/5 backdrop-blur-xl rounded-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-white font-bold text-xl">PROFILE INFORMATION</h2>
                                <div className="bg-blue-500/20 border border-blue-400/30 text-blue-400 px-3 py-1 rounded text-xs font-medium backdrop-blur-sm">
                                    ACCOUNT SETTINGS
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                {/* Avatar Section */}
                                <div className="flex-shrink-0">
                                    <div className="p-2 border border-white/10 rounded-lg bg-white/5">
                                        <Avatar name={avatars[selectedAvatar]} size={80} variant="beam" aria-label="avatar" colors={bluePalette} />
                                    </div>
                                </div>

                                {/* Username and Email Section */}
                                <div className="flex-1 space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Username</label>
                                        {isEditingUsername ? (
                                            <div className="flex gap-2 items-center">
                                                <Input
                                                    value={newUsername}
                                                    onChange={(e) => setNewUsername(e.target.value)}
                                                    className="w-[250px] bg-dark-blue-900/50 border-white/20 text-white placeholder:text-slate-400 focus:border-main-400 focus:ring-main-400/20"
                                                />
                                                <Button
                                                    onClick={saveUsername}
                                                    className="gap-1 cursor-pointer bg-main-400 hover:bg-main-500 text-white border-0"
                                                    aria-label="save username"
                                                >
                                                    <Check className="h-4 w-4" aria-hidden="true" /> Save
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={cancelEditing}
                                                    className="gap-1 cursor-pointer border-white/20 text-slate-300 hover:bg-white/5"
                                                    aria-label="cancel"
                                                >
                                                    <X className="h-4 w-4" aria-hidden="true" /> Cancel
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <div className="text-lg text-white font-medium">{username || "User"}</div>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => setIsEditingUsername(true)}
                                                    className="h-8 w-8 p-0 cursor-pointer text-slate-400 hover:text-white hover:bg-white/10"
                                                    aria-label="Edit Username"
                                                >
                                                    <Edit2 className="h-4 w-4" aria-label="pen icon" />
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Email</label>
                                        <div className="text-lg text-white">{email}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Avatar Customization Card */}
                        <div className="border border-white/10 bg-main-400/5 backdrop-blur-xl rounded-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-white font-bold text-lg">AVATAR STYLE</h3>
                                <div className="bg-main-500/20 border border-main-400/30 text-main-400 px-3 py-1 rounded text-xs font-medium backdrop-blur-sm">
                                    CUSTOMIZATION
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-3">
                                    {avatars.map((avatar, index) => (
                                        <button
                                            aria-label="select avatar"
                                            key={index}
                                            className={`relative p-3 rounded-lg cursor-pointer border transition-all duration-200 ${tempSelectedAvatar === index
                                                ? "bg-main-400/20 border-main-400/50 ring-2 ring-main-400/30"
                                                : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                                                }`}
                                            onClick={() => handleAvatarSelect(index)}
                                        >
                                            <Avatar size={40} variant="beam" name={avatar} colors={bluePalette} aria-label={`Avatar of ${avatar}`} />
                                        </button>
                                    ))}
                                </div>

                                {avatarChanged && (
                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            onClick={saveAvatar}
                                            className="gap-2 cursor-pointer bg-main-400 hover:bg-main-500 text-white border-0"
                                            aria-label="save avatar"
                                        >
                                            <Save className="h-4 w-4" aria-label="save" /> Apply Avatar
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setTempSelectedAvatar(selectedAvatar);
                                                setAvatarChanged(false);
                                            }}
                                            variant="outline"
                                            className="gap-2 cursor-pointer border-white/20 text-slate-300 hover:bg-white/5"
                                            aria-label="cancel avatar"
                                        >
                                            <X className="h-4 w-4" aria-label="cancel" /> Cancel
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Account Deletion Card */}
                        <div className="border border-red-500/30 bg-red-500/5 backdrop-blur-xl rounded-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-white font-bold text-lg">DANGER ZONE</h3>
                                <div className="bg-red-500/20 border border-red-400/30 text-red-400 px-3 py-1 rounded text-xs font-medium backdrop-blur-sm">
                                    PERMANENT ACTION
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-slate-300 text-sm">
                                    Once you delete your account, there is no going back. Please be certain.
                                </p>

                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="destructive"
                                            className="gap-2 text-white bg-red-600 hover:bg-red-700 cursor-pointer border-0"
                                            aria-label="delete account"
                                        >
                                            <Trash2 className="h-4 w-4" aria-label="delete" /> Delete Account
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-dark-blue-900 border-red-500/30">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle className="text-white">Delete Account</AlertDialogTitle>
                                            <AlertDialogDescription className="text-slate-300">
                                                This action cannot be undone. Your account and all associated data will be permanently deleted.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="border-white/20 text-slate-300 hover:bg-white/5 cursor-pointer">
                                                Cancel
                                            </AlertDialogCancel>
                                            <AlertDialogAction
                                                onClick={() => {
                                                    const userId = data?.getUserInfo?.id
                                                    if (userId !== undefined && userId !== null) {
                                                        deleteUser({ variables: { id: userId } })
                                                    } else {
                                                        toast.error("User ID is missing")
                                                    }
                                                }}
                                                className="bg-red-500 text-white hover:bg-red-600 cursor-pointer border-0"
                                            >
                                                Delete Account
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Billing Section */}
                        <div className="border border-white/10 bg-main-400/5 backdrop-blur-xl rounded-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-white font-bold text-lg">YOUR BILLS</h3>
                                <div className="bg-secondary-500/20 border border-secondary-400/30 text-secondary-400 px-3 py-1 rounded text-xs font-medium backdrop-blur-sm">
                                    BILLING
                                </div>
                            </div>

                            <div className="text-center py-12">
                                <div className="text-slate-400 mb-3">
                                    <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h4 className="text-white font-medium mb-2">Nothing here yet</h4>
                                <p className="text-slate-400 text-sm">
                                    Your billing history will appear here once you have transactions.
                                </p>
                            </div>
                        </div>

                        {/* Activity Section */}
                        <div className="border border-white/10 bg-main-400/5 backdrop-blur-xl rounded-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-white font-bold text-lg">RECENT ACTIVITY</h3>
                                <div className="bg-main-500/20 border border-main-400/30 text-main-400 px-3 py-1 rounded text-xs font-medium backdrop-blur-sm">
                                    ACTIVITY LOG
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                                    <div className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></div>
                                    <div className="flex-1">
                                        <p className="text-white text-sm">Profile updated</p>
                                        <p className="text-slate-400 text-xs">Just now</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                                    <div className="flex-1">
                                        <p className="text-white text-sm">Account created</p>
                                        <p className="text-slate-400 text-xs">2 days ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Preferences Section */}
                        <div className="border border-white/10 bg-main-400/5 backdrop-blur-xl rounded-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-white font-bold text-lg">PREFERENCES</h3>
                                <div className="bg-slate-500/20 border border-slate-400/30 text-slate-400 px-3 py-1 rounded text-xs font-medium backdrop-blur-sm">
                                    SETTINGS
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                                    <div>
                                        <label htmlFor="email-notifications" className="text-white text-sm font-medium cursor-pointer">
                                            Email notifications
                                        </label>
                                        <p id="email-notifications-desc" className="text-slate-400 text-xs">Receive alerts about scan results</p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <input
                                            id="email-notifications"
                                            type="checkbox"
                                            defaultChecked
                                            className="h-4 w-4 rounded border-slate-600 text-main-400 focus:ring-main-400 focus:ring-1 bg-slate-800/50 cursor-pointer"
                                            aria-describedby="email-notifications-desc"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                                    <div>
                                        <label htmlFor="weekly-reports" className="text-white text-sm font-medium cursor-pointer">
                                            Weekly reports
                                        </label>
                                        <p id="weekly-reports-desc" className="text-slate-400 text-xs">Get summary of your monitoring activity</p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <input
                                            id="weekly-reports"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-slate-600 text-main-400 focus:ring-main-400 focus:ring-1 bg-slate-800/50 cursor-pointer"
                                            aria-describedby="weekly-reports-desc"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}