
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, DollarSign, Video, Lock } from "lucide-react";

const TherapyPage = () => {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 gradient-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Therapy</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Connect with licensed therapists specializing in various mental health areas, with flexible scheduling and secure video sessions.
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 text-center bg-akili-light-green/30 border-2 border-akili-green/20">
            <div className="w-20 h-20 rounded-full bg-akili-green/20 flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-10 w-10 text-akili-green" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Therapy Booking Coming Soon!</h2>
            <p className="text-lg mb-6">
              We're in the process of partnering with experienced therapists to provide you with quality mental health support. Join our waitlist to be first in line when we launch.
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="rounded-full px-8">
                Join Waitlist
              </Button>
            </div>
          </Card>
        </div>

        {/* Therapy Benefits */}
        <div className="mt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            The Benefits of Professional Therapy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 shadow-sm border">
              <h3 className="text-xl font-medium mb-4">Personalized Support</h3>
              <p className="text-muted-foreground">
                Work one-on-one with a therapist who understands your specific needs and can provide tailored guidance for your mental health journey.
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm border">
              <h3 className="text-xl font-medium mb-4">Professional Expertise</h3>
              <p className="text-muted-foreground">
                Access evidence-based therapeutic approaches from licensed professionals with specialized training in various mental health areas.
              </p>
            </div>
            <div className="bg-background rounded-xl p-6 shadow-sm border">
              <h3 className="text-xl font-medium mb-4">Safe Environment</h3>
              <p className="text-muted-foreground">
                Express yourself in a confidential, non-judgmental space designed to support your growth and healing process.
              </p>
            </div>
          </div>
        </div>

        {/* How It Will Work */}
        <div className="mt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            How Our Therapy Service Will Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative">
              <div className="absolute top-0 -left-3 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-akili-green flex items-center justify-center text-white font-medium z-10">
                1
              </div>
              <div className="pt-14 md:pt-16 pb-6 px-6 bg-background rounded-xl shadow-sm border text-center relative">
                <h3 className="text-lg font-medium mb-3">Find Your Therapist</h3>
                <p className="text-muted-foreground">
                  Browse profiles of licensed therapists based on specialties, approaches, and availability.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-0 -left-3 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-akili-green flex items-center justify-center text-white font-medium z-10">
                2
              </div>
              <div className="pt-14 md:pt-16 pb-6 px-6 bg-background rounded-xl shadow-sm border text-center">
                <h3 className="text-lg font-medium mb-3">Book Your Session</h3>
                <p className="text-muted-foreground">
                  Select a convenient time slot from your therapist's calendar and make a secure payment.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-0 -left-3 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-akili-green flex items-center justify-center text-white font-medium z-10">
                3
              </div>
              <div className="pt-14 md:pt-16 pb-6 px-6 bg-background rounded-xl shadow-sm border text-center">
                <h3 className="text-lg font-medium mb-3">Attend Your Session</h3>
                <p className="text-muted-foreground">
                  Connect with your therapist via our secure video platform at your scheduled time.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute top-0 -left-3 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-akili-green flex items-center justify-center text-white font-medium z-10">
                4
              </div>
              <div className="pt-14 md:pt-16 pb-6 px-6 bg-background rounded-xl shadow-sm border text-center">
                <h3 className="text-lg font-medium mb-3">Ongoing Support</h3>
                <p className="text-muted-foreground">
                  Schedule follow-up sessions as needed and track your progress over time.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Preview */}
        <div className="mt-20 bg-secondary/70 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Planned Therapy Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl overflow-hidden border border-akili-green/30">
              <div className="p-6 bg-akili-light-green/40">
                <h3 className="text-xl font-semibold text-center">Single Session</h3>
              </div>
              <div className="p-6">
                <div className="flex justify-center items-baseline mb-4">
                  <span className="text-3xl font-bold">$89</span>
                  <span className="text-muted-foreground ml-1">/ session</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-akili-green" />
                    <span>50-minute session</span>
                  </li>
                  <li className="flex items-center">
                    <Video className="h-5 w-5 mr-3 text-akili-green" />
                    <span>Secure video platform</span>
                  </li>
                  <li className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-3 text-akili-green" />
                    <span>Pay as you go</span>
                  </li>
                </ul>
                <Button className="w-full" disabled>Coming Soon</Button>
              </div>
            </div>
            <div className="bg-background rounded-xl overflow-hidden border-2 border-akili-green relative">
              <div className="absolute top-4 right-4">
                <span className="bg-akili-green text-white text-xs px-3 py-1 rounded-full">Most Popular</span>
              </div>
              <div className="p-6 bg-akili-green/20">
                <h3 className="text-xl font-semibold text-center">Monthly Package</h3>
              </div>
              <div className="p-6">
                <div className="flex justify-center items-baseline mb-4">
                  <span className="text-3xl font-bold">$299</span>
                  <span className="text-muted-foreground ml-1">/ month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-akili-green" />
                    <span>4 sessions per month</span>
                  </li>
                  <li className="flex items-center">
                    <Video className="h-5 w-5 mr-3 text-akili-green" />
                    <span>Secure video platform</span>
                  </li>
                  <li className="flex items-center">
                    <Lock className="h-5 w-5 mr-3 text-akili-green" />
                    <span>Text support between sessions</span>
                  </li>
                  <li className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-3 text-akili-green" />
                    <span>Save 16% compared to single sessions</span>
                  </li>
                </ul>
                <Button className="w-full" variant="default" disabled>Coming Soon</Button>
              </div>
            </div>
            <div className="bg-background rounded-xl overflow-hidden border border-akili-green/30">
              <div className="p-6 bg-akili-light-green/40">
                <h3 className="text-xl font-semibold text-center">Quarterly Package</h3>
              </div>
              <div className="p-6">
                <div className="flex justify-center items-baseline mb-4">
                  <span className="text-3xl font-bold">$799</span>
                  <span className="text-muted-foreground ml-1">/ quarter</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Clock className="h-5 w-5 mr-3 text-akili-green" />
                    <span>12 sessions per quarter</span>
                  </li>
                  <li className="flex items-center">
                    <Video className="h-5 w-5 mr-3 text-akili-green" />
                    <span>Secure video platform</span>
                  </li>
                  <li className="flex items-center">
                    <Lock className="h-5 w-5 mr-3 text-akili-green" />
                    <span>Priority text support</span>
                  </li>
                  <li className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-3 text-akili-green" />
                    <span>Save 25% compared to single sessions</span>
                  </li>
                </ul>
                <Button className="w-full" disabled>Coming Soon</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapyPage;
