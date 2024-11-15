'use client';

// app/page.tsx
import Scene from "./scene";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "next-view-transitions";
import { LearningWrapper } from "@/components/learning/learning-wrapper";
import { useLearningStore } from "@/store/learning-store";
import { AttributionButton } from "@/components/attribution";

export default function Page() {
  const { 
    currentModuleId,
    modules 
  } = useLearningStore();

  const currentModule = modules.find(m => m.id === currentModuleId);

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-background dark:bg-black">
      {/* Header - fixed height */}
      <header className="flex-none p-6 pt-4 pb-6">
        <Link href='/' className="text-xl font-bold">Optical EKG</Link>
        <p className="text-sm text-muted-foreground">Interactive Cardiac Electrophysiology</p>
      </header>

      {/* Main content - takes remaining height */}
      <div className="flex-1 overflow-y-scroll p-6 pt-0 min-h-0">
        <div className="grid h-full grid-cols-1 lg:grid-cols-3 gap-4">

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
                      <CardHeader className={`${currentModule ? 'hidden' : 'block flex-none px-4'}`} >
                        <CardTitle>Learning Modules</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 px-4 min-h-0 h-full overflow-auto">
                        <LearningWrapper currentModule={currentModule} />
                      </CardContent>
                  </TabsContent>

                  <TabsContent value="explore" className="h-full mt-0">
                      <CardHeader className="flex-none">
                        <CardTitle>Exploration Mode</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 min-h-0 overflow-auto">
                        <div className="flex mt-4">
                          <p className="text-xl">Coming Soon... 🔨</p>
                        </div>
                      </CardContent>
                  </TabsContent>

                  <TabsContent value="practice" className="h-full mt-0">
                      <CardHeader className="flex-none">
                        <CardTitle>Practice Mode</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 min-h-0 overflow-auto">
                        <div className="flex mt-4">
                          <p className="text-xl">Coming Soon... 🔨</p>
                        </div>
                      </CardContent>
                  </TabsContent>
                </div>
              </Tabs>
            </Card>
          </div>

          {/* 3D Visualization Section */}
          <div className="lg:col-span-2 h-full">
            <Card className="h-full flex relative bg-white flex-col">
              <CardHeader className="flex-none absolute top-0 left-0 z-10 bg-transparent">
                <CardTitle className="text-black">Heart Visualization</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 pt-2 p-2 relative min-h-0">
                <div className="w-full h-full">
                  <Scene />
                </div>
                <AttributionButton />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
