import React, { useState } from 'react';
import { userApi } from '../../services/api';

interface Earning {
  period: string;
  earnings: number;
  paid: boolean;
}

const EarningsTab: React.FC = () => {
  const [fromDate, setFromDate] = useState('');
  const [untilDate, setUntilDate] = useState('');
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleApply = async () => {
    setIsLoading(true);
    try {
      const response = await userApi.getAgentEarnings(fromDate, untilDate);
      setEarnings(response.data);
    } catch (error) {
      console.error('Error fetching earnings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setFromDate('');
    setUntilDate('');
    setEarnings([]);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Earnings</h2>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Until</label>
          <input
            type="date"
            value={untilDate}
            onChange={(e) => setUntilDate(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        
        <div className="flex items-end gap-2">
          <button
            onClick={handleApply}
            disabled={isLoading}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Apply
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Earnings
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Paid
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {earnings.length > 0 ? (
              earnings.map((earning, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {earning.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${earning.earnings.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      earning.paid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {earning.paid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                  There are no results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EarningsTab; 