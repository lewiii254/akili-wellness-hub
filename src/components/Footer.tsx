
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-akili-purple to-akili-blue flex items-center justify-center">
                <span className="font-bold text-white text-lg">A</span>
              </div>
              <span className="font-poppins font-semibold text-xl bg-clip-text text-transparent bg-gradient-to-r from-akili-purple to-akili-blue">
                AkiliSpa
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Empowering mental wellness through mindful resources, supportive
              community, and professional guidance.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-foreground text-sm">
                  Mental Health Articles
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-foreground text-sm">
                  Self-Help Guides
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-foreground text-sm">
                  Crisis Support
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-foreground text-sm">
                  Wellness Tips
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Services
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/therapy" className="text-muted-foreground hover:text-foreground text-sm">
                  Book Therapy
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-muted-foreground hover:text-foreground text-sm">
                  Join Community
                </Link>
              </li>
              <li>
                <Link to="/media" className="text-muted-foreground hover:text-foreground text-sm">
                  Wellness Media
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-muted-foreground hover:text-foreground text-sm">
                  AI Chat Support
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground text-sm">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground text-sm">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AkiliSpa. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0 flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for mental wellness
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
