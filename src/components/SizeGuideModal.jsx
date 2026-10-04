import React, { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';
import { useUIModal } from '../context/UIModalContext';

export const SizeGuideModal = () => {
  const { isSizeGuideOpen, closeSizeGuide } = useUIModal();
  const [unit, setUnit] = useState('inches'); // 'inches' | 'cm'
  const [selectedCategory, setSelectedCategory] = useState('mens-kurta');

  if (!isSizeGuideOpen) return null;

  const sizeData = {
    'mens-kurta': [
      { size: 'S (38)', chestIn: '38 - 40', chestCm: '96 - 101', shoulderIn: '17.5', shoulderCm: '44.5', lengthIn: '42', lengthCm: '106' },
      { size: 'M (40)', chestIn: '40 - 42', chestCm: '101 - 106', shoulderIn: '18.0', shoulderCm: '45.7', lengthIn: '43', lengthCm: '109' },
      { size: 'L (42)', chestIn: '42 - 44', chestCm: '106 - 111', shoulderIn: '18.5', shoulderCm: '47.0', lengthIn: '44', lengthCm: '111' },
      { size: 'XL (44)', chestIn: '44 - 46', chestCm: '111 - 116', shoulderIn: '19.0', shoulderCm: '48.2', lengthIn: '45', lengthCm: '114' },
      { size: 'XXL (46)', chestIn: '46 - 48', chestCm: '116 - 121', shoulderIn: '19.5', shoulderCm: '49.5', lengthIn: '45.5', lengthCm: '115' },
    ],
    'mens-shirt': [
      { size: 'S (38)', chestIn: '39', chestCm: '99', shoulderIn: '17.5', shoulderCm: '44.5', lengthIn: '29', lengthCm: '73.6' },
      { size: 'M (40)', chestIn: '41', chestCm: '104', shoulderIn: '18.2', shoulderCm: '46.2', lengthIn: '30', lengthCm: '76.2' },
      { size: 'L (42)', chestIn: '43', chestCm: '109', shoulderIn: '19.0', shoulderCm: '48.2', lengthIn: '30.5', lengthCm: '77.5' },
      { size: 'XL (44)', chestIn: '45', chestCm: '114', shoulderIn: '19.8', shoulderCm: '50.3', lengthIn: '31', lengthCm: '78.7' },
      { size: 'XXL (46)', chestIn: '48', chestCm: '122', shoulderIn: '20.5', shoulderCm: '52.0', lengthIn: '31.5', lengthCm: '80.0' },
    ],
    'womens-kurti': [
      { size: 'S (36)', chestIn: '36', chestCm: '91.4', shoulderIn: '14.5', shoulderCm: '36.8', lengthIn: '44', lengthCm: '111.7' },
      { size: 'M (38)', chestIn: '38', chestCm: '96.5', shoulderIn: '15.0', shoulderCm: '38.1', lengthIn: '44.5', lengthCm: '113.0' },
      { size: 'L (40)', chestIn: '40', chestCm: '101.6', shoulderIn: '15.5', shoulderCm: '39.3', lengthIn: '45', lengthCm: '114.3' },
      { size: 'XL (42)', chestIn: '42', chestCm: '106.6', shoulderIn: '16.0', shoulderCm: '40.6', lengthIn: '45.5', lengthCm: '115.5' },
      { size: 'XXL (44)', chestIn: '44', chestCm: '111.7', shoulderIn: '16.5', shoulderCm: '41.9', lengthIn: '46', lengthCm: '116.8' },
    ]
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-brand-darker/80 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 my-8">
        
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-brand-red" />
            <h3 className="text-xl font-serif font-bold text-brand-dark">Saideep Size Guide</h3>
          </div>
          <button
            onClick={closeSizeGuide}
            className="text-gray-400 hover:text-brand-dark p-1.5 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category & Unit Switchers */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 my-5">
          <div className="flex gap-2">
            {[
              { id: 'mens-kurta', label: "Men's Kurta" },
              { id: 'mens-shirt', label: "Men's Shirt" },
              { id: 'womens-kurti', label: "Women's Kurti" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                  selectedCategory === tab.id
                    ? 'bg-brand-dark text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg self-start sm:self-auto">
            <button
              onClick={() => setUnit('inches')}
              className={`text-xs px-3 py-1 font-semibold rounded ${
                unit === 'inches' ? 'bg-white shadow text-brand-dark' : 'text-gray-600'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`text-xs px-3 py-1 font-semibold rounded ${
                unit === 'cm' ? 'bg-white shadow text-brand-dark' : 'text-gray-600'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Measurement Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-[11px] border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Chest ({unit})</th>
                <th className="py-3 px-4">Shoulder ({unit})</th>
                <th className="py-3 px-4">Garment Length ({unit})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sizeData[selectedCategory].map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-bold text-brand-dark">{row.size}</td>
                  <td className="py-3 px-4 text-gray-700">{unit === 'inches' ? row.chestIn : row.chestCm}</td>
                  <td className="py-3 px-4 text-gray-700">{unit === 'inches' ? row.shoulderIn : row.shoulderCm}</td>
                  <td className="py-3 px-4 text-gray-700">{unit === 'inches' ? row.lengthIn : row.lengthCm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring Tips */}
        <div className="mt-6 bg-[#FCFBF8] p-4 rounded-xl border border-amber-200/50 text-xs text-gray-700 space-y-2">
          <div className="flex items-center gap-2 font-bold text-brand-dark">
            <CheckCircle2 className="w-4 h-4 text-brand-gold" />
            <span>How To Measure Your Fit:</span>
          </div>
          <p>
            • <strong>Chest:</strong> Measure around the fullest part of your chest, keeping the measuring tape horizontal and firm without pulling tight.
          </p>
          <p>
            • <strong>Shoulder:</strong> Measure from the edge of one shoulder seam straight across the back to the opposite shoulder.
          </p>
          <p>
            • <strong>Note:</strong> Ethnic wear kurtas are tailored with 3-4 inches of ease over body measurements for relaxed comfort and graceful drape.
          </p>
        </div>

      </div>
    </div>
  );
};
