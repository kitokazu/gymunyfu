"use client"

import { Button } from "@/components/ui/button"
import { postTags, postCategories } from "@/lib/mock-data"
import type { PostTag, PostCategory } from "@/lib/types"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Filter } from "lucide-react"

interface FilterBarProps {
  selectedTags: PostTag[]
  selectedCategories: PostCategory[]
  onTagToggle: (tag: PostTag) => void
  onCategoryToggle: (category: PostCategory) => void
  onClearFilters: () => void
}

export function FilterBar({
  selectedTags,
  selectedCategories,
  onTagToggle,
  onCategoryToggle,
  onClearFilters,
}: FilterBarProps) {
  const totalFilters = selectedTags.length + selectedCategories.length

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filters
            {totalFilters > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                {totalFilters}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel className="text-xs text-muted-foreground">Categories</DropdownMenuLabel>
          {postCategories.map((category) => (
            <DropdownMenuCheckboxItem
              key={category.value}
              checked={selectedCategories.includes(category.value)}
              onCheckedChange={() => onCategoryToggle(category.value)}
            >
              <Badge className={`${category.color} text-white mr-2 text-xs`}>{category.label}</Badge>
            </DropdownMenuCheckboxItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs text-muted-foreground">Tags</DropdownMenuLabel>
          {postTags.map((tag) => (
            <DropdownMenuCheckboxItem
              key={tag.value}
              checked={selectedTags.includes(tag.value)}
              onCheckedChange={() => onTagToggle(tag.value)}
            >
              #{tag.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {totalFilters > 0 && (
        <>
          <div className="flex items-center gap-2 flex-wrap">
            {selectedCategories.map((category) => {
              const categoryInfo = postCategories.find((c) => c.value === category)
              return (
                <Badge key={category} className={`${categoryInfo?.color} text-white gap-1`}>
                  {categoryInfo?.label}
                  <button onClick={() => onCategoryToggle(category)} className="ml-1 hover:bg-black/20 rounded-full">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )
            })}
            {selectedTags.map((tag) => {
              const tagInfo = postTags.find((t) => t.value === tag)
              return (
                <Badge key={tag} variant="secondary" className="gap-1">
                  #{tagInfo?.label}
                  <button onClick={() => onTagToggle(tag)} className="ml-1 hover:bg-muted-foreground/20 rounded-full">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )
            })}
          </div>

          <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-muted-foreground">
            Clear all
          </Button>
        </>
      )}
    </div>
  )
}
