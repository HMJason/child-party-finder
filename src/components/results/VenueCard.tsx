"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPriceRange, parseActivities } from "@/lib/utils";
import type { Provider } from "@/types";

interface VenueCardProps {
  provider: Provider;
}

export function VenueCard({ provider }: VenueCardProps) {
  const activities = parseActivities(provider.activities);

  const getActivityIcon = (activity: string) => {
    const icons: Record<string, string> = {
      "Soft Play": "🧸",
      "Bowling": "🎳",
      "Trampoline Park": "🏃",
      "Swimming Pool": "🏊",
      "Art & Craft": "🎨",
      "Cooking Class": "👨‍🍳",
      "Magic Show": "✨",
      "Dance/Music": "💃",
      "Animal Experience": "🦒",
      "Bouncy Castle": "🏰",
      "Cinema": "🎬",
      "Laser Tag": "🔫",
      "Go Karting": "🏎️",
      "Mini Golf": "⛳",
      "Climbing Wall": "🧗",
      "Science Workshop": "🔬",
      "STEM Activity": "🤖",
      "Drama Workshop": "🎭",
      "Face Painting": "🎨",
      "Balloon Artist": "🎈",
      "Puppet Show": "🧚",
      "Karaoke": "🎤",
      "Video Game Arcade": "🎮",
      "Escape Room": "🔐",
      "Sports": "⚽",
      "Outdoor": "🌳",
      "Museum": "🏛️",
      "Ice Skating": "❄️",
      "Martial Arts": "🥋",
      "Indoor Skiing": "🎿",
      "Nature Walk": "🌿",
      "Storytelling": "📚",
      "Film": "🎥",
      "Zoo": "🦁",
      "Water Sports": "🚣",
    };
    return icons[activity] || "🎉";
  };

  const getPriceDisplay = () => {
    if (provider.priceMin === 0 && provider.priceMax === 0) {
      return "Free";
    }
    return formatPriceRange(provider.priceMin, provider.priceMax);
  };

  const isFree = provider.priceMin === 0 && provider.priceMax === 0;

  return (
    <div className="group h-full">
      <Card className="flex flex-col h-full overflow-hidden card-glow">
        <div className="relative h-52 overflow-hidden">
          {provider.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={provider.imageUrl}
              alt={provider.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="text-6xl">🎉</span>
            </div>
          )}
          <div className="absolute inset-0 image-overlay"></div>
          
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full badge-borough backdrop-blur-sm">
              📍 {provider.borough}
            </span>
          </div>

          {isFree && (
            <div className="absolute top-3 right-3">
              <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                🎉 Free
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 p-5 flex flex-col">
          <h3 className="font-heading font-bold text-xl text-dark dark:text-white mb-2 group-hover:text-primary transition-colors">
            {provider.name}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
            {provider.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {activities.slice(0, 4).map((activity) => (
              <span 
                key={activity} 
                className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full badge-activity"
              >
                <span>{getActivityIcon(activity)}</span>
                {activity}
              </span>
            ))}
            {activities.length > 4 && (
              <span className="inline-flex items-center text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                +{activities.length - 4} more
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <span className="text-lg">👶</span>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Ages</p>
                <p className="font-semibold text-dark dark:text-white">{provider.ageMin}-{provider.ageMax} yrs</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                <span className="text-lg">👥</span>
              </div>
              <div>
                <p className="text-gray-400 text-xs">Capacity</p>
                <p className="font-semibold text-dark dark:text-white">{provider.minCapacity}-{provider.maxCapacity}</p>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
            {provider.distance !== undefined && provider.distance !== null && (
              <div className="flex items-center gap-2 mb-3 text-sm">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                  <span className="text-lg">📏</span>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Distance</p>
                  <p className="font-semibold text-dark dark:text-white">{provider.distance.toFixed(1)} miles</p>
                </div>
              </div>
            )}
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-gray-500 text-sm">From</span>
              <div>
                <span className={`text-2xl font-heading font-bold ${isFree ? 'text-green-500' : 'text-primary'}`}>
                  {getPriceDisplay()}
                </span>
                {!isFree && (
                  <span className="text-gray-400 text-sm ml-1">per child</span>
                )}
              </div>
            </div>

            {provider.websiteUrl ? (
              <a
                href={provider.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full btn-primary" variant="primary">
                  View Details →
                </Button>
              </a>
            ) : (
              <Button className="w-full" variant="outline" disabled>
                No Website
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
