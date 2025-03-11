import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_NEW_SCAN } from "../graphql/mutations";
import { GET_ALL_TAGS } from "../graphql/queries";
import { useState } from "react";

// Schéma de validation
const scanFormSchema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    url: z.string().url("Veuillez entrer une URL valide"),
    frequency: z.string().min(1, "La fréquence est requise"),
    unit: z.enum(["minutes", "hours", "days"]),
    tagIds: z.array(z.number()).optional()
});

type ScanFormValues = z.infer<typeof scanFormSchema>;

export default function ScanForm() {
    const [isLoading, setIsLoading] = useState(false);

    // Mutation pour créer un scan
    const [createScan] = useMutation(CREATE_NEW_SCAN, {
        refetchQueries: ['GetAllScans'],
        onCompleted: () => {
            form.reset();
            setIsLoading(false);
        },
        onError: (error) => {
            console.log(error)
            setIsLoading(false);
        }
    });

    // Récupérer les tags disponibles
    const { data: tagsData } = useQuery(GET_ALL_TAGS);

    const form = useForm<ScanFormValues>({
        resolver: zodResolver(scanFormSchema),
        defaultValues: {
            title: "",
            url: "",
            frequency: "60",
            unit: "minutes",
            tagIds: []
        }
    });

    function onSubmit(data: ScanFormValues) {
        setIsLoading(true);

        // Exécuter la mutation
        createScan({
            variables: {
                data: {
                    title: data.title,
                    url: data.url,
                    tagIds: data.tagIds
                }
            }
        });
    }

    return (
        <div className="max-w-md mx-auto bg-[#0a2540] rounded-xl shadow-lg border border-[#0c2d4d] p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Start Scanning</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-300">Title</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="My Website Monitor" className="mt-1 bg-[#0c2d4d] border-[#0e3359] text-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-300">URL to scan</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="https://example.com" className="mt-1 bg-[#0c2d4d] border-[#0e3359] text-white" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="frequency"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-300">Frequency</FormLabel>
                                <div className="flex gap-2 mt-1">
                                    <FormControl>
                                        <Input {...field} placeholder="60" className="w-20 bg-[#0c2d4d] border-[#0e3359] text-white" />
                                    </FormControl>
                                    <FormField
                                        control={form.control}
                                        name="unit"
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-full bg-[#0c2d4d] border-[#0e3359] text-white">
                                                    <SelectValue placeholder="Select unit" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="minutes">Minutes</SelectItem>
                                                    <SelectItem value="hours">Hours</SelectItem>
                                                    <SelectItem value="days">Days</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="tagIds"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-gray-300">Tag</FormLabel>
                                <Select
                                    onValueChange={(value) => field.onChange([parseInt(value)])}
                                    defaultValue={field.value?.length ? field.value[0].toString() : undefined}
                                >
                                    <SelectTrigger className="w-full mt-1 bg-[#0c2d4d] border-[#0e3359] text-white">
                                        <SelectValue placeholder="Select a tag" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tagsData?.getAllTags?.map((tag: any) => (
                                            <SelectItem key={tag.id} value={tag.id.toString()}>
                                                {tag.name}
                                            </SelectItem>
                                        )) || (
                                                <>
                                                    <SelectItem value="production">Production</SelectItem>
                                                    <SelectItem value="staging">Staging</SelectItem>
                                                    <SelectItem value="development">Development</SelectItem>
                                                    <SelectItem value="api">API</SelectItem>
                                                    <SelectItem value="website">Website</SelectItem>
                                                </>
                                            )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        variant="lightBlue"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating..." : "Start Scanning"}
                    </Button>
                </form>
            </Form>
        </div>
    );
}