"use client"

import { ArrowDown, ArrowUp, Pin, PinOff } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  isPinned?: boolean
}

export function MarketSidebar() {
  const [stocks, setStocks] = useState<StockData[]>([
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      price: 178.72,
      change: 2.34,
      changePercent: 1.32,
      isPinned: true
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      price: 376.17,
      change: -1.25,
      changePercent: -0.33,
      isPinned: true
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 142.65,
      change: 1.87,
      changePercent: 1.32,
      isPinned: false
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      price: 145.24,
      change: 0.98,
      changePercent: 0.68,
      isPinned: false
    },
    {
      symbol: "TSLA",
      name: "Tesla, Inc.",
      price: 237.45,
      change: -3.21,
      changePercent: -1.33,
      isPinned: true
    }
  ])

  const togglePin = (symbol: string) => {
    setStocks(stocks.map(stock => 
      stock.symbol === symbol 
        ? { ...stock, isPinned: !stock.isPinned }
        : stock
    ))
  }

  const pinnedStocks = stocks.filter(stock => stock.isPinned)

  return (
    <Sidebar className="w-[280px] h-full border-l" collapsible="none">
      <SidebarHeader className="border-b p-4 shrink-0">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Pinned Stocks</h2>
          <Select defaultValue="us">
            <SelectTrigger className="w-[90px]">
              <SelectValue placeholder="Market" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">US Market</SelectItem>
              <SelectItem value="eu">EU Market</SelectItem>
              <SelectItem value="asia">Asia Market</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SidebarHeader>
      <SidebarContent className="h-[calc(100vh-4rem)] overflow-auto">
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="space-y-2">
              {pinnedStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="font-medium flex items-center gap-2">
                      <span className="truncate">{stock.symbol}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4"
                        onClick={() => togglePin(stock.symbol)}
                      >
                        {stock.isPinned ? (
                          <Pin className="h-3 w-3" />
                        ) : (
                          <PinOff className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{stock.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${stock.price}</div>
                    <div
                      className={`text-xs flex items-center gap-1 ${
                        stock.change >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stock.change >= 0 ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )}
                      {Math.abs(stock.change)} ({Math.abs(stock.changePercent)}%)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

