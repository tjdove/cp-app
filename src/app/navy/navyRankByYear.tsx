"use client"
import React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"

const NavalPowerChart: React.FC = () => {
  type NavalData = {
    year: number;
    USA: number;
    USSR?: number;
    Russia?: number;
    China: number;
    UK: number;
    France: number;
    Japan: number;
    India: number;
    Germany: number;
    Italy: number;
    Canada: number;
    South_Korea?: number;
  };

  const data: NavalData[] = [
    {
      year: 1990,
      USA: 1,
      USSR: 2,
      UK: 3,
      France: 4,
      China: 5,
      Japan: 6,
      India: 8,
      Germany: 7,
      Italy: 9,
      Canada: 12,
    },
    {
      year: 1995,
      USA: 1,
      Russia: 2,
      UK: 3,
      France: 4,
      China: 6,
      Japan: 5,
      India: 8,
      Germany: 7,
      Italy: 9,
      Canada: 13,
    },
    {
      year: 2000,
      USA: 1,
      Russia: 2,
      UK: 3,
      France: 4,
      China: 5,
      Japan: 6,
      India: 7,
      Germany: 8,
      Italy: 9,
      Canada: 14,
    },
    {
      year: 2005,
      USA: 1,
      Russia: 2,
      China: 4,
      UK: 3,
      France: 5,
      Japan: 6,
      India: 7,
      Italy: 9,
      Germany: 8,
      Canada: 13,
    },
    {
      year: 2010,
      USA: 1,
      Russia: 2,
      China: 3,
      UK: 4,
      France: 5,
      India: 6,
      Japan: 7,
      Italy: 9,
      Germany: 8,
      Canada: 12,
    },
    {
      year: 2015,
      USA: 1,
      Russia: 2,
      China: 3,
      UK: 5,
      India: 4,
      Japan: 6,
      France: 7,
      Italy: 9,
      Germany: 8,
      Canada: 20,
    },
    {
      year: 2020,
      USA: 1,
      China: 2,
      Russia: 3,
      India: 4,
      UK: 5,
      Japan: 6,
      France: 7,
      South_Korea: 8,
      Italy: 9,
      Canada: 24,
      Germany: 0
    },
    {
      year: 2024,
      USA: 1,
      China: 2,
      Russia: 3,
      India: 4,
      UK: 5,
      Japan: 6,
      South_Korea: 7,
      France: 8,
      Italy: 9,
      Canada: 22,
      Germany: 0
    },
  ]

  const countries = [
    { name: "USA", color: "#0052CC" },
    { name: "USSR", color: "#DE350B" },
    { name: "Russia", color: "#DE350B" },
    { name: "China", color: "#FF5630" },
    { name: "UK", color: "#6554C0" },
    { name: "France", color: "#00B8D9" },
    { name: "Japan", color: "#36B37E" },
    { name: "India", color: "#FF8B00" },
    { name: "Germany", color: "#000000" },
    { name: "Italy", color: "#00875A" },
    { name: "South_Korea", color: "#6B778C" },
    { name: "Canada", color: "#C9372C" },
  ]

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean
    payload?: { dataKey: string; color: string; value: number }[]
    label: number
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-md rounded">
          <p className="font-bold">{`Year: ${label}`}</p>
          {payload.map((entry, index) => {
            let countryName = entry.dataKey
            if (countryName === "USSR" || countryName === "Russia") {
              countryName = label < 1992 ? "USSR" : "Russia"
            }
            countryName = countryName.replace("_", " ")

            return (
              <p key={index} style={{ color: entry.color }}>
                {`${countryName}: Rank ${entry.value}`}
              </p>
            )
          })}
        </div>
      )
    }
    return null
  }

  const yAxisTickFormatter = (value: number) => {
    if (value <= 0) return ""
    return value.toString()
  }

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-xl font-bold text-center mb-4">
        Naval Power Rankings by Country (1990-2024)
      </h2>
      <p className="text-center mb-4 text-gray-600 text-sm">
        Lower rank number = stronger navy (1 is strongest)
      </p>
      <div className="flex-grow">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis
              reversed
              domain={[1, 25]}
              tickFormatter={yAxisTickFormatter}
              label={{ value: "Rank", angle: -90, position: "insideLeft" }}
            />
            <Tooltip content={<CustomTooltip label={0} />} />
            <Legend />
            {countries.map((country) => {
              const hasData = data.some(
                (item) => item[country.name as keyof NavalData] !== undefined
              )
              return (
                hasData && (
                  <Line
                    key={country.name}
                    type="monotone"
                    dataKey={country.name}
                    stroke={country.color}
                    dot={{ r: 4 }}
                    strokeWidth={country.name === "Canada" ? 3 : 2}
                    activeDot={{ r: 8 }}
                  />
                )
              )
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="text-xs text-gray-500 mt-2 text-center">
        Note: This visualization uses approximate rankings based on overall
        naval capability estimates. Actual rankings may vary depending on
        specific criteria (fleet size, technology, projection capabilities).
      </div>
    </div>
  )
}

export default NavalPowerChart