export interface InventoryItem {
  name: string;
  id: string;
  updated_at: Date | null;
  created_at: Date | null;
  price: string;
  quantity: number;
  categoryId: string | null;
  description: string | null;
  sku: string | null;
  isActive: boolean | null;
}

export interface ListInventoryResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: InventoryItem[];
};

export interface CreateInventoryItem {
  name: string;
  categoryId: string;
}

export interface ListInventoryParams {
  page?: number;
  limit?: number;
  sort?: "name" | "quantity" | "price";
  order?: "asc" | "desc";
  search?: string;
  categoryId?: string;
}

const inventoryEndpoints = {
  list: "/api/v1/items",
  create: "/api/v1/items",
  view: (id: string) => `/api/v1/items/${id}`,
  update: (id: string) => `/api/v1/items/${id}`,
  delete: (id: string) => `/api/v1/items/${id}`,
} as const;

const baseUrl = import.meta.env.VITE_API_URL;

export async function listInventory(params: ListInventoryParams) {
  try {
    const queryParams = new URLSearchParams(params as Record<string, string>);
    const istURL = `${baseUrl}${inventoryEndpoints.list}?${queryParams}`;
    const res = await fetch(
      `${baseUrl}${inventoryEndpoints.list}?${queryParams}`,
      {
        credentials: "include",
      },
    );
    if (!res.ok) {
      return {
        record: null,
        error: await res
          .json()
          .then((res) => res)
          .catch(() => {
            return { message: res.statusText };
          }),
      };
    }
    return { record: (await res.json()) as ListInventoryResponse, error: null };
  } catch (error) {
    return {
      record: null,
      error: error as Error,
    };
  }
}

export async function getInventoryItem(id: string) {
  try {
    const res = await fetch(`${baseUrl}${inventoryEndpoints.view(id)}`, {
      credentials: "include",
    });
    if (!res.ok) {
      return {
        record: null,
        error: await res
          .json()
          .then((res) => res)
          .catch(() => {
            return { message: res.statusText };
          }),
      };
    }
    return { record: (await res.json()) as InventoryItem, error: null };
  } catch (error) {
    return {
      record: null,
      error: error as Error,
    };
  }
}

export async function createInventoryItem(item: CreateInventoryItem) {
  try {
    const res = await fetch(`${baseUrl}${inventoryEndpoints.create}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(item),
    });
    if (!res.ok) {
      return {
        record: null,
        error: await res
          .json()
          .then((res) => res)
          .catch(() => {
            return {message: res.statusText};
          }),
      };
    }
    return { record: (await res.json()) as InventoryItem, error: null };
  } catch (error) {
    return {
      record: null,
      error: error as Error,
    };
  }
}

export async function updateInventoryItem(
  id: string,
  item: Partial<CreateInventoryItem>,
) {
  try {
    const res = await fetch(`${baseUrl}${inventoryEndpoints.update(id)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(item),
    });
    if (!res.ok) {
      return {
        record: null,
        error: await res
          .json()
          .then((res) => res)
          .catch(() => {
            return { message: res.statusText };
          }),
      };
    }
    return { record: (await res.json()) as InventoryItem, error: null };
  } catch (error) {
    return {
      record: null,
      error: error as Error,
    };
  }
}

export async function deleteInventoryItem(id: string) {
  try {
    const res = await fetch(`${baseUrl}${inventoryEndpoints.delete(id)}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      return {
        record: null,
        error: await res
          .json()
          .then((res) => res)
          .catch(() => {
            return { message: res.statusText };
          }),
      };
    }
    return { record: { message: "Item deleted successfully" }, error: null };
  } catch (error) {
    return {
      record: null,
      error: error as Error,
    };
  }
}
