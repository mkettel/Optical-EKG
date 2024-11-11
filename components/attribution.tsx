import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AttributionButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute bottom-4 right-4 z-10 bg-background/80 backdrop-blur hover:bg-background/90"
          title="View Attribution"
        >
          <Info className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Model Attribution</DialogTitle>
          <DialogDescription>
            <div className="space-y-4 mt-2">
              <div>
                <h3 className="font-semibold mb-1">Original Model</h3>
                <p className="text-sm">
                  &quot;Beating Heart&quot; (
                  <a 
                    href="https://skfb.ly/owVVo" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://skfb.ly/owVVo
                  </a>
                  ) by Dreamwasabducted
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">License</h3>
                <p className="text-sm">
                  Licensed under{' '}
                  <a 
                    href="http://creativecommons.org/licenses/by/4.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Creative Commons Attribution 4.0
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Modifications</h3>
                <p className="text-sm">
                  Modified for Optical EKG project to include:
                  <ul className="list-disc list-inside mt-1">
                    <li>Separated cardiac structures for individual highlighting</li>
                    <li>Added conduction system components</li>
                    <li>Optimized for web performance</li>
                  </ul>
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1">Original Statistics</h3>
                <ul className="text-sm list-none space-y-1">
                  <li>Triangles: 34.4k</li>
                  <li>Vertices: 17.2k</li>
                  <li>Published: September 28th, 2022</li>
                </ul>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}