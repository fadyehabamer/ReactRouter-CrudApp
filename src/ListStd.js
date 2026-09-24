import React from "react";
import { Link } from "react-router-dom";
import "./App.css"
export default class ListStd extends React.Component {

  state = {
    StudentsList: this.props.Students,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.Students !== this.props.Students) {
      this.setState({ StudentsList: this.props.Students });
    }
  }

  SortBySalary = () => {
    this.props.onSort();
  };

  FilterSalaryAbove = () => {
    let newList = this.state.StudentsList.filter((std) => std.salary > 2500);
    this.setState({
      StudentsList: newList,
    });
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
            value="Filter above 2500"
            onClick={() => this.FilterSalaryAbove()}
          />
        </div>

        <br />

        <ul>
          {this.state.StudentsList.map((std, index) => {
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
