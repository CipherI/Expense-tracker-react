import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { categories } from './expense-form';
import { Filter } from 'lucide-react';
import { Button } from './ui/button';

interface ExpenseFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function ExpenseFilter({ selectedCategory, onCategoryChange }: ExpenseFilterProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filter Expenses
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="filter-category">Category</Label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger id="filter-category">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedCategory !== 'all' && (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onCategoryChange('all')}
          >
            Clear Filter
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
