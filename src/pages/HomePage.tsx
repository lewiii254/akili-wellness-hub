
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import Testimonial from "@/components/Testimonial";
import HeroSection from "@/components/HeroSection";
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
  Smile,
  Award,
  CheckCircle,
} from "lucide-react";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-akili-purple tracking-wider uppercase mb-2 inline-block">
              Features ✨
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How AkiliSpa Helps Your Mental Wellness
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our comprehensive suite of mental wellness tools and resources
              designed to support your journey to better health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/resources" className="interactive-hover">
              <FeatureCard
                title="Mental Health Resources 📚"
                description="Access articles, guides, and tools to help you understand and manage your mental health."
                icon={<BookOpen className="h-6 w-6 text-akili-purple" />}
                className="gradient-card-resources"
              />
            </Link>
            <Link to="/media" className="interactive-hover">
              <FeatureCard
                title="Wellness Media 🎧"
                description="Enjoy curated music and videos designed to reduce stress and improve mindfulness."
                icon={<Headphones className="h-6 w-6 text-akili-blue" />}
                className="gradient-card-media"
              />
            </Link>
            <Link to="/community" className="interactive-hover">
              <FeatureCard
                title="Supportive Community 👥"
                description="Connect with others who understand what you're going through in a safe, moderated environment."
                icon={<Users className="h-6 w-6 text-akili-orange" />}
                className="gradient-card-community"
              />
            </Link>
            <Link to="/therapy" className="interactive-hover">
              <FeatureCard
                title="Professional Therapy 🧠"
                description="Book sessions with licensed therapists who specialize in various mental health areas."
                icon={<Calendar className="h-6 w-6 text-akili-green" />}
                className="gradient-card-therapy"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm">
              <p className="text-4xl font-bold mb-2 text-akili-purple">10k+</p>
              <p className="text-sm text-muted-foreground">Resources Accessed 📚</p>
            </div>
            <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm">
              <p className="text-4xl font-bold mb-2 text-akili-blue">5k+</p>
              <p className="text-sm text-muted-foreground">Community Members 👥</p>
            </div>
            <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm">
              <p className="text-4xl font-bold mb-2 text-akili-orange">500+</p>
              <p className="text-sm text-muted-foreground">Professional Therapists 🧠</p>
            </div>
            <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-sm">
              <p className="text-4xl font-bold mb-2 text-akili-green">98%</p>
              <p className="text-sm text-muted-foreground">User Satisfaction 😊</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Tips Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-akili-blue tracking-wider uppercase mb-2 inline-block">
              Wellness Tips 💡
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Daily Wellness Tips</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Small practices that can make a big difference in your mental health journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl border p-6 bg-background shadow-sm hover:shadow-md transition-all">
              <div className="mb-4 bg-akili-light-purple w-14 h-14 rounded-full flex items-center justify-center">
                <Brain className="h-8 w-8 text-akili-purple" />
              </div>
              <h3 className="text-xl font-medium mb-2">Mindful Breathing 🧘</h3>
              <p className="text-muted-foreground">
                Take 5 minutes each day to practice deep breathing. Inhale for 4 counts, 
                hold for 4, and exhale for 6 counts to reduce stress and anxiety.
              </p>
            </div>
            <div className="rounded-xl border p-6 bg-background shadow-sm hover:shadow-md transition-all">
              <div className="mb-4 bg-akili-light-pink w-14 h-14 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-akili-purple" />
              </div>
              <h3 className="text-xl font-medium mb-2">Practice Gratitude 🙏</h3>
              <p className="text-muted-foreground">
                Write down three things you're grateful for each day. This simple practice
                can shift your mindset towards positivity and well-being.
              </p>
            </div>
            <div className="rounded-xl border p-6 bg-background shadow-sm hover:shadow-md transition-all">
              <div className="mb-4 bg-akili-light-blue w-14 h-14 rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-akili-blue" />
              </div>
              <h3 className="text-xl font-medium mb-2">Digital Detox 📵</h3>
              <p className="text-muted-foreground">
                Set aside 30 minutes before bed as screen-free time. This can improve sleep quality
                and reduce anxiety related to information overload.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link to="/resources">
              <Button variant="outline" className="rounded-full group">
                View More Tips 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section (New) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-akili-light-purple/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-akili-purple tracking-wider uppercase mb-2 inline-block">
              Benefits 🏆
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose AkiliSpa</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform offers unique benefits designed to support your mental wellness journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-background rounded-xl border shadow-sm">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-akili-green mr-3" />
                <h3 className="text-xl font-medium">Personalized Support 🎯</h3>
              </div>
              <p className="text-muted-foreground">
                Our AI analyzes your preferences and needs to recommend resources tailored specifically for you.
              </p>
            </div>
            <div className="p-6 bg-background rounded-xl border shadow-sm">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-akili-green mr-3" />
                <h3 className="text-xl font-medium">Evidence-Based Methods 📊</h3>
              </div>
              <p className="text-muted-foreground">
                All our resources and therapeutic approaches are based on the latest research in psychology and neuroscience.
              </p>
            </div>
            <div className="p-6 bg-background rounded-xl border shadow-sm">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-akili-green mr-3" />
                <h3 className="text-xl font-medium">24/7 Access ⏰</h3>
              </div>
              <p className="text-muted-foreground">
                Get support whenever you need it with our always-available resources and AI-powered chat assistance.
              </p>
            </div>
            <div className="p-6 bg-background rounded-xl border shadow-sm">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-akili-green mr-3" />
                <h3 className="text-xl font-medium">Privacy Focused 🔒</h3>
              </div>
              <p className="text-muted-foreground">
                Your mental health journey is private. We prioritize data security and confidentiality in all our services.
              </p>
            </div>
            <div className="p-6 bg-background rounded-xl border shadow-sm">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-akili-green mr-3" />
                <h3 className="text-xl font-medium">Holistic Approach 🌱</h3>
              </div>
              <p className="text-muted-foreground">
                We address mental wellness from all angles: psychological, emotional, social, and physiological.
              </p>
            </div>
            <div className="p-6 bg-background rounded-xl border shadow-sm">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-akili-green mr-3" />
                <h3 className="text-xl font-medium">Affordable Options 💰</h3>
              </div>
              <p className="text-muted-foreground">
                Mental wellness shouldn't be a luxury. We offer services at various price points to ensure accessibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-akili-orange tracking-wider uppercase mb-2 inline-block">
              Testimonials 💬
            </span>
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
              className="animate-fade-in"
            />
            <Testimonial
              quote="As someone who was skeptical about online therapy, I was surprised by how effective my sessions have been. My therapist truly understands my needs."
              author="Marcus T."
              role="Therapy Client"
              className="animate-fade-in animate-delay-200"
            />
            <Testimonial
              quote="The meditation music in the media section has become part of my daily routine. It's helped me manage my anxiety in ways I never thought possible."
              author="Priya J."
              role="Premium Member"
              className="animate-fade-in animate-delay-300"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-akili-purple/20 to-akili-blue/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Begin Your Wellness Journey Today ✨
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Whether you're seeking resources, professional help, or community support,
            AkiliSpa is here to guide you on your path to better mental health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/resources">
              <Button size="lg" className="rounded-full px-8 shadow-md hover:shadow-lg transition-all">
                Explore Resources 📚
              </Button>
            </Link>
            <Link to="/chat">
              <Button variant="outline" size="lg" className="rounded-full px-8 border-2 hover:border-primary hover:bg-primary/5 flex items-center">
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat With AI Assistant 🤖
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 text-sm text-muted-foreground">
            <p className="flex items-center justify-center">
              <Award className="h-4 w-4 mr-2 text-akili-purple" />
              Trusted by thousands of users worldwide
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
