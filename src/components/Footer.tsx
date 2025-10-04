import React from "react";
import Link from "next/link";
import JustiFiLogo from "./JustiFiLogo";

const Footer = () => (
  <footer className="bg-background border-t border-border py-8 px-4">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center lg:justify-between space-y-6 lg:space-y-0">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-lg">
            <JustiFiLogo />
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-6 lg:gap-8">
          <Link 
            href="/" 
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Contact
          </Link>
          <Link 
            href="/pricing" 
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Pricing
          </Link>
          <Link 
            href="/dashboard" 
            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
          >
            Dashboard
          </Link>
        </nav>

        {/* Copyright */}
        <p className="text-muted-foreground text-sm text-center lg:text-right">
          © 2025 JustiFi. All rights reserved.
        </p>
      </div>
      
      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            AI-powered legal case management platform
          </p>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
