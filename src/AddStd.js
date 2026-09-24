import React from "react";
export default class AddStd extends React.Component {
  state = {
    Id: "",
    Name: "",
    Age: "",
    Address: "",
    salary: ""
  };

  SavingAdd = () => {
    alert("Backing");
    this.props.history.push("/List");
  };
  CustomAdd = () => {
    let newStd = {
      id: this.state.Id,
      Name: this.state.Name,
      Age: this.state.Age,
      Address: this.state.Address,
      salary: this.state.salary
    };
    this.props.onAdd(newStd);
    this.props.history.push("/List");
  };
  render() {
    return (
      <center>
      <div className="form" >
        <center>
          <h1>
            Add New Employee
          </h1>
        </center>
        <input
          placeholder="ID"
          type="text"
          value={this.state.Id}
          onChange={(e) =>
            this.setState({
              Id: e.target.value,
            })
          }
        />

        <br />
        <input
          placeholder="Name"
          value={this.state.Name}
          type="text"
          onChange={(e) =>
            this.setState({
              Name: e.target.value,
            })
          }
        />

        <br />
        <input
          placeholder="Age"
          type="text"
          value={this.state.Age}
          onChange={(e) =>
            this.setState({
              Age: e.target.value,
            })
          }
        />

        <br />
        <input
          placeholder="Address"
          type="text"
          value={this.state.Address}
          onChange={(e) =>
            this.setState({
              Address: e.target.value,
            })
          }
        />

        <br />

        <input
          placeholder="Salary"
          type="text"
          value={this.state.salary}
          onChange={(e) =>
            this.setState({
              salary: e.target.value,
            })
          }
        />


        <br />
        <div className="add-features">
          <input className="cancel-btn" type="button" onClick={this.SavingAdd} value="Cancel" />

          <input className="add-btn"
            type="button"
            value="Add"
            onClick={this.CustomAdd}
          />
        </div>
      </div>
    </center>
    );
  }
}
