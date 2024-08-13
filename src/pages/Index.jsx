import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import CatFactSection from '../components/CatFactSection';
import CatImageGallery from '../components/CatImageGallery';

const fetchCatBreeds = async () => {
  const response = await fetch('https://api.thecatapi.com/v1/breeds?limit=10');
  if (!response.ok) {
    throw new Error('Failed to fetch cat breeds');
  }
  return response.json();
};

const Index = () => {
  const { data: catBreeds, isLoading, error } = useQuery({
    queryKey: ['catBreeds'],
    queryFn: fetchCatBreeds,
  });

  if (error) {
    return <div className="text-center text-red-500">Error loading cat breeds: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">All About Cats</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Popular Cat Breeds</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <ul className="list-disc pl-5 space-y-2">
                {catBreeds.map((breed) => (
                  <li key={breed.id}>
                    {breed.name} <Badge variant="outline">{breed.origin}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        
        <CatFactSection />
      </div>

      <Separator className="my-8" />

      <CatImageGallery />
    </div>
  );
};

export default Index;