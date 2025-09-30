import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { ChefHat, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "@/utils/toast";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignInModal = ({ isOpen, onClose }: SignInModalProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    // Mock Google authentication - always non-premium trial user
    setTimeout(() => {
      const mockUser = {
        name: "John Doe",
        email: "john.doe@gmail.com",
        familySize: "4",
        weeklyBudget: "150",
        dietaryRestrictions: ["Vegetarian"],
        allergies: "",
        favoriteRecipes: "Pasta, Stir-fry, Tacos",
        cookingSkill: "intermediate",
        timeAvailable: "30-45"
      };

      // Store user data and session (non-premium)
      localStorage.setItem('mealplanr_user', JSON.stringify(mockUser));
      localStorage.setItem('mealplanr_authenticated', 'true');
      localStorage.setItem('mealplanr_auth_method', 'google');
      localStorage.setItem('mealplanr_premium', 'false');
      localStorage.setItem('mealplanr_trial_start', new Date().toISOString());
      
      setIsLoading(false);
      showSuccess("Successfully signed in with Google!");
      onClose();
      navigate('/dashboard');
    }, 1500);
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      showError("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    // Mock email authentication
    setTimeout(() => {
      // Check for premium user credentials
      const isPremiumUser = email === "osama@ehsaan.com" && password === "123";
      
      if (isPremiumUser) {
        // Premium user
        const premiumUser = {
          name: "Osama Ehsaan",
          email: "osama@ehsaan.com",
          familySize: "5",
          weeklyBudget: "200",
          dietaryRestrictions: ["Halal", "Organic"],
          allergies: "",
          favoriteRecipes: "Biryani, Karahi, Kebabs, Mediterranean dishes",
          cookingSkill: "advanced",
          timeAvailable: "45-60"
        };

        localStorage.setItem('mealplanr_user', JSON.stringify(premiumUser));
        localStorage.setItem('mealplanr_authenticated', 'true');
        localStorage.setItem('mealplanr_auth_method', 'email');
        localStorage.setItem('mealplanr_premium', 'true');
        // No trial start date for premium users
        localStorage.removeItem('mealplanr_trial_start');
        
        showSuccess("Welcome back, Premium user!");
      } else {
        // Regular trial user
        const mockUser = {
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          email: email,
          familySize: "3",
          weeklyBudget: "120",
          dietaryRestrictions: ["Gluten-Free"],
          allergies: "",
          favoriteRecipes: "Chicken dishes, Salads, Rice bowls",
          cookingSkill: "beginner",
          timeAvailable: "15-30"
        };

        localStorage.setItem('mealplanr_user', JSON.stringify(mockUser));
        localStorage.setItem('mealplanr_authenticated', 'true');
        localStorage.setItem('mealplanr_auth_method', 'email');
        localStorage.setItem('mealplanr_premium', 'false');
        localStorage.setItem('mealplanr_trial_start', new Date().toISOString());
        
        showSuccess("Successfully signed in!");
      }

      setIsLoading(false);
      onClose();
      navigate('/dashboard');
    }, 1000);
  };

  const handleClose = () => {
    if (!isLoading) {
      setEmail("");
      setPassword("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <ChefHat className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="text-2xl">Welcome back to MealPlanr</DialogTitle>
            <DialogDescription>
              Sign in to access your personalized meal plans and savings
            </DialogDescription>
          </div>

        <div className="space-y-6">
          {/* Google Sign In */}
          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            size="lg"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {isLoading ? "Signing in..." : "Continue with Google"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Email Sign In Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
              disabled={isLoading}
            >
              <Mail className="w-4 h-4 mr-2" />
              {isLoading ? "Signing in..." : "Sign in with Email"}
            </Button>
          </form>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => {
                onClose();
                navigate('/onboarding');
              }}
              className="text-green-600 hover:text-green-700 font-medium"
              disabled={isLoading}
            >
              Start your free trial
            </button>
          </div>

          {/* Demo credentials hint */}
          <div className="text-center text-xs text-gray-500 bg-gray-50 p-3 rounded">
            <strong>Demo Premium Account:</strong><br />
            Email: osama@ehsaan.com<br />
            Password: 123
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;