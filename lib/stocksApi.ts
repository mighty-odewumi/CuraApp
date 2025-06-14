const STOCKS_API_URL = process.env.EXPO_PUBLIC_STOCKS_API_URL;

export interface Stock {
  $id: string;
  CalculateChangePercent: number;
  Id: number;
  Symbol: string;
  PrevClosingPrice: number;
  OpeningPrice: number;
  HighPrice: number;
  LowPrice: number;
  ClosePrice: number;
  Change: number;
  PercChange: number;
  Trades: number;
  Volume: number;
  Value: number;
  Market: string;
  Sector: string;
  Company2: string;
  TradeDate: string;
}

export interface StocksResponse {
  stocks: Stock[];
  lastUpdated: string;
}

class StocksApiService {
  private cache: { data: Stock[]; timestamp: number } | null = null;
  private readonly CACHE_DURATION = 30000; // 30 seconds

  async fetchStocks(
    market: string = '',
    sector: string = '',
    orderby: string = 'TopGainers',
    pageSize: number = 20,
    pageNo: number = 0
  ): Promise<StocksResponse> {
    try {
      // Check cache first
      if (this.cache && Date.now() - this.cache.timestamp < this.CACHE_DURATION) {
        return {
          stocks: this.cache.data,
          lastUpdated: new Date(this.cache.timestamp).toISOString(),
        };
      }

      const params = new URLSearchParams({
        market,
        sector,
        orderby,
        pageSize: pageSize.toString(),
        pageNo: pageNo.toString(),
      });

      const response = await fetch(`${STOCKS_API_URL}?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Stock[] = await response.json();
      
      // Update cache
      this.cache = {
        data,
        timestamp: Date.now(),
      };

      return {
        stocks: data,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error fetching stocks:', error);
      throw new Error('Failed to fetch stock data');
    }
  }

  async getTopGainers(): Promise<StocksResponse> {
    return this.fetchStocks('', '', 'TopGainers', 10);
  }

  async getTopLosers(): Promise<StocksResponse> {
    return this.fetchStocks('', '', 'TopLosers', 10);
  }

  async getMostActive(): Promise<StocksResponse> {
    return this.fetchStocks('', '', 'MostActive', 10);
  }

  clearCache(): void {
    this.cache = null;
  }
}

export const stocksApi = new StocksApiService();