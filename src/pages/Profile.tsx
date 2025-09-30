import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChefHat, ArrowLeft, Save, User, Settings, CreditCard, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "@/utils/toast";

interface UserProfile {
  name: string;
  email: string;
  familySize: string;
  weeklyBudget: string;
  dietaryRestrictions: string[];
  allergies: string;
  favoriteRecipes: string;
  cookingSkill: string;
  timeAvailable: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    familySize: "",
    weeklyBudget: "",
    dietaryRestrictions: [],
    allergies: "",
    favoriteRecipes: "",
    cookingSkill: "",
    timeAvailable: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [trialDaysLeft, setTrialDaysLeft] = useState(7);
  const [authMethod, setAuthMethod] = useState("");
  const [isPremium, setIsPremium] = useState(false);

  const dietaryOptions = [
    "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", 
    "Paleo", "Low-Carb", "Mediterranean", "Diabetic-Friendly", "Heart-Healthy", "Halal", "Organic"
  ];

  useEffect(() => {
    // Check authentication and load user data
    const isAuthenticated = localStorage.getItem('mealplanr_authenticated');
    const storedUser = localStorage.getItem('mealplanr_user');
    const method = localStorage.getItem('mealplanr_auth_method');
    const premiumStatus = localStorage.getItem('mealplanr_premium') === 'true';
    
    if (!isAuthenticated || !storedUser) {
      navigate('/');
      return;
    }

    const userData = JSON.parse(storedUser);
    setProfile(userData);
    setAuthMethod(method || 'email');
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
  }, [navigate]);

  const handleDietaryChange = (option: string, checked: boolean) => {
    if (checked) {
      setProfile(prev => ({
        ...prev,
        dietaryRestrictions: [...prev.dietaryRestrictions, option]
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        dietaryRestrictions: prev.dietaryRestrictions.filter(item => item !== option)
      }));
    }
  };

  const handleSave = async () => {
    if (!profile.name || !profile.email || !profile.familySize || !profile.weeklyBudget) {
      showError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      localStorage.setItem('mealplanr_user', JSON.stringify(profile));
      setIsLoading(false);
      showSuccess("Profile updated successfully!");
    }, 1000);
  };

  const handleUpgradeSubscription = () => {
    if (isPremium) {
      showSuccess("You're already a Premium member!");
      return;
    }

    setIsLoading(true);
    
    // Simulate upgrade process
    setTimeout(() => {
      localStorage.setItem('mealplanr_premium', 'true');
      localStorage.removeItem('mealplanr_trial_start');
      setIsPremium(true);
      setIsLoading(false);
      showSuccess("🎉 Welcome to MealPlanr Premium! Enjoy unlimited features!");
    }, 2000);
  };

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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">
            Manage your account information and meal planning preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
                <CardDescription>
                  Update your basic account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                      disabled={authMethod === 'google'}
                    />
                    {authMethod === 'google' && (
                      <p className="text-xs text-gray-500 mt-1">
                        Email cannot be changed for Google accounts
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="familySize">Family Size *</Label>
                    <Input
                      id="familySize"
                      type="number"
                      value={profile.familySize}
                      onChange={(e) => setProfile(prev => ({ ...prev, familySize: e.target.value }))}
                      placeholder="Number of people"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weeklyBudget">Weekly Grocery Budget ($) *</Label>
                    <Input
                      id="weeklyBudget"
                      type="number"
                      value={profile.weeklyBudget}
                      onChange={(e) => setProfile(prev => ({ ...prev, weeklyBudget: e.target.value }))}
                      placeholder="Enter your budget"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dietary Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Dietary Preferences</CardTitle>
                <CardDescription>
                  Select your dietary restrictions and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Dietary Restrictions</Label>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    {dietaryOptions.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <Checkbox
                          id={option}
                          checked={profile.dietaryRestrictions.includes(option)}
                          onCheckedChange={(checked) => handleDietaryChange(option, checked as boolean)}
                        />
                        <Label htmlFor={option} className="text-sm">{option}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="allergies">Food Allergies</Label>
                  <Textarea
                    id="allergies"
                    value={profile.allergies}
                    onChange={(e) => setProfile(prev => ({ ...prev, allergies: e.target.value }))}
                    placeholder="List any food allergies or severe intolerances"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Cooking Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Cooking Preferences</CardTitle>
                <CardDescription>
                  Help us personalize your meal plans
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="favoriteRecipes">Family Favorite Meals</Label>
                  <Textarea
                    id="favoriteRecipes"
                    value={profile.favoriteRecipes}
                    onChange={(e) => setProfile(prev => ({ ...prev, favoriteRecipes: e.target.value }))}
                    placeholder="Tell us about meals your family loves"
                    rows={3}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cookingSkill">Cooking Experience Level</Label>
                    <select
                      id="cookingSkill"
                      value={profile.cookingSkill}
                      onChange={(e) => setProfile(prev => ({ ...prev, cookingSkill: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select your level</option>
                      <option value="beginner">Beginner - Simple recipes only</option>
                      <option value="intermediate">Intermediate - Comfortable with most recipes</option>
                      <option value="advanced">Advanced - Love trying complex dishes</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="timeAvailable">Time Available for Cooking</Label>
                    <select
                      id="timeAvailable"
                      value={profile.timeAvailable}
                      onChange={(e) => setProfile(prev => ({ ...prev, timeAvailable: e.target.value }))}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select typical time</option>
                      <option value="15-30">15-30 minutes</option>
                      <option value="30-45">30-45 minutes</option>
                      <option value="45-60">45-60 minutes</option>
                      <option value="60+">60+ minutes</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button 
                onClick={handleSave} 
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Account Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Plan</Label>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm">{isPremium ? "Premium" : "Free Trial"}</span>
                    {isPremium ? (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                        <Crown className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    )}
                  </div>
                </div>
                
                {!isPremium && (
                  <div>
                    <Label className="text-sm font-medium">Trial Ends</Label>
                    <p className="text-sm text-gray-600 mt-1">
                      {trialDaysLeft} days remaining
                    </p>
                  </div>
                )}
                
                <div>
                  <Label className="text-sm font-medium">Authentication</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline">
                      {authMethod === 'google' ? 'Google Account' : 'Email Account'}
                    </Badge>
                  </div>
                </div>
                
                <Separator />
                
                <Button 
                  onClick={handleUpgradeSubscription}
                  disabled={isLoading}
                  className={`w-full ${isPremium 
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700' 
                    : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {isPremium ? (
                    <>
                      <Crown className="h-4 w-4 mr-2" />
                      Premium Active
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      {isLoading ? "Upgrading..." : "Upgrade to Premium"}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Savings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="font-semibold text-green-600">
                    ${isPremium ? "47.25" : "31.50"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="font-semibold text-green-600">
                    ${isPremium ? "189.00" : "126.00"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Saved</span>
                  <span className="font-semibold text-green-600">
                    ${isPremium ? "945.00" : "126.00"}
                  </span>
                </div>
                {isPremium && (
                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-2 rounded text-center">
                    <span className="text-xs text-yellow-800 font-medium">
                      🎉 Premium savings boost active!
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preferences Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Current Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Family Size</Label>
                  <p className="text-sm text-gray-600">{profile.familySize} people</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Weekly Budget</Label>
                  <p className="text-sm text-gray-600">${profile.weeklyBudget}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Dietary Restrictions</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {profile.dietaryRestrictions.length > 0 ? (
                      profile.dietaryRestrictions.map((restriction, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {restriction}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-sm text-gray-500">None specified</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;