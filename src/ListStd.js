import React from "react";
import { Link } from "react-router-dom";
import "./App.css"
export default class ListStd extends React.Component {

  // the filter is a view toggle; the full list stays in App
  state = {
    onlyAbove2500: false,
  };

  SortBySalary = () => {
    this.props.onSort();
  };

  FilterSalaryAbove = () => {
    this.setState((prev) => ({
      onlyAbove2500: !prev.onlyAbove2500,
    }));
  };


  render() {
    return (
      <center>
      <h1>CRUD using React Router </h1>
      <div className="main">

        <div className="features">
          <Link
            className="add"
            to="/AddStudent"
          >
            Add newStudent
          </Link>



          <input
            type="button"
            value="Sort By Salary"
            onClick={() => this.SortBySalary()}
          />


          <input
            type="button"
            value={this.state.onlyAbove2500 ? "Show all" : "Filter above 2500"}
            onClick={() => this.FilterSalaryAbove()}
          />
        </div>

        <br />

        <ul>
          {this.props.Students.map((std, index) => {
            // keep the real index so delete/edit target the right employee
            if (this.state.onlyAbove2500 && !(std.salary > 2500)) return null;
            return (
              <li key={index}>
                <span>
                  Name:
                </span>
                {std.Name}

                <span>
                  Age:
                </span>
                {std.Age}
                <span>
                  salary :
                </span>
                {std.salary}
                <div className="ul-feat" >

                  <input className="delete"
                    type="button"
                    value="delete"
                    onClick={() => this.props.onDelete(index)}
                  />
                  <Link
                    className="edit"
                    to={`/EditStudent/${index}`}
                  >
                    Edit
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      </center>
    );
  }
}
