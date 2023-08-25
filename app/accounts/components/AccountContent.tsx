"use client";

import { useSession } from "@supabase/auth-helpers-react";
import Image from "next/image";

const AccountContent = () => {
    const session = useSession();
    const image = session?.user?.user_metadata?.avatar_url;
    const name = session?.user?.user_metadata?.full_name;
    const email = session?.user?.user_metadata?.email;
    const elseImage = '/images/avatar.png';

    return (
        <div className="relative grid grid-cols-2 items-center justify-center rounded-md 
         overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3">
            <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                <Image className="object-fill rounded-full" fill alt="Image" src={image || '/images/avatar.png'} />
            </div>
            <div>
                <blockquote className="text-xl italic font-semibold text-center text-gray-900 dark:text-white">
                    <p>
                        User : 
                    </p>
                    <p className="text-gray-300 dark:text-gray-400">
                        {` ${name}`}
                    </p>
                </blockquote>
                <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
                <blockquote className="text-xl italic font-semibold text-center text-gray-900 dark:text-white">
                    <p>
                        Email : 
                    </p>
                    <p className="text-gray-300 dark:text-gray-400">
                        {` ${email}`}
                    </p>
                </blockquote>
            </div>
        </div>
    )
}

export default AccountContent;