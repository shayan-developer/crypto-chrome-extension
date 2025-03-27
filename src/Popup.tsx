import { useState, useEffect } from 'react';
import { CryptoData } from './types/crypto';
import { cryptoService } from './services/cryptoService';
import { SearchBar } from './components/SearchBar';
import { CryptoCard } from './components/CryptoCard';
import { TabBar } from './components/TabBar';

const Popup = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'top' | 'favorites'>('top');
  const [searchResults, setSearchResults] = useState<CryptoData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [_searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'top') {
        const data = await cryptoService.getTopCryptos();
        setCryptos(data);
      } else {
        const favoriteIds = await cryptoService.getFavorites();
        setFavorites(favoriteIds);
        const favoriteData = await Promise.all(
          favoriteIds.map(id => cryptoService.getCryptoPrice(id))
        );
        setCryptos(favoriteData);
      }
    } catch (err) {
      setError('خطا در دریافت اطلاعات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      setLoading(true);
      const results = await cryptoService.searchCryptos(query);
      setSearchResults(results);
    } catch (err) {
      setError('خطا در جستجو');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (id: string) => {
    const isFavorite = favorites.includes(id);
    if (isFavorite) {
      await cryptoService.removeFavorite(id);
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      await cryptoService.addFavorite(id);
      setFavorites([...favorites, id]);
    }
    if (activeTab === 'favorites') {
      fetchData();
    }
  };

  if (loading && !isSearching) {
    return (
      <div className="w-[400px] h-[500px] p-4 bg-gray-900 text-white">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-[400px] h-[500px] p-4 bg-gray-900 text-white">
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  const displayCryptos = isSearching ? searchResults : cryptos;

  console.log({displayCryptos});
  

  return (
    <div className="w-[400px] h-[500px] bg-gray-900 text-white flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-center">قیمت ارزهای دیجیتال</h2>
        <p className="text-sm text-gray-400 text-center">به‌روزرسانی خودکار هر دقیقه</p>
      </div>

      <div className="p-4">
        <SearchBar onSearch={handleSearch} />
      </div>

      {!isSearching && (
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      )}
      
      <div className="flex-1 overflow-y-auto">
        {loading && isSearching ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : displayCryptos.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            {isSearching ? 'نتیجه‌ای یافت نشد' : 'مورد علاقه‌ای وجود ندارد'}
          </div>
        ) : (
          displayCryptos?.map((crypto) => (
            <CryptoCard
              key={crypto.id}
              crypto={crypto}
              isFavorite={favorites.includes(crypto.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))
        )}
      </div>
      
      <div className="p-4 text-center text-sm text-gray-400 border-t border-gray-800">
        آخرین به‌روزرسانی: {new Date().toLocaleTimeString('fa-IR')}
      </div>
    </div>
  );
};

export default Popup;
