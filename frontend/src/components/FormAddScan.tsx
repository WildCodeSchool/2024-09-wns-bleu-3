import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateNewScanMutation } from "@/generated/graphql-types";
import { useGetAllTagsQuery } from "@/generated/graphql-types";
import { useState } from "react";
import { useGetAllFrequencesQuery } from "@/generated/graphql-types";
import { scanFormSchema, Frequency, Tag } from "@/schema/FormAddScanSchema";



type ScanFormValues = z.infer<typeof scanFormSchema>;

export default function ScanForm() {
    const [isLoading, setIsLoading] = useState(false);

    // Mutation pour créer un scan
    const [createScan] = useCreateNewScanMutation();

    // Récupérer les tags disponibles
    const { data: tagsData } = useGetAllTagsQuery();
    // Récupérer les fréquences disponibles
    const { data: frequenciesData, error: errorFreqData } = useGetAllFrequencesQuery();
    console.log('log33', frequenciesData)

    console.log('errorFrequency', errorFreqData)

    const form = useForm<ScanFormValues>({
        resolver: zodResolver(scanFormSchema),
        defaultValues: {
            title: "",
            url: "",
            frequencyId: "",
            unit: "minutes",
            tagIds: []
        }
    });

    function onSubmit(data: ScanFormValues) {
        setIsLoading(true);
        console.log("Données avant parsage:", data);
        // Créer l'objet de variables pour la mutation avec conversion explicite
        const mutationVariables = {
            data: {
                title: data.title,
                url: data.url,
                tagIds: data.tagIds,
                frequencyId: parseInt(data.frequencyId)
            }
        };
        // Logger les données après parsage pour vérifier
        console.log("Données après parsage:", mutationVariables);
        // Exécuter la mutation
        createScan({
            variables: mutationVariables,
            onCompleted: (result) => {
                console.log(result);
                setIsLoading(false);
                form.reset();
            },
            onError: (error) => {
                console.log(error);
                setIsLoading(false);
            }
        });
    }

    // if (frequenciesData && tagsData) {
    console.log("freqdata", frequenciesData)
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
                        name="frequencyId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="frequency" className="text-sm font-medium text-gray-300">Frequency</FormLabel>
                                <Select
                                    name="frequency"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="w-full mt-1 bg-[#0c2d4d] border-[#0e3359] text-white">
                                        <SelectValue placeholder="Select a frequency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {frequenciesData?.getAllFrequences?.map((frequency: Frequency) => (
                                            <SelectItem key={frequency.id} value={frequency.id.toString()} data-testid="freqSelect">
                                                {frequency.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
                                    name="tag"
                                    onValueChange={(value) => field.onChange([parseInt(value)])}
                                    defaultValue={field.value?.length ? field.value[0].toString() : undefined}
                                >
                                    <SelectTrigger className="w-full mt-1 bg-[#0c2d4d] border-[#0e3359] text-white">
                                        <SelectValue placeholder="Select a tag" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tagsData?.getAllTags?.map((tag: Tag) => (
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


