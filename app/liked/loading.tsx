"use client";

import { ScaleLoader } from "react-spinners";
import Box from "@/components/Box";

const Loading = () => {
    return (
        <Box className="h-full flex items-center justify-center gap-x-3">
            <ScaleLoader color="#00ff82" height={60} loading margin={4} radius={3} width={5} />
            <ScaleLoader color="#00ff82" height={60} loading margin={4} radius={3} width={5} />
        </Box>
    );
}

export default Loading;