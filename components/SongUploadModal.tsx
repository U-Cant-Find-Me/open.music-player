"use client";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { HiUpload } from "react-icons/hi";

interface SongUploadModalProps {
    name: string;
    image: string;
}

const SongUploadModal: React.FC<SongUploadModalProps> = ({
    name, image
}) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user } = useUser();

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
        <button onClick={onClick} className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
            <div className="relative min-h-[64px] min-w-[64px]">
                <Image className="object-cover" fill src={image} alt="Image" />
            </div>
            <p className="font-medium truncate py-5">
                {name}
            </p>
            <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
                {/* <FaPlay className="text-black" /> */}
                <HiUpload className="text-black" size={25}/>
                {/* 
                <FaPlay onClick={(id: string) => onPlay(id)} className="text-black" /> 
            */}
            </div>
        </button>
    )
}

export default SongUploadModal;