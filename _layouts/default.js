import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, Breadcrumb } from '../node_modules/antd';
import { Layout } from "../node_modules/antd";
import { AppstoreOutlined } from "@ant-design/icons/lib/icons";
const { Header, Content, Footer } = Layout;

export default function DefaultLayout(props) {
  const [selectedMenuItem, setSelectedMenuItem]= useState(props.page);

  return (
    <main>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
    <div>
    <Layout className="layout">
      <Header>
          <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={selectedMenuItem}
          onClick={(e) => 
            setSelectedMenuItem(e.key)}
          style={{float: "right"}}
          >
            <Menu.Item className="menu-item" key="posts">
            <Link href="/"><a>All posts</a></Link>
            </Menu.Item>
            <Menu.Item className="menu-item" key="categories"><Link href="/all_categories"><a>All categories</a></Link></Menu.Item>
            <Menu.Item className="menu-item" key="tags"><Link href="/all_tags"><a>All tags</a></Link></Menu.Item>
            <Menu.Item className="menu-item" key="search"><Link href="/search"><a>Search</a></Link></Menu.Item>
          </Menu>
      </Header>
      <Content style={{padding: '0 50px', backgroundColor: "#f0f2f5"}}>
        <p style={{height: '8px'}}></p>
        <div className="site-layout-content" style={{borderRadius: "10px"}}>
        {props.children}
        </div>
        <p style={{height: '8px'}}></p>
      </Content>
      <Footer style={{textAlign: 'center', backgroundColor: "#f0f2f5"}}>Bartashuk Anastasiya | 2022 <p style={{fontSize:"10px", color:"gray"}}>p.s.: it may take a few seconds to load some pages</p></Footer>
    </Layout>
    </div>
    </main>
  );
}
