import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const fetchCatFact = async () => {
  const response = await fetch('https://catfact.ninja/fact');
  if (!response.ok) {
    throw new Error('Failed to fetch cat fact');
  }
  return response.json();
};

const CatFactSection = () => {
  const { data: catFact, isLoading, error, refetch } = useQuery({
    queryKey: ['catFact'],
    queryFn: fetchCatFact,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cat Fun Fact</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-4 w-full" />
        ) : error ? (
          <p className="text-red-500">Error loading cat fact: {error.message}</p>
        ) : (
          <p className="mb-4">{catFact.fact}</p>
        )}
        <Button onClick={() => refetch()}>Get New Fact</Button>
      </CardContent>
    </Card>
  );
};

export default CatFactSection;