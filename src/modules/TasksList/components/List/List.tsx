import React from 'react';
import { TaskHelper } from '../Task';
import { ListProp } from './List.types';

export const List = ({ TasksMock }: ListProp) => {
  return (
    <div className="container">
      {TasksMock.length > 0 ? TasksMock.map((elem) => <TaskHelper {...elem} key={elem.id} />) : 'Тасков нет'}
    </div>
  );
};
