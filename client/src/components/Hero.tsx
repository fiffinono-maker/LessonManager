import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Gym_training_hero_image_df7c19ae.png";
import { Dumbbell, Users, Trophy } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${heroImage})`
        }}
      />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 font-display">
          Transform Your Fitness Journey
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90">
          Join challenges, track progress, and compete with a community of fitness enthusiasts
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            variant="default"
            data-testid="button-get-started"
            onClick={() => console.log('Get started clicked')}
          >
            Get Started
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
            data-testid="button-learn-more"
            onClick={() => console.log('Learn more clicked')}
          >
            Learn More
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold">10K+</div>
            <div className="text-sm text-white/80">Active Users</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold">500+</div>
            <div className="text-sm text-white/80">Challenges Completed</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-lg bg-primary/20 backdrop-blur-sm flex items-center justify-center">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold">200+</div>
            <div className="text-sm text-white/80">Partner Gyms</div>
          </div>
        </div>
      </div>
    </div>
  );
}
