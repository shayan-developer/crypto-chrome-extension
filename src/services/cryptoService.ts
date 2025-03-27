import { CryptoData } from '../types/crypto';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

export const cryptoService = {
  async getTopCryptos(limit: number = 20): Promise<CryptoData[]> {
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&sparkline=false`
    );
    return response.json();
  },

  async searchCryptos(query: string): Promise<CryptoData[]> {
    try {
      const response = await fetch(
        `${COINGECKO_API}/search?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      
      if (!data.coins || data.coins.length === 0) {
        return [];
      }

      // Get detailed price data for all search results
      const ids = data.coins.map((coin: any) => coin.id).join(',');
      const priceResponse = await fetch(
        `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${ids}&sparkline=false`
      );
      const priceData = await priceResponse.json();

      // Map the search results with their price data
      return data.coins.map((coin: any) => {
        const priceInfo = priceData.find((p: CryptoData) => p.id === coin.id);
        return {
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          current_price: priceInfo?.current_price || 0,
          price_change_percentage_24h: priceInfo?.price_change_percentage_24h || 0,
          image: coin.large
        };
      });
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  },

  async getCryptoPrice(id: string): Promise<CryptoData> {
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&ids=${id}&sparkline=false`
    );
    const data = await response.json();
    return data[0];
  },

  async getFavorites(): Promise<string[]> {
    const result = await chrome.storage.local.get('favorites');
    return result.favorites || [];
  },

  async addFavorite(id: string): Promise<void> {
    const favorites = await this.getFavorites();
    if (!favorites.includes(id)) {
      await chrome.storage.local.set({
        favorites: [...favorites, id]
      });
    }
  },

  async removeFavorite(id: string): Promise<void> {
    const favorites = await this.getFavorites();
    await chrome.storage.local.set({
      favorites: favorites.filter(fav => fav !== id)
    });
  }
}; 