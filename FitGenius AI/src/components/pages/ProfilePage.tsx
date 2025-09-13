import { useMember } from '@/integrations';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Calendar, Shield, Edit, Settings, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';

export default function ProfilePage() {
  const { member, actions } = useMember();

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Not available';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-400/20 text-green-400';
      case 'PENDING':
        return 'bg-yellow-400/20 text-yellow-400';
      case 'BLOCKED':
        return 'bg-red-400/20 text-red-400';
      case 'OFFLINE':
        return 'bg-gray-400/20 text-gray-400';
      default:
        return 'bg-secondary/20 text-secondary-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-primary py-8">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-highlightyellow text-4xl sm:text-5xl font-black uppercase mb-4 tracking-wide">
            Your Profile
          </h1>
          <p className="font-paragraph text-secondary-foreground/80 text-lg max-w-2xl mx-auto">
            Manage your account information and track your fitness journey.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <Card className="bg-secondary border-0 p-8">
              <div className="flex items-center space-x-4 mb-8">
                {/* Profile Photo */}
                <div className="relative">
                  {member?.profile?.photo?.url ? (
                    <Image src={member.profile.photo.url} alt="Profile" className="w-20 h-20 rounded-full object-cover border-4 border-highlightyellow" />
                  ) : (
                    <div className="w-20 h-20 bg-highlightyellow rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-primary" />
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Edit className="w-3 h-3 text-highlightyellow" />
                  </div>
                </div>

                {/* Basic Info */}
                <div className="flex-1">
                  <h2 className="font-heading text-secondary-foreground text-2xl font-bold uppercase tracking-wide mb-1">
                    {member?.profile?.nickname || 
                     `${member?.contact?.firstName || ''} ${member?.contact?.lastName || ''}`.trim() || 
                     'User'}
                  </h2>
                  {member?.profile?.title && (
                    <p className="font-paragraph text-secondary-foreground/80 text-sm mb-2">
                      {member.profile.title}
                    </p>
                  )}
                  <div className="flex items-center space-x-2">
                    <Badge className={`${getStatusColor(member?.status)} font-paragraph font-semibold text-xs uppercase tracking-wide`}>
                      {member?.status || 'Unknown'}
                    </Badge>
                    {member?.loginEmailVerified && (
                      <Badge className="bg-green-400/20 text-green-400 font-paragraph font-semibold text-xs uppercase tracking-wide">
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-secondary-foreground text-lg font-bold uppercase mb-4 tracking-wide">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-highlightyellow" />
                      </div>
                      <div>
                        <p className="font-paragraph text-secondary-foreground/60 text-xs uppercase tracking-wide">
                          Email Address
                        </p>
                        <p className="font-paragraph text-secondary-foreground text-sm">
                          {member?.loginEmail || 'Not provided'}
                        </p>
                      </div>
                    </div>

                    {member?.contact?.phones && member.contact.phones.length > 0 && (
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-buttonbackground rounded-lg flex items-center justify-center">
                          <Shield className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-paragraph text-secondary-foreground/60 text-xs uppercase tracking-wide">
                            Phone Number
                          </p>
                          <p className="font-paragraph text-secondary-foreground text-sm">
                            {member.contact.phones[0]}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Account Information */}
                <div>
                  <h3 className="font-heading text-secondary-foreground text-lg font-bold uppercase mb-4 tracking-wide">
                    Account Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-highlightyellow rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-paragraph text-secondary-foreground/60 text-xs uppercase tracking-wide">
                          Member Since
                        </p>
                        <p className="font-paragraph text-secondary-foreground text-sm">
                          {formatDate(member?._createdDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-secondary/50 rounded-lg flex items-center justify-center">
                        <Activity className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <div>
                        <p className="font-paragraph text-secondary-foreground/60 text-xs uppercase tracking-wide">
                          Last Login
                        </p>
                        <p className="font-paragraph text-secondary-foreground text-sm">
                          {formatDate(member?.lastLoginDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/50 rounded-lg flex items-center justify-center">
                        <Settings className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-paragraph text-secondary-foreground/60 text-xs uppercase tracking-wide">
                          Last Updated
                        </p>
                        <p className="font-paragraph text-secondary-foreground text-sm">
                          {formatDate(member?._updatedDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="bg-buttonbackground border-0 p-6">
              <h3 className="font-heading text-buttontext text-lg font-bold uppercase mb-4 tracking-wide">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button 
                  asChild
                  className="w-full bg-primary text-highlightyellow hover:bg-primary/90 font-paragraph font-semibold justify-start"
                >
                  <Link to="/chat">
                    <User className="w-4 h-4 mr-2" />
                    Chat with FitGenius AI
                  </Link>
                </Button>
                
                <Button 
                  asChild
                  variant="outline"
                  className="w-full border-buttontext/20 text-buttontext hover:bg-buttontext hover:text-buttonbackground font-paragraph font-semibold justify-start"
                >
                  <Link to="/bmi">
                    <Activity className="w-4 h-4 mr-2" />
                    Calculate BMI
                  </Link>
                </Button>
                
                <Button 
                  asChild
                  variant="outline"
                  className="w-full border-buttontext/20 text-buttontext hover:bg-buttontext hover:text-buttonbackground font-paragraph font-semibold justify-start"
                >
                  <Link to="/diet">
                    <Settings className="w-4 h-4 mr-2" />
                    Get Diet Plan
                  </Link>
                </Button>
              </div>
            </Card>

            {/* Account Actions */}
            <Card className="bg-secondary border-0 p-6">
              <h3 className="font-heading text-secondary-foreground text-lg font-bold uppercase mb-4 tracking-wide">
                Account
              </h3>
              <div className="space-y-3">
                <Button
                  onClick={actions.logout}
                  variant="outline"
                  className="w-full border-secondary-foreground/20 text-secondary-foreground hover:bg-red-500 hover:text-white hover:border-red-500 font-paragraph font-semibold justify-start"
                >
                  Sign Out
                </Button>
              </div>
            </Card>

            {/* Fitness Journey Stats */}
            <Card className="bg-highlightyellow border-0 p-6">
              <h3 className="font-heading text-primary text-lg font-bold uppercase mb-4 tracking-wide">
                Your Journey
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-heading font-black text-primary mb-1">
                    {member?._createdDate ? Math.floor((Date.now() - new Date(member._createdDate).getTime()) / (1000 * 60 * 60 * 24)) : 0}
                  </div>
                  <p className="font-paragraph text-primary/80 text-xs uppercase tracking-wide">
                    Days as Member
                  </p>
                </div>
                
                <div className="text-center pt-4 border-t border-primary/20">
                  <p className="font-paragraph text-primary/80 text-sm leading-relaxed">
                    Keep up the great work on your fitness journey! Every step counts towards your goals.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="bg-primary/20 border border-primary-foreground/10 p-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-highlightyellow flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading text-primary-foreground font-bold text-sm uppercase mb-2 tracking-wide">
                  Privacy & Security
                </h4>
                <p className="font-paragraph text-primary-foreground/80 text-sm leading-relaxed">
                  Your personal information is secure and protected. We use industry-standard security measures to keep your data safe. 
                  You can update your profile information or delete your account at any time by contacting our support team.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}