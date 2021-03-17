import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Row,
  Col,
  Button,
  Select,
  Collapse,
  Radio,
  DatePicker,
  Space,
} from "antd";
import FormItem from "antd/lib/form/FormItem";
import moment from "moment";
import { UnlockOutlined } from "@ant-design/icons";
import { fetchApi } from "../../../services/api";
import TableComponent from "../../components/Table";
import { sortFunction } from "../../../services/api/sort";
import axios from "axios";
const { Search } = Input;
const { Option } = Select;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;
class DashboardLayout extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
      paginationDisplay: "",
      filterTable: [],
      filterdata: [],
      pageSize: 10,
      resetPagination: false,
      pageNo: 1,
      loading: false,
    };
  }

  columns = [
    {
      title: "Course Id",
      align: "center",
      dataIndex: "Course Id",
      sorter: (a, b) => a["Course Id"] - b["Course Id"],
      responsive: ["md", "sm", "xs"],
    },
    {
      title: "Child Subject",
      align: "center",
      dataIndex: "Child Subject",
      sorter: (a, b) => a["Child Subject"] - b["Child Subject"],
      responsive: ["md", "sm", "xs"],
    },
    {
      title: "Course Name",
      align: "center",
      dataIndex: "Course Name",
      sorter: (a, b) => a["Course Name"] - b["Course Name"],
      responsive: ["md", "sm", "xs"],
    },
    {
      title: "Next Session Date",
      align: "center",
      dataIndex: "Next Session Date",
      sorter: (a, b) => a["Next Session Date"] - b["Next Session Date"],
      responsive: ["md", "sm", "xs"],
    },
    {
      title: "Parent Subject",
      align: "center",
      dataIndex: "Parent Subject",
      sorter: (a, b) => a["Parent Subject"] - b["Parent Subject"],
      responsive: ["md", "sm", "xs"],
    },
    {
      title: "Provider",
      align: "center",
      dataIndex: "Provider",
      sorter: (a, b) => a["Provider"] - b["Provider"],
      responsive: ["md", "sm", "xs"],
    },
    {
      title: "Universities/Institutions",
      align: "center",
      dataIndex: "Universities/Institutions",
      sorter: (a, b) =>
        a["Universities/Institutions"] - b["Universities/Institutions"],
      responsive: ["md", "sm", "xs"],
    },
    // {
    //   title: "Url",
    //   align: "center",
    //   dataIndex: "Url",
    //   sorter: (a, b) => a["Url"] - b["Url"],
    //   responsive: ["md", "sm", "xs"],
    // },{
    //   title: "Video(Url)",
    //   align: "center",
    //   dataIndex: "Video(Url)",
    //   sorter: (a, b) => a["Video(Url)"] - b["Video(Url)"],
    //   responsive: ["md", "sm", "xs"],
    // },
  ];

  handlePageChange = (item) => {
    let { pageSize, filterTable } = this.state;
    this.setState({ paginationDisplay: "" });
    if (filterTable.length > 0) {
      console.log(filterTable, "filter");
      if (
        parseInt(item) === parseInt(Math.ceil(filterTable.length / pageSize))
      ) {
        this.setState({
          paginationDisplay:
            "Showing " +
            (pageSize * (item - 1) + 1) +
            " - " +
            filterTable.length +
            " out of " +
            filterTable.length +
            " entries",
        });
      } else {
        console.log(filterTable, "filter");
        this.setState({
          paginationDisplay:
            "Showing " +
            (pageSize * (item - 1) + 1) +
            " - " +
            pageSize * item +
            " out of " +
            filterTable.length +
            " entries",
        });
      }
    } else {
      this.setState({
        pageNo: 0,
        paginationDisplay: "Showing 0 - 0 out of 0 entries",
      });
    }
  };
  parseData(res) {
    //console.log("res", res[0]);
    return sortFunction(res, "Course Id");
  }
  fetchCourses = () => {
    this.setState({ loading: true });
    fetchApi("https://nut-case.s3.amazonaws.com/coursessc.json", "get").then(
      (res) => {
        console.log("responseJson", res);
        this.setState(
          {
            courses: this.parseData(res),
            loading: false,
            filterTable: this.parseData(res),
          },
          () => {
            this.handlePageChange(1);
          }
        );
      }
    );
  };
  search = (value) => {
    this.setState({ resetPagination: true, searchValue: value });
    const { courses } = this.state;
    const filterTable = courses.filter((o) =>
      Object.keys(o).some(
        (k) =>
          String(o["Course Name"])
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(o["Child Subject"])
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(o["Course Id"])
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(o["Parent Subject"])
            .toLowerCase()
            .includes(value.toLowerCase()) ||         
          String(o["Provider"])
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(o["Universities/Institutions"])
            .toLowerCase()
            .includes(value.toLowerCase()) ||  
          String(moment(o["Next Session Date"]).format("Do MMMM, YYYY"))
            .toLowerCase()
            .includes(value.toLowerCase())
      )
    );
    this.setState(
      {
        filterTable: filterTable ? filterTable : courses,
      },
      () =>
        this.setState({ resetPagination: false }, () =>
          this.handlePageChange(1)
        )
    );
  };
  componentDidMount() {
    //console.log("test");
    this.fetchCourses();
  }

  render() {
    //let { title } = this.props;
    let { loading, paginationDisplay, dealerdropdata } = this.state;
    return (
      <div>
        <Space >
          <Search
            id="SearchBox"
            placeholder="Search Courses"
            style={{ width: 200 }}
            onSearch={(value) => this.search(value)}
            onChange={(e) => this.search(e.target.value)}
            className="search-input"
          />
        </Space>

        <TableComponent
          showSorterTooltip={false}
          className={"default-table"}
          columns={this.columns}
          data={this.state.filterTable}
          id={"mytable"}
          loading={this.state.loading}
          pagination={{
            onChange: this.handlePageChange,
            pageSize: this.state.pageSize,
          }}
          paginationDisplay={paginationDisplay}
        />
      </div>
    );
  }
}

export default DashboardLayout;
