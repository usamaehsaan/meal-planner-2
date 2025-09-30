import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, DollarSign, Users, Clock, ShoppingCart, Recycle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SignInModal from "@/components/SignInModal";

const Index = () => {
  const navigate = useNavigate();
  const [showSignInModal, setShowSignInModal] = useState(false);

  const features = [
    {
      icon: <ChefHat className="h-8 w-8 text-green-600" />,
      title: "AI-Driven Meal Planning",
      description: "Get personalized weekly meal plans based on your dietary needs and budget"
    },
    {
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      title: "Cost Optimization",
      description: "Reduce grocery costs by 20-30% with smart price comparisons and local deals"
    },
    {
      icon: <ShoppingCart className="h-8 w-8 text-green-600" />,
      title: "Smart Shopping Lists",
      description: "Organized shopping lists optimized by store and price for efficient trips"
    },
    {
      icon: <Recycle className="h-8 w-8 text-green-600" />,
      title: "Leftover Management",
      description: "Minimize food waste with creative leftover suggestions and batch cooking guides"
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Community Support",
      description: "Share recipes, tips, and savings stories with other budget-conscious families"
    },
    {
      icon: <Clock className="h-8 w-8 text-green-600" />,
      title: "5-Minute Planning",
      description: "Turn meal planning into a quick 5-minute weekly routine"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">MealPlanr</span>
          </div>
          <div className="space-x-4">
            <Button variant="ghost" onClick={() => setShowSignInModal(true)}>
              Sign In
            </Button>
            <Button onClick={() => navigate('/onboarding')}>
              Start Free Trial
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Smart Meal Planning for
          <span className="text-green-600"> Budget-Conscious Families</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Reduce grocery costs by 20-30% with AI-driven meal plans, smart shopping lists, 
          and community-powered savings tips. Turn meal planning into a 5-minute weekly routine.
        </p>
        <div className="space-x-4">
          <Button size="lg" onClick={() => navigate('/onboarding')} className="bg-green-600 hover:bg-green-700">
            Start Your Free 7-Day Trial
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/demo')}>
            See How It Works
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          No credit card required • Cancel anytime • $5-10/month after trial
        </p>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Everything You Need to Save Money and Time
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">20-30%</div>
              <div className="text-green-100">Average Grocery Savings</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5 Min</div>
              <div className="text-green-100">Weekly Planning Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">70%</div>
              <div className="text-green-100">User Retention Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Ready to Transform Your Meal Planning?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of families saving money and time with MealPlanr
        </p>
        <Button size="lg" onClick={() => navigate('/onboarding')} className="bg-green-600 hover:bg-green-700">
          Start Your Free Trial Today
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ChefHat className="h-6 w-6" />
            <span className="text-xl font-bold">MealPlanr</span>
          </div>
          <p className="text-gray-400">
            Smart meal planning for budget-conscious families
          </p>
        </div>
      </footer>

      {/* Sign In Modal */}
      <SignInModal 
        isOpen={showSignInModal} 
        onClose={() => setShowSignInModal(false)} 
      />
    </div>
  );
};

export default Index;