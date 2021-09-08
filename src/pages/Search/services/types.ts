/* eslint-disable camelcase */

export interface SearchQuery {
  search_phrase: string;
}

export interface Product {
  published_at: string;
  title: string;
  price: string;
  store_domain: string;
  image: string;
}

export interface ProductTrend {
  name: string;
  search_msv: {
    date: string;
    sv: number;
  }[];
}

export interface SearchRes {
  product_launch_data: {
    key_as_string: string;
    doc_count: number;
  }[];
  product_trends: ProductTrend[];
  products: Product[];
}
