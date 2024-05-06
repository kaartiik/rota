import React, { useState } from 'react';
import './Rota.css';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const initialNames = [
  { id: 'name-1', content: 'Alice' },
  { id: 'name-2', content: 'Bob' },
  { id: 'name-3', content: 'Charlie' },
  { id: 'name-4', content: 'David' }
];

const Rota = () => {
  const [names] = useState(initialNames);
  const [selectedDay, setSelectedDay] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentDay, setCurrentDay] = useState(null);
  const [selectedName, setSelectedName] = useState('');
  const [startTime, setStartTime] = useState('11:00');
  const [endTime, setEndTime] = useState('11:00');

  const handleAddClick = (day) => {
    setCurrentDay(day);
    setSelectedName('');
    setStartTime('11:00');
    setEndTime('11:00');
    setShowModal(true);
  };

  const handleSubmit = () => {
    const entry = {
      id: `${currentDay}-${selectedName.content}`,
      nameId: selectedName.id,
      name: selectedName.content,
      startTime: startTime,
      endTime: endTime === '23:00' ? 'Closing' : endTime
    };

    const isDuplicate = selectedDay[currentDay] && checkDuplicate(selectedDay[currentDay], entry)

    if(!isDuplicate) {
      const newEntries = selectedDay[currentDay] ? [...selectedDay[currentDay], entry] : [entry];
      setSelectedDay({ ...selectedDay, [currentDay]: newEntries });
      console.log({ ...selectedDay, [currentDay]: newEntries });
      setShowModal(false);
   } else{
      alert(`${selectedName.content} already has a shift for this day.`)
   }
  };

  //check if user already has shift
  const checkDuplicate = (dayArray, newEntry) => {
   return dayArray.some(obj => obj.nameId === newEntry.nameId);
  }

  return (
    <div className="week-container">
      {daysOfWeek.map(day => (
        <div key={day} className="day">
          <div>{day}</div>
          <button onClick={() => handleAddClick(day)}>+</button>
          {selectedDay[day] && selectedDay[day].map(entry => (
            <div key={entry.id} className="name-time">
              {entry.name} {entry.startTime}-{entry.endTime}
            </div>
          ))}
        </div>
      ))}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Schedule for {currentDay}</h2>
            <label htmlFor="name-select">Name:</label>
            <select id="name-select" onChange={(e) => {const selectElement = e.target;
               const selectedOption = selectElement.options[selectElement.selectedIndex];
               setSelectedName({id: selectedOption.id, content: selectElement.value})}} value={selectedName}>
              <option value="">Select a name</option>
              {names.filter(name => name.content !== selectedName)
               .map(name => <option key={name.id} id={name.id} value={name.content}>{name.content}</option>)}
            </select>
            <label htmlFor="start-time">Start Time:</label>
            <input type="time" id="start-time" min="11:00" max="20:00" step="900" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <label htmlFor="end-time">End Time:</label>
            <input type="time" id="end-time" min="11:00" max="23:00" step="900" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            <button onClick={handleSubmit}>Add</button>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
      <button onClick={() => console.log('save')}>Save</button>
    </div>
  );
};

export default Rota;
