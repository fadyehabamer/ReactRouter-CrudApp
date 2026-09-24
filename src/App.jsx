import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import ListStd from "./ListStd";
import AddStd from "./AddStd";
import EditStd from "./EditStd";
import "./App.css"

// Routes no longer inject history/match props, so these wrappers hand the
// class-based pages the navigate function and the route params they need.
function AddStdPage({ onAdd }) {
  const navigate = useNavigate();
  return <AddStd onAdd={onAdd} navigate={navigate} />;
}

function EditStdPage({ students, onSave }) {
  const navigate = useNavigate();
  const index = Number(useParams().index);
  const std = students[index];
  // unknown index (e.g. after a refresh, since data isn't persisted)
  if (!std) return <Navigate to="/List" replace />;
  return (
    <EditStd
      student={std}
      onSave={(edited) => onSave(edited, index)}
      navigate={navigate}
    />
  );
}

export default class AppRouter extends React.Component {
  // The list lives here (not in ListStd) so it survives navigating between
  // pages, and the pages get their callbacks as props instead of through the
  // router location, which is empty on a direct visit or page refresh.
  state = {
    StudentList: [

    ],
  };

  AddnewStudent = (newObject) => {
    this.setState((prev) => ({
      StudentList: [...prev.StudentList, newObject],
    }));
  };

  SaveDelete = (_postion) => {
    this.setState((prev) => ({
      StudentList: prev.StudentList.filter((_, i) => i !== _postion),
    }));
  };

  SavingEdit = (newEditObject, idx) => {
    this.setState((prev) => ({
      StudentList: prev.StudentList.map((std, i) => (i === idx ? newEditObject : std)),
    }));
  };

  SortBySalary = () => {
    this.setState((prev) => ({
      StudentList: [...prev.StudentList].sort((a, b) => {
        return a.salary - b.salary;
      }),
    }));
  };

  render() {
    const list = (
      <ListStd
        Students={this.state.StudentList}
        onDelete={this.SaveDelete}
        onSort={this.SortBySalary}
      />
    );
    return (
      <Router>
        <Routes>
          <Route path="/" element={list} />
          <Route path="/List" element={list} />

          <Route
            path="/AddStudent"
            element={<AddStdPage onAdd={this.AddnewStudent} />}
          />

          <Route
            path="/EditStudent/:index"
            element={
              <EditStdPage
                students={this.state.StudentList}
                onSave={this.SavingEdit}
              />
            }
          />

          <Route path="*" element={<Navigate to="/List" replace />} />
        </Routes>
      </Router>
    );
  }
}

