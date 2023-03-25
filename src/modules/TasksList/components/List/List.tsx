import React from 'react';

import { Task } from '../Task/index';
import { ListProp } from './List.types';

export const List = ({ TasksMock }: ListProp) => {
  return (
    <div className="container">
      {TasksMock.length > 0 ? TasksMock.map((elem) => <Task {...elem} key={elem.id} />) : 'Тасков нет'}
    </div>
  );
};
