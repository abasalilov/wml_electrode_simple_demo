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
import DropDownUtil from "../../utils/index";
import { connect } from "react-redux";
import {
  setYear as createSetYearActionCreator,
  setMake as createSetMakeActionCreator,
  setModel as createSetModelActionCreator
} from "../../actions";

const styles = {
  select: {
    padding: "2rem",
    textAlign: "center"
  },
  selectContainer: {
    display: "flex",
    flexDirection: "column"
  }
};

class DropDownComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      makeOptions: [],
      modelOptions: [],
      engineOptions: []
    };
  }

  async makeByYearRequest(yr) {
    const car = new DropDownUtil();
    const makes = await car.getMakesByYear(yr);
    this.setState({ makeOptions: makes });
    // this.setState({ makeOptions: [2] });
  }

  async makeModelsByMkReq(mk) {
    const car = new DropDownUtil();
    const models = await car.getModels({
      year: this.props.year.year,
      make: mk
    });
    this.setState({ modelOptions: models });
  }

  async makeEngineReq(model) {
    const car = new DropDownUtil();
    const engines = await car.getEngineByTrims({
      year: this.props.year.year,
      make: this.props.make.make,
      model: model
    });

    this.setState({ engineOptions: engines });
  }

  renderMakeOptions(data) {
    return data.map(datum => {
      const { display } = datum;
      return (
        <option key={display} value={display}>
          {display}
        </option>
      );
    });
  }

  renderModelOptions(data) {
    return data.map(datum => {
      const { name } = datum;
      return (
        <option key={name} value={name}>
          {name}
        </option>
      );
    });
  }

  renderEngineOptions(data) {
    return data.map(datum => {
      const {
        engine: { cylinders, engineSize, trim }
      } = datum;
      console.log("datum", datum);
      const engineData = cylinders + " - " + engineSize + " trim:" + trim;
      return (
        <option key={trim} value={engineData}>
          {engineData}
        </option>
      );
    });
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

  setYearAndGetMakes(yr) {
    this.props.setYear(yr);
    this.makeByYearRequest(yr);
  }

  setMakeAndGetModels(mk) {
    this.props.setMake(mk);
    this.makeModelsByMkReq(mk);
  }

  setModelAndGetEngines(md) {
    this.props.setModel(md);
    this.makeEngineReq(md);
  }

  setEngine(engine) {
    console.log("engine", engine);
  }

  render() {
    const car = new DropDownUtil();
    const years = car.getYears();
    const { minYear, maxYear } = years;
    console.log("this.props", this.props);
    return (
      <div className={custom.container}>
        <section className={custom.header}>
          <h2 className={skeleton.title}>YMM drop down </h2>
        </section>
        <div className={custom["docs-section"]}>
          <div style={styles.selectContainer}>
            <select
              name={"year"}
              style={styles.select}
              onChange={e => this.setYearAndGetMakes(e.target.value)}
            >
              <option value={this.props.year.year} default>
                {this.props.year.year}
              </option>
              {this.renderOptions(makeYears(minYear, maxYear))}
            </select>

            {this.props.year.year !== "Year" &&
              this.state.makeOptions.length > 1 && (
                <select
                  name={"make"}
                  style={styles.select}
                  value={this.props.make.make}
                  onChange={e => this.setMakeAndGetModels(e.target.value)}
                >
                  <option value="" default>
                    Make
                  </option>
                  {this.renderMakeOptions(this.state.makeOptions)}
                </select>
              )}

            {this.props.make.make !== "Make" &&
              this.state.modelOptions.length > 1 && (
                <select
                  name={"model"}
                  style={styles.select}
                  value={this.props.model.model}
                  onChange={e => this.setModelAndGetEngines(e.target.value)}
                >
                  <option value="" default>
                    Model
                  </option>
                  {this.renderModelOptions(this.state.modelOptions)}
                </select>
              )}

            {this.props.model.model !== "Model" &&
              this.state.engineOptions.length > 1 && (
                <select
                  name={"engine"}
                  style={styles.select}
                  value={this.state.eng}
                  onChange={e => this.setEngine(e.target.value)}
                >
                  <option value="" default>
                    Engine
                  </option>
                  {this.renderEngineOptions(this.state.engineOptions)}
                </select>
              )}
          </div>
        </div>
      </div>
    );
  }
}

function makeYears(min, max) {
  const yrs = [];
  for (let i = min; i < max + 1; i++) {
    yrs.push({ value: i });
  }
  return yrs.reverse();
}

const mapStateToProps = state => {
  return {
    year: state.year,
    make: state.make,
    model: state.model
  };
};

const mapDispatchToProps = dispatch => ({
  setYear: yr => dispatch(createSetYearActionCreator(yr)),
  setMake: mk => dispatch(createSetMakeActionCreator(mk)),
  setModel: md => dispatch(createSetModelActionCreator(md))
});

export const DropDown = connect(mapStateToProps, mapDispatchToProps)(
  DropDownComponent
);
