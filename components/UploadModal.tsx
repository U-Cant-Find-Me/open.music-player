'use client';

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from 'react';
import Input from "./Input";
import Button from "./Button";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const router = useRouter();
    const supabaseClient = useSupabaseClient();
    const {
        register, handleSubmit, reset
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    })
    const OnChange = (open: boolean) => {
        if (!open) {
            if (!user) {
                return uploadModal.onClose();
            }
            var toastId = toast.loading('Just A Moment. Saving Changes.', {
                position: 'bottom-right',
            });
            setTimeout(() => {
                toast.dismiss(toastId);
                reset();
                return uploadModal.onClose();
            }, 1500);
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];
            if (!imageFile || !songFile || !user) {
                toast.error('Missing Fields');
                return;
            }

            const uniqueID = uniqid();
            // Upload Songs
            const {
                data: songData,
                error: songError,
            } = await supabaseClient.storage.from('songs').upload(`song-${values.title}-${uniqueID}`, songFile, {
                cacheControl: '3600',
                upsert: false
            });
            if (songError) {
                setIsLoading(false);
                return toast.error('Failed Song Upload');
            }

            // Upload Image
            const {
                data: imageData,
                error: imageError,
            } = await supabaseClient.storage.from('images').upload(`image-${values.title}-${uniqueID}`, imageFile, {
                cacheControl: '3600',
                upsert: false
            });
            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed Image Upload');
            }

            const {
                error: supabaseError
            } = await supabaseClient.from('songs').insert({
                user_id: user.id,
                title: values.title,
                author: values.author,
                image_path: imageData.path,
                song_path: songData.path
            });

            if (supabaseError) {
                setIsLoading(false);
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            reset();
            uploadModal.onClose();
            var toastId = toast.loading('Just A Moment. Saving Changes.', {
                position: 'bottom-right',
            });
            setTimeout(() => {
                toast.dismiss(toastId);
                return toast.success('Song Uploaded!');
            }, 4500);

        } catch (error) {
            toast.error('Something Went Wrong');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            {
                !user ? (
                    <Modal title="SignIn First" description="Please SignIn to Upload Songs" isOpen={uploadModal.isOpen} OnChange={OnChange}>
                    </Modal>
                ) :
                    <Modal title="Add A Song" description="Upload an MP3 Flie" isOpen={uploadModal.isOpen} OnChange={OnChange}>
                        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <Input id="title" disabled={isLoading} {...register('title', { required: true })} placeholder="Song Title" />
                            <Input id="author" disabled={isLoading} {...register('author', { required: true })} placeholder="Song Author" />
                            <div>
                                <div className="pb-1">
                                    Select a Song File
                                </div>
                                <Input id="song" type="file" disabled={isLoading} accept=".mp3" {...register('song', { required: true })} />
                            </div>
                            <div>
                                <div className="pb-1">
                                    Select an image
                                </div>
                                <Input id="image" type="file" disabled={isLoading} accept="image/*" {...register('image', { required: true })} />
                            </div>
                            <Button disabled={isLoading} type="submit" >
                                {
                                    isLoading ? 'Hold On, Uploading..' : 'Create'

                                }
                            </Button>
                        </form>
                    </Modal>
            }
        </div>
    )
}

export default UploadModal;