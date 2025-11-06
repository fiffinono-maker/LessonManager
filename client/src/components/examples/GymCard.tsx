import GymCard from '../GymCard';
import gymImage from '@assets/generated_images/Gym_facility_exterior_c300500a.png';

export default function GymCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <GymCard
        id="1"
        name="Elite Fitness Center"
        address="123 Main Street, Downtown"
        capacity={150}
        equipment={['Treadmills', 'Free Weights', 'Rowing Machines', 'Yoga Studio']}
        status="approved"
        imageUrl={gymImage}
      />
      <GymCard
        id="2"
        name="Power Gym"
        address="456 Oak Avenue, North District"
        capacity={80}
        equipment={['Squat Racks', 'Bench Press', 'Dumbbells']}
        status="pending"
        imageUrl={gymImage}
      />
      <GymCard
        id="3"
        name="Wellness Hub"
        address="789 Park Lane, East Side"
        capacity={200}
        equipment={['Pool', 'Sauna', 'CrossFit Area', 'Spinning Studio', 'Boxing Ring']}
        status="approved"
        imageUrl={gymImage}
      />
    </div>
  );
}
