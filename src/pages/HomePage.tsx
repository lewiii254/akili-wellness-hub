
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import Testimonial from "@/components/Testimonial";
import {
  BookOpen,
  Headphones,
  Users,
  Calendar,
  ArrowRight,
  MessageCircle,
  Brain,
  Heart,
  Sparkles,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-40 overflow-hidden gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-akili-purple to-akili-blue">
              Your Journey to Mental Wellness Begins Here
            </h1>
            <p className="text-lg md:text-xl mb-10 text-foreground/80">
              Discover resources, connect with our community, and access professional support
              to help you on your path to better mental health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/resources">
                <Button size="lg" className="rounded-full px-8">
                  Explore Resources
                </Button>
              </Link>
              <Link to="/therapy">
                <Button variant="outline" size="lg" className="rounded-full px-8">
                  Book a Session
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-32 right-[10%] w-72 h-72 bg-akili-light-purple rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
          <div className="absolute bottom-32 left-[10%] w-56 h-56 bg-akili-light-blue rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How AkiliSpa Helps Your Mental Wellness
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive suite of mental wellness tools and resources
              designed to support your journey to better health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/resources">
              <FeatureCard
                title="Mental Health Resources"
                description="Access articles, guides, and tools to help you understand and manage your mental health."
                icon={<BookOpen className="h-6 w-6 text-akili-purple" />}
                className="gradient-card-resources"
              />
            </Link>
            <Link to="/media">
              <FeatureCard
                title="Wellness Media"
                description="Enjoy curated music and videos designed to reduce stress and improve mindfulness."
                icon={<Headphones className="h-6 w-6 text-akili-blue" />}
                className="gradient-card-media"
              />
            </Link>
            <Link to="/community">
              <FeatureCard
                title="Supportive Community"
                description="Connect with others who understand what you're going through in a safe, moderated environment."
                icon={<Users className="h-6 w-6 text-akili-orange" />}
                className="gradient-card-community"
              />
            </Link>
            <Link to="/therapy">
              <FeatureCard
                title="Professional Therapy"
                description="Book sessions with licensed therapists who specialize in various mental health areas."
                icon={<Calendar className="h-6 w-6 text-akili-green" />}
                className="gradient-card-therapy"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2 text-akili-purple">10k+</p>
              <p className="text-sm text-muted-foreground">Resources Accessed</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2 text-akili-blue">5k+</p>
              <p className="text-sm text-muted-foreground">Community Members</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2 text-akili-orange">500+</p>
              <p className="text-sm text-muted-foreground">Professional Therapists</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2 text-akili-green">98%</p>
              <p className="text-sm text-muted-foreground">User Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Tips Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Daily Wellness Tips</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Small practices that can make a big difference in your mental health journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl border p-6 bg-background shadow-sm">
              <Brain className="h-8 w-8 text-akili-purple mb-4" />
              <h3 className="text-xl font-medium mb-2">Mindful Breathing</h3>
              <p className="text-muted-foreground">
                Take 5 minutes each day to practice deep breathing. Inhale for 4 counts, 
                hold for 4, and exhale for 6 counts to reduce stress and anxiety.
              </p>
            </div>
            <div className="rounded-xl border p-6 bg-background shadow-sm">
              <Heart className="h-8 w-8 text-akili-purple mb-4" />
              <h3 className="text-xl font-medium mb-2">Practice Gratitude</h3>
              <p className="text-muted-foreground">
                Write down three things you're grateful for each day. This simple practice
                can shift your mindset towards positivity and well-being.
              </p>
            </div>
            <div className="rounded-xl border p-6 bg-background shadow-sm">
              <Sparkles className="h-8 w-8 text-akili-purple mb-4" />
              <h3 className="text-xl font-medium mb-2">Digital Detox</h3>
              <p className="text-muted-foreground">
                Set aside 30 minutes before bed as screen-free time. This can improve sleep quality
                and reduce anxiety related to information overload.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link to="/resources">
              <Button variant="outline" className="rounded-full">
                View More Tips <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stories from Our Community
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from people who have found support and growth through AkiliSpa's resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial
              quote="The resources and community at AkiliSpa have been instrumental in my recovery journey. I've learned coping strategies that I use every day."
              author="Sarah K."
              role="Community Member"
            />
            <Testimonial
              quote="As someone who was skeptical about online therapy, I was surprised by how effective my sessions have been. My therapist truly understands my needs."
              author="Marcus T."
              role="Therapy Client"
            />
            <Testimonial
              quote="The meditation music in the media section has become part of my daily routine. It's helped me manage my anxiety in ways I never thought possible."
              author="Priya J."
              role="Premium Member"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-akili-purple/20 to-akili-blue/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Begin Your Wellness Journey Today
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Whether you're seeking resources, professional help, or community support,
            AkiliSpa is here to guide you on your path to better mental health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/resources">
              <Button size="lg" className="rounded-full px-8">
                Explore Resources
              </Button>
            </Link>
            <Link to="/chat">
              <Button variant="outline" size="lg" className="rounded-full px-8 flex items-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat With AI Assistant
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
