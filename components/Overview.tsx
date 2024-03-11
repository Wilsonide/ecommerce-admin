"use client"
import { GraphData } from "@/actions/get-graph-revenue"
import {Bar, BarChart, ResponsiveContainer,XAxis,YAxis} from "recharts"

interface overViewProp{
    data : GraphData[]
}

export const Overview: React.FC<overViewProp> = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
            <XAxis 
                dataKey='name' 
                stroke="#888888" 
                fontSize={12} 
                axisLine={false} 
                tickLine={false}
            />

            <YAxis 
                stroke="#888888"
                fontSize={12} 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value)=>`NGN ${value}`}
            />

            <Bar
                dataKey="total"
                fill="#3498db" 
                radius={[4,4,0,0]}
            />
        </BarChart>
         
    </ResponsiveContainer>
  )
}
