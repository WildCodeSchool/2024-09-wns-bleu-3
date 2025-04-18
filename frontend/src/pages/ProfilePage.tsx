"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
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
import { Card } from "@/components/ui/card"

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
        <div className="min-h-screen bg-gray-100 text-left flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 max-w-4xl">Profile Settings</h1>
            <Card className="w-full p-6">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-left">Profile Information</h2>
                        <div className="flex gap-4 items-center">
                            {/* Avatar Section */}
                            <div className="flex-shrink-0">
                                <Avatar name={avatars[selectedAvatar]} size={80} variant="beam" aria-label="avatar" colors={bluePalette} />
                            </div>

                            {/* Username and Email Section */}
                            <div className="flex-1">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium text-gray-700">Username</label>
                                    {isEditingUsername ? (
                                        <div className="flex gap-2 items-center">
                                            <Input
                                                value={newUsername}
                                                onChange={(e) => setNewUsername(e.target.value)}
                                                className="w-[250px]  border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none"
                                            />
                                            <Button variant="lightBlue" onClick={saveUsername} className="gap-1 cursor-pointer" aria-label="save username">
                                                <Check className="h-4 w-4" aria-hidden="true" /> Save
                                            </Button>
                                            <Button variant="outline" onClick={cancelEditing} className="gap-1 cursor-pointer border-gray-200 text-gray-500" aria-label="cancel">
                                                <X className="h-4 w-4" aria-hidden="true" /> Cancel
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <div className="text-lg">{username || "User"}</div>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => setIsEditingUsername(true)}
                                                className="h-8 w-8 p-0 cursor-pointer"
                                                aria-label="Edit Username"
                                            >
                                                <Edit2 className="h-4 w-4" aria-label="pen icon" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-2">
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    <div className="text-lg">{email}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />


                    <div>
                        <h3 className="text-lg text-left font-medium mb-3">Avatar Style</h3>
                        <div className="flex flex-col space-y-4">
                            <div className="flex flex-wrap gap-3 mb-4">
                                {avatars.map((avatar, index) => (
                                    <button
                                        aria-label="select avatar"
                                        key={index}
                                        className={`relative p-2 rounded-md cursor-pointer ${tempSelectedAvatar === index ? "bg-gray-100 ring-2 ring-blue-500" : "hover:bg-gray-50"
                                            } transition-colors`}
                                        onClick={() => handleAvatarSelect(index)}
                                    >
                                        <Avatar size={40} variant="beam" name={avatar} colors={bluePalette} aria-label={`Avatar of ${avatar}`} />
                                    </button>
                                ))}
                            </div>

                            {avatarChanged && (
                                <div className="flex gap-2">
                                    <Button
                                        onClick={saveAvatar}
                                        variant="lightBlue"
                                        className="gap-2 cursor-pointer"
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
                                        className="gap-2 cursor-pointer border-gray-200 text-gray-500"
                                        aria-label="cancel avatar"
                                    >
                                        <X className="h-4 w-4 " aria-label="cancel" /> Cancel
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    <Separator />

                    <div className="text-left">
                        <h3 className="text-lg font-medium mb-3">Account Deletion</h3>
                        <p className="text-gray-600 mb-4">
                            Once you delete your account, there is no going back. Please be certain.
                        </p>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="gap-2 text-white bg-red-600 cursor-pointer hover:opacity-60" aria-label="delete account">
                                    <Trash2 className="h-4 w-4" aria-label="delete" /> Delete Account
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Account</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. Your account and all associated data will be permanently deleted.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="border-gray-200 text-gray-500 cursor-pointer">Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => {
                                            const userId = data?.getUserInfo?.id
                                            if (userId !== undefined && userId !== null) {
                                                deleteUser({ variables: { id: userId } })
                                            } else {
                                                toast.error("User ID is missing")
                                            }
                                        }}
                                        className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                                    >
                                        Delete Account
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </Card>
        </div>
    )
}