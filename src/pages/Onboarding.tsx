import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { ChefHat, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "@/utils/toast";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    familySize: "",
    weeklyBudget: "",
    dietaryRestrictions: [] as string[],
    allergies: "",
    favoriteRecipes: "",
    cookingSkill: "",
    timeAvailable: ""
  });

  const dietaryOptions = [
    "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", 
    "Paleo", "Low-Carb", "Mediterranean", "Diabetic-Friendly", "Heart-Healthy"
  ];

  const handleDietaryChange = (option: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        dietaryRestrictions: [...prev.dietaryRestrictions, option]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        dietaryRestrictions: prev.dietaryRestrictions.filter(item => item !== option)
      }));
    }
  };

  const handleComplete = () => {
    // Save user data to localStorage (frontend-only implementation)
    localStorage.setItem('mealplanr_user', JSON.stringify(formData));
    localStorage.setItem('mealplanr_trial_start', new Date().toISOString());
    
    showSuccess("Welcome to MealPlanr! Your profile has been created.");
    navigate('/dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label htmlFor="familySize">Family Size</Label>
              <Input
                id="familySize"
                type="number"
                value={formData.familySize}
                onChange={(e) => setFormData(prev => ({ ...prev, familySize: e.target.value }))}
                placeholder="Number of people in your household"
              />
            </div>
            <div>
              <Label htmlFor="weeklyBudget">Weekly Grocery Budget ($)</Label>
              <Input
                id="weeklyBudget"
                type="number"
                value={formData.weeklyBudget}
                onChange={(e) => setFormData(prev => ({ ...prev, weeklyBudget: e.target.value }))}
                placeholder="Enter your weekly grocery budget"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium">Dietary Preferences & Restrictions</Label>
              <p className="text-sm text-gray-600 mb-4">Select all that apply to your family</p>
              <div className="grid grid-cols-2 gap-3">
                {dietaryOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={option}
                      checked={formData.dietaryRestrictions.includes(option)}
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
                value={formData.allergies}
                onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
                placeholder="List any food allergies or severe intolerances"
                rows={3}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="favoriteRecipes">Family Favorite Meals</Label>
              <Textarea
                id="favoriteRecipes"
                value={formData.favoriteRecipes}
                onChange={(e) => setFormData(prev => ({ ...prev, favoriteRecipes: e.target.value }))}
                placeholder="Tell us about meals your family loves (e.g., spaghetti and meatballs, chicken stir-fry, etc.)"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="cookingSkill">Cooking Experience Level</Label>
              <select
                id="cookingSkill"
                value={formData.cookingSkill}
                onChange={(e) => setFormData(prev => ({ ...prev, cookingSkill: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select your cooking level</option>
                <option value="beginner">Beginner - Simple recipes only</option>
                <option value="intermediate">Intermediate - Comfortable with most recipes</option>
                <option value="advanced">Advanced - Love trying complex dishes</option>
              </select>
            </div>
            <div>
              <Label htmlFor="timeAvailable">Time Available for Cooking</Label>
              <select
                id="timeAvailable"
                value={formData.timeAvailable}
                onChange={(e) => setFormData(prev => ({ ...prev, timeAvailable: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select typical cooking time</option>
                <option value="15-30">15-30 minutes</option>
                <option value="30-45">30-45 minutes</option>
                <option value="45-60">45-60 minutes</option>
                <option value="60+">60+ minutes</option>
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = [
    "Basic Information",
    "Dietary Preferences",
    "Cooking Preferences"
  ];

  const stepDescriptions = [
    "Let's start with some basic information about you and your family",
    "Help us understand your dietary needs and restrictions",
    "Tell us about your cooking style and preferences"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-2">
          <ChefHat className="h-8 w-8 text-green-600" />
          <span className="text-2xl font-bold text-gray-900">MealPlanr</span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex items-center justify-center space-x-4">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step >= stepNumber ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  step > stepNumber ? 'bg-green-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{stepTitles[step - 1]}</CardTitle>
            <CardDescription className="text-base">
              {stepDescriptions[step - 1]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => step > 1 ? setStep(step - 1) : navigate('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{step > 1 ? 'Previous' : 'Back to Home'}</span>
              </Button>
              
              {step < 3 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                  disabled={
                    (step === 1 && (!formData.name || !formData.email || !formData.familySize || !formData.weeklyBudget)) ||
                    (step === 2 && formData.dietaryRestrictions.length === 0)
                  }
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={!formData.cookingSkill || !formData.timeAvailable}
                >
                  Complete Setup
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;