import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ChefHat, ShoppingCart, MapPin, DollarSign, ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  price: number;
  store: string;
  onSale: boolean;
  checked: boolean;
}

interface StoreGroup {
  storeName: string;
  items: ShoppingItem[];
  totalCost: number;
  savings: number;
}

const ShoppingList = () => {
  const navigate = useNavigate();
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [storeGroups, setStoreGroups] = useState<StoreGroup[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    // Generate mock shopping list data
    const mockItems: ShoppingItem[] = [
      // Walmart items
      { id: "1", name: "Ground Beef (1 lb)", quantity: "1 lb", category: "Meat", price: 4.98, store: "Walmart", onSale: false, checked: false },
      { id: "2", name: "Spaghetti Pasta", quantity: "1 box", category: "Pantry", price: 1.24, store: "Walmart", onSale: true, checked: false },
      { id: "3", name: "Marinara Sauce", quantity: "1 jar", category: "Pantry", price: 1.98, store: "Walmart", onSale: false, checked: false },
      { id: "4", name: "Eggs (12 count)", quantity: "1 dozen", category: "Dairy", price: 2.48, store: "Walmart", onSale: true, checked: false },
      { id: "5", name: "Bread (Whole Wheat)", quantity: "1 loaf", category: "Bakery", price: 2.28, store: "Walmart", onSale: false, checked: false },
      
      // Kroger items
      { id: "6", name: "Chicken Breast (2 lbs)", quantity: "2 lbs", category: "Meat", price: 7.99, store: "Kroger", onSale: true, checked: false },
      { id: "7", name: "Mixed Vegetables (Frozen)", quantity: "1 bag", category: "Frozen", price: 2.49, store: "Kroger", onSale: false, checked: false },
      { id: "8", name: "Rice (2 lb bag)", quantity: "1 bag", category: "Pantry", price: 2.99, store: "Kroger", onSale: false, checked: false },
      { id: "9", name: "Greek Yogurt (32 oz)", quantity: "1 container", category: "Dairy", price: 4.99, store: "Kroger", onSale: true, checked: false },
      
      // Aldi items
      { id: "10", name: "Bananas", quantity: "2 lbs", category: "Produce", price: 1.38, store: "Aldi", onSale: false, checked: false },
      { id: "11", name: "Avocados", quantity: "4 count", category: "Produce", price: 2.99, store: "Aldi", onSale: false, checked: false },
      { id: "12", name: "Tortillas (8 count)", quantity: "1 pack", category: "Bakery", price: 1.49, store: "Aldi", onSale: false, checked: false },
      { id: "13", name: "Ground Turkey (1 lb)", quantity: "1 lb", category: "Meat", price: 3.99, store: "Aldi", onSale: true, checked: false },
      { id: "14", name: "Canned Tomatoes", quantity: "2 cans", category: "Pantry", price: 1.78, store: "Aldi", onSale: false, checked: false },
    ];

    setShoppingItems(mockItems);
    
    // Group items by store
    const grouped = mockItems.reduce((acc, item) => {
      const existingStore = acc.find(group => group.storeName === item.store);
      if (existingStore) {
        existingStore.items.push(item);
        existingStore.totalCost += item.price;
        if (item.onSale) {
          existingStore.savings += item.price * 0.15; // Assume 15% savings on sale items
        }
      } else {
        acc.push({
          storeName: item.store,
          items: [item],
          totalCost: item.price,
          savings: item.onSale ? item.price * 0.15 : 0
        });
      }
      return acc;
    }, [] as StoreGroup[]);

    setStoreGroups(grouped);
    setTotalCost(mockItems.reduce((sum, item) => sum + item.price, 0));
    setTotalSavings(mockItems.filter(item => item.onSale).reduce((sum, item) => sum + (item.price * 0.15), 0));
  }, []);

  const toggleItemChecked = (itemId: string) => {
    setShoppingItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
    
    setStoreGroups(prev => 
      prev.map(group => ({
        ...group,
        items: group.items.map(item => 
          item.id === itemId ? { ...item, checked: !item.checked } : item
        )
      }))
    );
  };

  const checkedItemsCount = shoppingItems.filter(item => item.checked).length;
  const completionPercentage = Math.round((checkedItemsCount / shoppingItems.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <ChefHat className="h-8 w-8 text-green-600" />
                <span className="text-2xl font-bold text-gray-900">MealPlanr</span>
              </div>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export List
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Shopping List</h1>
          <p className="text-gray-600">
            Organized by store and optimized for the best prices • Week of March 4-10, 2024
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{shoppingItems.length}</div>
              <p className="text-xs text-muted-foreground">
                {checkedItemsCount} completed ({completionPercentage}%)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalCost.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Estimated total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${totalSavings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                From sale items
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Stores</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{storeGroups.length}</div>
              <p className="text-xs text-muted-foreground">
                Optimized route
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Shopping List by Store */}
        <div className="space-y-6">
          {storeGroups.map((group, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-green-600" />
                      <span>{group.storeName}</span>
                    </CardTitle>
                    <CardDescription>
                      {group.items.length} items • ${group.totalCost.toFixed(2)} total
                      {group.savings > 0 && (
                        <span className="text-green-600 ml-2">
                          • ${group.savings.toFixed(2)} savings
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">
                    {group.items.filter(item => item.checked).length}/{group.items.length} done
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={item.checked}
                          onCheckedChange={() => toggleItemChecked(item.id)}
                        />
                        <div className={`${item.checked ? 'line-through text-gray-500' : ''}`}>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-600">{item.quantity} • {item.category}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {item.onSale && (
                          <Badge variant="secondary" className="bg-red-100 text-red-800">
                            Sale
                          </Badge>
                        )}
                        <span className="font-semibold">${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button onClick={() => navigate('/meal-plan-generator')} variant="outline">
            Regenerate List
          </Button>
          <Button onClick={() => navigate('/leftovers')} className="bg-green-600 hover:bg-green-700">
            Track Purchases
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;