import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, ArrowRight, User, Brain, ShoppingCart, Recycle, Users, DollarSign, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Demo = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: 1,
      icon: <User className="h-8 w-8 text-green-600" />,
      title: "Set Up Your Profile",
      description: "Tell us about your family size, budget, dietary restrictions, and cooking preferences",
      details: [
        "Family size and weekly grocery budget",
        "Dietary restrictions and allergies",
        "Favorite family meals",
        "Cooking skill level and time available"
      ],
      mockData: {
        familySize: "4 people",
        budget: "$120/week",
        restrictions: "Gluten-Free, Dairy-Free"
      }
    },
    {
      number: 2,
      icon: <Brain className="h-8 w-8 text-green-600" />,
      title: "AI Generates Your Meal Plan",
      description: "Our AI creates a personalized weekly meal plan optimized for your budget and preferences",
      details: [
        "Considers your dietary restrictions",
        "Incorporates your favorite meals",
        "Optimizes for your cooking time",
        "Balances nutrition and cost"
      ],
      mockData: {
        meals: "21 meals planned",
        time: "Generated in 30 seconds",
        cost: "$94.00 (under budget!)"
      }
    },
    {
      number: 3,
      icon: <ShoppingCart className="h-8 w-8 text-green-600" />,
      title: "Get Smart Shopping Lists",
      description: "Receive organized shopping lists with the best prices from local stores",
      details: [
        "Organized by store for efficient shopping",
        "Shows sale items and best prices",
        "Includes quantity and category",
        "Tracks your shopping progress"
      ],
      mockData: {
        stores: "3 stores (Walmart, Kroger, Aldi)",
        items: "24 items total",
        savings: "$31.50 in savings"
      }
    },
    {
      number: 4,
      icon: <Recycle className="h-8 w-8 text-green-600" />,
      title: "Manage Leftovers",
      description: "Track leftovers and get AI suggestions to minimize food waste",
      details: [
        "Log over-purchased groceries",
        "Track post-cooking leftovers",
        "Get creative recipe suggestions",
        "Automatic meal plan integration"
      ],
      mockData: {
        tracked: "5 leftover items",
        suggestions: "12 recipe ideas",
        waste: "85% waste reduction"
      }
    },
    {
      number: 5,
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Join the Community",
      description: "Connect with other families to share tips, recipes, and savings stories",
      details: [
        "Share money-saving tips",
        "Exchange family recipes",
        "Ask questions and get help",
        "Private messaging with other users"
      ],
      mockData: {
        members: "10,000+ active families",
        posts: "500+ tips shared daily",
        savings: "Average $200/month saved"
      }
    }
  ];

  const benefits = [
    {
      icon: <DollarSign className="h-6 w-6 text-green-600" />,
      title: "20-30% Grocery Savings",
      description: "Save money with optimized shopping and local deal integration"
    },
    {
      icon: <Clock className="h-6 w-6 text-green-600" />,
      title: "5-Minute Planning",
      description: "Turn meal planning from hours into a quick weekly routine"
    },
    {
      icon: <Recycle className="h-6 w-6 text-green-600" />,
      title: "Reduce Food Waste",
      description: "Smart leftover management helps you use everything you buy"
    },
    {
      icon: <Users className="h-6 w-6 text-green-600" />,
      title: "Community Support",
      description: "Learn from thousands of other budget-conscious families"
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
            <Button variant="ghost" onClick={() => navigate('/')}>
              Back to Home
            </Button>
            <Button onClick={() => navigate('/onboarding')} className="bg-green-600 hover:bg-green-700">
              Start Free Trial
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          How MealPlanr Works
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          See how our AI-powered meal planning system helps families save money and time in just 5 simple steps
        </p>
        <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
          Average savings: $200+ per month
        </Badge>
      </section>

      {/* Steps Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={step.number} className={`flex items-center gap-12 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}>
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step.number}
                  </div>
                  {step.icon}
                  <h2 className="text-3xl font-bold text-gray-900">{step.title}</h2>
                </div>
                
                <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">What happens:</h3>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Example results:</h3>
                    <div className="bg-green-50 p-4 rounded-lg">
                      {Object.entries(step.mockData).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center py-1">
                          <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="font-medium text-green-800">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual */}
              <div className="flex-1">
                <Card className="shadow-lg">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      {step.icon}
                    </div>
                    <CardTitle>Step {step.number}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {step.number === 1 && (
                      <div className="space-y-4">
                        <div className="border rounded p-3">
                          <label className="text-sm font-medium">Family Size</label>
                          <div className="text-lg">4 people</div>
                        </div>
                        <div className="border rounded p-3">
                          <label className="text-sm font-medium">Weekly Budget</label>
                          <div className="text-lg text-green-600">$120</div>
                        </div>
                        <div className="border rounded p-3">
                          <label className="text-sm font-medium">Dietary Restrictions</label>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline">Gluten-Free</Badge>
                            <Badge variant="outline">Dairy-Free</Badge>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {step.number === 2 && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>Monday Dinner</span>
                          <span className="text-green-600">$12.50</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>Tuesday Lunch</span>
                          <span className="text-green-600">$8.75</span>
                        </div>
                        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>Wednesday Breakfast</span>
                          <span className="text-green-600">$6.25</span>
                        </div>
                        <div className="border-t pt-2 mt-3">
                          <div className="flex justify-between font-semibold">
                            <span>Total Week</span>
                            <span className="text-green-600">$94.00</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {step.number === 3 && (
                      <div className="space-y-3">
                        <div className="border-l-4 border-blue-500 pl-3">
                          <div className="font-medium">Walmart</div>
                          <div className="text-sm text-gray-600">8 items • $32.50</div>
                        </div>
                        <div className="border-l-4 border-red-500 pl-3">
                          <div className="font-medium">Kroger</div>
                          <div className="text-sm text-gray-600">6 items • $28.75</div>
                        </div>
                        <div className="border-l-4 border-yellow-500 pl-3">
                          <div className="font-medium">Aldi</div>
                          <div className="text-sm text-gray-600">10 items • $32.75</div>
                        </div>
                        <div className="bg-green-100 p-2 rounded text-center">
                          <span className="text-green-800 font-medium">$31.50 saved!</span>
                        </div>
                      </div>
                    )}
                    
                    {step.number === 4 && (
                      <div className="space-y-3">
                        <div className="border rounded p-3">
                          <div className="font-medium">Leftover Rice</div>
                          <div className="text-sm text-gray-600">2 cups • Expires in 3 days</div>
                          <div className="text-xs text-blue-600 mt-1">💡 Make fried rice tomorrow</div>
                        </div>
                        <div className="border rounded p-3">
                          <div className="font-medium">Extra Bananas</div>
                          <div className="text-sm text-gray-600">3 pieces • Use today</div>
                          <div className="text-xs text-blue-600 mt-1">💡 Perfect for banana bread</div>
                        </div>
                      </div>
                    )}
                    
                    {step.number === 5 && (
                      <div className="space-y-3">
                        <div className="border rounded p-3">
                          <div className="font-medium">Sarah M.</div>
                          <div className="text-sm text-gray-600">"Saved $45 this week!"</div>
                          <div className="flex gap-1 mt-1">
                            <Badge variant="outline" className="text-xs">savings</Badge>
                            <Badge variant="outline" className="text-xs">tips</Badge>
                          </div>
                        </div>
                        <div className="border rounded p-3">
                          <div className="font-medium">Mike R.</div>
                          <div className="text-sm text-gray-600">"15-min dinner recipe"</div>
                          <div className="flex gap-1 mt-1">
                            <Badge variant="outline" className="text-xs">recipe</Badge>
                            <Badge variant="outline" className="text-xs">quick</Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Families Love MealPlanr
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Your Weekly Routine
        </h2>
        <div className="flex items-center justify-center space-x-4 overflow-x-auto pb-4">
          {[
            "Set Preferences",
            "Generate Plan", 
            "Shop Smart",
            "Cook & Track",
            "Share & Save"
          ].map((step, index) => (
            <div key={index} className="flex items-center space-x-4 min-w-max">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mb-2">
                  {index + 1}
                </div>
                <div className="text-sm font-medium text-gray-700">{step}</div>
              </div>
              {index < 4 && (
                <ArrowRight className="h-6 w-6 text-gray-400" />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Badge className="bg-green-100 text-green-800 text-lg px-6 py-2">
            Total time: Just 5 minutes per week!
          </Badge>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of families already saving money and time with MealPlanr
          </p>
          <div className="space-x-4">
            <Button size="lg" onClick={() => navigate('/onboarding')} className="bg-white text-green-600 hover:bg-gray-100">
              Start Your Free 7-Day Trial
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/')} className="border-white text-gray-900 bg-white hover:bg-gray-100">
              Learn More
            </Button>
          </div>
          <p className="text-sm text-green-100 mt-4">
            No credit card required • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default Demo;