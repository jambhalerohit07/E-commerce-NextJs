import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, SessionData } from "@/lib/session";
import ProductsClient from "./ProductsClient";
import Loading from "@/components/Loading";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getCategories(token: string) {
  const response = await fetch(`${API_BASE}/products/category-list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "force-cache",
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

async function getProducts(
  token: string,
  searchParams: {
    limit?: string;
    skip?: string;
    sortBy?: string;
    order?: string;
    category?: string;
    search?: string;
  },
) {
  const limit = searchParams.limit || "12";
  const skip = searchParams.skip || "0";
  const sortBy = searchParams.sortBy;
  const order = searchParams.order;
  const category = searchParams.category;
  const search = searchParams.search;

  let url = "";

  if (search) {
    url = `${API_BASE}/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
  } else if (category) {
    url = `${API_BASE}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;
  } else {
    url = `${API_BASE}/products?limit=${limit}&skip=${skip}`;
  }

  if (sortBy && order) {
    url += `&sortBy=${sortBy}&order=${order}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    category?: string;
    sort?: string;
    search?: string;
  }>;
}) {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions,
  );

  if (!session.token) {
    redirect("/login");
  }

  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");
  const itemsPerPage = 12;
  const skip = (currentPage - 1) * itemsPerPage;

  const [sortBy, order] = (params.sort || "").split("-");

  const [categories, productsData] = await Promise.all([
    getCategories(session.token),
    getProducts(session.token, {
      limit: String(itemsPerPage),
      skip: String(skip),
      sortBy,
      order,
      category: params.category,
      search: params.search,
    }),
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <ProductsClient
        initialProducts={productsData.products || []}
        initialTotal={productsData.total || 0}
        categories={categories}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        selectedCategory={params.category || ""}
        selectedSort={params.sort || ""}
        searchQuery={params.search || ""}
      />
    </Suspense>
  );
}
