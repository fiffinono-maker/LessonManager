import ChallengeCard from '../ChallengeCard';
import outdoorImage from '@assets/generated_images/Outdoor_fitness_challenge_7c21f5ee.png';
import groupImage from '@assets/generated_images/Group_fitness_training_0334dacc.png';

export default function ChallengeCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ChallengeCard
        id="1"
        title="30-Day HIIT Challenge"
        description="High-intensity interval training to boost your cardiovascular fitness and burn calories"
        difficulty="medium"
        duration="30 days"
        participants={234}
        imageUrl={outdoorImage}
      />
      <ChallengeCard
        id="2"
        title="Morning Yoga Flow"
        description="Start your day with energizing yoga sequences for flexibility and mindfulness"
        difficulty="easy"
        duration="21 days"
        participants={567}
        imageUrl={groupImage}
      />
      <ChallengeCard
        id="3"
        title="Iron Strength Program"
        description="Advanced strength training program designed to build muscle and increase power"
        difficulty="hard"
        duration="60 days"
        participants={89}
        imageUrl={outdoorImage}
      />
    </div>
  );
}
