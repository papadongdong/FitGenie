import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { Search, Filter, Lightbulb, Target, Heart, Dumbbell, Apple, Brain } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Tips } from '@/entities/tips';

export default function TipsPage() {
  const [tips, setTips] = useState<Tips[]>([]);
  const [filteredTips, setFilteredTips] = useState<Tips[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTips();
  }, []);

  useEffect(() => {
    filterTips();
  }, [tips, searchTerm, selectedCategory]);

  const loadTips = async () => {
    try {
      const { items } = await BaseCrudService.getAll<Tips>('tips');
      setTips(items);
    } catch (error) {
      console.error('Error loading tips:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterTips = () => {
    let filtered = tips;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(tip =>
        tip.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tip.problemAddressed?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tip => tip.category === selectedCategory);
    }

    setFilteredTips(filtered);
  };

  const getUniqueCategories = () => {
    const categories = tips.map(tip => tip.category).filter(Boolean);
    return [...new Set(categories)] as string[];
  };

  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'fitness':
        return <Dumbbell className="w-4 h-4" />;
      case 'nutrition':
        return <Apple className="w-4 h-4" />;
      case 'mental health':
        return <Brain className="w-4 h-4" />;
      case 'wellness':
        return <Heart className="w-4 h-4" />;
      case 'goals':
        return <Target className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'fitness':
        return 'bg-highlightyellow text-primary';
      case 'nutrition':
        return 'bg-primary text-highlightyellow';
      case 'mental health':
        return 'bg-secondary text-secondary-foreground';
      case 'wellness':
        return 'bg-buttonbackground text-buttontext';
      case 'goals':
        return 'bg-primary/20 text-primary';
      default:
        return 'bg-secondary/20 text-secondary';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary py-8">
        <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-highlightyellow/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Lightbulb className="w-8 h-8 text-highlightyellow" />
            </div>
            <p className="font-paragraph text-secondary-foreground text-lg">Loading health tips...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary py-8">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-highlightyellow text-4xl sm:text-5xl font-black uppercase mb-4 tracking-wide">
            Health & Fitness Tips
          </h1>
          <p className="font-paragraph text-secondary-foreground/80 text-lg max-w-2xl mx-auto">
            Discover expert advice and practical tips to help you overcome specific health and fitness challenges.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="bg-secondary border-0 p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-buttontext/60 w-5 h-5" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tips by title, content, or problem..."
                  className="pl-10 bg-buttonbackground border-0 text-buttontext placeholder:text-buttontext/60 font-paragraph"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="text-secondary-foreground w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-buttonbackground text-buttontext border-0 rounded-md px-3 py-2 font-paragraph text-sm"
                >
                  <option value="all">All Categories</option>
                  {getUniqueCategories().map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        </div>

        {/* Tips Grid */}
        {filteredTips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTips.map((tip) => (
              <Card key={tip._id} className="bg-secondary border-0 overflow-hidden group hover:scale-105 transition-transform duration-300">
                {/* Image */}
                {tip.thumbnailImage && (
                  <div className="aspect-video overflow-hidden">
                    <Image
                      src={tip.thumbnailImage}
                      alt={tip.title || 'Health tip'}
                      width={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Category Badge */}
                  {tip.category && (
                    <div className="mb-4">
                      <Badge className={`${getCategoryColor(tip.category)} font-paragraph font-semibold text-xs uppercase tracking-wide`}>
                        <span className="flex items-center space-x-1">
                          {getCategoryIcon(tip.category)}
                          <span>{tip.category}</span>
                        </span>
                      </Badge>
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="font-heading text-secondary-foreground text-xl font-bold uppercase mb-3 tracking-wide leading-tight">
                    {tip.title}
                  </h3>

                  {/* Problem Addressed */}
                  {tip.problemAddressed && (
                    <div className="mb-4">
                      <p className="font-paragraph text-highlightyellow text-sm font-semibold mb-1">
                        Problem Addressed:
                      </p>
                      <p className="font-paragraph text-secondary-foreground/80 text-sm leading-relaxed">
                        {tip.problemAddressed}
                      </p>
                    </div>
                  )}

                  {/* Content Preview */}
                  {tip.content && (
                    <div className="mb-4">
                      <p className="font-paragraph text-secondary-foreground/80 text-sm leading-relaxed">
                        {tip.content.length > 150 
                          ? `${tip.content.substring(0, 150)}...` 
                          : tip.content
                        }
                      </p>
                    </div>
                  )}

                  {/* Target Audience */}
                  {tip.targetAudience && (
                    <div className="mt-4 pt-4 border-t border-secondary-foreground/10">
                      <p className="font-paragraph text-secondary-foreground/60 text-xs">
                        <span className="font-semibold">Target Audience:</span> {tip.targetAudience}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-secondary-foreground/60" />
            </div>
            <h3 className="font-heading text-secondary-foreground text-xl font-bold uppercase mb-2 tracking-wide">
              No Tips Found
            </h3>
            <p className="font-paragraph text-secondary-foreground/60 text-sm max-w-md mx-auto">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search terms or filters to find more tips.'
                : 'No tips are currently available. Check back later for new content.'
              }
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                variant="outline"
                className="mt-4 border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary font-paragraph font-semibold"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {/* Categories Overview */}
        {tips.length > 0 && (
          <div className="mt-16">
            <Card className="bg-buttonbackground border-0 p-8">
              <h3 className="font-heading text-buttontext text-2xl font-bold uppercase mb-6 tracking-wide text-center">
                Tip Categories
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {getUniqueCategories().map(category => {
                  const categoryTips = tips.filter(tip => tip.category === category);
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(selectedCategory === category ? 'all' : category)}
                      className={`p-4 rounded-xl text-center transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-primary text-highlightyellow scale-105'
                          : 'bg-primary/10 text-buttontext hover:bg-primary/20'
                      }`}
                    >
                      <div className="flex justify-center mb-2">
                        {getCategoryIcon(category)}
                      </div>
                      <div className="font-heading text-xs font-bold uppercase tracking-wide mb-1">
                        {category}
                      </div>
                      <div className="font-paragraph text-xs opacity-80">
                        {categoryTips.length} tip{categoryTips.length !== 1 ? 's' : ''}
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-secondary border-0 p-8">
            <div className="max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-highlightyellow rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-secondary-foreground text-2xl font-bold uppercase mb-4 tracking-wide">
                Need Personalized Advice?
              </h3>
              <p className="font-paragraph text-secondary-foreground/80 text-lg mb-6">
                Get instant, personalized guidance from our FitGenius AI coach for your specific questions and challenges.
              </p>
              <Button 
                asChild
                className="bg-highlightyellow text-primary hover:bg-highlightyellow/90 font-paragraph font-bold text-lg px-8 py-4 h-auto"
              >
                <a href="/chat">
                  Chat with FitGenius AI
                  <Lightbulb className="ml-2 w-5 h-5" />
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}