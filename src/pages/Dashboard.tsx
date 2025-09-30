import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChefHat, Calendar, ShoppingCart, DollarSign, Users, Recycle, Plus, Clock, LogOut, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "@/utils/toast";

interface UserData {
  name: string;
  email: string;
  familySize: string;
  weeklyBudget: string;
  dietaryRestrictions: string[];
}

interface MealPlan {
  id: string;
  week: string;
  meals: {
    day: string;
    breakfast: string;
    lunch: string;
    dinner: string;
    estimatedCost: number;
  }[];
  totalCost: number;
  savings: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentMealPlan, setCurrentMealPlan] = useState<MealPlan | null>(null);
  const [trialDaysLeft, setTrialDaysLeft] = useState(7);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('mealplanr_authenticated');
    const storedUser = localStorage.getItem('mealplanr_user');
    const premiumStatus = localStorage.getItem('mealplanr_premium') === 'true';
    
    if (!isAuthenticated || !storedUser) {
      navigate('/');
      return;
    }

    setUserData(JSON.parse(storedUser));
    setIsPremium(premiumStatus);

    // Calculate trial days left (only for non-premium users)
    if (!premiumStatus) {
      const trialStart = localStorage.getItem('mealplanr_trial_start');
      if (trialStart) {
        const startDate = new Date(trialStart);
        const now = new Date();
        const daysPassed = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        setTrialDaysLeft(Math.max(0, 7 - daysPassed));
      }
    }

    // Generate mock meal plan
    generateMockMealPlan(premiumStatus);
  }, [navigate]);

  const generateMockMealPlan = (premium: boolean) => {
    const mockMealPlan: MealPlan = {
      id: "week-1",
      week: "March 4-10, 2024",
      meals: [
        {
          day: "Monday",
          breakfast: premium ? "Avocado Toast with Poached Eggs" : "Overnight Oats with Berries",
          lunch: premium ? "Quinoa Buddha Bowl" : "Turkey & Avocado Wrap",
          dinner: premium ? "Herb-Crusted Salmon with Asparagus" : "Spaghetti with Meat Sauce",
          estimatedCost: premium ? 15.75 : 12.50
        },
        {
          day: "Tuesday", 
          breakfast: premium ? "Greek Yogurt Parfait with Granola" : "Scrambled Eggs & Toast",
          lunch: premium ? "Mediterranean Chickpea Salad" : "Leftover Spaghetti",
          dinner: premium ? "Thai Basil Chicken Stir-Fry" : "Chicken Stir-Fry",
          estimatedCost: premium ? 13.25 : 10.75
        },
        {
          day: "Wednesday",
          breakfast: premium ? "Smoothie Bowl with Superfoods" : "Greek Yogurt Parfait",
          lunch: premium ? "Gourmet Grilled Chicken Salad" : "Chicken Salad Sandwich",
          dinner: premium ? "Korean BBQ Beef Tacos" : "Beef Tacos",
          estimatedCost: premium ? 16.50 : 14.25
        },
        {
          day: "Thursday",
          breakfast: premium ? "Protein Pancakes with Berries" : "Banana Pancakes",
          lunch: premium ? "Leftover Korean BBQ Bowl" : "Leftover Beef Tacos",
          dinner: premium ? "Pan-Seared Cod with Lemon Risotto" : "Baked Salmon with Rice",
          estimatedCost: premium ? 18.25 : 16.00
        },
        {
          day: "Friday",
          breakfast: premium ? "Acai Bowl with Coconut" : "Smoothie Bowl",
          lunch: premium ? "Sushi Bowl with Edamame" : "Tuna Salad Wrap",
          dinner: premium ? "Artisan Pizza with Prosciutto" : "Homemade Pizza",
          estimatedCost: premium ? 14.75 : 11.50
        },
        {
          day: "Saturday",
          breakfast: premium ? "French Toast with Maple Compote" : "French Toast",
          lunch: premium ? "Gourmet Grilled Cheese & Tomato Bisque" : "Grilled Cheese & Soup",
          dinner: premium ? "Moroccan Lamb Tagine" : "Slow Cooker Chili",
          estimatedCost: premium ? 19.50 : 13.75
        },
        {
          day: "Sunday",
          breakfast: premium ? "Eggs Benedict with Hollandaise" : "Breakfast Burrito",
          lunch: premium ? "Leftover Lamb Tagine" : "Leftover Chili",
          dinner: premium ? "Herb-Roasted Chicken with Root Vegetables" : "Roast Chicken Dinner",
          estimatedCost: premium ? 17.25 : 15.25
        }
      ],
      totalCost: premium ? 115.25 : 94.00,
      savings: premium ? 47.25 : 31.50
    };
    setCurrentMealPlan(mockMealPlan);
  };

  const handleSignOut = () => {
    localStorage.removeItem('mealplanr_authenticated');
    localStorage.removeItem('mealplanr_auth_method');
    localStorage.removeItem('mealplanr_premium');
    showSuccess("Successfully signed out");
    navigate('/');
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">MealPlanr</span>
            </div>
            <div className="flex items-center space-x-4">
              {isPremium ? (
                <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium Member
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {trialDaysLeft} days left in trial
                </Badge>
              )}
              <Button variant="outline" onClick={() => navigate('/profile')}>
                Profile
              </Button>
              <Button onClick={() => navigate('/community')}>
                Community
              </Button>
              <Button variant="ghost" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userData.name}! {isPremium && "👑"}
          </h1>
          <p className="text-gray-600">
            Here's your personalized meal planning dashboard for a family of {userData.familySize}
            {isPremium && " • Premium features active"}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${userData.weeklyBudget}</div>
              <p className="text-xs text-muted-foreground">
                Target spending limit
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week's Cost</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${currentMealPlan?.totalCost.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                ${(parseFloat(userData.weeklyBudget) - (currentMealPlan?.totalCost || 0)).toFixed(2)} under budget
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Savings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${currentMealPlan?.savings.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                {isPremium ? "35%" : "25%"} saved this week
                {isPremium && " 🎉"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Planning Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isPremium ? "2 min" : "3 min"}</div>
              <p className="text-xs text-muted-foreground">
                Last meal plan generation
                {isPremium && " ⚡"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="meal-plan" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="meal-plan" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Meal Plan</span>
            </TabsTrigger>
            <TabsTrigger value="shopping" className="flex items-center space-x-2">
              <ShoppingCart className="h-4 w-4" />
              <span>Shopping</span>
            </TabsTrigger>
            <TabsTrigger value="leftovers" className="flex items-center space-x-2">
              <Recycle className="h-4 w-4" />
              <span>Leftovers</span>
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Community</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="meal-plan">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>This Week's Meal Plan</span>
                      {isPremium && <Crown className="h-4 w-4 text-yellow-500" />}
                    </CardTitle>
                    <CardDescription>
                      {currentMealPlan?.week} • {isPremium ? "Premium gourmet meals" : "Optimized for your budget and preferences"}
                    </CardDescription>
                  </div>
                  <Button onClick={() => navigate('/meal-plan-generator')} className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Generate New Plan
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {currentMealPlan && (
                  <div className="space-y-4">
                    {currentMealPlan.meals.map((meal, index) => (
                      <div key={index} className={`border rounded-lg p-4 ${isPremium ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200' : ''}`}>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-lg">{meal.day}</h3>
                          <Badge variant="outline">${meal.estimatedCost.toFixed(2)}</Badge>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-600">Breakfast:</span>
                            <p>{meal.breakfast}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">Lunch:</span>
                            <p>{meal.lunch}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-600">Dinner:</span>
                            <p>{meal.dinner}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shopping">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Smart Shopping List</span>
                  {isPremium && <Crown className="h-4 w-4 text-yellow-500" />}
                </CardTitle>
                <CardDescription>
                  {isPremium ? "Premium store optimization with exclusive deals" : "Organized by store and optimized for the best prices"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate('/shopping-list')} className="w-full">
                  View Full Shopping List
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leftovers">
            <Card>
              <CardHeader>
                <CardTitle>Leftover Management</CardTitle>
                <CardDescription>
                  Track leftovers and get suggestions to minimize waste
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate('/leftovers')} className="w-full">
                  Manage Leftovers
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community">
            <Card>
              <CardHeader>
                <CardTitle>Community Hub</CardTitle>
                <CardDescription>
                  Connect with other families and share money-saving tips
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate('/community')} className="w-full">
                  Join the Community
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;