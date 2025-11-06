import FilterBar from '../FilterBar';

export default function FilterBarExample() {
  return (
    <div className="p-8">
      <FilterBar
        onSearch={(q) => console.log('Search:', q)}
        onDifficultyChange={(d) => console.log('Difficulty:', d)}
        onDurationChange={(d) => console.log('Duration:', d)}
      />
    </div>
  );
}
