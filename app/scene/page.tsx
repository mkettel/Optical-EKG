// app/page.tsx
import Scene from "./scene";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="min-h-screen bg-background p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Optical EKG</h1>
        <p className="text-muted-foreground">Interactive Cardiac Electrophysiology</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Visualization Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Heart Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-square">
                <Scene />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Controls Section */}
        <div className="lg:col-span-1">
          <Tabs defaultValue="learn">
            <TabsList className="w-full">
              <TabsTrigger value="learn">Learn</TabsTrigger>
              <TabsTrigger value="explore">Explore</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
            </TabsList>

            <TabsContent value="learn">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Mode</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Learning content will go here */}
                    <p>Select a topic to begin learning:</p>
                    {/* Add learning mode controls */}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="explore">
              <Card>
                <CardHeader>
                  <CardTitle>Exploration Mode</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add exploration controls */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="practice">
              <Card>
                <CardHeader>
                  <CardTitle>Practice Mode</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Add practice mode content */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}