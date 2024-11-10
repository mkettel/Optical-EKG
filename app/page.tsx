import React from 'react';
import { Link } from "next-view-transitions";
import { Heart, Brain, BookOpen, Activity, ArrowRight, GraduationCap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex-grow bg-gradient-to-b from-white to-slate-50">
      {/* Navigation */}
      <nav className="border-b bg-white/50 backdrop-blur-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              <span className="font-bold text-xl">Optical EKG</span>
            </div>
            <div className="hidden sm:flex items-center gap-6">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/docs" className="text-gray-600 hover:text-gray-900">Documentation</Link>
              <Link href="/scene" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-red-500 hover:bg-red-600">
                Launch App
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center sm:text-left">
            <h1 className="text-4xl pt-14 sm:text-6xl font-bold text-gray-900 mb-6">
              Understand Cardiac 
              <span className="text-red-500"> Electrophysiology</span>
              <br />in 3D
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl sm:mx-0 mx-auto">
              Transform traditional EKG readings into intuitive 3D visualizations. 
              Master cardiac electrical activity through interactive learning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <Link 
                href="/scene" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-red-500 hover:bg-red-600 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/demo" 
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-full text-base font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Watch Demo
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Interactive Learning</h3>
              <p className="text-gray-600">Experience cardiac electrical activity through intuitive 3D visualizations</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-time Visualization</h3>
              <p className="text-gray-600">See the direct relationship between EKG readings and cardiac events</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Educational Focus</h3>
              <p className="text-gray-600">Designed for medical students and healthcare professionals</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <Heart className="h-5 w-5 text-red-500" />
              <span className="font-semibold">Optical EKG</span>
            </div>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-900">Terms</Link>
              <Link href="/contact" className="hover:text-gray-900">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}