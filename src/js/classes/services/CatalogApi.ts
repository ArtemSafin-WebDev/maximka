import type {
  ApartmentCardData,
  ApartmentImageData,
} from "../../utils/renderApartmentCard";

export interface CatalogRangeFacet {
  min: number;
  max: number;
}

export interface CatalogOptionFacet {
  value: string;
  count: number;
  label?: string;
}

export interface CatalogFacets {
  price?: CatalogRangeFacet;
  area?: CatalogRangeFacet;
  floor?: CatalogRangeFacet;
  rooms?: CatalogOptionFacet[];
  entrances?: CatalogOptionFacet[];
  features?: CatalogOptionFacet[];
}

export interface CatalogPagination {
  limit: number;
  returned: number;
  total: number;
  remaining: number;
  nextCursor: string | null;
  hasMore: boolean;
}

export interface CatalogResponse {
  items: ApartmentCardData[];
  pagination: CatalogPagination;
  facets?: CatalogFacets;
}

export class CatalogApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string
  ) {
    super(message);
    this.name = "CatalogApiError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getRequiredString(
  source: Record<string, unknown>,
  key: string
) {
  const value = source[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Catalog response: ${key} must be a non-empty string`);
  }
  return value;
}

function getOptionalString(
  source: Record<string, unknown>,
  key: string
) {
  const value = source[key];
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value !== "string") {
    throw new Error(`Catalog response: ${key} must be a string or null`);
  }
  return value;
}

function getNonNegativeInteger(
  source: Record<string, unknown>,
  key: string
) {
  const value = source[key];
  if (!Number.isInteger(value) || (value as number) < 0) {
    throw new Error(`Catalog response: ${key} must be a non-negative integer`);
  }
  return value as number;
}

function getStringArray(source: Record<string, unknown>, key: string) {
  const value = source[key];
  if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) {
    throw new Error(`Catalog response: ${key} must be an array of strings`);
  }
  return value;
}

function parseImage(value: unknown): ApartmentImageData {
  if (!isRecord(value)) {
    throw new Error("Catalog response: image must be an object");
  }

  const width = value.width;
  const height = value.height;
  if (
    !Number.isInteger(width) ||
    (width as number) <= 0 ||
    !Number.isInteger(height) ||
    (height as number) <= 0
  ) {
    throw new Error("Catalog response: image dimensions must be positive integers");
  }

  return {
    src: getRequiredString(value, "src"),
    width: width as number,
    height: height as number,
    alt: getRequiredString(value, "alt"),
    className: getOptionalString(value, "className"),
  };
}

function parseApartment(value: unknown): ApartmentCardData {
  if (!isRecord(value)) {
    throw new Error("Catalog response: apartment must be an object");
  }

  const id = getRequiredString(value, "id");
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
    throw new Error("Catalog response: apartment id contains unsafe characters");
  }

  if (!Array.isArray(value.images) || value.images.length === 0) {
    throw new Error("Catalog response: apartment images must not be empty");
  }
  const images = value.images.map(parseImage);

  if (typeof value.hasMultipleImages !== "boolean") {
    throw new Error("Catalog response: hasMultipleImages must be boolean");
  }
  if (value.hasMultipleImages !== (images.length > 1)) {
    throw new Error("Catalog response: hasMultipleImages does not match images");
  }

  if (typeof value.reserved !== "boolean") {
    throw new Error("Catalog response: reserved must be boolean");
  }

  const features = getStringArray(value, "features");
  const allFeatures = getStringArray(value, "allFeatures");
  if (!features.every((feature) => allFeatures.includes(feature))) {
    throw new Error("Catalog response: allFeatures must include visible features");
  }
  const featuresRemaining = getNonNegativeInteger(value, "featuresRemaining");
  if (featuresRemaining !== Math.max(allFeatures.length - features.length, 0)) {
    throw new Error("Catalog response: featuresRemaining has an invalid value");
  }

  const oldPrice = getOptionalString(value, "oldPrice");
  const discount = getOptionalString(value, "discount");
  const discountIcon = getOptionalString(value, "discountIcon");
  if (
    Boolean(oldPrice) !== Boolean(discount) ||
    Boolean(discount) !== Boolean(discountIcon)
  ) {
    throw new Error(
      "Catalog response: oldPrice, discount and discountIcon must be passed together"
    );
  }

  return {
    id,
    href: getRequiredString(value, "href"),
    title: getRequiredString(value, "title"),
    area: getRequiredString(value, "area"),
    floor: getRequiredString(value, "floor"),
    images,
    hasMultipleImages: value.hasMultipleImages,
    price: getRequiredString(value, "price"),
    oldPrice,
    discount,
    discountIcon,
    mortgage: getOptionalString(value, "mortgage"),
    features,
    allFeatures,
    featuresRemaining,
    reserved: value.reserved,
  };
}

function parseRangeFacet(value: unknown) {
  if (!isRecord(value)) return undefined;
  if (
    typeof value.min !== "number" ||
    !Number.isFinite(value.min) ||
    typeof value.max !== "number" ||
    !Number.isFinite(value.max) ||
    value.min > value.max
  ) {
    throw new Error("Catalog response: invalid range facet");
  }
  return { min: value.min, max: value.max };
}

function parseOptionFacets(value: unknown) {
  if (value === undefined) return undefined;
  if (!Array.isArray(value)) {
    throw new Error("Catalog response: option facets must be an array");
  }

  return value.map((item): CatalogOptionFacet => {
    if (!isRecord(item)) {
      throw new Error("Catalog response: option facet must be an object");
    }
    return {
      value: getRequiredString(item, "value"),
      count: getNonNegativeInteger(item, "count"),
      label: getOptionalString(item, "label"),
    };
  });
}

function parseFacets(value: unknown): CatalogFacets | undefined {
  if (value === undefined) return undefined;
  if (!isRecord(value)) {
    throw new Error("Catalog response: facets must be an object");
  }

  return {
    price: parseRangeFacet(value.price),
    area: parseRangeFacet(value.area),
    floor: parseRangeFacet(value.floor),
    rooms: parseOptionFacets(value.rooms),
    entrances: parseOptionFacets(value.entrances),
    features: parseOptionFacets(value.features),
  };
}

function parsePagination(value: unknown, itemCount: number): CatalogPagination {
  if (!isRecord(value)) {
    throw new Error("Catalog response: pagination must be an object");
  }

  const limit = getNonNegativeInteger(value, "limit");
  const returned = getNonNegativeInteger(value, "returned");
  const total = getNonNegativeInteger(value, "total");
  const remaining = getNonNegativeInteger(value, "remaining");
  const nextCursor = value.nextCursor;
  const hasMore = value.hasMore;

  if (limit < 1 || limit > 50) {
    throw new Error("Catalog response: pagination.limit is out of range");
  }
  if (returned !== itemCount) {
    throw new Error("Catalog response: pagination.returned does not match items");
  }
  if (total < returned) {
    throw new Error("Catalog response: pagination.total is too small");
  }
  if (
    nextCursor !== null &&
    (typeof nextCursor !== "string" || nextCursor.trim() === "")
  ) {
    throw new Error("Catalog response: nextCursor must be a string or null");
  }
  if (typeof hasMore !== "boolean") {
    throw new Error("Catalog response: hasMore must be boolean");
  }
  if (
    (hasMore && (nextCursor === null || remaining === 0)) ||
    (!hasMore && (nextCursor !== null || remaining !== 0))
  ) {
    throw new Error("Catalog response: inconsistent pagination state");
  }

  return {
    limit,
    returned,
    total,
    remaining,
    nextCursor,
    hasMore,
  };
}

function parseResponse(value: unknown): CatalogResponse {
  if (!isRecord(value) || !Array.isArray(value.items)) {
    throw new Error("Catalog response: items must be an array");
  }

  const items = value.items.map(parseApartment);
  const ids = new Set(items.map(({ id }) => id));
  if (ids.size !== items.length) {
    throw new Error("Catalog response: duplicate apartment ids");
  }

  return {
    items,
    pagination: parsePagination(value.pagination, items.length),
    facets: parseFacets(value.facets),
  };
}

async function parseError(response: Response) {
  try {
    const data = (await response.json()) as unknown;
    if (isRecord(data) && isRecord(data.error)) {
      return {
        code:
          typeof data.error.code === "string" ? data.error.code : undefined,
        message:
          typeof data.error.message === "string"
            ? data.error.message
            : `Catalog request failed: ${response.status}`,
      };
    }
  } catch {
    // Ответ с ошибкой может не содержать JSON.
  }

  return { message: `Catalog request failed: ${response.status}` };
}

class CatalogApi {
  constructor(private readonly endpoint: string) {}

  async load(searchParams: URLSearchParams, signal: AbortSignal) {
    const url = new URL(this.endpoint, window.location.href);
    url.search = searchParams.toString();

    const response = await fetch(url, {
      signal,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      const error = await parseError(response);
      throw new CatalogApiError(error.message, response.status, error.code);
    }

    return parseResponse((await response.json()) as unknown);
  }
}

export default CatalogApi;
