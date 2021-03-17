import React, { Fragment } from "react";
import { DatePicker } from "antd";
import moment from "moment";

const { MonthPicker, RangePicker } = DatePicker;

class CustomDatePicker extends React.Component {
  handleDisabledDate = (dt) => dt > moment().valueOf();
  handleDisabledMonth = (dt) => dt > moment("MM/YYYY").valueOf();
  handleDisabledYear = (dt) => dt > moment().add("years", 1).valueOf();

  generateDatePicker = (items) => {
    let {
      label,
      listItems,
      changeHandler,
      type = null,
      hasInitial = false,
      disabledDate = null,
      className,
      ...rest
    } = items;
    switch (type) {
      case "date":
        return (
          <Fragment>
            <DatePicker
              className={className ? className : "custom-date-picker"}
              getCalendarContainer={(trigger) => trigger.parentNode}
              disabledDate={
                disabledDate === "date" ? null : this.handleDisabledDate
              }
              format="DD/MM/YYYY"
              placeholder={label}
              onChange={changeHandler}
              defaultValue={hasInitial ? moment() : undefined}
              allowClear={hasInitial ? false : true}
              {...rest}
            />
          </Fragment>
        );
      case "month":
        return (
          <Fragment>
            <MonthPicker
              className={className ? className : "custom-month-picker"}
              getCalendarContainer={(trigger) => trigger.parentNode}
              disabledDate={
                disabledDate ? disabledDate : this.handleDisabledDate
              }
              format="MM/YYYY"
              placeholder={label}
              onChange={changeHandler}
              defaultValue={hasInitial ? moment() : undefined}
              allowClear={hasInitial ? false : true}
              {...rest}
            />
          </Fragment>
        );
      case "range":
        return (
          <Fragment>
            <div style={{ width: "inherit" }}>{label}</div>
            <RangePicker
              className={className ? className : "custom-range-picker"}
              getCalendarContainer={(trigger) => trigger.parentNode}
              onChange={changeHandler}
              disabledDate={
                disabledDate
                  ? disabledDate
                  : rest.mode[0] === "year"
                  ? this.handleDisabledYear
                  : this.handleDisabledDate
              }
              allowClear={hasInitial ? false : true}
              {...rest}
            />
          </Fragment>
        );
      default:
        return;
    }
  };

  render() {
    return <Fragment>{this.generateDatePicker(this.props)}</Fragment>;
  }
}

export default CustomDatePicker;
