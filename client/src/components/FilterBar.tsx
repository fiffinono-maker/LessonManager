import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { useState } from "react";

interface FilterBarProps {
  onSearch?: (query: string) => void;
  onDifficultyChange?: (difficulty: string) => void;
  onDurationChange?: (duration: string) => void;
}

export default function FilterBar({ onSearch, onDifficultyChange, onDurationChange }: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch?.(searchQuery);
    console.log('Search:', searchQuery);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 bg-card border rounded-lg">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search challenges..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="pl-10"
          data-testid="input-search-challenges"
        />
      </div>
      
      <Select onValueChange={onDifficultyChange}>
        <SelectTrigger className="w-full md:w-[180px]" data-testid="select-difficulty">
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="easy">Easy</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="hard">Hard</SelectItem>
        </SelectContent>
      </Select>
      
      <Select onValueChange={onDurationChange}>
        <SelectTrigger className="w-full md:w-[180px]" data-testid="select-duration">
          <SelectValue placeholder="Duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any Duration</SelectItem>
          <SelectItem value="short">1-2 weeks</SelectItem>
          <SelectItem value="medium">3-4 weeks</SelectItem>
          <SelectItem value="long">1+ months</SelectItem>
        </SelectContent>
      </Select>
      
      <Button 
        onClick={handleSearch}
        data-testid="button-apply-filters"
      >
        <Filter className="w-4 h-4 mr-2" />
        Apply
      </Button>
    </div>
  );
}
