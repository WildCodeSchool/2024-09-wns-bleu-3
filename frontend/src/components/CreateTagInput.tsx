import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { X, Plus, Palette } from 'lucide-react';
import { useCreateNewTagMutation, GetAllTagsDocument, GetAllTagsQuery } from '../generated/graphql-types';
import { toast } from 'sonner';

// Validation schema for tag creation
const createTagSchema = z.object({
    name: z.string()
        .min(1, 'Tag name is required')
        .max(50, 'Tag name must be 50 characters or less')
        .trim(),
    color: z.string()
        .regex(/^#[0-9A-F]{6}$/i, 'Color must be a valid hex color')
});

type CreateTagFormData = z.infer<typeof createTagSchema>;

interface CreateTagInputProps {
    onTagCreated: (tag: { id: number; name: string; color: string }) => void;
    onCancel: () => void;
}

// Predefined color options for quick selection
const PRESET_COLORS = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
    '#00FFFF', '#FF00FF', '#FFA500', '#800080',
    '#008000', '#000080', '#800000', '#808000'
];

const CreateTagInput: React.FC<CreateTagInputProps> = ({ onTagCreated, onCancel }) => {
    const [selectedColor, setSelectedColor] = useState('#FF0000');
    const [showColorPicker, setShowColorPicker] = useState(false);

    const [createNewTagMutation, { loading }] = useCreateNewTagMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm<CreateTagFormData>({
        resolver: zodResolver(createTagSchema),
        defaultValues: {
            name: '',
            color: selectedColor
        }
    });

    // Watch the color field to keep it in sync with selectedColor
    // const watchedColor = watch('color'); // Currently unused but available for future use

    // Handle color selection from preset colors
    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        setValue('color', color);
        setShowColorPicker(false);
    };

    // Handle custom color input
    const handleCustomColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const color = event.target.value;
        setSelectedColor(color);
        setValue('color', color);
    };

    // Handle form submission
    const onSubmit = async (data: CreateTagFormData) => {
        try {
            const result = await createNewTagMutation({
                variables: {
                    data: {
                        name: data.name.trim(),
                        color: data.color
                    }
                },
                // Update Apollo cache to include the new tag immediately
                update: (cache, { data: mutationData }) => {
                    if (mutationData?.createNewTag) {
                        // Read the current tags from cache
                        try {
                            const existingTags = cache.readQuery<GetAllTagsQuery>({
                                query: GetAllTagsDocument
                            });

                            if (existingTags?.getAllTags) {
                                // Write the updated tags list back to cache
                                cache.writeQuery({
                                    query: GetAllTagsDocument,
                                    data: {
                                        getAllTags: [mutationData.createNewTag, ...existingTags.getAllTags]
                                    }
                                });
                            }
                        } catch (cacheError) {
                            console.log('Cache update failed, will rely on refetch:', cacheError);
                        }
                    }
                }
            });

            if (result.data?.createNewTag) {
                const newTag = result.data.createNewTag;

                // Reset form state
                reset();
                setSelectedColor('#FF0000');

                // Call parent callback to handle tag selection and UI updates
                onTagCreated({
                    id: newTag.id,
                    name: newTag.name,
                    color: newTag.color
                });

                // Don't show toast here - let the parent component handle it
                // to avoid duplicate success messages
            }
        } catch (error: unknown) {
            console.error('Error creating tag:', error);

            // Handle specific error cases
            const errorMessage = error instanceof Error ? error.message : '';
            if (errorMessage.includes('duplicate') || errorMessage.includes('already exists') || errorMessage.includes('déjà')) {
                toast.error('A tag with this name already exists');
            } else {
                toast.error('Failed to create tag. Please try again.');
            }
        }
    };

    return (
        <div className="border rounded-lg p-4 bg-gray-50 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Create New Tag
                </h3>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={onCancel}
                    className="h-6 w-6 p-0"
                    aria-label="Cancel tag creation"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Tag Name Input */}
                <div className="space-y-2">
                    <Label htmlFor="tag-name" className="text-sm font-medium">
                        Tag Name
                    </Label>
                    <Input
                        id="tag-name"
                        type="text"
                        placeholder="Enter tag name..."
                        {...register('name')}
                        className={errors.name ? 'border-red-500' : ''}
                        aria-describedby={errors.name ? 'tag-name-error' : undefined}
                        autoFocus
                    />
                    {errors.name && (
                        <p id="tag-name-error" className="text-sm text-red-600" role="alert">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Color Selection */}
                <div className="space-y-2">
                    <Label className="text-sm font-medium">Color</Label>

                    {/* Selected Color Display */}
                    <div className="flex items-center gap-2">
                        <div
                            className="w-8 h-8 rounded border-2 border-gray-300 cursor-pointer"
                            style={{ backgroundColor: selectedColor }}
                            onClick={() => setShowColorPicker(!showColorPicker)}
                            aria-label={`Selected color: ${selectedColor}`}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowColorPicker(!showColorPicker)}
                            className="flex items-center gap-1"
                        >
                            <Palette className="h-4 w-4" />
                            Choose Color
                        </Button>
                    </div>

                    {/* Color Picker */}
                    {showColorPicker && (
                        <div className="space-y-3 p-3 border rounded bg-white">
                            {/* Preset Colors */}
                            <div>
                                <p className="text-xs font-medium mb-2">Preset Colors</p>
                                <div className="grid grid-cols-6 gap-2">
                                    {PRESET_COLORS.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            className={`w-8 h-8 rounded border-2 cursor-pointer hover:scale-110 transition-transform ${selectedColor === color ? 'border-gray-800' : 'border-gray-300'
                                                }`}
                                            style={{ backgroundColor: color }}
                                            onClick={() => handleColorSelect(color)}
                                            aria-label={`Select color ${color}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Custom Color Input */}
                            <div>
                                <p className="text-xs font-medium mb-2">Custom Color</p>
                                <Input
                                    type="color"
                                    value={selectedColor}
                                    onChange={handleCustomColorChange}
                                    className="w-16 h-8 p-1 cursor-pointer"
                                    aria-label="Custom color picker"
                                />
                            </div>
                        </div>
                    )}

                    {/* Hidden input for form validation */}
                    <input type="hidden" {...register('color')} />
                    {errors.color && (
                        <p className="text-sm text-red-600" role="alert">
                            {errors.color.message}
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        size="sm"
                        variant="orange"
                        disabled={loading}
                        className="flex-1"
                    >
                        {loading ? 'Creating...' : 'Create Tag'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateTagInput; 