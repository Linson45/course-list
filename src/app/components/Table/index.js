import React from "react";
import { Table } from "antd";
//import { Layout } from "antd";
import "./index.css";

//const { Content } = Layout;

const table =  (props) => {
  return (
    <div>
      {/* <Row>
        <Col span={24}> */}
      {/* <Content className="marginArea"> */}
      <Table
        showSorterTooltip = {false}
        id={props.id}
        className={props.className} //category-table
        columns={props.columns}
        dataSource={props.data}
        bordered
        scroll={props.scroll}
        // scroll={{ x: 1100 }}
        pagination={props.pagination}
        size="small"
        loading={props.loading}
        onRow={props.onRow}
        footer={props.footer}
      />
      <div className="pagination-display">{props.paginationDisplay}</div>
      {/* </Content> */}
      {/* </Col>
      </Row> */} 
    </div>
  );
};

export default table