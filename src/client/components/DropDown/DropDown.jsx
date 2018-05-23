/*
 * This is a demo component the Eletrode app generator included
 * to show using Skeleton CSS lib (named base.css) and Redux
 * store for display HTML elements and managing states.
 *
 * To start your own app, please replace or remove these files:
 *
 * - this file (home.jsx)
 * - demo-buttons.jsx
 * - demo-pure-states.jsx
 * - demo-states.jsx
 * - reducers/index.jsx
 * - styles/*.css
 *
 */

import React from "react";
import "../../styles/normalize.css";
import "../../styles/raleway.css";
import skeleton from "../../styles/skeleton.css";
import custom from "../../styles/custom.css";

const styles = {
  select: {
    width: "20rem"
  },
  selectContainer: {
    display: "flex"
  }
};

export class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: "",
      make: ""
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  renderOptions(data) {
    return data.map(datum => {
      const { value } = datum;
      return (
        <option key={value} value={value}>
          {value}
        </option>
      );
    });
  }

  handleSelectChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className={custom.container}>
        <section className={custom.header}>
          <h2 className={skeleton.title}>YMM drop down </h2>
        </section>
        <div className={custom["docs-section"]}>
          <div style={styles.selectContainer}>
            <div>Year</div>
            <select
              name={"year"}
              style={styles.select}
              value={this.state.year}
              onChange={this.handleSelectChange}
            >
              {this.renderOptions([{ value: "1914" }, { value: "1915" }])}
            </select>

            <div>Make</div>
            <select
              name={"make"}
              style={styles.select}
              value={this.state.make}
              onChange={this.handleSelectChange}
            >
              {this.renderOptions([{ value: "toyota" }, { value: "corrolla" }])}
            </select>
          </div>
        </div>
      </div>
    );
  }
}
