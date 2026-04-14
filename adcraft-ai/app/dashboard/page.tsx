import { prisma } from "@/lib/prisma";
import AdCard from "./AdCard";

export default async function Dashboard({
searchParams,
}: {
  searchParams: {
    q?: string;
    style?: string;
    page?: string;
  };
}) {
  const page = Number(searchParams.page || 1);
  const PAGE_SIZE = 6;

  const where = {
    ...(searchParams.q && {
      name: {
        contains: searchParams.q,
        mode: "insensitive",
      },
    }),
    ...(searchParams.style && {
      style: searchParams.style,
    }),
  };

  const ads = await prisma.ad.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
  });

  const total = await prisma.ad.count({ where });
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="p-8 space-y-6">

      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* SEARCH + FILTER */}
      <form className="flex gap-2">
        <input
          name="q"
          placeholder="Search product..."
          className="border p-2 rounded w-full"
        />

        <select name="style" className="border p-2 rounded">
          <option value="">All</option>
          <option value="luxury">Luxury</option>
          <option value="minimal">Minimal</option>
          <option value="bold">Bold</option>
          <option value="tech">Tech</option>
          <option value="viral">Viral</option>
        </select>

        <button className="bg-black text-white px-4 rounded">
          Search
        </button>
      </form>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-4">
        {ads.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex gap-2 justify-center">
        {Array.from({ length: totalPages }).map((_, i) => (
          <a
            key={i}
            href={`?page=${i + 1}`}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </a>
        ))}
      </div>
    </div>
  );
}