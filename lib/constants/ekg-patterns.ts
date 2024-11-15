

export interface EKGSegment {
  id: string;
  percentStart: number;
  percentEnd: number;
  color: string;
}

export interface EKGPattern {
  id: string;
  title: string;
  description: string;
  path: string;
  totalLength: number;
  segments: EKGSegment[];
}

export const normalSinusRhythm: EKGPattern = {
  id: 'normal-sinus-rhythm',
  title: 'Normal Sinus Rhythm',
  description: 'Normal electrical activity of the heart',
  path: `
  M 0,50 
  L 15,50 
  C 17,50 18,50 20,50 
  C 22,50 23,52 25,55 
  C 27,58 28,45 30,40 
  C 32,35 33,48 35,50 
  L 45,50 
  C 47,50 48,50 50,50 
  C 52,50 53,65 55,70 
  C 57,75 58,15 60,10 
  C 62,5 63,85 65,90 
  C 67,95 68,52 70,50 
  C 72,48 73,50 75,50 
  L 100,50
`,
  totalLength: 100,
  segments: [
    {
      id: 'sa-node',
      percentStart: 0,
      percentEnd: 20, // P-wave start
      color: '#4287f5'
    },
    {
      id: 'bachman-pathway',
      percentStart: 20,
      percentEnd: 30, // P-wave completion
      color: '#4287f5'
    },
    {
      id: 'internodal-pathways',
      percentStart: 30,
      percentEnd: 35, // Early PR interval
      color: '#4287f5'
    },
    {
      id: 'av-node',
      percentStart: 35,
      percentEnd: 45, // PR interval
      color: '#4287f5'
    },
    {
      id: 'bundle-of-his',
      percentStart: 45,
      percentEnd: 55, // Start of QRS
      color: '#4287f5'
    },
    {
      id: 'right-bundle-branch',
      percentStart: 55,
      percentEnd: 65, // QRS complex
      color: '#4287f5'
    },
    {
      id: 'left-bundle-branch',
      percentStart: 65,
      percentEnd: 75, // QRS completion
      color: '#4287f5'
    },
    {
      id: 'llb-posterior-fascicles',
      percentStart: 75,
      percentEnd: 85, // ST segment
      color: '#4287f5'
    },
    {
      id: 'purkinje-fibers',
      percentStart: 85,
      percentEnd: 100, // T wave
      color: '#4287f5'
    }
  ]
};