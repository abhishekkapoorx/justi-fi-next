"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, AlertCircle } from "lucide-react"
import { useState, useEffect, use } from "react"
import axios from "axios"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import ReactMarkdown from "react-markdown"

interface INegativePoint {
  _id: string;
  argument: string;
  explanation: string;
  severity: "Critical" | "Significant" | "Moderate" | "Minor";
  area: string;
  rebuttal?: {
    counterargument: string;
    legal_basis: string;
    tactical_approach: string;
    alternative_positions?: string;
  };
}

interface ICitation {
  label: string;
  url: string;
}

interface IInsight {
  _id: string;
  summary: string;
  positives: string[];
  negatives: INegativePoint[];
  citations: ICitation[];
  space: string;
  thread?: string;
  createdAt: string;
  updatedAt: string;
}

export default function InsightsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [insights, setInsights] = useState<IInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeInsight, setActiveInsight] = useState<IInsight | null>(null);

  // Fetch insights data when component mounts
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/spaces/${resolvedParams.id}/getinsights`);
        const data = response.data;
        
        if (data.insights && data.insights.length > 0) {
          setInsights(data.insights);
          setActiveInsight(data.insights[0]); // Set first insight as active
        }
      } catch (error) {
        console.error("Failed to fetch insights:", error);
        toast.error("Failed to load insights", {
          description: "Please try again later."
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [resolvedParams.id]);

  // Get severity color based on level
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300";
      case "Significant": return "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300";
      case "Moderate": return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300";
      case "Minor": return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300";
      default: return "bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300";
    }
  };

  // Loading skeleton UI
  if (loading) {
    return (
      <div className="p-4 h-full overflow-auto">
        <div className="mb-6">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-72" />
        </div>

        <div className="mb-4">
          <Skeleton className="h-10 w-full mb-4" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32 w-full mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // No data state
  if (!activeInsight) {
    return (
      <div className="p-4 h-full overflow-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Case Insights</h1>
          <p className="text-muted-foreground">AI-generated analysis and key points</p>
        </div>

        <Card className="flex flex-col items-center justify-center p-10 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No insights available</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            There are no insights available for this case yet. Continue your conversation with the AI assistant to generate insights.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 h-full overflow-auto">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Case Insights</h1>
        <p className="text-muted-foreground text-sm sm:text-base">AI-generated analysis and key points</p>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-3 h-8 sm:h-10">
          <TabsTrigger value="summary" className="text-xs sm:text-sm">Summary</TabsTrigger>
          <TabsTrigger value="support" className="text-xs sm:text-sm">Support</TabsTrigger>
          <TabsTrigger value="opposition" className="text-xs sm:text-sm">Opposition</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Case Overview</CardTitle>
                <CardDescription className="text-sm sm:text-base">Key facts and insights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md bg-muted p-3 sm:p-4">
                  <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                    <ReactMarkdown>
                      {activeInsight.summary}
                    </ReactMarkdown>
                  </div>
                </div>

                {activeInsight.citations && activeInsight.citations.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2 text-sm sm:text-base">Citations</h4>
                    <ul className="space-y-2">
                      {activeInsight.citations.map((citation, idx) => (
                        <li key={idx} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                          <div className="w-full sm:w-20 font-medium text-xs sm:text-sm flex-shrink-0">{citation.label}</div>
                          <div className="flex-1 min-w-0">
                            <a href={citation.url} target="_blank" rel="noopener noreferrer" 
                               className="text-blue-500 hover:underline text-xs sm:text-sm break-all sm:break-normal">
                              {citation.url}
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Key Issues</CardTitle>
                <CardDescription className="text-sm sm:text-base">Main points of contention</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 sm:space-y-4">
                  {activeInsight.negatives.slice(0, 4).map((negative, idx) => (
                    <li key={negative._id || idx} className="flex gap-2 sm:gap-3">
                      <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 flex-shrink-0 mt-0.5 sm:mt-1" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm sm:text-base">{negative.argument}</p>
                        <div className="prose prose-xs sm:prose-sm dark:prose-invert max-w-none mt-1">
                          <ReactMarkdown>
                            {negative.explanation}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="support">
          <Card>
            <CardHeader>
              <CardTitle>Supporting Arguments</CardTitle>
              <CardDescription>Key points in favor of our position</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activeInsight.positives && activeInsight.positives.length > 0 && (
                  <div className="rounded-md bg-muted p-4">
                    <h3 className="font-medium text-lg mb-2">Key Strengths</h3>
                    <p className="text-sm mb-4">
                      The following points highlight the strengths of your position in this case.
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Key Supporting Points</h3>

                  {activeInsight.positives.map((positive, idx) => (
                    <div key={idx} className="flex">
                      <div className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-medium">Strength Point {idx + 1}</p>
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown>
                            {positive}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}

                  {activeInsight.positives.length === 0 && (
                    <div className="text-center p-4 text-muted-foreground">
                      No supporting points have been identified yet.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opposition">
          <Card>
            <CardHeader>
              <CardTitle>Opposition Arguments</CardTitle>
              <CardDescription>Anticipated counterarguments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md bg-muted p-4">
                  <h3 className="font-medium text-lg mb-2">Potential Defense Strategy</h3>
                  <p className="text-sm">
                    Based on analysis, these are the key potential counterarguments to your position.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Key Opposition Points</h3>

                  {activeInsight.negatives.map((negative, idx) => (
                    <div key={negative._id} className="flex">
                      <div className={`${getSeverityColor(negative.severity)} rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0`}>
                        {idx + 1}
                      </div>
                      <div>
                        <p className="font-medium">{negative.argument}</p>
                        <div className="prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown>
                            {negative.explanation}
                          </ReactMarkdown>
                        </div>
                        {negative.rebuttal && (
                          <div className="mt-1">
                            <span className="font-medium">Counter: </span>
                            <div className="prose prose-sm dark:prose-invert max-w-none inline">
                              <ReactMarkdown>
                                {negative.rebuttal.counterargument}
                              </ReactMarkdown>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {activeInsight.negatives.length === 0 && (
                    <div className="text-center p-4 text-muted-foreground">
                      No opposition arguments have been identified yet.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
