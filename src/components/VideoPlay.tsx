import { IoClose } from "react-icons/io5";
import useFetchDetails from '../hooks/UseFetchDetails';

// Define types for the props
interface VideoPlayProps {
  data: { id: string }; // Adjust based on the actual shape of `data`
  close: () => void;
  media_type: string;
}

const VideoPlay: React.FC<VideoPlayProps> = ({ data, close, media_type }) => {
  const { data: videoData, loading, error } = useFetchDetails<{ results: { key: string }[] }>(`/${media_type}/${data.id}/videos`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading video.</div>;
  
  const videoKey = videoData?.results[0]?.key;

  return (
    <section className='fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center'>
      <div className='relative bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded'>
        <button
          onClick={close}
          className='absolute top-4 right-4 bg-red-600 text-white rounded-full p-2 z-50'
        >
          <IoClose className='text-3xl' />
        </button>
        {videoKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}`}
            className='w-full h-full'
            allowFullScreen
          />
        ) : (
          <div className='text-white flex justify-center items-center w-full h-full'>No video available</div>
        )}
      </div>
    </section>
  );
};

export default VideoPlay;


