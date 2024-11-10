// app/page.tsx
import Scene from "./scene";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "next-view-transitions";

export default function Page() {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-background dark:bg-black">
      {/* Header - fixed height */}
      <header className="flex-none p-6 pt-4 pb-6">
        <Link href='/' className="text-xl font-bold">Optical EKG</Link>
        <p className="text-sm text-muted-foreground">Interactive Cardiac Electrophysiology</p>
      </header>

      {/* Main content - takes remaining height */}
      <div className="flex-1 p-6 pt-0 min-h-0">
        <div className="grid h-full grid-cols-1 lg:grid-cols-3 gap-4">
          {/* 3D Visualization Section */}
          <div className="lg:col-span-2 h-full">
            <Card className="h-full flex flex-col">
              <CardHeader className="flex-none">
                <CardTitle>Heart Visualization</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 min-h-0">
                <div className="w-full h-full">
                  <Scene />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Controls Section */}
          <div className="lg:col-span-1 h-full">
            <Card className="h-full p-2 flex flex-col">
              <Tabs defaultValue="learn" className="h-full flex flex-col">
                <TabsList className="flex-none w-full">
                  <TabsTrigger value="learn">Learn</TabsTrigger>
                  <TabsTrigger value="explore">Explore</TabsTrigger>
                  <TabsTrigger value="practice">Practice</TabsTrigger>
                </TabsList>

                <div className="flex-1 min-h-0">
                  <TabsContent value="learn" className="h-full mt-0">
                      <CardHeader className="flex-none">
                        <CardTitle>Learning Mode</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 min-h-0 overflow-auto">
                        <div className="space-y-4">
                          <p>Select a topic to begin learning:</p>
                          {/* Add learning mode controls */}
                        </div>
                      </CardContent>
                  </TabsContent>

                  <TabsContent value="explore" className="h-full mt-0">
                      <CardHeader className="flex-none">
                        <CardTitle>Exploration Mode</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 min-h-0 overflow-auto">
                        {/* Add exploration controls */}
                      </CardContent>
                  </TabsContent>

                  <TabsContent value="practice" className="h-full mt-0">
                      <CardHeader className="flex-none">
                        <CardTitle>Practice Mode</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 min-h-0 overflow-auto">
                        {/* Add practice mode content */}
                      </CardContent>
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
