import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChefHat, Users, MessageCircle, Heart, Share2, ArrowLeft, Send, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "@/utils/toast";

interface CommunityPost {
  id: string;
  author: string;
  authorAvatar: string;
  title: string;
  content: string;
  category: 'recipe' | 'tip' | 'savings' | 'question';
  likes: number;
  comments: number;
  timeAgo: string;
  tags: string[];
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface Conversation {
  id: string;
  participant: string;
  participantAvatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

const Community = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "tip" as 'recipe' | 'tip' | 'savings' | 'question'
  });

  useEffect(() => {
    // Load mock community data
    const mockPosts: CommunityPost[] = [
      {
        id: "1",
        author: "Sarah M.",
        authorAvatar: "",
        title: "Saved $45 this week with MealPlanr!",
        content: "Just wanted to share my success story! By following the AI meal plans and shopping at the recommended stores, I managed to save $45 compared to my usual grocery bill. The leftover management feature helped me use up everything I bought. Highly recommend trying the batch cooking suggestions!",
        category: "savings",
        likes: 23,
        comments: 8,
        timeAgo: "2 hours ago",
        tags: ["savings", "success-story", "batch-cooking"]
      },
      {
        id: "2",
        author: "Mike R.",
        authorAvatar: "",
        title: "Quick 15-minute dinner recipe",
        content: "For busy parents: Chicken and veggie stir-fry that takes only 15 minutes! Use pre-cut frozen vegetables and leftover cooked chicken. Add soy sauce, garlic powder, and serve over instant rice. My kids love it and it costs under $8 for the whole family.",
        category: "recipe",
        likes: 31,
        comments: 12,
        timeAgo: "4 hours ago",
        tags: ["quick-meals", "family-friendly", "budget"]
      },
      {
        id: "3",
        author: "Jennifer L.",
        authorAvatar: "",
        title: "How do you handle picky eaters?",
        content: "My 7-year-old is extremely picky and won't eat most of the meals suggested by the AI. Any tips for getting kids to try new foods while still staying on budget? I'm struggling to balance nutrition, cost, and what my child will actually eat.",
        category: "question",
        likes: 15,
        comments: 24,
        timeAgo: "6 hours ago",
        tags: ["picky-eaters", "kids", "help-needed"]
      },
      {
        id: "4",
        author: "David K.",
        authorAvatar: "",
        title: "Pro tip: Check store apps before shopping",
        content: "I've been using MealPlanr for 3 months now, and here's an extra tip: always check your grocery store's app for digital coupons before you go shopping. I stack these with the deals MealPlanr finds and save an extra 10-15% on top of the AI recommendations!",
        category: "tip",
        likes: 42,
        comments: 6,
        timeAgo: "1 day ago",
        tags: ["coupons", "extra-savings", "pro-tip"]
      }
    ];

    const mockConversations: Conversation[] = [
      {
        id: "1",
        participant: "Sarah M.",
        participantAvatar: "",
        lastMessage: "Thanks for the batch cooking tips!",
        timestamp: "10 min ago",
        unread: true
      },
      {
        id: "2",
        participant: "Mike R.",
        participantAvatar: "",
        lastMessage: "That stir-fry recipe sounds perfect",
        timestamp: "2 hours ago",
        unread: false
      },
      {
        id: "3",
        participant: "Jennifer L.",
        participantAvatar: "",
        lastMessage: "My kids are picky too, let's chat",
        timestamp: "1 day ago",
        unread: false
      }
    ];

    setPosts(mockPosts);
    setConversations(mockConversations);
  }, []);

  const createPost = () => {
    if (!newPost.title || !newPost.content) return;

    const post: CommunityPost = {
      id: Date.now().toString(),
      author: "You",
      authorAvatar: "",
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      likes: 0,
      comments: 0,
      timeAgo: "Just now",
      tags: []
    };

    setPosts(prev => [post, ...prev]);
    setNewPost({ title: "", content: "", category: "tip" });
    setShowNewPost(false);
    showSuccess("Post shared with the community!");
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      isOwn: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
    showSuccess("Message sent!");
  };

  const loadConversation = (conversationId: string) => {
    setSelectedConversation(conversationId);
    // Mock messages for the conversation
    const mockMessages: Message[] = [
      {
        id: "1",
        sender: "Sarah M.",
        content: "Hi! I saw your comment on my savings post. Do you have any other batch cooking tips?",
        timestamp: "2:30 PM",
        isOwn: false
      },
      {
        id: "2",
        sender: "You",
        content: "Yes! I love making big batches of rice and freezing portions. Also, cooking a whole chicken gives you meat for multiple meals.",
        timestamp: "2:35 PM",
        isOwn: true
      },
      {
        id: "3",
        sender: "Sarah M.",
        content: "Thanks for the batch cooking tips!",
        timestamp: "2:40 PM",
        isOwn: false
      }
    ];
    setMessages(mockMessages);
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      recipe: "bg-green-100 text-green-800",
      tip: "bg-blue-100 text-blue-800",
      savings: "bg-yellow-100 text-yellow-800",
      question: "bg-purple-100 text-purple-800"
    };
    return <Badge className={colors[category as keyof typeof colors]}>{category}</Badge>;
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
            <Button onClick={() => setShowNewPost(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Hub</h1>
          <p className="text-gray-600">
            Connect with other budget-conscious families and share money-saving tips
          </p>
        </div>

        {/* New Post Form */}
        {showNewPost && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Share with the Community</CardTitle>
              <CardDescription>
                Share your recipes, tips, savings stories, or ask questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  placeholder="Post title..."
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value as any }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="tip">Money-Saving Tip</option>
                  <option value="recipe">Recipe Share</option>
                  <option value="savings">Savings Story</option>
                  <option value="question">Question/Help</option>
                </select>
              </div>
              <div>
                <Textarea
                  placeholder="Share your thoughts..."
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  rows={4}
                />
              </div>
              <div className="flex space-x-4">
                <Button onClick={createPost} className="bg-green-600 hover:bg-green-700">
                  Share Post
                </Button>
                <Button variant="outline" onClick={() => setShowNewPost(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Community Tabs */}
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="posts" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Community Posts</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Messages</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={post.authorAvatar} />
                          <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold">{post.author}</span>
                            {getCategoryBadge(post.category)}
                          </div>
                          <span className="text-sm text-gray-500">{post.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <button className="flex items-center space-x-1 hover:text-red-500">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-500">
                        <MessageCircle className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-green-500">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Conversations List */}
              <Card>
                <CardHeader>
                  <CardTitle>Conversations</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {conversations.map((conv) => (
                      <button
                        key={conv.id}
                        onClick={() => loadConversation(conv.id)}
                        className={`w-full p-4 text-left hover:bg-gray-50 border-b ${
                          selectedConversation === conv.id ? 'bg-green-50' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={conv.participantAvatar} />
                            <AvatarFallback>{conv.participant.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">{conv.participant}</span>
                              {conv.unread && (
                                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 truncate">{conv.lastMessage}</p>
                            <span className="text-xs text-gray-400">{conv.timestamp}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chat Window */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>
                    {selectedConversation 
                      ? conversations.find(c => c.id === selectedConversation)?.participant
                      : "Select a conversation"
                    }
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedConversation ? (
                    <div className="space-y-4">
                      {/* Messages */}
                      <div className="h-64 overflow-y-auto space-y-3 p-4 bg-gray-50 rounded-lg">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                                message.isOwn
                                  ? 'bg-green-600 text-white'
                                  : 'bg-white border'
                              }`}
                            >
                              <p>{message.content}</p>
                              <span className={`text-xs ${
                                message.isOwn ? 'text-green-100' : 'text-gray-500'
                              }`}>
                                {message.timestamp}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Message Input */}
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <Button onClick={sendMessage} size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Select a conversation to start chatting</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;