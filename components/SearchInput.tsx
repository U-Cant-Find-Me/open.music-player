'use client';

import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import Input from "./Input";
// import { toast } from "react-hot-toast";

const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const debounceValue = useDebounce<string>(value, 1000);

    useEffect(() => {
        const query = {
            title: debounceValue,
        };
        const url = qs.stringifyUrl({
            url: '/search',
            query: query
        });
        router.push(url);
    }, [debounceValue, router]);
    
    // onChange = (e: any) => {
    //     setValue(e.target.value);
    //     const toasterID = toast.loading("Searching...");
    //     setTimeout(() => {
    //         toast.dismiss(toasterID);
    //     }, 2500);
    // }

    // What do you want to listen to..

    return (
        <Input placeholder="Searching For Melodies..." value={value} onChange={(e) => setValue(e.target.value)} />
    )
}

export default SearchInput;