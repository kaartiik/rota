import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Rota.css'; // Ensure to create this CSS file for styling

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const initialNames = [
  { id: 'name-1', content: 'Alice' },
  { id: 'name-2', content: 'Bob' },
  { id: 'name-3', content: 'Charlie' },
  { id: 'name-4', content: 'David' }
];

const Rota = () => {
  const [names, setNames] = useState(initialNames);
  const [days, setDays] = useState(daysOfWeek.map(day => ({ id: day, names: [] })));

  const onDragEnd = (result) => {
   const { source, destination } = result;

   console.log(source);
   console.log(destination);

   if (!destination) {
       return;
   }

   if (source.droppableId === destination.droppableId && source.index === destination.index) {
       return;
   }

   const sourceNames = source.droppableId === 'names' ? names : days.find(day => day.id === source.droppableId).names;
   const finishNames = days.find(day => day.id === destination.droppableId).names;
   const draggedName = sourceNames[source.index];

   // Create a new ID for the dragged item to ensure uniqueness each time it's used
   const newName = {
       ...draggedName,
       id: `${draggedName.id}-${new Date().getTime()}`
   };

   // Check if the name already exists in the destination day to avoid duplicates
   if (!finishNames.some(name => name.content === newName.content)) {
       const newFinishNames = [...finishNames, newName];
       const newDays = days.map(day => {
           if (day.id === destination.droppableId) {
               return { ...day, names: newFinishNames };
           }
           return day;
       });
       setDays(newDays);
   }
};


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="names" direction="horizontal">
        {(provided) => (
          <div className="names-container" {...provided.droppableProps} ref={provided.innerRef}>
            {names.map((name, index) => (
              <Draggable key={name.id} draggableId={name.id} index={index}>
                {(provided) => (
                  <div className="name" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {name.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {days.map((day, index) => (
        <Droppable key={day.id} droppableId={day.id}>
          {(provided) => (
            <div className="day" ref={provided.innerRef} {...provided.droppableProps}>
              <h5>{day.id}</h5>
              <div className="day-names">
                {day.names.map((name, index) => (
                  <Draggable key={name.id} draggableId={name.id} index={index}>
                    {(provided) => (
                      <div className="name" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        {name.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
};

export default Rota;
