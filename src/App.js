import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import ListStd from "./ListStd";
import AddStd from "./AddStd";
import EditStd from "./EditStd";
import "./App.css"

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
    return (
      <Router>
        <Switch>
          <Route
            path={["/", "/List"]}
            exact
            render={(props) => (
              <ListStd
                {...props}
                Students={this.state.StudentList}
                onDelete={this.SaveDelete}
                onSort={this.SortBySalary}
              />
            )}
          />

          <Route
            path="/AddStudent"
            render={(props) => <AddStd {...props} onAdd={this.AddnewStudent} />}
          />

          <Route
            path="/EditStudent/:index"
            render={(props) => {
              const index = Number(props.match.params.index);
              const std = this.state.StudentList[index];
              // unknown index (e.g. after a refresh, since data isn't persisted)
              if (!std) return <Redirect to="/List" />;
              return (
                <EditStd
                  {...props}
                  student={std}
                  onSave={(edited) => this.SavingEdit(edited, index)}
                />
              );
            }}
          />

          <Redirect to="/List" />
        </Switch>
      </Router>
    );
  }
}

