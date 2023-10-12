import { Multiselect } from 'multiselect-react-dropdown';

const customStyle = {
  optionContainer: {
    // Set a fixed height and enable vertical scrolling
    maxHeight: '200px',  // Adjust the desired height
    overflowY: 'auto',
  },
};

const Dropdown = () => {
  const jobPostings = [
    // Your job posting options here
    1,2,3,4,5,6,7,8,9,10

  ];

  return (
    <Multiselect
      options={jobPostings}
      displayValue="name"
      style={customStyle}
    />
  );
}

export default Dropdown