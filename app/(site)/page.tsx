import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "./component/PageContent";
import SongUploadModal from "@/components/SongUploadModal";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">
            Welcome Back
          </h1>
          <div className="grid grid-cols-1 sm:flex sm:flex-row sm:items-end sm:space-y-0">
            <div className="sm:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <ListItem songs={songs} image="/images/liked.png" name="Liked Music" href="liked" />
            </div>
            <div className="sm:w-1/3 grid grid-cols-1 sm:grid-cols-1 justify-end gap-3 mt-4">
              <SongUploadModal image="/images/upload2.png" name="Upload Songs" />
            </div>
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            Songs Title
          </h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  )
}
