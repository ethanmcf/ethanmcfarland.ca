import { useParams } from "react-router-dom";
import { FOLDERS } from "../data/folders";

export default function ExperienceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const file = FOLDERS.find((folder) => folder.name === "Experience")?.files.find(
    (candidate) => candidate.path === `/experience/${slug}`,
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-white">
        {file?.title ?? "Not found"}
      </h1>
      <p className="mt-2 max-w-prose text-[#9d9d9d]">Role details go here.</p>
    </div>
  );
}
