import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChefHat, Recycle, Plus, Clock, AlertTriangle, ArrowLeft, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "@/utils/toast";

interface LeftoverItem {
  id: string;
  name: string;
  quantity: string;
  type: 'over-purchased' | 'post-cooking';
  dateAdded: string;
  expiryDate: string;
  category: string;
  suggestions: string[];
  used: boolean;
}

const Leftovers = () => {
  const navigate = useNavigate();
  const [leftovers, setLeftovers] = useState<LeftoverItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    type: "over-purchased" as 'over-purchased' | 'post-cooking',
    category: "",
    expiryDate: ""
  });

  useEffect(() => {
    // Load existing leftovers from localStorage
    const stored = localStorage.getItem('mealplanr_leftovers');
    if (stored) {
      setLeftovers(JSON.parse(stored));
    } else {
      // Initialize with some mock data
      const mockLeftovers: LeftoverItem[] = [
        {
          id: "1",
          name: "Cooked Ground Beef",
          quantity: "1 cup",
          type: "post-cooking",
          dateAdded: "2024-03-08",
          expiryDate: "2024-03-11",
          category: "Meat",
          suggestions: [
            "Add to tomorrow's tacos",
            "Make beef and rice bowl",
            "Use in pasta sauce",
            "Create shepherd's pie"
          ],
          used: false
        },
        {
          id: "2", 
          name: "Extra Bananas",
          quantity: "3 pieces",
          type: "over-purchased",
          dateAdded: "2024-03-07",
          expiryDate: "2024-03-10",
          category: "Produce",
          suggestions: [
            "Make banana bread",
            "Add to smoothies",
            "Freeze for later use",
            "Make banana pancakes"
          ],
          used: false
        },
        {
          id: "3",
          name: "Leftover Rice",
          quantity: "2 cups",
          type: "post-cooking",
          dateAdded: "2024-03-08",
          expiryDate: "2024-03-12",
          category: "Grains",
          suggestions: [
            "Make fried rice",
            "Add to soup",
            "Create rice pudding",
            "Use in stuffed peppers"
          ],
          used: false
        }
      ];
      setLeftovers(mockLeftovers);
      localStorage.setItem('mealplanr_leftovers', JSON.stringify(mockLeftovers));
    }
  }, []);

  const addLeftover = () => {
    if (!newItem.name || !newItem.quantity) return;

    const leftoverItem: LeftoverItem = {
      id: Date.now().toString(),
      name: newItem.name,
      quantity: newItem.quantity,
      type: newItem.type,
      dateAdded: new Date().toISOString().split('T')[0],
      expiryDate: newItem.expiryDate,
      category: newItem.category,
      suggestions: generateSuggestions(newItem.name, newItem.type),
      used: false
    };

    const updated = [...leftovers, leftoverItem];
    setLeftovers(updated);
    localStorage.setItem('mealplanr_leftovers', JSON.stringify(updated));
    
    setNewItem({
      name: "",
      quantity: "",
      type: "over-purchased",
      category: "",
      expiryDate: ""
    });
    setShowAddForm(false);
    showSuccess("Leftover item added successfully!");
  };

  const generateSuggestions = (itemName: string, type: 'over-purchased' | 'post-cooking'): string[] => {
    // Mock AI-generated suggestions based on item name and type
    const suggestions = [
      `Use ${itemName.toLowerCase()} in tomorrow's meal`,
      `Create a new recipe with ${itemName.toLowerCase()}`,
      `Add to next week's meal plan`,
      `Freeze for future use`
    ];
    return suggestions;
  };

  const markAsUsed = (id: string) => {
    const updated = leftovers.map(item => 
      item.id === id ? { ...item, used: true } : item
    );
    setLeftovers(updated);
    localStorage.setItem('mealplanr_leftovers', JSON.stringify(updated));
    showSuccess("Great! Item marked as used.");
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryBadge = (expiryDate: string) => {
    const days = getDaysUntilExpiry(expiryDate);
    if (days < 0) {
      return <Badge variant="destructive">Expired</Badge>;
    } else if (days <= 1) {
      return <Badge variant="destructive">Use Today</Badge>;
    } else if (days <= 3) {
      return <Badge className="bg-yellow-100 text-yellow-800">Use Soon</Badge>;
    } else {
      return <Badge variant="secondary">{days} days left</Badge>;
    }
  };

  const activeLeftovers = leftovers.filter(item => !item.used);
  const usedLeftovers = leftovers.filter(item => item.used);
  const expiringItems = activeLeftovers.filter(item => getDaysUntilExpiry(item.expiryDate) <= 3);

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
            <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Leftover
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leftover Management</h1>
          <p className="text-gray-600">
            Track over-purchased groceries and post-cooking leftovers to minimize waste
          </p>
        </div>

        {/* Alert for Expiring Items */}
        {expiringItems.length > 0 && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-yellow-800">
                <AlertTriangle className="h-5 w-5" />
                <span>Items Expiring Soon</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {expiringItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <span className="font-medium">{item.name} ({item.quantity})</span>
                    {getExpiryBadge(item.expiryDate)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add Leftover Form */}
        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Leftover Item</CardTitle>
              <CardDescription>
                Track over-purchased groceries or post-cooking leftovers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input
                    id="itemName"
                    value={newItem.name}
                    onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Cooked Chicken, Extra Apples"
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem(prev => ({ ...prev, quantity: e.target.value }))}
                    placeholder="e.g., 2 cups, 3 pieces"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Type</Label>
                  <select
                    id="type"
                    value={newItem.type}
                    onChange={(e) => setNewItem(prev => ({ ...prev, type: e.target.value as 'over-purchased' | 'post-cooking' }))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="over-purchased">Over-purchased Grocery</option>
                    <option value="post-cooking">Post-cooking Leftover</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newItem.category}
                    onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., Meat, Produce, Dairy"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={newItem.expiryDate}
                  onChange={(e) => setNewItem(prev => ({ ...prev, expiryDate: e.target.value }))}
                />
              </div>

              <div className="flex space-x-4">
                <Button onClick={addLeftover} className="bg-green-600 hover:bg-green-700">
                  Add Item
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leftovers Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active" className="flex items-center space-x-2">
              <Recycle className="h-4 w-4" />
              <span>Active Leftovers ({activeLeftovers.length})</span>
            </TabsTrigger>
            <TabsTrigger value="used" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Used Items ({usedLeftovers.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="space-y-4">
              {activeLeftovers.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <Recycle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No active leftovers tracked yet.</p>
                    <Button onClick={() => setShowAddForm(true)} className="mt-4">
                      Add Your First Item
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                activeLeftovers.map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <span>{item.name}</span>
                            <Badge variant="outline">
                              {item.type === 'over-purchased' ? 'Over-purchased' : 'Post-cooking'}
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            {item.quantity} • {item.category} • Added {new Date(item.dateAdded).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getExpiryBadge(item.expiryDate)}
                          <Button onClick={() => markAsUsed(item.id)} size="sm">
                            Mark as Used
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-3">
                          <Lightbulb className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-blue-800">AI Suggestions</span>
                        </div>
                        <ul className="space-y-1">
                          {item.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm text-blue-700">
                              • {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="used">
            <div className="space-y-4">
              {usedLeftovers.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No used items yet. Great job preventing waste!</p>
                  </CardContent>
                </Card>
              ) : (
                usedLeftovers.map((item) => (
                  <Card key={item.id} className="opacity-75">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <span className="line-through">{item.name}</span>
                        <Badge variant="secondary">Used</Badge>
                      </CardTitle>
                      <CardDescription>
                        {item.quantity} • {item.category} • Used successfully
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Leftovers;