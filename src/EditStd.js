import React from "react";
import "./App.css"
export default class EditStd extends React.Component {
  state = {
    Id: this.props.location.CurrentObject.id,
    Name: this.props.location.CurrentObject.Name,
    Age: this.props.location.CurrentObject.Age,
    Address: this.props.location.CurrentObject.Address,
    salary: this.props.location.CurrentObject.salary,
  };

  SavingEdit = () => {
    let editedStd = {
      id: this.state.Id,
      Name: this.state.Name,
      Age: this.state.Age,
      Address: this.state.Address,
      salary: this.state.salary,
    };
    this.props.location.SavingEditRef(editedStd, this.props.location.index);
    this.props.history.push("/List");
  };
  render() {
    return (
      <center>
        <h1>
          Edit Employee Data
        </h1>
        <div className="form">
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
          <input
            className="edit-save"
            type="button"
            value="save"
            onClick={this.SavingEdit}
          />

        </div>

      </center>
    );
  }
}
