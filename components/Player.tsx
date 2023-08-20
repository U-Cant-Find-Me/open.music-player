'use client';

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {
    const player = usePlayer();
    const {song} = useGetSongById(player.activeId);
    const songUrl = useLoadSongUrl(song!);

    if(!song || !songUrl || !player.activeId) {
        return null;
    }

    return (
        <div className="fixed bottom-0 bg-black w-full py-2 h-[80px] px-4">
            {/* key element destroys the old component completely so if we use it then only we can jump to the next song else it may b overlap. */}
            <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
        </div>
    )
}

export default Player;