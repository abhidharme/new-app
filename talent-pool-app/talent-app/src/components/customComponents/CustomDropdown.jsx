// import React from 'react';
// import Select from 'react-select';

// const CustomDropdown = ({
//   label = '',
//   options = [],
//   value = null,
//   onChange = () => {},
//   placeholder = 'Select...',
// }) => {
//   return (
//     <div style={{ marginBottom: '20px' }}>
//       {label && (
//         <label style={{ fontWeight: 600, marginBottom: '6px', display: 'block' }}>
//           {label}
//         </label>
//       )}
//       <Select
//         options={options}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         styles={{
//           control: (base, state) => ({
//             ...base,
//             borderColor: state.isFocused ? '#4caf50' : '#ccc',
//             boxShadow: state.isFocused ? '0 0 0 3px rgba(76, 175, 80, 0.2)' : '',
//             '&:hover': { borderColor: '#4caf50' },
//           }),
//           menu: (base) => ({
//             ...base,
//             backgroundColor: '#e8f5e9',
//             color: '#333',
//             borderRadius: '6px',
//             padding: '5px 0',
//           }),
//           option: (base, { isFocused, isSelected }) => ({
//             ...base,
//             backgroundColor: isSelected
//               ? '#4caf50'
//               : isFocused
//               ? '#c8e6c9'
//               : 'transparent',
//             color: isSelected ? '#fff' : '#333',
//             cursor: 'pointer',
//           }),
//         }}
//       />
//     </div>
//   );
// };

// export default CustomDropdown;
