import React, { Component } from "react";
import DocumentTitle from "react-document-title";

import { Layout } from "antd";
import "./index.css";

const { Content } = Layout;

class DashboardLayout extends Component {
  render() {
    let { title } = this.props;
    return (
      <DocumentTitle title={title}>
        <Layout>
          <Layout className="dashboard-core-container">
            <Layout>
              <Content
                className="core-data-container"
                style={{
                  // padding: "0px 30px",
                  minHeight: 280,
                  marginBottom: "0"
                }}
              >
              <div className="overlay"> 
                {React.cloneElement(this.props.children, { ...this.props })} </div>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </DocumentTitle>
    );
  }
}

export default DashboardLayout;
