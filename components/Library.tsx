'use client';

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

interface LibraryProps {
    songs: Song[];
}

const Library: React.FC<LibraryProps> = ({
    songs
}) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user } = useUser();

    const onPlay = useOnPlay(songs);

    const onClick = () => {
        if (!user) {
            toast.error('LogIn First')
            setTimeout(() => {
                return authModal.onOpen();
            }, 2500);
        }
        var toastId = toast.loading('Loading...', {
            position: 'bottom-right',
        });
        setTimeout(() => {
            toast.dismiss(toastId);
            return uploadModal.onOpen();
        }, 1000);
    };

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p className="text-neutral-400 font-medium text-md ">Your Library</p>
                </div>
                <AiOutlinePlus onClick={onClick} size={20} className="text-neutral-400 cursor-pointer hover:text-white transition" />
            </div>
            {
                songs &&
                <hr className="w-48 h-1 mx-auto mt-4 bg-gray-100 border-0 rounded dark:bg-gray-700" />
            }
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.map((item) => (
                    <MediaItem onClick={(id: string) => onPlay(id)} key={item.id} data={item} />
                ))}
            </div>
        </div>
    )
}

export default Library;