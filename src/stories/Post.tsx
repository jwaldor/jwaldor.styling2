import { Heart, MessageSquare } from "lucide-react";

type PostProps = {
  name: string;
  icon: string;
  group: string;
  time: number;
  description: string;
  likes: number;
  comments: number;
};

function Post({
  name,
  icon,
  group,
  time,
  description,
  likes,
  comments,
}: PostProps) {
  return (
    <>
      <div className="w-[90%] max-w-sm border border-zinc-400 rounded-md p-2 flex flex-row font-light">
        <div className="flex flex-row">
          <div className="rounded-full w-10 h-10 bg-red-200"></div>
          <div className="mr-2"></div>
        </div>
        <div className="w-[80%] self-end mr-6">
          <div className="text-xs">
            <div>
              {name} <span className="text-zinc-400">in {group}</span>
            </div>
            <div className="text-zinc-400">{`${time} minutes ago`}</div>
          </div>
          <img
            className="aspect-square object-cover rounded-md border border-gray-200 my-2"
            src={icon}
          ></img>
          <div className="text-zinc-800"> {description}</div>
          <div className="my-3"></div>
          <div className="text-zinc-800 flex flex-row text-sm">
            <div className="flex flex-row items-center">
              <Heart className="mr-1"></Heart> {likes} likes
            </div>
            <span className="mx-2"></span>
            <div className="flex flex-row items-center">
              <MessageSquare className="mr-1"></MessageSquare> {comments}{" "}
              comments
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
