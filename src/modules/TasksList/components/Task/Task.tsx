import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PropsEntityType } from './Task.types';
import { changeStatusDone, changeStatusImportant, handleDeleteTask } from './Task.helper';
import { EDIT, ROOT } from 'constants/pathsPages';

export const Task = ({ name, id, info, isImportant, isDone }: PropsEntityType) => {
  const [deleteStatus, setDeleteStatus] = useState(false);
  return (
    <div className="card mt-3">
      <h4 className="card-header">{name}</h4>
      <div className="card-body">{info}</div>
      <div className="card-footer d-flex justify-content-around">
        <button
          type="button"
          onClick={() => changeStatusImportant({ id, isImportant })}
          disabled={isDone}
          className={`btn + ${isImportant ? 'btn-success' : 'btn-outline-dark'}`}>
          Важное
        </button>
        <button
          type="button"
          onClick={() => changeStatusDone({ id, isDone })}
          className={`btn + ${isDone ? 'btn-success' : 'btn-outline-dark'}`}>
          Выполнено
        </button>
        <Link to={`${ROOT}${EDIT}/${id}`} type="button" className="btn btn-warning">
          <i className="fa fa-pencil" />
        </Link>
        {deleteStatus ? (
          <>
            <button type="button" className="btn btn-danger" onClick={() => handleDeleteTask({ setDeleteStatus })}>
              <i className="fa fa-check"></i>
            </button>
            <button type="button" className="btn btn-warning" onClick={() => setDeleteStatus(false)}>
              X
            </button>
          </>
        ) : (
          <button type="button" className="btn btn-danger" onClick={() => setDeleteStatus(true)}>
            <i className="fa fa-trash-o" />
          </button>
        )}
      </div>
    </div>
  );
};
