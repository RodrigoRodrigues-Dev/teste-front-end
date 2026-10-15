import { FALLBACK_PRODUCTS } from "@/data/products";
import type { Product, ProductsResponse } from "@/types/products";

/**
 * URL oficial do teste. A resposta não envia Access-Control-Allow-Origin,
 * então o navegador não consegue lê-la direto. Em dev e preview o Vite
 * encaminha /api/produtos para esse endereço.
 */
export const OFFICIAL_PRODUCTS_URL =
  "https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json";

const PRODUCTS_URL = "/api/produtos";

let pendingRequest: Promise<Product[]> | null = null;

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") return false;

  const product = value as Partial<Product>;

  return (
    typeof product.productName === "string" &&
    typeof product.descriptionShort === "string" &&
    typeof product.photo === "string" &&
    typeof product.price === "number"
  );
}

async function requestProducts(): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL);

  if (!response.ok) {
    throw new Error(`Falha ao buscar produtos (${response.status})`);
  }

  const data = (await response.json()) as ProductsResponse;

  if (!data.success || !Array.isArray(data.products) || !data.products.every(isProduct)) {
    throw new Error("Resposta de produtos inválida");
  }

  return data.products;
}

export function getProducts(): Promise<Product[]> {
  if (!pendingRequest) {
    pendingRequest = requestProducts().catch((error: unknown) => {
      pendingRequest = null;
      throw error;
    });
  }

  return pendingRequest;
}

export function clearProductsCache() {
  pendingRequest = null;
}

export function getFallbackProducts() {
  return FALLBACK_PRODUCTS;
}
