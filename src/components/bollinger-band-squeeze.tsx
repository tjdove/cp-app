import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';

const BollingerBandSqueeze = () => {
  // Generate sample data to demonstrate a Bollinger Band squeeze
  const generateData = () => {
    const data = [];
    // Normal volatility
    for (let i = 0; i < 20; i++) {
      const basePrice = 100 + Math.sin(i / 3) * 5;
      const volatility = 3;
      data.push({
        day: i + 1,
        price: basePrice,
        upperBand: basePrice + volatility * 2,
        lowerBand: basePrice - volatility * 2,
        middleBand: basePrice
      });
    }
    
    // Squeeze period (low volatility)
    for (let i = 20; i < 40; i++) {
      const basePrice = 105 + Math.sin((i - 20) / 10) * 1;
      const volatility = 0.7; // Reduced volatility during squeeze
      data.push({
        day: i + 1,
        price: basePrice,
        upperBand: basePrice + volatility * 2,
        lowerBand: basePrice - volatility * 2,
        middleBand: basePrice
      });
    }
    
    // Expansion after squeeze (increased volatility)
    for (let i = 40; i < 60; i++) {
      const factor = (i - 40) / 5;
      const basePrice = 105 + Math.cos((i - 40) / 3) * (3 + factor);
      const volatility = 0.7 + factor;
      data.push({
        day: i + 1,
        price: basePrice,
        upperBand: basePrice + volatility * 2,
        lowerBand: basePrice - volatility * 2,
        middleBand: basePrice
      });
    }
    
    return data;
  };

  const data = generateData();
  
  // Calculate band width for squeeze indicator
  const bandWidthData = data.map((point, index) => ({
    day: point.day,
    width: point.upperBand - point.lowerBand,
    isQueeze: index >= 20 && index < 40
  }));

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-xl font-bold mb-4">Bollinger Band Squeeze Demonstration</h2>
      
      <div className="w-full h-64 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" label={{ value: 'Day', position: 'insideBottomRight', offset: -5 }} />
            <YAxis domain={['auto', 'auto']} label={{ value: 'Price', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="upperBand" stroke="#8884d8" dot={false} name="Upper Band" />
            <Line type="monotone" dataKey="middleBand" stroke="#82ca9d" dot={false} name="20-day MA" />
            <Line type="monotone" dataKey="lowerBand" stroke="#8884d8" dot={false} name="Lower Band" />
            <Line type="monotone" dataKey="price" stroke="#ff7300" dot={false} name="Price" />
            
            {/* Highlight the squeeze area */}
            <ReferenceLine x={20} stroke="red" strokeDasharray="3 3" />
            <ReferenceLine x={40} stroke="red" strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <h3 className="text-lg font-medium mb-2">Band Width (Volatility Indicator)</h3>
      <div className="w-full h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={bandWidthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="width" stroke="#82ca9d" name="Band Width" />
            
            {/* Highlight the squeeze area */}
            <ReferenceLine x={20} stroke="red" strokeDasharray="3 3" />
            <ReferenceLine x={40} stroke="red" strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 p-4 bg-gray-100 rounded-md w-full">
        <h3 className="font-bold mb-2">Key Phases in the Chart:</h3>
        <ul className="list-disc pl-5">
          <li>Days 1-20: Normal volatility with standard Bollinger Band width</li>
          <li>Days 21-40: <span className="font-bold text-red-600">Bollinger Band Squeeze</span> - reduced volatility causing bands to narrow</li>
          <li>Days 41-60: Expansion phase - increased volatility after the squeeze with wider bands</li>
        </ul>
      </div>
    </div>
  );
};

export default BollingerBandSqueeze;
