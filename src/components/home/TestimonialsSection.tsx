
import React from "react";
import Testimonial from "@/components/Testimonial";

const TestimonialsSection = () => {
  return (
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
  );
};

export default TestimonialsSection;
