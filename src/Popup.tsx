import { useState, useEffect } from 'react';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
}

const Popup = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&sparkline=false'
      );
      const data = await response.json();
      setCryptos(data);
    } catch (err) {
      setError('خطا در دریافت اطلاعات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
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

  return (
    <div className="w-[400px] h-[500px] bg-gray-900 text-white flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-center">قیمت ارزهای دیجیتال</h2>
        <p className="text-sm text-gray-400 text-center">به‌روزرسانی خودکار هر دقیقه</p>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {cryptos.map((crypto) => (
          <div
            key={crypto.id}
            className="flex items-center justify-between p-4 border-b border-gray-800 hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-2 rtl">
              <img
                src={crypto.image}
                alt={crypto.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="text-left">
                <div className="font-medium">{crypto.name}</div>
                <div className="text-sm text-gray-400">{crypto.symbol.toUpperCase()}</div>
              </div>
            </div>
            
            <div className="text-left">
              <div className="font-medium">
                ${crypto.current_price.toLocaleString()}
              </div>
              <div className={`text-sm ${crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 text-center text-sm text-gray-400 border-t border-gray-800">
        آخرین به‌روزرسانی: {new Date().toLocaleTimeString('fa-IR')}
      </div>
    </div>
  );
};

export default Popup;
