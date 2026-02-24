"use client";

import { useState, useEffect } from "react";
import { SearchForm, SearchFilters } from "@/components/search/SearchForm";
import { ResultsGrid } from "@/components/results/ResultsGrid";
import { EmptyState } from "@/components/results/EmptyState";
import { SortSelect } from "@/components/search/SortSelect";
import type { Provider } from "@/types";

export default function Home() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [filters, setFilters] = useState<SearchFilters | null>(null);
  const [totalVenues, setTotalVenues] = useState(0);

  useEffect(() => {
    const fetchTotalVenues = async () => {
      try {
        const response = await fetch("/api/providers?limit=1");
        const data = await response.json();
        if (data.pagination?.total) {
          setTotalVenues(data.pagination.total);
        }
      } catch (error) {
        console.error("Error fetching total venues:", error);
      }
    };
    fetchTotalVenues();
  }, []);

  const searchProviders = async (searchFilters: SearchFilters) => {
    setLoading(true);
    setFilters(searchFilters);
    setHasSearched(true);

    try {
      const params = new URLSearchParams();
      
      if (searchFilters.borough) {
        params.set("borough", searchFilters.borough);
      }
      if (searchFilters.postcode) {
        params.set("postcode", searchFilters.postcode);
      }
      if (searchFilters.radius !== undefined) {
        params.set("radius", searchFilters.radius.toString());
      }
      if (searchFilters.userLat !== undefined) {
        params.set("userLat", searchFilters.userLat.toString());
      }
      if (searchFilters.userLng !== undefined) {
        params.set("userLng", searchFilters.userLng.toString());
      }
      if (searchFilters.ageMin !== undefined) {
        params.set("ageMin", searchFilters.ageMin.toString());
      }
      if (searchFilters.ageMax !== undefined) {
        params.set("ageMax", searchFilters.ageMax.toString());
      }
      if (searchFilters.activities && searchFilters.activities.length > 0) {
        searchFilters.activities.forEach((a) => params.append("activities", a));
      }
      if (searchFilters.sizeMin !== undefined) {
        params.set("sizeMin", searchFilters.sizeMin.toString());
      }
      if (searchFilters.sizeMax !== undefined) {
        params.set("sizeMax", searchFilters.sizeMax.toString());
      }
      params.set("sortBy", sortBy);

      const response = await fetch(`/api/providers?${params.toString()}`);
      const data = await response.json();
      setProviders(data.providers || []);
    } catch (error) {
      console.error("Search error:", error);
      setProviders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filters) {
      searchProviders(filters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  const handleClearFilters = () => {
    setProviders([]);
    setHasSearched(false);
    setFilters(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="relative overflow-hidden hero-gradient hero-pattern">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 text-6xl opacity-20 floating">🎈</div>
          <div className="absolute top-40 right-20 text-5xl opacity-20 floating-delayed">🎉</div>
          <div className="absolute bottom-20 left-1/4 text-4xl opacity-20 floating">🪀</div>
          <div className="absolute bottom-32 right-1/3 text-5xl opacity-20 floating-delayed">🎁</div>
          <div className="absolute top-1/3 left-1/2 text-4xl opacity-15 floating">⭐</div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-28">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/40 shadow-lg">
              <span className="text-2xl">🎂</span>
              <span className="text-dark font-semibold">For Parents Planning Kids&apos; Birthday Parties</span>
            </div>
            
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-dark mb-6 leading-tight drop-shadow-sm">
              Find the Perfect
              <br />
              <span className="text-primary">Birthday Party Venue</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Discover amazing venues for unforgettable children&apos;s birthday parties and celebrations across London
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-5 py-3 shadow-lg border border-white/50">
                <span className="text-2xl">🏰</span>
                <span className="font-bold text-dark">{totalVenues}+ Venues</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-5 py-3 shadow-lg border border-white/50">
                <span className="text-2xl">🎯</span>
                <span className="font-bold text-dark">All Activities</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-5 py-3 shadow-lg border border-white/50">
                <span className="text-2xl">✨</span>
                <span className="font-bold text-dark">33 Boroughs</span>
              </div>
            </div>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="search-card rounded-2xl shadow-2xl p-6 sm:p-8 dark:bg-gray-800">
              <SearchForm onSearch={searchProviders} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="relative inline-block">
              <div className="w-20 h-20 mx-auto mb-6 relative">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-4xl bounce-slow">🎉</div>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">Finding the best venues...</p>
            <p className="text-gray-400 mt-2">Just a moment!</p>
          </div>
        ) : hasSearched ? (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🎊</span>
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-dark dark:text-white">{providers.length}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {providers.length === 1 ? 'venue' : 'venues'} found
                  </p>
                </div>
              </div>
              <SortSelect value={sortBy} onChange={setSortBy} />
            </div>

            {providers.length > 0 ? (
              <ResultsGrid providers={providers} />
            ) : (
              <EmptyState onClearFilters={handleClearFilters} />
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full mb-6">
              <span className="text-5xl">🎈</span>
            </div>
            <h2 className="text-3xl font-heading font-bold text-dark dark:text-white mb-3">
              Ready to Plan the Perfect Party?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto">
              Use the search filters above to discover amazing venues for your child&apos;s birthday party in London
            </p>
            
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 card-glow">
                <div className="text-4xl mb-3">🎨</div>
                <h3 className="font-heading font-bold text-dark dark:text-white mb-1">Creative</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Art, pottery & workshops</p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 card-glow">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-heading font-bold text-dark dark:text-white mb-1">Active</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Sports, climbing & soft play</p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 card-glow">
                <div className="text-4xl mb-3">🦒</div>
                <h3 className="font-heading font-bold text-dark dark:text-white mb-1">Animals</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Farms, zoos & nature</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
