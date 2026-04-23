import colors from "../../constants/colors";
import Link from "next/link";

type CategoryType = {
  id: string | number;
  name: string;
  slug: string;
};

export default function Category({
  categories,
}: {
  categories: CategoryType[];
}) {
  return (
    <div className="w-full">
    
  <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/news?category=${cat.slug}`}
            className={`
              whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium
              transition-all duration-200
              ${colors.card}
              ${colors.primaryHover}
              hover:scale-105
            `}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
}