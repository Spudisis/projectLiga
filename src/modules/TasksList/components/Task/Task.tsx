import React from 'react';
import { Link } from 'react-router-dom';
import { PropsTask } from './Task.types';
import { EDIT, ROOT } from 'constants/pathsPages';

export const Task = ({
  elem,
  changeStatusImportant,
  changeStatusDone,
  setDeleteStatus,
  deleteStatus,
  handleDeleteTask,
}: PropsTask) => {
  const { name, id, info, isImportant, isDone } = elem;
  return (
    <div className="card mt-3">
      <h4 className="card-header">{name}</h4>
      <div className="card-body">{info}</div>
      <div className="card-footer d-flex justify-content-around">
        <button
          type="button"
          onClick={() => changeStatusImportant()}
          disabled={isDone}
          className={`btn + ${isImportant ? 'btn-success' : 'btn-outline-dark'}`}>
          Важное
        </button>
        <button
          type="button"
          onClick={() => changeStatusDone()}
          className={`btn + ${isDone ? 'btn-success' : 'btn-outline-dark'}`}>
          Выполнено
        </button>
        <Link to={`${ROOT}${EDIT}/${id}`} type="button" className="btn btn-warning">
          <i className="fa fa-pencil" />
        </Link>
        {deleteStatus ? (
          <>
            <button type="button" className="btn btn-danger" onClick={() => handleDeleteTask()}>
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
