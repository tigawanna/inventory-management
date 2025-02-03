// export interface BaseEntity {
//   id: string;
// }

// export interface ListResponse<T> {
//   items: T[];
//   page: number;
//   perPage: number;
//   totalItems: number;
//   totalPages: number;
// }

// export interface ApiResponse<T> {
//   record: T | null;
//   error: any;
// }

// export interface ListQueryParams {
//   limit: string;
//   page: string;
//   order: "asc" | "desc";
//   search?: string | undefined;
//   sort?:string;
// }

// interface BaseEndpoints {
//   list: string;
//   create: string;
//   view: (id: string) => string;
//   update: (id: string) => string;
//   delete: (id: string) => string;
// }

// export class BaseCrudApi<T extends BaseEntity, CreateDTO = Omit<T, "id">,ListSerachQuery=ListQueryParams> {
//   protected baseUrl: string;
//   protected endpoints: BaseEndpoints;

//   constructor(baseUrl: string, endpoints: BaseEndpoints) {
//     this.baseUrl = baseUrl;
//     this.endpoints = endpoints;
//   }

//   async list(
//     params?: ListSerachQuery,
//   ): Promise<ApiResponse<ListResponse<T>>> {
//     try {
//       const queryParams = params
//         ? new URLSearchParams(params as Record<string, string>)
//         : "";
//       const res = await fetch(
//         `${this.baseUrl}${this.endpoints.list}${queryParams ? `?${queryParams}` : ""}`,
//         { credentials: "include" },
//       );

//       if (!res.ok) {
//         return {
//           record: null,
//           error: await this.parseError(res),
//         };
//       }
//         const response = (await res.json()) as {result:ListResponse<T>}
//         return { record: response.result, error: null };
//     } catch (error: any) {
//       return { record: null, error: error.message };
//     }
//   }

//   async get(id: string): Promise<ApiResponse<T>> {
//     try {
//       const res = await fetch(`${this.baseUrl}${this.endpoints.view(id)}`, {
//         credentials: "include",
//       });

//       if (!res.ok) {
//         return {
//           record: null,
//           error: await this.parseError(res),
//         };
//       }
//         const response = (await res.json()) as {result:T}
//         return { record: response.result, error: null };
//     } catch (error: any) {
//       return { record: null, error: error.message };
//     }
//   }

//   async create(data: CreateDTO): Promise<ApiResponse<T>> {
//     try {
//       const res = await fetch(`${this.baseUrl}${this.endpoints.create}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(data),
//       });

//       if (!res.ok) {
//         return {
//           record: null,
//           error: await this.parseError(res),
//         };
//       }
//         const response = (await res.json()) as {result:T}
//         return { record: response.result, error: null };
//     } catch (error: any) {
//       return { record: null, error: error.message };
//     }
//   }

//   async update(id: string, data: Partial<CreateDTO>): Promise<ApiResponse<T>> {
//     try {
//       const res = await fetch(`${this.baseUrl}${this.endpoints.update(id)}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(data),
//       });

//       if (!res.ok) {
//         return {
//           record: null,
//           error: await this.parseError(res),
//         };
//       }
//         const response = (await res.json()) as {result:T}
//         return { record: response.result, error: null };
//     } catch (error: any) {
//       return { record: null, error: error.message };
//     }
//   }

//   async delete(id: string): Promise<ApiResponse<{ message: string }>> {
//     try {
//       const res = await fetch(`${this.baseUrl}${this.endpoints.delete(id)}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       if (!res.ok) {
//         return {
//           record: null,
//           error: await this.parseError(res),
//         };
//       }
//       return { record: { message: "Item deleted successfully" }, error: null };
//     } catch (error: any) {
//       return { record: null, error: error.message };
//     }
//   }

//   private async parseError(res: Response) {
//     return await res
//       .json()
//       .then((res) => res)
//       .catch(() => ({ message: res.statusText }));
//   }
// }

// // Example usage for Categories:

// // filepath: /home/dennis/Desktop/inventory-management/apps/frontend/src/lib/api/category.ts
