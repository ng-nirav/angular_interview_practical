export interface IParamsDataSet {
  from: string ;
  to: string;
  searchValue: string;
  country: string;
  isCountryChange: boolean;
}

export interface IHttpResponseModal {
  status: string
  totalResults: number
  articles: IArticleList[]
}

export interface IArticleList {
  source: IArticleSource
  author?: string
  title: string
  description: string
  url: string
  urlToImage?: string
  publishedAt: string
  content: string
}

export interface IArticleSource {
  id?: string
  name: string
}

export type IArticleListType = IArticleList[]